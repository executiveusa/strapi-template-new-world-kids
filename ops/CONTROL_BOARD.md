# NWKids Backend Control Board

**Last updated:** June 7, 2026
**Maintained by:** Hermes (Mission Operator)

---

## Service Registry

| Service             | Port | Docker Container      | Health Check      | Purpose                                                         |
| ------------------- | ---- | --------------------- | ----------------- | --------------------------------------------------------------- |
| **Hermes API**      | 4010 | _(standalone)_        | `GET /health`     | Mission API bridge — trust docs, pillars, agents, blog pipeline |
| **Hermes WebUI**    | 8787 | `nwkids-hermes-webui` | _(web)_           | Agent conversation UI for Hermes                                |
| **Paperclip**       | 3100 | `nwkids-paperclip`    | `GET /health`     | AI agent orchestration (4 agents)                               |
| **Synthia Gateway** | 3000 | _(standalone)_        | _(OpenAI-compat)_ | LLM proxy — routes to OpenAI, Anthropic, Groq, Mistral          |
| **AI Orchestrator** | 3002 | _(standalone)_        | —                 | Gemini-powered grant analysis + content generation              |
| **Postiz**          | 3200 | `nwkids-postiz`       | _(web)_           | Social media scheduler (all platforms)                          |
| **Postiz DB**       | 5432 | `nwkids-postiz-db`    | `pg_isready`      | PostgreSQL backend for Postiz                                   |
| **Postiz Redis**    | 6379 | `nwkids-postiz-redis` | `redis-cli ping`  | Queue backend for Postiz                                        |
| **Strapi CMS**      | 1337 | _(standalone)_        | `GET /api`        | Headless CMS — articles, grants, donations, timeline            |
| **Next.js UI**      | 3000 | _(standalone)_        | `GET /`           | Frontend (no backend changes touch this)                        |

---

## Hermes API Endpoints

```
GET  /health                    → Service liveness
GET  /api/trust/documents       → Trust docs + fiscal sponsor
GET  /api/pillars               → Four impact pillars (food/water/energy/shelter)
GET  /api/social-links          → Social media links
GET  /api/agents                → Paperclip agent profiles + integrations config
GET  /api/skills                → Agent skills manifest
GET  /api/support-rails         → Donor support URLs (Donorbox, Buy Me a Coffee, Creem)
POST /api/chat/article          → Article-scoped Q&A (returns A2UI blocks)
GET  /api/blog/approved         → List Notion blog posts in Approved status
POST /api/blog/publish          → Publish one post { notionId } → Strapi + mark Scheduled
POST /api/blog/sync-all         → Sync all Approved posts to Strapi in one call
```

Environment variables required for blog pipeline:

- `NOTION_API_KEY` — Notion integration token
- `NOTION_BLOG_DB_ID` — `764494f6-b984-4a57-859b-a88ff5011c04` (set in .env.example)
- `STRAPI_URL` + `STRAPI_TOKEN`

---

## Paperclip Agents

| Agent              | Heartbeat        | Role             | Key Integrations                  |
| ------------------ | ---------------- | ---------------- | --------------------------------- |
| **Hermes**         | Every 4 hours    | Mission Operator | Supabase, GitHub, gBrain          |
| **Grant Hunter**   | Mon 9 AM         | Funding Strategy | Supabase                          |
| **Content Engine** | Mon/Wed/Fri 8 AM | Field Publishing | Supabase, Hermes blog API, Postiz |
| **Trust Steward**  | Weekdays 8 AM    | Verification     | Supabase                          |

All agents log actions to Supabase `agent_actions` table.

Agent config: `.paperclip/company.json`
Agent souls: `services/hermes/agents/<name>/SOUL.md`
Docker compose: `infrastructure/hermes/docker-compose.yml`

---

## Blog Pipeline (Notion → Strapi)

```
Weekly flow:
  Claude batches drafts → Notion "NWKids Blog Pipeline" DB (Status: Draft)
       ↓
  You edit in Notion weekly
       ↓
  Change Status to "Approved"
       ↓
  Content Engine heartbeat (Mon/Wed/Fri 8 AM) calls:
    GET /api/blog/approved  →  finds your approved posts
    POST /api/blog/sync-all →  creates Strapi draft articles
                               marks Notion as "Scheduled"
       ↓
  You review in Strapi → set publishedAt to go live
       ↓
  Status auto-updates to "Published"
```

Notion database: https://app.notion.com/p/4343455fe4654a70abaa32cd87e82748
Database ID: `4343455fe4654a70abaa32cd87e82748`
Data source ID: `764494f6-b984-4a57-859b-a88ff5011c04`

**Status workflow:** Draft → In Review → Approved → Scheduled → Published

To trigger immediately without waiting for heartbeat:

```bash
curl -X POST http://localhost:4010/api/blog/sync-all
```

---

## Social Media Pipeline (Strapi → Postiz)

