# Skill Catalog And Intake Map

Date: 2026-05-31

## Purpose

This file deduplicates the external tools, MCP servers, and skill sources collected during the NWK cleanup so the next agent can decide what to load without re-parsing a long raw link dump.

## Already Present Locally In `NEW WORLD KIDS`

- `jgravelle/jcodemunch-mcp` -> `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\jcodemunch-mcp`
- `browser-use/browser-harness` -> `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\browser-harness`
- `knowsuchagency/mcp2cli` -> `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\mcp2cli`
- `executiveusa/synthia-gateway` -> `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\synthia-gateway`
- `executiveusa/cinematic-site-components` -> `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS\cinematic-site-components`

## Code Intelligence

- `jgravelle/jcodemunch-mcp`
- `Lum1104/Understand-Anything`
- `mattpocock/dictionary-of-ai-coding`
- `ast-grep/ast-grep-mcp`
- `upstash/context7`

## Agent Frameworks And Orchestration

- `michaelshimeles/ralphy`
- `gsd-build/get-shit-done`
- `kanwas-ai/kanwas`
- `agent0ai/space-agent`
- `rtk-ai/rtk`
- `karpathy/autoresearch`
- `steel-experiments/durable-researcher`
- `earendil-works/absurd`
- `Mnexa-AI/e2a`

## MCP And Connector Ecosystem

- `modelcontextprotocol/ext-apps`
- `perplexityai/modelcontextprotocol`
- `supabase-community/supabase-mcp`
- `knowsuchagency/mcp2cli`
- `executiveusa/synthia-gateway`

## Browser, Harness, And E2E

- `browser-use/browser-harness`
- `revfactory/claude-code-harness`
- `HKUDS/OpenHarness`
- `coleam00/link-in-bio-page-builder` skill reference for e2e test workflow

## Review, Handoff, And Observability

- `willseltzer/claude-handoff`
- `The-PR-Agent/pr-agent`
- `adamjgmiller/adamsreview`
- `disler/claude-code-hooks-multi-agent-observability`
- `ReviewStage/stage-cli`

## Frontend, Design, And UI Generation

- `executiveusa/pauli-Uncodixfy`
- `executiveusa/pauli-taste-skill`
- `executiveusa/pauli-blog`
- `darula-hpp/uigen`
- `pbakaus/impeccable`
- `html-in-canvas.dev`
- `robonuggets/hyperframes-helper`
- `KurtGokhan/tegaki`
- `chenglou/pretext`

## Content, Docs, And Presentation Utilities

- `zarazhangrui/codebase-to-course`
- `dolanmiu/docx`
- `zakirullin/files.md`
- `paperclipai/paperclip`

## App Platforms And Products

- `gitroomhq/postiz-app`
- `skrun-dev/skrun`
- `InsForge/InsForge`
- `human-avatar/skills-for-humanity`
- `vercel-labs/opensrc`
- `orgs/Keeper-Security/repositories`

## Research And Reference Lists

- `caramaschiHG/awesome-ai-agents-2026`
- `mergisi/awesome-openclaw-agents`
- `mnfst/awesome-free-llm-apis`
- `mattpocock/skills`
- `mattpocock/agent-rules-books`
- `stateright/stateright`
- `jonwiggins/optio`
- `garrytan/gbrain`
- `aaif-goose/goose`
- `tomfunk/fungible`
- `disler/poc-realtime-ai-assistant`
- `executiveusa/VisionClaw`

## Duplicate Entries Removed From Raw Intake

- `executiveusa/pauli-taste-skill`
- `mattpocock/skills`
- `skrun-dev/skrun`
- `knowsuchagency/mcp2cli`
- `executiveusa/synthia-gateway`
- `browser-use/browser-harness`
- `paperclipai/paperclip`
- `jonwiggins/optio`
- `gsd-build/get-shit-done`
- `vercel-labs/opensrc`

## Recommended Load Order

For future coding sessions, prefer this stack:

1. `jcodemunch-mcp` for indexed code intelligence
2. local skill files already available in Codex
3. `browser-harness` when browser verification matters
4. `mcp2cli` and `synthia-gateway` only when connector routing is actually needed
5. add one new external skill source at a time, not a bulk import

## Notes

- This is a catalog, not an installation record.
- No blanket external cloning or skill import was performed from this list during the NWK separation pass.
- Before installing any new external skill or MCP source, verify maintenance state, license fit, and overlap with tools already present.
