# New World Kids Platform

Mission-first monorepo for the New World Kids donor site, separate journal, and Hermes backend.

## Active Workspaces

| Path                   | Purpose                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| `apps/ui`              | Donor-facing site and trust layer                                     |
| `apps/blog`            | Separate journal for field notes and proof                            |
| `services/hermes`      | Backend harness for trust APIs, article chat, and agent orchestration |
| `packages/shared-data` | Shared mission data, trust docs, and taxonomy                         |
| `agent-skills`         | Local skill kit plus cloned external references                       |
| `ops/reports`          | Durable local report sink for agent-visible output                    |

The active platform is split between `apps/ui` for the public site, `apps/blog` for the field journal, and `services/hermes` for the backend agent layer. Strapi is no longer part of the intended runtime.

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

## Agent Operating Files

| File                        | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
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

The project-local `agent-skills/` directory is the curated holding area for the requested skills and reference repos.
Material agent actions should be mirrored to a public ledger or durable report sink before broader automation is enabled.

---

## THE GRAPHIFY LAW (Non-Negotiable for Every Agent)

Before reading any file, searching this codebase, or making an architectural
decision, every agent MUST check for a knowledge graph first.

### Protocol

1. Check: does `graphify-out/GRAPH_REPORT.md` exist?
   YES -> Read it. Navigate by structure, not keyword search.
   NO -> Run `/graphify .` before all other work. Build the map first.

2. Before Glob/Grep/Read:
   Ask: "Can the graph answer this instead of raw files?"
   YES -> `/graphify query "your question"`
   NO -> Read only the specific file the graph pointed to.

3. Before any architectural decision:
   Check GOD NODES in GRAPH_REPORT.md. Changes touching god nodes
   affect everything downstream. Flag it. Do not proceed silently.

4. After significant work:
   Run `/graphify . --update` to keep the graph current.
   Commit `graphify-out/` with your changes.

### Why This Is a Law

Without this law, Hermes reads raw files on every heartbeat:
~40,000 tokens/walk x 8 repos = $6/day in API costs.

With this law, Hermes reads GRAPH_REPORT.md (one page):
~560 tokens/walk x 8 repos = $0.09/day in API costs.

Violation of this law is not permitted. It wastes budget and degrades analysis.

### Install Commands (run once per repo)

pip install graphifyy && graphify install
graphify hermes install
graphify hook install
/graphify .

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:

- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
