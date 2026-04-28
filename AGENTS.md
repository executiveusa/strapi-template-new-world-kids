# New World Kids Platform

Mission-first monorepo for the New World Kids donor site, separate journal, and Hermes backend.

## Active Workspaces

| Path | Purpose |
| --- | --- |
| `apps/ui` | Donor-facing site and trust layer |
| `apps/blog` | Separate journal for field notes and proof |
| `services/hermes` | Backend harness for trust APIs, article chat, and agent orchestration |
| `packages/shared-data` | Shared mission data, trust docs, and taxonomy |
| `agent-skills` | Local skill kit plus cloned external references |
| `ops/reports` | Durable local report sink for agent-visible output |

`apps/strapi` remains in the repo as a legacy and transition surface. It is no longer the primary publishing path, but existing catch-all pages still depend on it until migration is complete.

## Primary Commands

```bash
pnpm dev
pnpm build
pnpm typecheck
pnpm test
```

Focused commands:

```bash
pnpm dev:ui
pnpm dev:blog
pnpm dev:hermes
pnpm dev:strapi
```

## Nonprofit Product Rules

1. Lead with the four pillars: food, water, energy, shelter.
2. Keep the trust layer visible on every page.
3. Separate charitable giving from paid services.
4. Keep the frontend independent from the Hermes backend.
5. Any public claim should map to a document, a journal note, or a clearly named future plan.

## Agent Operating Files

| File | Purpose |
| --- | --- |
| `agents/hermes/SOUL.md` | Repo-level strategic operator identity |
| `agents/worker/SOUL.md` | Platform worker identity |
| `agents/wiki/WIKI.md` | Rolling repo memory |
| `.paperclip/company.json` | Company orchestration config |
| `.mcp.json` | MCP server config |
| `.ralphy/config.yaml` | Autonomous execution guardrails |
| `services/hermes/agents/**` | Backend agent soul and playbook files |
| `infrastructure/hermes/**` | Local backend deployment and data bootstrap files |

## Skills and MCP

- `jcodemunch` for token-efficient symbol discovery
- `supabase` for data and ledger work
- `mcp2cli` for bridging MCP tools to CLI workflows
- `gbrain` for memory and retrieval once installed in the operator environment

The project-local `agent-skills/` directory is the curated holding area for the requested skills and reference repos.
Material agent actions should be mirrored to a public ledger or durable report sink before broader automation is enabled.
