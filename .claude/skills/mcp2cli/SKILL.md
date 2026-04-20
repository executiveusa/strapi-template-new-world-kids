---
name: mcp2cli
description: Turn any MCP server, OpenAPI spec, or GraphQL endpoint into a CLI at runtime — zero codegen, 96-99% token savings. Use this skill to discover and call APIs from agent sessions without loading full tool schemas every turn.
---

# mcp2cli

**Source:** `knowsuchagency/mcp2cli`  
**Install:** `uvx mcp2cli` (no install needed) or `uv tool install mcp2cli`

Converts any MCP server, OpenAPI spec, or GraphQL endpoint into a CLI at runtime.
Saves 96–99% of tokens wasted on tool schemas each turn.

---

## Quick Start

```bash
# List tools from an MCP server
uvx mcp2cli --mcp https://mcp.example.com/sse --list

# Call a tool
uvx mcp2cli --mcp https://mcp.example.com/sse search --query "youth grants Seattle"

# List from OpenAPI spec
uvx mcp2cli --spec https://api.example.com/openapi.json --list

# List from GraphQL
uvx mcp2cli --graphql https://api.example.com/graphql --list
```

---

## Bake Mode (save connection settings)

```bash
# Bake the Supabase MCP
mcp2cli bake create supabase \
  --mcp https://mcp.supabase.com/sse \
  --auth-header "Authorization:env:SUPABASE_SERVICE_KEY"

# Bake with filtering (GET/POST only, no deletes)
mcp2cli bake create myapi \
  --spec https://api.example.com/spec.json \
  --exclude "delete-*,remove-*" \
  --methods GET,POST

# Use baked tool — no connection flags needed
mcp2cli @supabase --list
mcp2cli @supabase query --sql "SELECT * FROM agent_actions LIMIT 5"
```

---

## NWKids Baked Tools

Set up once, use everywhere:

```bash
# Supabase
mcp2cli bake create nwkids-db \
  --mcp https://mcp.supabase.com/sse \
  --auth-header "Authorization:env:SUPABASE_SERVICE_KEY"

# Paperclip
mcp2cli bake create paperclip \
  --spec http://localhost:3100/openapi.json \
  --base-url http://localhost:3100 \
  --auth-header "Authorization:env:PAPERCLIP_API_KEY"
```

Usage in agent sessions:
```bash
mcp2cli @nwkids-db --list
mcp2cli @nwkids-db query-table --table agent_actions --limit 10
mcp2cli @paperclip --list
mcp2cli @paperclip trigger-heartbeat --agent hermes
```

---

## Token-Saving Options

```bash
# Default list: ~1,400 tokens for 96 tools
mcp2cli @myapi --list

# Top 10 most-used, names only: ~20 tokens
mcp2cli @myapi --list --top 10 --compact

# Sort by most recently used
mcp2cli @myapi --list --sort recent
```

---

## Auth Options

```bash
# Header auth (reads from env var — don't expose in process listing)
mcp2cli --mcp https://mcp.example.com/sse \
  --auth-header "Authorization:env:MY_API_TOKEN" \
  --list

# OAuth PKCE (opens browser)
mcp2cli --mcp https://mcp.example.com/sse --oauth --list

# Client credentials (machine-to-machine)
mcp2cli --spec https://api.example.com/spec.json \
  --oauth-client-id "env:OAUTH_CLIENT_ID" \
  --oauth-client-secret "env:OAUTH_CLIENT_SECRET" \
  list-items
```

---

## Install AI Agent Skill

```bash
npx skills add knowsuchagency/mcp2cli --skill mcp2cli
```

After install, agents can use prompts like:
- `mcp2cli --mcp https://mcp.example.com/sse` — interact with MCP server
- `mcp2cli create a skill for https://api.example.com/openapi.json` — generate a skill from an API
