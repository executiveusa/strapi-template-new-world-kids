#!/usr/bin/env bash
set -Eeuo pipefail

# ============================================================
# NEW WORLD KIDS — 21st.dev MCP alignment/bootstrap
# Run from repository root.
#
# Usage:
#   export API_KEY_21ST='your-temporary-21st-key'
#   bash ./connect-21st.sh
#
# IMPORTANT:
#   Do NOT paste the key into this file.
# ============================================================

MCP_NAME="21st"
MCP_URL="https://21st.dev/api/mcp"
MCP_FILE=".mcp.json"

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m! %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

cleanup() {
  # We intentionally do NOT print the key.
  unset TWENTY_FIRST_API_KEY 2>/dev/null || true
}
trap cleanup EXIT

# ------------------------------------------------------------
# 1. Preconditions
# ------------------------------------------------------------

log "Checking repository"

[[ -d .git ]] || die "Run this script from the Git repository root."
[[ -f README.md ]] || warn "README.md not found at repository root."

command -v node >/dev/null 2>&1 || die "Node.js is required."
command -v npx  >/dev/null 2>&1 || die "npx is required."
command -v curl >/dev/null 2>&1 || die "curl is required."
command -v git  >/dev/null 2>&1 || die "git is required."

[[ -n "${API_KEY_21ST:-}" ]] || die \
  "API_KEY_21ST is not set. Run: export API_KEY_21ST='YOUR_TEMP_KEY'"

# Some clients/packages recognize this alternate variable.
export TWENTY_FIRST_API_KEY="$API_KEY_21ST"

ok "Repository and required commands found"

printf 'Branch: '
git branch --show-current

printf 'Commit: '
git rev-parse --short HEAD

printf 'Node: '
node --version

# ------------------------------------------------------------
# 2. Protect secrets
# ------------------------------------------------------------

log "Applying secret safety"

# Do not add a real secret file. Only ensure common local env files
# are ignored if the repo doesn't already handle them.
touch .git/info/exclude

for pattern in \
  ".env.local" \
  ".env.*.local" \
  ".21st.local" \
  ".mcp.local.json"
do
  grep -qxF "$pattern" .git/info/exclude 2>/dev/null || \
    printf '%s\n' "$pattern" >> .git/info/exclude
done

ok "Local secret paths excluded from Git"

# ------------------------------------------------------------
# 3. Backup existing MCP config
# ------------------------------------------------------------

if [[ -f "$MCP_FILE" ]]; then
  cp "$MCP_FILE" "${MCP_FILE}.backup"
  ok "Backed up ${MCP_FILE} → ${MCP_FILE}.backup"
fi

# ------------------------------------------------------------
# 4. Run official 21st CLI setup for Claude
# ------------------------------------------------------------

log "Initializing current 21st MCP for Claude"

npx --yes @21st-dev/cli@latest init --client claude --write

ok "21st CLI initialization completed"

# ------------------------------------------------------------
# 5. Normalize .mcp.json
#
# We deliberately store ${API_KEY_21ST}, NOT the real key.
# ------------------------------------------------------------

log "Normalizing ${MCP_FILE}"

node <<'NODE'
const fs = require("fs");

const file = ".mcp.json";
let config = {};

if (fs.existsSync(file)) {
  try {
    config = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    console.error(`Invalid ${file}: ${err.message}`);
    process.exit(1);
  }
}

config.mcpServers ||= {};

config.mcpServers["21st"] = {
  url: "https://21st.dev/api/mcp",
  headers: {
    "x-api-key": "${API_KEY_21ST}"
  }
};

fs.writeFileSync(file, JSON.stringify(config, null, 2) + "\n");
NODE

ok "${MCP_FILE} aligned to unified 21st MCP"

# ------------------------------------------------------------
# 6. Make absolutely sure the literal key was not written
# ------------------------------------------------------------

log "Scanning working tree for accidental key persistence"

if git grep -nF "$API_KEY_21ST" -- \
     ':!node_modules' \
     ':!.next' \
     ':!dist' \
     ':!build' 2>/dev/null; then
  die "The literal 21st API key appears in a tracked/worktree file. Remove it before continuing."
fi

ok "No literal API key found in repository files"

# ------------------------------------------------------------
# 7. Verify config shape
# ------------------------------------------------------------

log "Verifying MCP configuration"

