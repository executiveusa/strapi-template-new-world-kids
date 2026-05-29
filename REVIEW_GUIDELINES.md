# New World Kids Review Guidelines

Use these guidelines for the final review pass on this repo.

## What to prioritize

- Truthful runtime state over optimistic UI copy
- Owner-facing clarity on dashboards and management pages
- Simple, durable backend state instead of extra moving parts
- Browser-verified behavior for any user-facing flow
- No fake integrations, hidden fallbacks, or silent success

## Krug checks for POST-MAXX and other owner pages

- One obvious main action
- Plain labels
- Visible connection or status state
- Related actions grouped together
- No jargon-heavy prose
- No more choices than the user needs right now

## Absurd checks for agent/runtime work

- Prefer one Postgres-backed durable workflow over extra services
- Checkpoints, retries, sleep, and events should be visible in the database
- Keep the runner simple enough that a new agent can resume it quickly
- Do not add a queue, broker, or service layer unless there is a real need

## Cinematic frontend checks

- Maintain the 006 brand and journey consistency
- Keep motion smooth and purposeful
- Make the copy outcome-based and understandable to a non-technical owner
- Do not let visual polish hide missing functionality

## Review discipline

- Flag discrete, actionable findings only
- Prioritize correctness, maintainability, and security
- Call out dependency changes, config default changes, and auth/runtime behavior changes in the human callouts section
- Prefer fail-fast handling over silent fallback unless a boundary explicitly needs translation

