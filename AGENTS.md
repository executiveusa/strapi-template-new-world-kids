# New World Kids Platform

Mission-first monorepo for the New World Kids donor site, separate journal, Hermes backend, and agent-readable ICM operating context.

## Active Workspaces

| Path                   | Purpose                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| `apps/ui`              | Donor-facing site and trust layer                                     |
| `apps/blog`            | Separate journal for field notes and proof                            |
| `services/hermes`      | Backend harness for trust APIs, article chat, and agent orchestration |
| `packages/shared-data` | Shared mission data, trust docs, and taxonomy                         |
| `icm`                  | Agent-readable mission, governance, fundraising, grants, and traffic |
| `agent-skills`         | Local skill kit plus cloned external references                       |
| `ops/reports`          | Durable local report sink for agent-visible output                    |

The active platform is split between `apps/ui` for the public site, `apps/blog` for the field journal, `services/hermes` for the backend agent layer, and `icm` for durable operating context. Strapi is no longer part of the intended runtime.

## Start Here for Nonprofit/Fundraising Work

Read `icm/AGENTS.md`, then only the stage contract and references it routes you to. Do not stuff the whole nonprofit context into one prompt. The ICM folder is the source of truth for mission/fiscal-sponsor/fundraising automation rules.

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
pnpm dev:mcp
```

## Nonprofit Product Rules

1. Lead with the four pillars: food, water, energy, shelter.
2. Keep the trust layer visible on every page.
3. Separate charitable giving from paid services.
4. Keep the frontend independent from the Hermes backend.
5. Any public claim should map to a document, a journal note, or a clearly named future plan.
6. Never commit donor, sponsor, FundRazr, GrantStation, HSI member, payment, or recovery credentials.
7. Every grant submission requires recorded HSI review/approval before submission.
8. Do not automate or scrape GrantStation without GrantStation's prior written permission.

## Agent Operating Files

| File                        | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| `icm/AGENTS.md`             | Nonprofit/fundraising routing catalog             |
| `icm/CONTEXT.md`            | Fundraising and grants pipeline                   |
| `agents/hermes/SOUL.md`     | Repo-level strategic operator identity            |
| `agents/worker/SOUL.md`     | Platform worker identity                          |
| `agents/wiki/WIKI.md`       | Rolling repo memory                               |
| `.paperclip/company.json`   | Company orchestration config                      |
| `.mcp.json`                 | MCP server config                                 |
| `.ralphy/config.yaml`       | Autonomous execution guardrails                   |
| `services/hermes/agents/**` | Backend agent soul and playbook files             |
| `infrastructure/hermes/**`  | Local backend deployment and data bootstrap files |

## Skills and MCP

- `jcodemunch` for token-efficient symbol discovery
- `supabase` for data and ledger work
- `mcp2cli` for bridging MCP tools to CLI workflows
- `gbrain` for memory and retrieval once installed in the operator environment
- `post-maxx-sitewide` for the Absurd-backed sitewide agent loop, cinematic frontend work, and simple owner dashboards
- `pi-review` for the final code-review gate before merge
- `absurd` as the Postgres-native durable workflow substrate when the task needs retries, checkpoints, sleeps, and events
- `seedance`, `hyperframes-helper`, and `cinematic-site-components` for motion studies, storyboards, and rendered cinematic clips

The project-local `agent-skills/` directory is the curated holding area for requested skills and reference repos.
Material agent actions should be mirrored to a public ledger or durable report sink before broader automation is enabled.

---

## THE GRAPHIFY LAW (Non-Negotiable for Every Agent)

Before reading raw code, broad-searching this codebase, or making an architectural decision, check the knowledge graph first.

### Protocol

1. Check whether `graphify-out/GRAPH_REPORT.md` exists.
   - YES: read it and compare its built-from commit to current HEAD.
   - NO: build the graph before architecture work.
2. Ask whether the graph can answer the question before Glob/Grep/Read.
3. Before architecture changes, check god nodes/hubs and flag downstream risk.
4. After significant code changes, run `graphify update .` and commit refreshed graph output.

For nonprofit operating context, the graph does not replace `icm/`; the graph explains code relationships while ICM carries the human-readable contracts, governance, and stage routing.
