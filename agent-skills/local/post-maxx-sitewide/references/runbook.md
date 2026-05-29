# POST-MAXX sitewide runbook

Use this when resuming a long build from a cold start.

## 1. Load context

- Read `graphify-out/GRAPH_REPORT.md` if it exists.
- Read `AGENTS.md`.
- Read `PRD.md`.
- Read `agent-skills/source-status.json`.
- Use jcodemunch-first lookup before broad file reads.

## 2. Check durable state

- If the task uses Absurd, inspect the queue and task state first.
- Prefer `list-queues`, `list-tasks`, and `dump-task` before editing code.

## 3. Implement

- Use Superpowers planning and TDD.
- Keep the code change small enough to review.
- Use the cinematic references only for pages or clips that need motion.

## 4. Verify

- Run the relevant tests.
- Open the app in the browser when the work is user-facing.
- Fix the obvious owner-facing issues first.

## 5. Review

- Hand the final diff to `pi-review`.
- Fix prioritized findings.
- Repeat until the review is clean or the remaining issue is explicitly accepted.

