---
name: hermes-command-code
description: Use when Hermes should reason with CLI-first workflows, indexed lookup, jcodemunch-style token savings, or command-oriented execution.
---

# Command Code

Use command-code when the task can be answered faster with targeted lookup than with broad scanning.

## Preferred order

1. Indexed code intelligence
2. Targeted file reads
3. Focused command execution
4. Full repo scans only when necessary

## Good fits

- Finding the exact file that controls a behavior
- Mapping a change before editing
- Verifying a build or service endpoint
- Comparing the current tree against a known good state

## Token-saving rules

- Prefer one small query over ten broad guesses
- Read the minimum number of files needed to confirm a claim
- Use direct paths and exact symbols when possible
- Capture the result before expanding the search

## Tooling posture

- Use jcodemunch-style indexed lookup when available
- Use mcp2cli or other CLI bridges when they reduce friction
- Keep command output focused enough to turn into a next action
