---
name: copilotkit-ag-ui-standard
description: Standard guidance for using CopilotKit and AG-UI as the frontend runtime layer for Hermes-backed agent experiences.
---

# CopilotKit + AG-UI Standard

Use this skill when an agent-backed interface needs a structured runtime connection between the frontend and Hermes.

## Source of truth

- Upstream reference: `agent-skills/external/CopilotKit`
- Primary repo: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit)
- Product/docs: [copilotkit.ai](https://www.copilotkit.ai/)

## Default rule

In this project:

- Hermes is the backend agent system
- A2UI is the preferred declarative UI format for agent-generated surfaces
- CopilotKit and AG-UI are the preferred runtime layer when we need richer live interaction between frontend and agent

## How to apply it here

1. Keep Hermes as the source of truth for reasoning, tools, and approvals.
2. Keep AG-UI or CopilotKit at the frontend boundary, not inside core mission logic.
3. Let Hermes emit structured data or A2UI payloads.
4. Let the frontend render trusted components and forward user actions safely.
5. Prefer scoped experiences first: article chat, trust guidance, donor support, grant review panels.

## Good use cases

- live article assistants in the journal
- trust center help panels
- donor decision support flows
- grant review or intake dashboards
- human-in-the-loop nonprofit operations

## Safety

- Keep payment, legal, filing, and outbound communication steps behind explicit confirmation.
- Never let protocol/runtime tooling bypass trust rules already enforced in Hermes.
- Treat CopilotKit as transport and UX infrastructure, not as the backend brain.
