# New World Kids Platform - Agent Wiki
> Auto-maintained by AI agents. Humans may read but should not manually edit.
> Last updated: 2026-04-28 by codex

---

## What This Repo Does

This repo now centers on three active surfaces:

1. `apps/ui` - the donor-facing site and trust layer
2. `apps/blog` - the public field journal
3. `services/hermes` - the separate backend harness

The public message is organized around food, water, energy, and shelter. Trust documents live in the site, field notes live in the journal, and scoped article chat lives in Hermes. Legacy catch-all pages still resolve through Strapi while the migration finishes.

---

## Agent Roster

| Agent | Role | Home |
| --- | --- | --- |
| `hermes` | mission operator | `agents/hermes/SOUL.md` |
| `platform-worker` | codebase owner | `agents/worker/SOUL.md` |
| `grant-hunter` | funding strategy | `services/hermes/agents/grant-hunter/SOUL.md` |
| `trust-steward` | verification and proof | `services/hermes/agents/trust-steward/SOUL.md` |
| `content-engine` | field publishing | `services/hermes/agents/content-engine/SOUL.md` |

---

## Key Files

| File | Purpose |
| --- | --- |
| `apps/ui/src/content/site.ts` | UI wrapper around shared mission data |
| `packages/shared-data/site.ts` | Source of truth for trust docs, pillars, and support rails |
| `apps/ui/public/trust/` | Public verification documents |
| `apps/blog/content/` | Seeded field notes for food, water, energy, and shelter |
| `apps/blog/src/components/post-article-chat.tsx` | Article-scoped chat UI |
| `services/hermes/src/index.ts` | Hermes backend entrypoint |
| `agent-skills/source-status.json` | Manifest of local and cloned skill sources |

---

## Current Architecture

```text
apps/
  ui/        donor site
  blog/      field journal
  strapi/    legacy and transition content runtime
services/
  hermes/    backend harness
packages/
  shared-data/ mission data and trust metadata
agent-skills/
  external/  cloned reference repos
  local/     copied local skill folders
```

`apps/strapi` remains in the repo as a transition dependency for existing catch-all pages.

---

## Decisions Made

| Date | Decision | Why |
| --- | --- | --- |
| 2026-04-27 | Move public journal to `apps/blog` | Simpler and more controllable than continuing with Strapi for editorial content |
| 2026-04-27 | Add `services/hermes` as the separate backend | Clean separation between frontend and orchestration layer |
| 2026-04-27 | Centralize mission data in `packages/shared-data` | Keeps trust docs, pillars, and support rails consistent across apps |
| 2026-04-27 | Seed the journal with four pillar posts in EN and ES | Makes the blog immediately useful instead of looking empty |
| 2026-04-27 | Add article-scoped chat | Journal readers can ask questions without leaving the article context |
| 2026-04-28 | Keep legacy Strapi catch-all pages live during migration | Lets new donor and journal surfaces ship without breaking older content |

---

## Patterns That Work

- Keep the first screen simple and donor-readable.
- Put verification close to the donation ask.
- Use the journal as proof, not filler.
- Keep AI features scoped to specific contexts.
- Store shared mission copy in one workspace package.
- Migrate proof and publishing first, then retire legacy Strapi routes page by page.

---

## Open Questions

- Final production domain: `nwkids.org` or `newworldkids.org`
- Final primary donation rail URL
- Exact Synthia gateway deployment target
- Whether GBrain will run locally, on a VPS, or through a separate operator box
- Which real media assets should replace the current placeholders first
