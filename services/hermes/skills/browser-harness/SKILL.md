---
name: hermes-browser-harness
description: Use when Hermes needs live browser verification, page inspection, or proof that a public flow actually works.
---

# Hermes Browser Harness

Use the browser harness whenever Hermes needs to verify anything that a human could observe.

## Use it for

- Public homepage checks
- Donor flow checks
- Grant application or research flows that require visible state
- Support rails, forms, and login checks
- Screenshot-based proof before claiming completion

## Routing

- Prefer `BROWSER_HARNESS_URL` when it is configured
- Fall back to the local browser only when the harness is unavailable
- Keep the browser step separate from code changes so verification is explicit

## Browser discipline

- Open the real deployed URL, not only localhost
- Verify the final state after deploy, not the middle state
- Capture screenshots or notes when the page outcome matters
- If the page fails, record the failure and do not claim success

## Output

When using the browser harness, Hermes should return:

- the URL checked
- what was visible
- whether the result matched the intended change
- any follow-up work required
