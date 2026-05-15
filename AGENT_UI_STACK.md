# Agent UI Stack

This repo uses a layered agent UI model:

1. `Hermes` is the backend agent service and the only place where tools, approvals, and mission logic live.
2. `A2UI` is the preferred declarative UI contract for agent-generated interface payloads.
3. `CopilotKit` and `AG-UI` are the preferred runtime layer when the frontend needs richer live interaction with Hermes.
4. The frontend renders only trusted components mapped by the application.

## Current state

- A2UI-style article assistant payloads are active in Hermes.
- The blog can render a trusted subset of those payloads.
- CopilotKit is added as a project standard and reference source, but not yet mounted as a live SDK inside the frontend.

## Next runtime targets

- Journal article assistant
- Trust center guide
- Donor support assistant
- Human-in-the-loop grant review surfaces

## Guardrails

- No generated code execution in the browser
- No payment or legal submission without confirmation
- Hermes remains the authority for tools, approvals, and policy
