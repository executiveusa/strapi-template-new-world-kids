# New World Kids Platform Wiki

> Agent-maintained repo memory. Read this before changing the platform.

## Current Mission

New World Kids is a mission-first operating system for youth food, water,
energy, and shelter work. The platform separates public trust surfaces from
agent operations: public pages explain the mission, Hermes records work, and
MCP tools expose grants, content, impact, and mission actions to agent clients.

## Active Surfaces

| Surface               | Current role               | Notes                                                                                                                   |
| --------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `apps/ui`             | Donor site and trust layer | The current worktree has most tracked UI files deleted; treat UI changes as a rebuild surface until this is reconciled. |
| `apps/blog`           | Public field journal       | Next.js journal app remains present.                                                                                    |
| `services/hermes`     | Hermes backend harness     | Existing repo convention places Hermes under `services/hermes`, not `apps/hermes`.                                      |
| `packages/nwkids-mcp` | `@nwkids/mcp` tool server  | Existing root scripts build this package with `pnpm build:mcp`.                                                         |
| `ops/reports`         | Durable report sink        | Completion reports and SQL handoffs belong here.                                                                        |

## Hermes Operating Model

Hermes is the portfolio operator for NWKids. It wakes on a heartbeat, checks
mission health, records actions to Supabase, and keeps public claims tied to
ledger entries or named plans. It does not impersonate humans, submit grants
over $10,000 without approval, or hide missing credentials.

Core loops:

- Heartbeat: every four hours in production, logged as `agent_actions`.
- Grant hunt: find and rank youth, food, water, energy, shelter, education, and
  AI-for-good funding opportunities.
- Content engine: generate bilingual field updates from real mission facts.
- Impact ledger: record program outcomes and public proof.
- Mission run: create a visible operations entry for a bounded mission task.

## Current Constraints

- `SUPABASE_SERVICE_KEY`, `BETTER_AUTH_SECRET`, and `OPUS_CLIP_API_KEY` are not
  configured in the assignment context.
- Do not claim Supabase migrations are applied unless credentials were present
  and the migration was actually executed.
- Do not hardcode secrets in source, docs, examples, or logs.
- Reuse existing package names and root scripts when the prompt and checkout
  disagree.

## Public Copy Rules

- Lead with concrete work: food, water, energy, shelter.
- Keep trust signals near asks for money or attention.
- Use specific numbers when available.
- Avoid corporate filler and unsupported claims.
- Every public claim should map to a document, ledger row, journal note, or
  explicitly named future plan.

## Open Decisions

- Whether `apps/ui` deletion is intentional or a parallel-agent worktree state.
- Whether Hermes should remain in `services/hermes` or be moved to `apps/hermes`
  after coordination.
- Whether `packages/nwkids-mcp` should be mirrored to `apps/mcp` or remain as
  the canonical package.
