---
name: pi-review
description: Final review gate for POST-MAXX and other long-running agent loops. Use when reviewing uncommitted changes, a branch, a commit, a pull request, or a folder snapshot before merging.
---

# Pi Review Gate

Use this skill at the end of a build loop when the code needs a hard review pass before merge.

## What it does

- Reviews uncommitted changes
- Reviews a branch diff
- Reviews a commit
- Reviews a pull request
- Reviews a folder snapshot
- Produces prioritized findings with a fix queue
- Separates agent notes from human callouts

## Review order

1. Inspect the change shape first.
2. Review correctness, regressions, and maintainability.
3. Call out anything that is risky, unclear, or incomplete.
4. Send the fix queue back to the implementer.
5. Repeat until the change is ready or the last blocker is understood.

## Modes

- `/review`
- `/review uncommitted`
- `/review branch main`
- `/review commit <sha>`
- `/review pr <number-or-url>`
- `/review folder <paths>`
- `/review --extra "<focus>"`

## Finish

Use `/end-review` to close the review session and return to the original branch or summarize the findings.

## Guardrails

- Review only the actual diff or snapshot.
- Do not pretend a change is fine if the evidence says otherwise.
- Treat `REVIEW_GUIDELINES.md` as higher priority when it exists.
- Keep the verdict and the fix queue explicit and short.

