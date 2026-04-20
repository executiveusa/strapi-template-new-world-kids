# Strapi + Next.js Monorepo

Monorepo starter with Strapi v5 CMS and Next.js 16 frontend. Uses pnpm workspaces with Turborepo.

## Workspaces

| Path                     | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `apps/ui`                | Next.js 16 (App Router, React 19, TailwindCSS v4, Shadcn/ui) |
| `apps/strapi`            | Strapi v5 CMS (PostgreSQL via Docker)                        |
| `packages/strapi-types`  | Auto-generated TypeScript types from Strapi schemas          |
| `packages/design-system` | Shared TailwindCSS tokens and CkEditor styles                |
| `packages/shared-data`   | Shared constants and types                                   |
| `qa/tests/playwright`    | E2E and accessibility tests                                  |

## Essential Commands

```bash
pnpm dev              # Start both apps (Docker required for DB)
pnpm build            # Build all
pnpm lint             # ESLint all packages
pnpm typecheck        # Typecheck (run from apps/ui)
```

See [docs/commands.md](docs/commands.md) for full command reference.

## Type Generation (Critical)

After ANY Strapi schema change:

```bash
cd apps/strapi && pnpm generate:types
```

This updates `@repo/strapi-types`. Forgetting causes silent type mismatches between apps.

## Documentation

- [Commands Reference](docs/commands.md) — All pnpm commands
- [Architecture](docs/architecture.md) — System design and patterns
- [Page Builder](docs/page-builder.md) — Component registry and rendering
- [Strapi API Client](docs/strapi-api-client.md) — Fetching content from Strapi
- [Pages Hierarchy](docs/pages-hierarchy.md) — URL structure and redirects
- [Authentication](docs/authentication.md) — Better Auth + Strapi JWT integration
- [Strapi Schemas](docs/strapi-schemas.md) — Schema attributes, localization, lifecycle hooks
- [Strapi Types](docs/strapi-types-usage.md) — Type utilities and usage patterns

## Commits

Uses conventional commits enforced by Husky + commitlint.

```bash
pnpm commit    # Interactive Commitizen flow
```

Or write manually: `type(scope): subject`

---

## Agent Directory (Octopus Architecture)

This repo is managed by autonomous AI agents running on Paperclip at `http://31.220.58.212:3100`.

| Agent | File | Role | Heartbeat |
|-------|------|------|-----------|
| Hermes (CEO) | `agents/hermes/SOUL.md` | Portfolio manager, grant hunter, content CEO | Every 4 hours |
| Platform Worker | `agents/worker/SOUL.md` | Codebase health, KPIs, Strapi+Next operations | Every 4 hours |
| Grant Hunter | (sub-agent, see company.json) | Weekly grant research & applications | Mondays 9am |
| Content Engine | (sub-agent, see company.json) | Bilingual social content via Postiz | Mon/Wed/Fri 8am |

### Octopus Structure
```
AGENTS.md                  ← This file
KPI.md                     ← Live KPI dashboard
agents/hermes/SOUL.md      ← CEO agent system prompt
agents/wiki/WIKI.md        ← Accumulated repo knowledge (agents read first)
agents/worker/SOUL.md      ← Platform worker identity
.paperclip/company.json    ← Paperclip company + agent definitions
ops/reports/               ← Machine-readable agent outputs
infrastructure/hermes/     ← Docker Compose + Supabase SQL for agent stack
.mcp.json                  ← MCP server config (jcodemunch + supabase)
.ralphy/config.yaml        ← Ralphy autonomous loop config
PRD.md                     ← Ralphy task list for remaining work
```

### Public Ledger
All agent actions are logged at:
- Supabase table: `agent_actions` (project: sbbuxnyvflczfzvsglpe)
- Local: `ops/reports/YYYY-MM-DD.md`

### Rules for AI Coding Agents (jCodemunch / jCodeMunch)
- Install jcodemunch-mcp for this repo: `jcodemunch-mcp index .`
- Always use `search_symbols` + `get_symbol_source` before reading full files
- This saves 90%+ tokens on large file reads
- Config: see `.mcp.json`
