# pi-review

Source repo: https://github.com/earendil-works/pi-review

Use this as the final code-review gate for the POST-MAXX loop.

## Supported review modes

- Uncommitted changes
- Branch diff
- Commit diff
- Pull request
- Folder snapshot

## Core behavior

- Produce prioritized findings with an actionable fix queue.
- Separate agent-facing review notes from human callouts.
- Load `REVIEW_GUIDELINES.md` when present.
- Finish the active review with `/end-review`.

## Finish options

- Return only
- Return and fix findings
- Return and summarize

## Practical rule

- Use this after the code is green, not before.
- If the review exposes a real problem, fix it and run the review again.

