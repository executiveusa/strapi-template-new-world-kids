---
name: a2ui-standard
description: Standard guidance for using A2UI as the house pattern for agent-generated interfaces in New World Kids.
---

# A2UI Standard

Use this skill when an agent needs to propose, describe, or return a structured user interface instead of plain text.

## Source of truth

- Upstream reference: `agent-skills/external/A2UI`
- Primary repo: [google/A2UI](https://github.com/google/A2UI)

## Default rule

For agent-generated UI in this project, prefer an A2UI-style declarative contract over arbitrary frontend code generation whenever:

- the UI is being produced by a backend agent
- the UI needs to update incrementally over time
- the UI may be rendered across trust boundaries
- the same payload may need to work across multiple renderers later

## How to apply it here

1. Keep the frontend responsible for trusted rendering.
2. Keep Hermes responsible for intent, data, and UI payload assembly.
3. Treat A2UI payloads as data contracts, not executable code.
4. Map A2UI payloads to approved site components and renderer wrappers.
5. Use plain JSON-friendly structures that are easy for models to emit and revise.

## When not to force it

Do not force A2UI onto simple static pages or ordinary handwritten frontend components that already live comfortably in the Next app. It is the standard for agent-driven UI, not a replacement for every React component.

## Project-specific use cases

- article-scoped chat responses that need richer follow-up UI
- grant and trust dashboards produced by Hermes
- structured donor or volunteer intake experiences
- guided review panels for food, water, energy, and shelter updates

## Safety

- Never let model output execute as code in the client.
- Only render through approved component mappings.
- Preserve donor trust by keeping payment and legal actions behind explicit confirmation.
