# Hermes Skills Tree

This directory is the local skill tree for Hermes.

Hermes reads this tree first, then falls back to the legacy `agent-skills/source-status.json` manifest if needed.

## Categories

- `core` - Hermes operating stance, safety rules, and public-proof workflow
- `browser-harness` - browser verification and live page inspection
- `command-code` - CLI-first command execution and indexed code intelligence
- `nonprofit-ops` - websites, micro apps, grants, donor flow, and ops for social-purpose teams
- `graph-logic` - graphified reasoning, evidence links, blockers, and decisions
- `self-learning` - structured memory, learning logs, and pattern capture
- `source-catalog` - grouped index of external repos and skills Hermes can reference

## Registry

The service API serves [`registry.json`](./registry.json) as the canonical skills payload.

## Learning Loop

Hermes should write verified learnings to:

- [`logs/learning-log.md`](./logs/learning-log.md)
- [`graph/knowledge-map.json`](./graph/knowledge-map.json)

Those files are intentionally append-friendly so Hermes can keep building on what it learns without rewriting history.
