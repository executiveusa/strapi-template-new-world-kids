# New World Kids Platform — Agent Wiki
> Auto-maintained by AI agents. Humans may read but should not manually edit.
> Last updated: 2026-04-09 by hermes-bootstrap

---

## What This Repo Does

Strapi v5 CMS + Next.js 16 monorepo powering the New World Kids nonprofit platform.
Serves the public website (bilingual EN/ES), handles donation flows, and manages
all program content for the NWKids food forest + youth life skills programs in
Seattle, WA and Puerto Vallarta, MX. EIN 46-4779591.

---

## Agent Roster
| Agent | Role | Heartbeat | Last Active |
|-------|------|-----------|-------------|
| hermes | CEO, portfolio manager | 0 */4 * * * | 2026-04-09 |
| grant-hunter | Grant research & applications | 0 9 * * 1 | pending |
| content-engine | Bilingual social content | 0 8 * * 1,3,5 | pending |

---

## Key Files
| File | Purpose | Last Modified |
|------|---------|---------------|
| agents/hermes/SOUL.md | Hermes CEO system prompt | 2026-04-09 |
| agents/wiki/WIKI.md | This file — accumulated repo knowledge | 2026-04-09 |
| agents/worker/SOUL.md | Platform worker agent identity | 2026-04-09 |
| KPI.md | Live KPI dashboard | 2026-04-09 |
| .paperclip/company.json | Paperclip company definition | 2026-04-09 |
| apps/ui/src/components/homepage/ | Homepage components (hero, mission, timeline) | 2026-04-09 |
| apps/ui/src/app/[locale]/(platform)/donate/ | Donation page with 6 tiers | 2026-04-09 |
| apps/ui/locales/ | i18n translations (en, es) | 2026-04-09 |
| infrastructure/hermes/ | Docker Compose + Supabase SQL for full stack | 2026-04-09 |

---

## Current KPIs
> Synced from KPI.md

| Metric | Value | Target | Trend |
|--------|-------|--------|-------|
| Monthly Recurring Donations ($) | $0 | $2,000 | → |
| Donor Conversion Rate (%) | 0% | 3% | → |
| Site Uptime (%) | 100% | 99.9% | ↑ |
| Grant Applications Filed | 0 | 3/quarter | → |
| Bilingual Posts Published | 0 | 12/month | → |

---

## Decisions Made
> Append-only. Never delete.

| Date | Decision | Why | Made By |
|------|----------|-----|---------|
| 2026-04-09 | Locales: en/es (removed cs) | NWKids operates in US + Mexico | bambu |
| 2026-04-09 | Dark forest design system (#080F0A + #C9A84C gold) | Nonprofit editorial tone, not charity-blue | bambu |
| 2026-04-09 | Homepage outside Strapi catch-all renderer | Custom cinematic UX — NonprofitHero reveal animation needs direct control | hermes-bootstrap |
| 2026-04-09 | Donation tiers: Seed $25 → Foundation $1000 | Named tiers outperform generic $ asks in nonprofit A/B tests | hermes-bootstrap |
| 2026-04-09 | Corporate matching: Microsoft 2:1, Amazon, Google, Boeing | All confirmed giving programs matching NWKids EIN | bambu |
| 2026-04-09 | Paperclip self-hosted on Coolify VPS 31.220.58.212:3100 | VPS already paid, avoids Paperclip cloud cost | bambu |
| 2026-04-09 | Supabase project: sbbuxnyvflczfzvsglpe | Hermes project (not the older kbphngxqozmpfrbdzgca) | bambu |
| 2026-04-09 | hermes-webui on :8787 | NousResearch Hermes CLI + web UI for chat interface | bambu |
| 2026-04-09 | Postiz on :3200 for social scheduling | Self-hosted, avoids SaaS costs, MCP-compatible | bambu |

---

## Patterns That Work

- **framer-motion word-by-word reveal on hero**: Stagger 0.08s per word creates cinematic African proverb reveal without feeling slow
- **named donation tiers with impact outcomes**: "Seed ($25) → covers 1 student for a day" converts better than "$25 donation"
- **Strapi catch-all + custom homepage**: Use `[[...rest]]/page.tsx` with early-return for `/` path — renders `<Homepage />` directly, all other paths go to Strapi
- **TypeScript strict mode**: Always run `pnpm typecheck` from `apps/ui` after component changes
- **Supabase service key stored in .env.local.backup**: Real key at line ~65 of backup file. service key expires 2076.
- **jcodemunch before mass file reads**: Install `jcodemunch-mcp` and use `search_symbols` + `get_symbol_source` — saves 90%+ tokens vs reading full files

---

## Patterns That Failed

- **Czech locale (cs)**: Was in the template — NWKids has no Czech audience. Caused import errors in Strapi admin. Removed entirely.
- **`(homepage)` route group**: Created a ghost route group that conflicted with the catch-all. Removed via `git rm --cached`.
- **Attempting Optio for git operations**: Requires Kubernetes v1.33+. VPS has no K8s. Use `gh` CLI + standard `git push` instead.

---

## Architecture Notes

### Monorepo Structure
```
apps/
  ui/        Next.js 16 (App Router, React 19, TailwindCSS v4)
  strapi/    Strapi v5 CMS
packages/
  strapi-types/   Auto-generated types from Strapi schemas
  design-system/  TailwindCSS tokens
  shared-data/    Constants and shared types
agents/
  hermes/    CEO agent system prompt
  wiki/      This file
  worker/    Platform worker agent
.paperclip/  Paperclip company definition
ops/reports/ Machine-readable agent outputs
```

### Key URLs
| Service | URL | Status |
|---------|-----|--------|
| Coolify VPS | http://31.220.58.212:8000 | ✅ Live |
| Supabase Studio (local) | http://31.220.58.212:3001 | ✅ Live |
| Paperclip | http://31.220.58.212:3100 | Pending deploy |
| hermes-webui | http://31.220.58.212:8787 | Pending deploy |
| Postiz | http://31.220.58.212:3200 | Pending deploy |
| Supabase Cloud | https://sbbuxnyvflczfzvsglpe.supabase.co | ✅ Live |

### Design System
- Background: `#080F0A` (dark forest)
- Accent: `#C9A84C` (gold)
- Text: `#F5F0E8` (cream)
- Fonts: Playfair Display (headings), Inter (body), JetBrains Mono (code)

---

## External Dependencies
| Service | Purpose | Credentials |
|---------|---------|-------------|
| Supabase (sbbuxnyvflczfzvsglpe) | Agent ledger, KPIs, impact data | In .env.local.backup |
| Strapi CMS | Content management | Local dev / VPS |
| Anthropic Claude | Hermes CEO agent brain | ANTHROPIC_API_KEY in Infisical |
| Postiz | Social content scheduler | Self-hosted :3200 |
| Paperclip | Agent orchestration | Self-hosted :3100 |

---

## Open Questions
- [ ] What is the production domain for the NWKids website? (nwkids.org or newworldkids.org?)
- [ ] Does Bambu have an Anthropic API key ready to inject into Infisical?
- [ ] Which social platforms are active? (Instagram, Facebook, Twitter/X, LinkedIn?)
- [ ] Is there a current Postiz instance on the VPS, or does it need fresh deploy?
- [ ] What is the $AGENT_HOME path on the VPS for Hermes memory files?

---

## Agent Update Log
2026-04-09 hermes-bootstrap: Created WIKI.md — repo bootstrapped with Octopus Architecture (hermes/SOUL.md, wiki/WIKI.md, worker/SOUL.md, .paperclip/company.json, KPI.md, infrastructure/hermes/)
