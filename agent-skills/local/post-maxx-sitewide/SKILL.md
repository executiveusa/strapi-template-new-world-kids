---
name: post-maxx-sitewide
description: Absurd-backed workflow for POST-MAXX sitewide builds, dashboard pages, cinematic motion, and the final review handoff. Use when continuing multi-phase agent work, simplifying the database-backed runner, or turning design references into production UI.
---

# POST-MAXX Sitewide Workflow

Use this skill when the task is bigger than a single file change and needs a reusable loop that stays easy to resume.

## Core idea

- Keep durable state in Postgres with Absurd instead of scattering retries, sleeps, and checkpoints across ad hoc code.
- Use jcodemunch first for token-efficient repo discovery.
- Use Superpowers for planning, TDD, verification, and finishing the branch.
- Use cinematic references only when the work actually needs motion or visual composition.
- Finish each major slice with pi-review before merge.

## Default order

1. Read `graphify-out/GRAPH_REPORT.md` if it exists, then `AGENTS.md`, `PRD.md`, and `agent-skills/source-status.json`.
2. Use jcodemunch-first lookup before broad reads.
3. Use the smallest tool/server surface with `mcp2cli`.
4. For durable agent work, use Absurd as the state engine:
   - one Postgres database
   - one schema migration source
   - one queue per workflow family
   - one worker per queue
   - checkpoints, retries, sleep, and events in the database
5. For owner-facing pages, apply Steve Krug rules:
   - one obvious main action
   - plain labels
   - visible status
   - no jargon
   - no mystery
6. For motion and media work:
   - use `cinematic-site-components` for scroll and transition patterns
   - use `seedance` for motion graphics and short cinematic clips
   - use `hyperframes-helper` for HTML-to-MP4 composition
   - use `Canva` for quick layout or board work when needed
7. Implement with Superpowers planning, TDD, and verification.
8. Run browser verification when the page or flow is user-facing.
9. Hand the finished change to `pi-review` as the final review gate.
10. Write a durable report to `ops/reports/` and update the skill/source manifest when new references are added.

## Absurd simplification rule

- Prefer Absurd over a custom queue when the work needs durability.
- Keep the database surface small and easy to reason about.
- Do not add extra services unless the task truly needs them.
- Prefer checked-in SQL migrations over bespoke runtime schema changes.
- Inspect queue and task state before opening code if the workflow can answer the question.

## When to use the media references

- Use `seedance` when the user needs a cinematic intro, promo, or motion-graphics shot.
- Use `hyperframes-helper` when the output should be a rendered MP4 from HTML/CSS/GSAP.
- Use `cinematic-site-components` when you need a scroll effect, sticky stack, reveal, or other motion primitive.

## When to use the review gate

- Use `pi-review` when implementation is done and the work needs a clean review pass.
- Review uncommitted changes, a branch, a commit, a PR, or a folder snapshot.
- Do not merge until the review findings are resolved or explicitly accepted.
