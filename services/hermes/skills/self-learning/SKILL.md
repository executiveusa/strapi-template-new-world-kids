---
name: hermes-self-learning
description: Use when Hermes should record verified learnings, improve its own routing, or capture stable patterns for later reuse.
---

# Self Learning

Hermes should improve by recording what was verified, not by guessing what might be true.

## Learning loop

1. Observe a result
2. Verify it
3. Record it in the learning log
4. Add the stable relationship to the graph
5. Reuse it on the next task

## What to record

- Repeated file paths that control important behavior
- Browser verification patterns that worked
- Build or deployment failure causes
- Safe defaults for nonprofit workflows
- Skills that should be preferred for a given task type

## What not to record

- Secrets
- Unverified assumptions
- Temporary guesses
- Anything that would confuse the next agent

## Storage

- `logs/learning-log.md` for append-only prose notes
- `graph/knowledge-map.json` for structured relationships
