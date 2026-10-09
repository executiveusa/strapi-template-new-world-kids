# New World Kids Platform

Mission-first monorepo for the New World Kids donor site, separate journal, Hermes backend, and agent-readable ICM operating context.

## Active Workspaces

| Path                   | Purpose                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| `apps/ui`              | Public site: First 12 story, referral and intake forms, trust pages   |
| `apps/blog`            | Separate journal for field notes and proof                            |
| `services/hermes`      | Backend harness for trust APIs, article chat, and agent orchestration |
| `packages/shared-data` | Shared mission data and trust documents                               |
| `supabase/migrations`  | Database schema, with tested rules for youth work                     |
| `docs`                 | Compliance, governance, audit, and handoff notes                      |
| `icm`                  | Agent-readable mission, governance, fundraising, grants, and traffic  |
| `agent-skills`         | Local skill kit plus cloned external references                       |
| `ops/reports`          | Durable local report sink for agent-visible output                    |

Read `README.md` first: it states what New World Kids is, the pilot, how to run the site, how to show or hide it
(`SITE_MODE`), and how staff edit text. Strapi is not part of the runtime.

## Start Here for Nonprofit/Fundraising Work

Read `icm/AGENTS.md`, then only the stage contract and references it routes you to. Do not stuff the whole nonprofit context into one prompt. The ICM folder is the source of truth for mission, fiscal-sponsor, and fundraising automation rules.

## Primary Commands

```bash
pnpm dev:ui
pnpm typecheck
node scripts/verify-nwk-public-truth.mjs
node scripts/verify-nwk-pathways.mjs
node scripts/verify-nwk-operating-layer.mjs
SITE_MODE=live BASE_URL=http://localhost:3100 node scripts/audit-viewports.mjs
```

## Nonprofit Product Rules (final state)

1. The story is **Interest → Project → Mentor → Next Step**, in four pathways: technology, sports, urban gardening and food systems, art. The First 12 is a pilot: 12 young people ages 16 to 19, King, Snohomish, Pierce, and Skagit counties, 2027, referral only, free to those selected.
2. Keep trust visible: the footer links Transparency, Privacy, and Safeguards on every page.
3. Charitable giving goes to HSI (the 501(c)(3)) for the New World Kids fund. New World Kids is not itself an IRS-recognized 501(c)(3). Do not say otherwise. There are no paid services offered through this site.
4. Keep the frontend independent from the Hermes backend.
5. Any public claim must map to a public record, a document, or a clearly labeled plan. Unknown facts stay hidden (`apps/ui/src/content/facts.ts` uses `null`). Never invent people, numbers, partners, or results.
6. Proyecto Indigo Azul (a demonstration food forest in Puerto Vallarta, Mexico, started 2020) is the origin story. Its images and film are never shown as Seattle participants or results.
7. Participants are paid employees, paid the applicable minimum wage plus $3 an hour. Hours are set together by the young person, their parent or guardian, and the host program, and all three must agree. Work for anyone under 18 follows Washington's child labor rules (`docs/NWK_YOUTH_EMPLOYMENT_COMPLIANCE.md`).
8. Never publish participant names, schools, or schedules. Photos of a young person need written consent.
9. HSI must approve fundraising text in writing and review every grant before submission (sponsorship agreement, sections 3 and 6). Do not automate or scrape GrantStation without its prior written permission.
10. Never commit donor, sponsor, FundRazr, GrantStation, HSI member, payment, or recovery credentials. Do not reuse credentials shown on third-party pages.
11. The public can be shown a coming-soon page with `SITE_MODE=coming-soon`. Never turn the site live without the owner's go-ahead.
12. Pushes trigger paid deploys. Commit locally and push only when the owner says so.

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
