---
name: mcp2cli
description: >
  MCP-to-CLI lazy graph bridge. Connects any MCP server, OpenAPI spec, or GraphQL endpoint
  as a CLI command at runtime — zero codegen, 96-99% fewer tokens than loading tool schemas.
  Use when you need to call any MCP server tool but want to avoid loading all tool schemas
  into context. Supports lazy discovery: only load the server you need, when you need it.
  Triggers: "call MCP", "use supabase tool", "invoke vibe graph", "run watcher", any
  cross-server orchestration, or when token budget is tight.
---

# MCP2CLI — Lazy Graph Bridge

> The Emerald Tablet Law: Tools are vessels. They should be summoned only when the work demands them.
> Never load all MCP servers at once. The graph knows what is needed. Ask the graph.

---

## CORE PRINCIPLE

This skill implements **lazy graph loading** for MCP tools. Each MCP server is a node in the Vibe Graph.
Call only the node you need. Load its schema on demand. Release it after use.

```
MCP Registry (full graph)
    ├── gitkraken ── git/branch/diff/push
    ├── chrome    ── navigate/click/screenshot/fill
    ├── playwright── test/snapshot/evaluate
    ├── supabase  ── query/insert/select/rpc
    ├── higgsfield── video/animate/generate
    ├── kling     ── image-to-video/text-to-video
    └── worlds    ── create/deploy/voice-command
                          │
              summon only what you need
                          │
                    mcp2cli --mcp <url> <tool> <args>
```

---

## INSTALL (one-time, idempotent)

```bash
# Preferred — no install, always latest
uvx mcp2cli --help

# Or install globally via uv
uv tool install mcp2cli
```

> **Windows note**: ensure `uv` is on PATH. Install via `winget install astral-sh.uv` or `pip install uv`.

---

## THE SERVER REGISTRY

Each MCP server the Kupuri OS uses. Load only when needed:

| ID | Server URL | Purpose | Load when |
|----|-----------|---------|-----------|
| `gitkraken` | stdio `npx gitkraken-mcp` | Git ops, PR, issues | Code changes needed |
| `chrome` | stdio `npx mcp-chrome-bridge` | Browser automation | Web scraping, testing UI |
| `playwright` | stdio `npx @playwright/mcp` | E2E testing | Automated testing |
| `supabase` | `https://mcp.supabase.com/sse` | DB queries, RPC, storage | Data ops |
| `higgsfield` | `https://api.higgsfield.ai/mcp` | AI video | Media generation |
| `kling` | `https://api.kling.com/mcp` | Video synthesis | Video tasks |
| `worlds` | `https://api.worlds.xyz/mcp` | 3D worlds | Immersive output |

---

## WORKFLOW (lazy load pattern)

### Step 1 — Identify the minimum server needed
```
Task: "Query Supabase for sphere memory"
→ Server needed: supabase ONLY
→ Skip: gitkraken, chrome, playwright, etc.
```

### Step 2 — Discover tools on that server (lazy schema load)
```bash
# List all tools on server (only loads this server's schema)
uvx mcp2cli --mcp https://mcp.supabase.com/sse --auth-header "Authorization:Bearer $SUPABASE_ANON_KEY" --list

# Search tools by keyword (even cheaper — returns names only)
uvx mcp2cli --mcp https://mcp.supabase.com/sse --search "query"
```

### Step 3 — Call the tool directly
```bash
# Call a specific tool
uvx mcp2cli --mcp https://mcp.supabase.com/sse \
  --auth-header "Authorization:Bearer $SUPABASE_ANON_KEY" \
  execute_sql --query "SELECT * FROM vibe_nodes WHERE agent_id = 'alex' LIMIT 10"
```

### Step 4 — Release. Do not cache schema in context.

---

## STDIO SERVERS (local)

For MCP servers that run as local processes (gitkraken, playwright, chrome):

```bash
# List tools on a stdio-mode MCP server
uvx mcp2cli --mcp-stdio "npx @playwright/mcp" --list

# Call a tool
uvx mcp2cli --mcp-stdio "npx @playwright/mcp" \
  screenshot --url "https://dashboard-agent-swarm-eight.vercel.app" --output "./screenshot.png"
```

---

## GRAPH ROUTING RULES

Follow these to keep token budget under control:

1. **Never load more than 1 MCP server schema per task**
2. **Use `--search` before `--list`** — search returns names only (20x cheaper than full schema)
3. **Cache nothing in context** — call mcp2cli fresh each time
4. **If a built-in VS Code MCP tool covers it**, use that instead of mcp2cli
5. **For multi-server workflows**, chain calls sequentially — never in parallel unless you parsed the output

---

## EMERALD TABLET INTEGRATION

This skill is a **Vessel** (Tablet 4 — On Form and Substance).

When orchestrating Sphere agents that need cross-system data:
```
SYNTHIA needs → Supabase vibe_nodes + Git status + Screenshot
                     │                   │              │
              mcp2cli supabase    mcp2cli gitkraken   mcp2cli chrome
                   (sequential — one at a time)
```

Post results to Vibe Graph after each call:
```bash
# After getting data, POST to vibe graph
curl -X POST https://dashboard-agent-swarm-eight.vercel.app/api/vibe \
  -H "Content-Type: application/json" \
  -d '{"kind":"ingest","agentId":"synthia","nodeKind":"tool_result","label":"supabase-query","content":"..."}'
```

---

## TOKEN BUDGET GUIDE

| Operation | Token cost | Use when |
|-----------|-----------|---------|
| `--search "keyword"` | ~50 tokens | Finding tool name |
| `--list` | ~500-2000 tokens | Need full schema |
| Direct tool call (known name) | ~100 tokens | Tool name already known |
| Full MCP server in context | ~5000-20000 tokens | **NEVER** — this is what we avoid |

---

## QUICK REFERENCE

```bash
# Install
uv tool install mcp2cli

# Discover
uvx mcp2cli --mcp <url> --search "<keyword>"

# List
uvx mcp2cli --mcp <url> --list

# Call
uvx mcp2cli --mcp <url> <tool-name> --<param> <value>

# Auth
uvx mcp2cli --mcp <url> --auth-header "Authorization:Bearer $TOKEN" --list

# Stdio server
uvx mcp2cli --mcp-stdio "<command>" --list
uvx mcp2cli --mcp-stdio "<command>" <tool-name> --<param> <value>
```