```
Content Engine (Mon/Wed/Fri 8 AM):
  Reads Strapi timeline-events (unpublished)
       ↓
  Drafts EN + ES social posts (≤280 chars)
       ↓
  Submits to Postiz as drafts via POST /api/v1/posts
       ↓
  You approve in Postiz UI → posts go live
```

Postiz URL: `$POSTIZ_FRONTEND_URL` (default: http://localhost:3200)
Postiz API: `POST /api/v1/posts` (requires `POSTIZ_API_KEY` header)
Status health check: `GET /api/post-maxx/status` (Next.js proxy)

---

## AI Orchestrator (Grant + Content Tasks)

REST API on port 3002. Gemini-powered.

```
POST /api/tasks    → Submit a task (grant-analysis, grant-application, timeline-enhancement, content-generation)
GET  /api/tasks    → List all tasks
GET  /api/tasks/:id → Get task status
GET  /api/insights → AI-generated insights
GET  /api/memory   → Agent learning memory
POST /api/feedback → Record human feedback on a task
```

Grant scheduler runs daily at 9 AM — checks Strapi for grants nearing deadline (within 7 days), auto-schedules submissions 2 days before deadline, sends Slack/email notifications.

---

## Supabase (Agent Ledger)

All Paperclip agents log to Supabase.

Key tables:

- `agent_actions` — every automated action with pillar, content, platform
- `impact_projects` — source of truth for Content Engine posts

Access: `$SUPABASE_URL` / `$SUPABASE_SERVICE_KEY`
MCP: `$SUPABASE_MCP_URL`

---

## Strapi CMS Collections

| Collection          | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `article`           | Blog posts (synced from Notion via Hermes)      |
| `grant-application` | Grants tracked, deadlines, auto-submit metadata |
| `donation`          | Donor records                                   |
| `timeline-event`    | Program impact logs (source for social posts)   |
| `video`             | Media assets                                    |

Access: `$STRAPI_URL` (default: http://localhost:1337)
Token: `$STRAPI_TOKEN`

---

## Shared Data Package

`packages/shared-data` — TypeScript package imported by Hermes and the frontend.

Exports:

- `fiscalSponsor` — fiscal sponsor info
- `trustDocuments` — verification docs
- `impactPillars` — four pillars (food/water/energy/shelter)
- `socialLinks` — social media links
- `getSupportRails(env)` — donor support URLs
- `copyForLocale(locale, obj)` — EN/ES string resolver

---

## Required Secrets Checklist

Set in `.env` (local) or server environment vars:

### Core

- [ ] `ANTHROPIC_API_KEY`
- [ ] `OPENAI_API_KEY`
- [ ] `GEMINI_API_KEY`

### Strapi

- [ ] `STRAPI_URL`
- [ ] `STRAPI_TOKEN`

### Supabase

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_KEY`
- [ ] `SUPABASE_MCP_URL`

### Paperclip / Hermes

- [ ] `PAPERCLIP_API_KEY`
- [ ] `HERMES_WEBUI_PASSWORD`

### LLM Gateway

- [ ] `SYNTHIA_GATEWAY_URL`
- [ ] `SYNTHIA_GATEWAY_API_KEY`

### Blog Pipeline

- [ ] `NOTION_API_KEY`
- [ ] `NOTION_BLOG_DB_ID` (pre-set: `764494f6-b984-4a57-859b-a88ff5011c04`)

### Social Media

- [ ] `POSTIZ_DB_PASS`
- [ ] `POSTIZ_JWT_SECRET`
- [ ] `POSTIZ_API_KEY`

### Fundraising Rails

- [ ] `DONORBOX_URL`
- [ ] `BUY_ME_A_COFFEE_URL`

### Deployment

- [ ] `COOLIFY_TOKEN`
- [ ] `COOLIFY_WEB_SERVICE_UUID`

---

## Docker Compose (Backend Services)

```bash
# Start Paperclip + Hermes WebUI + Postiz stack:
cd infrastructure/hermes
docker-compose up -d

# Check status:
docker-compose ps

# Tail logs:
docker-compose logs -f paperclip
docker-compose logs -f postiz
```

File: `infrastructure/hermes/docker-compose.yml`

---

## One-Time Setup: Notion Integration

To enable the blog pipeline:

1. Go to https://www.notion.so/my-integrations
2. Create integration named "NWKids Blog Pipeline"
3. Copy the Internal Integration Token → set as `NOTION_API_KEY`
4. In Notion, open the "NWKids Blog Pipeline" database → "..." → "Connections" → add "NWKids Blog Pipeline" integration
5. Verify: `curl http://localhost:4010/api/blog/approved` → returns `{ posts: [], count: 0 }`

---

## Control Tower Health Check

Run this to verify all backends are responsive:

```bash
# Hermes API
curl http://localhost:4010/health

# Paperclip
curl http://localhost:3100/health

# Strapi
curl http://localhost:1337/api

# Postiz (via Next.js proxy)
curl http://localhost:3000/api/post-maxx/status

# Blog pipeline (Notion sync check)
curl http://localhost:4010/api/blog/approved
```

Expected: all return 200 with valid JSON.
