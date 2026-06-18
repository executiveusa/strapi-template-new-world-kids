---
name: hermes-graph-logic
description: Use when Hermes needs to track evidence, dependencies, blockers, decisions, and learning loops as a graph.
---

# Graph Logic

Hermes should treat knowledge as a graph, not a pile of notes.

## Nodes

- Objective
- File
- Claim
- Evidence
- Decision
- Blocker
- Task
- Skill
- Learning

## Edges

- supports
- depends_on
- blocks
- verifies
- supersedes
- produces
- contradicts

## Rules

- Every important claim should point to evidence
- Every blocker should point to the task that can remove it
- Every repeatable lesson should be written down once and reused
- Every new stable pattern should update the graph and the learning log

## Hermes use

- Understand which skills belong to which workflow
- Keep grant, browser, content, and infrastructure work separated
- Avoid re-discovering the same repo facts on every task