node <<'NODE'
const fs = require("fs");

const c = JSON.parse(fs.readFileSync(".mcp.json", "utf8"));
const m = c?.mcpServers?.["21st"];

if (!m) throw new Error("Missing mcpServers.21st");
if (m.url !== "https://21st.dev/api/mcp")
  throw new Error(`Unexpected 21st URL: ${m.url}`);
if (m.headers?.["x-api-key"] !== "${API_KEY_21ST}")
  throw new Error("21st x-api-key is not using ${API_KEY_21ST}");

console.log("21st MCP config shape: VALID");
NODE

# ------------------------------------------------------------
# 8. Network/authentication probe
#
# This tests the actual MCP endpoint. A proxy/network failure is
# distinguished from an MCP/authentication response.
# ------------------------------------------------------------

log "Testing reachability of 21st MCP"

TMP_HEADERS="$(mktemp)"
TMP_BODY="$(mktemp)"
trap 'rm -f "$TMP_HEADERS" "$TMP_BODY"; cleanup' EXIT

HTTP_CODE="$(
curl \
  --silent \
  --show-error \
  --connect-timeout 12 \
  --max-time 25 \
  --dump-header "$TMP_HEADERS" \
  --output "$TMP_BODY" \
  --write-out '%{http_code}' \
  --request POST \
  "$MCP_URL" \
  --header "x-api-key: ${API_KEY_21ST}" \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json, text/event-stream' \
  --data '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"initialize",
    "params":{
      "protocolVersion":"2025-03-26",
      "capabilities":{},
      "clientInfo":{
        "name":"nwk-claude-bootstrap",
        "version":"1.0.0"
      }
    }
  }' || true
)"

case "$HTTP_CODE" in
  200|201|202)
    ok "21st.dev MCP endpoint reached successfully (HTTP ${HTTP_CODE})"
    ;;
  401|403)
    echo
    cat "$TMP_BODY" 2>/dev/null || true
    die "21st.dev was reached, but authentication/access was rejected (HTTP ${HTTP_CODE})."
    ;;
  000|"")
    die "Could not reach 21st.dev. This is likely DNS/proxy/network policy, not repo configuration."
    ;;
  *)
    warn "21st.dev returned HTTP ${HTTP_CODE}."
    warn "Endpoint is reachable, but inspect the response below:"
    cat "$TMP_BODY" 2>/dev/null || true
    ;;
esac

# ------------------------------------------------------------
# 9. Verify Claude CLI recognizes MCP configuration
# ------------------------------------------------------------

log "Checking Claude MCP registration"

if command -v claude >/dev/null 2>&1; then
  # Different Claude versions expose slightly different output,
  # so don't parse too aggressively.
  if claude mcp list; then
    ok "Claude MCP registry queried successfully"
  else
    warn "Claude CLI exists, but 'claude mcp list' failed."
    warn "Restart Claude Code so it reloads .mcp.json."
  fi
else
  warn "Claude CLI executable was not found in this shell."
  warn "The repo MCP config is aligned; open/restart Claude Code from this repository."
fi

# ------------------------------------------------------------
# 10. Show ONLY safe diff
# ------------------------------------------------------------

log "Reviewing safe repo diff"

git diff -- "$MCP_FILE" || true

# One final leak test against the actual diff.
if git diff | grep -Fq "$API_KEY_21ST"; then
  die "STOP: API key was detected in git diff."
fi

# ------------------------------------------------------------
# 11. Final builder instructions
# ------------------------------------------------------------

cat <<'EOF'

============================================================
21ST.DEV ALIGNMENT COMPLETE
============================================================

NEXT ACTION IN CLAUDE:

Restart/reopen Claude Code from this repository root.

Then tell Claude:

Use the 21st MCP now.

1. Verify the "21st" MCP server is connected.
2. Discover/list the available 21st tools.
3. Run one READ-ONLY search for:
   "editorial image-led nonprofit project carousel"
4. Do not modify source code.
5. Report the actual tool names and search result.
6. Return a PAULI-A2A/1.0 handoff to GPT-5.6 Sol.
7. Ask for the next implementation instruction.
8. STOP.

Do not let 21st redesign the application.
21st = component/inspiration worker.
Claude = builder.
GPT-5.6 Sol = supervisor/critic.
============================================================

EOF

ok "Bootstrap finished"
