# New World Kids — Product Requirements Document

> This file drives the Ralphy autonomous coding loop. Tasks are executed in priority order.
> Format: `## [P1/P2/P3] Task Title` followed by acceptance criteria bullets.

---

## [P1] Provision Supabase schema

- Run `infrastructure/hermes/init.sql` against the project Supabase instance
- Tables required: `agent_actions`, `weekly_reports`, `impact_projects`
- RLS policies enabled for each table
- Verify: `SELECT count(*) FROM agent_actions;` returns 0 (empty, not error)
- Acceptance: all three tables exist, one seed row in `impact_projects` for NWKids Seattle

## [P1] Wire .mcp.json and install jcodemunch

- `.mcp.json` exists at repo root with jcodemunch and supabase-mcp entries
- Install: `pip install jcodemunch-mcp` or `uvx jcodemunch-mcp` available
- Verify: `uvx jcodemunch-mcp --help` exits 0
- Acceptance: Claude agents in this repo can call `search_symbols` without error

## [P1] Deploy Hermes agent stack to VPS

- Docker Compose at `infrastructure/hermes/docker-compose.yml` is valid
- Services: paperclip (:3100), hermes-webui (:8787), postiz (:3200), postiz-db, postiz-redis
- On VPS 31.220.58.212: `docker-compose up -d` starts all services
- Acceptance: `curl http://31.220.58.212:3100/health` → 200, hermes-webui login page reachable at :8787

## [P1] Configure Hermes in Paperclip UI

- SOUL.md content loaded as Hermes system prompt in Paperclip
- `.paperclip/company.json` agents linked to Paperclip instance
- Acceptance: POST `/agents/hermes/heartbeat` triggers and logs a row to `agent_actions`

## [P2] Add mcp2cli skill and bake Supabase CLI

- `.claude/skills/mcp2cli/SKILL.md` installed
- Bake Supabase MCP: `mcp2cli bake create supabase --mcp https://mcp.supabase.com/sse`
- Acceptance: `mcp2cli @supabase --list` shows available Supabase tools

## [P2] Homepage E2E test

- Run e2e-test skill against homepage (apps/ui running locally)
- All sections render: NonprofitHero, MissionSection, TimelineSection
- Donate page loads with 6 tiers visible
- Bilingual toggle switches en/es without reload
- Acceptance: e2e-test-report.md generated, 0 critical bugs

## [P2] Add cinematic scroll effect to hero section

- Use cinematic-components skill — text-mask or zoom-parallax module
- Apply to NonprofitHero.tsx entrance animation
- GSAP + ScrollTrigger loaded only on client (dynamic import)
- Uncodixfy: no decorative gradients, no floating panels
- Acceptance: hero animates on scroll, passes Lighthouse performance >85

## [P2] Integrate Postiz social scheduler

- Postiz instance running at :3200 with credentials in .env
- Content Engine skill can POST a draft to Postiz `/api/v1/posts`
- Acceptance: a test draft post appears in Postiz drafts queue

## [P3] Set up Ralphy branch-per-task CI

- GitHub Actions workflow: on PR open, run `pnpm lint && pnpm test`
- PR description template includes task name from PRD.md
- Acceptance: PR created by Ralphy passes CI checks automatically

## [P3] Add paulis-skill-kit to repo

- Clone `executiveusa/paulis-skill-kit` as a git submodule at `packages/pauli-skill-kit/`
- Or copy relevant skills into `.claude/skills/` — to-prd, tdd, grill-me
- Acceptance: skills are discoverable by Claude in this workspace

## [P3] Weekly report automation

- Hermes heartbeat populates `weekly_reports` table on Monday 09:00 UTC
- Report includes: active programs count, grant deadlines, content queue status
- Discord notification sent via webhook with report summary
- Acceptance: `weekly_reports` has at least one generated row with valid JSON payload
