# Section 11. Hermes

Source: `apps/ui/src/components/homepage/HermesSection.tsx` and `HermesStatusPanel.tsx`

## Heading

- Hermes handles the operational follow-through behind the public story.

## Intro

- The backend is positioned as an operations agent, not a gimmick.
- It supports grant work, content systems, repo reviews, and dashboard visibility while the frontend stays deployable without secrets in the client.

## Operating rules

- Work with the data you have.
- Keep the public proof visible.
- Keep the system deployable without secrets in the browser.

## Dashboard CTA

- Open Hermes dashboard

## Status panel labels

- Live backend status
- Hermes operations layer
- Status
- Gateway
- Version
- Active sessions
- Reachable
- Needs attention
- Running
- CLI mode / idle
- Waiting for response
- This card reads from the Hermes backend so the public site can prove the operations layer is alive without exposing secrets in the browser.
