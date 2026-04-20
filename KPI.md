# New World Kids Platform — KPI Dashboard
> Auto-maintained by AI agents. Updated every agent heartbeat.
> Last updated: 2026-04-09 by hermes-bootstrap
> Hermes reads this file every portfolio scan.

---

## Primary KPIs

| Metric | Current | Target | Period | Trend | Last Updated |
|--------|---------|--------|--------|-------|--------------|
| Monthly Recurring Donations ($) | $0 | $2,000 | monthly | → | 2026-04-09 |
| Donor Conversion Rate (%) | 0% | 3% | monthly | → | 2026-04-09 |
| Site Uptime (%) | 100% | 99.9% | monthly | → | 2026-04-09 |
| Grant Applications Filed | 0 | 3 | quarterly | → | 2026-04-09 |
| Bilingual Posts Published | 0 | 12 | monthly | → | 2026-04-09 |

---

## KPI Definitions

**Monthly Recurring Donations ($):** Total USD received via recurring donation subscriptions (monthly givers only). Excludes one-time donations. Source: payment processor or Supabase `donations` table. Calculated: SUM(amount) WHERE recurring = true AND month = current.

**Donor Conversion Rate (%):** Percentage of unique visitors who land on /donate and complete a donation within the same session. Source: Supabase analytics or GA4. Calculated: (completed_donations / donate_page_visitors) × 100.

**Site Uptime (%):** Combined uptime for Next.js frontend and Strapi CMS backend. Measured by health endpoint polling every 15 minutes. Source: Coolify health checks or external monitor.

**Grant Applications Filed:** Count of grant applications submitted in the current quarter. Source: Supabase `agent_actions` table WHERE action_type = 'grant_application' AND outcome = 'submitted'. Includes both Hermes-automated and human-submitted.

**Bilingual Posts Published:** Social posts published to at least one platform via Postiz in the current month. Each EN+ES pair counts as 1. Source: Postiz API or Supabase `agent_actions` table WHERE action_type = 'content_post'.

---

## Alert Thresholds

| KPI | Warning Level | Critical Level | Action |
|-----|--------------|----------------|--------|
| Monthly Recurring Donations | < $500 | < $100 | Hermes: audit donation funnel, check Stripe integration |
| Donor Conversion Rate | < 1% | < 0.3% | Hermes: A/B test donate page, review CTA copy |
| Site Uptime | < 99% | < 95% | Hermes: immediate — restart containers, alert Bambu |
| Grant Applications Filed | 0 at 30 days | 0 at 60 days | Hermes: trigger grant-hunter emergency run |
| Bilingual Posts | < 4/month | 0 after 2 weeks | Hermes: check Postiz, trigger content-engine manually |

---

## Secondary KPIs (Track But Not Primary)

| Metric | Current | Target | Period |
|--------|---------|--------|--------|
| Unique Website Visitors | 0 | 500 | monthly |
| Email Subscribers | 0 | 200 | monthly |
| Corporate Matching Initiated | 0 | 2 | quarterly |
| Food Forest Plants Documented | 0 | 200 | season |
| Students Active in Programs | 0 | 30 | season |
| Grant Pipeline ($) | $0 | $50,000 | 12 months |

---

## History (Last 7 Days)

| Date | Donations | Conv Rate | Uptime | Grants Filed | Posts | Notes |
|------|-----------|-----------|--------|--------------|-------|-------|
| 2026-04-09 | $0 | 0% | - | 0 | 0 | Bootstrap day. Site not yet live. |

---

## Data Sources

| KPI | Source | Query / Method |
|-----|--------|----------------|
| Monthly Recurring Donations | Supabase `impact_projects.kpis` | SELECT kpis->>'fundraise_current_usd' FROM impact_projects WHERE slug = 'nwkids-s3' |
| Donor Conversion Rate | Supabase analytics or GA4 | Manual pull until analytics instrumented |
| Site Uptime | Coolify health check | https://strapi.nwkids.org/api/health + frontend ping |
| Grant Applications | agent_actions | SELECT COUNT(*) FROM agent_actions WHERE action_type = 'grant_application' |
| Social Posts | agent_actions | SELECT COUNT(*) FROM agent_actions WHERE action_type = 'content_post' |

---

## Agent Update Log
2026-04-09 hermes-bootstrap: Created KPI.md — initial metrics set. All at zero (pre-launch baseline). Targets based on comparable nonprofit platform launches.
