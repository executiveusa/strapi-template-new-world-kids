---
name: ralphy-loop
description: Configure and run Ralphy — an autonomous AI coding loop that reads PRD.md tasks, runs them through a model of your choice, tests the result, and commits. Use this skill to set up the .ralphy/config.yaml and write well-formed PRD.md task lists that Ralphy can execute unattended.
---

# Ralphy Autonomous Coding Loop

## Overview

Ralphy (`npm install -g ralphy-cli`) is an autonomous coding agent that:
1. Reads tasks from `PRD.md` (by default) in priority order
2. Spawns an AI coding session per task (Claude, Codex, GPT-4, etc.)
3. Runs lint/test/build after each task
4. Commits on success, reverts on failure
5. Continues to the next task until the list is done

Start a run with:
```bash
ralphy run
```

## Config Reference (`.ralphy/config.yaml`)

```yaml
project:
  name: "my-project"
  language: "TypeScript"          # Primary language
  framework: "Next.js + Strapi"   # Stack description

commands:
  test: "pnpm test"               # Run after every task
  lint: "pnpm lint"               # Run before commit
  build: "pnpm build"             # Optional full build check

rules:
  - "use TypeScript strict mode"
  - "never push directly to main — always branch"
  - "use jcodemunch-mcp search_symbols before reading full files"
  - "all user-facing strings must have i18n keys"

boundaries:
  never_touch:
    - "apps/strapi/src/migrations/**"
    - "*.lock"
    - ".ralphy/**"

capabilities:
  browser: "auto"     # "auto" | "off" — enables agent-browser for UI tasks

notifications:
  discord_webhook: "${DISCORD_WEBHOOK_URL}"   # Posts on task complete/fail

engines:
  default: "claude"   # "claude" | "codex" | "gpt4" | "gemini"
  parallel: false     # Run tasks in parallel (experimental)
  branch_per_task: true  # Create a git branch per task
```

## PRD.md Task Format

Ralphy reads tasks as markdown headers + bullets. Each task must have a **priority** (P1/P2/P3) and clear acceptance criteria:

```markdown
# PRD

## [P1] Set up authentication
- Use NextAuth v5 with credentials provider
- Store sessions in Supabase
- Acceptance: login/logout works, session persists across refresh

## [P1] Create donation page
- Support 6 tier amounts ($5, $15, $35, $75, $150, $500)
- Stripe integration via server action
- Bilingual: en + es strings in locales/
- Acceptance: test checkout with Stripe test card 4242 4242 4242 4242

## [P2] Add grant tracker dashboard
- CRUD for grant applications
- Status: Researching / Applied / Awarded / Declined
- Acceptance: can create, update, delete grant entries
```

## Parallel Mode

```bash
ralphy run --parallel 3   # Run up to 3 tasks concurrently (separate branches)
ralphy run --dry-run       # Preview task list without executing
ralphy run --task "Set up authentication"  # Run a single named task
```

## Branch-Per-Task Mode

When `branch_per_task: true`, Ralphy:
1. Creates `feat/ralphy-<task-slug>` for each task
2. Runs the agent, tests, commits
3. Opens a GitHub PR (if `gh` CLI is available)

## NWKids-Specific Rules

When writing Ralphy tasks for this repo:

- Always include "Bilingual: en + es" acceptance criteria for UI tasks
- Strapi migrations live in `apps/strapi/src/migrations/` — mark as `never_touch`
- All agent actions should log to Supabase `agent_actions` table
- Run `pnpm test --filter=...` not full `pnpm test` to avoid timeouts
- Use jcodemunch `search_symbols` before reading full files to save context

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Task loops without committing | Check lint/test passes manually |
| "Cannot read PRD.md" | Ensure PRD.md is in repo root |
| Branch conflicts | Run `ralphy clean` to reset stale branches |
| Discord webhook silent | Check `DISCORD_WEBHOOK_URL` is set in env |
