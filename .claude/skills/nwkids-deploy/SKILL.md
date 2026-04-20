---
name: nwkids-deploy
description: Full deployment runbook for New World Kids platform to Coolify VPS (31.220.58.212). Covers SSH access, Coolify API token refresh, service creation, environment variables, and Supabase schema migrations.
---

# NWKids Deploy Runbook

## Infrastructure

| Service | Host | Port |
|---------|------|------|
| VPS | `31.220.58.212` | — |
| Coolify panel | `31.220.58.212` | 8000 |
| Supabase Studio | `31.220.58.212` | 3001 |
| PostgreSQL | `31.220.58.212` | 5434 |
| Paperclip | `31.220.58.212` | 3100 |
| hermes-webui | `31.220.58.212` | 8787 |
| Postiz | `31.220.58.212` | 3200 |

---

## Coolify Token Refresh

Stored tokens expire. To get a fresh token:

**Option A — SSH:**
```bash
ssh root@31.220.58.212
docker exec coolify php artisan coolify:create-token
```

**Option B — UI:**
Navigate to `http://31.220.58.212:8000` → Settings → API Tokens → Create.

Token format: `<id>|<40-char-hash>` (Laravel Sanctum).

---

## Deploy Web App (Next.js)

```bash
# Trigger via Coolify webhook
curl -X POST "http://31.220.58.212:8000/api/v1/deploy" \
  -H "Authorization: Bearer ${COOLIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"uuid": "${COOLIFY_WEB_SERVICE_UUID}", "force": true}'
```

**Environment variables to set in Coolify:**
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_KEY=<service key>
ANTHROPIC_API_KEY=<key>
DISCORD_WEBHOOK_URL=<webhook>
```

---

## Deploy Hermes Agent Stack

```bash
# On VPS
ssh root@31.220.58.212
cd /opt/nwkids
git pull origin main
docker-compose -f infrastructure/hermes/docker-compose.yml up -d --build
```

---

## Run Supabase Migrations

```bash
# From local machine
psql "postgresql://postgres:072090156d28a9df6502d94083e47990@31.220.58.212:5434/postgres" \
  -f infrastructure/hermes/init.sql
```

Or via Supabase Studio at `http://31.220.58.212:3001` → SQL Editor.

---

## Verify Deployment

```bash
# Check all services are up
curl -I http://31.220.58.212:3100/health     # Paperclip
curl -I http://31.220.58.212:8787            # hermes-webui
curl -I http://31.220.58.212:3200/health     # Postiz

# Trigger Hermes heartbeat
curl -X POST http://31.220.58.212:3100/agents/hermes/heartbeat \
  -H "Authorization: Bearer ${PAPERCLIP_API_KEY}"

# Check agent_actions for heartbeat log
psql "postgresql://postgres:072090156d28a9df6502d94083e47990@31.220.58.212:5434/postgres" \
  -c "SELECT * FROM agent_actions ORDER BY created_at DESC LIMIT 5;"
```

---

## Rollback

```bash
# Roll back to previous commit
ssh root@31.220.58.212
cd /opt/nwkids
git log --oneline -5   # find previous sha
git checkout <sha>
docker-compose -f infrastructure/hermes/docker-compose.yml up -d --build
```

---

## Vercel (Web App Alternative)

Vercel auto-deploys from GitHub `main` branch.
- Org: `the-pauli-effect`
- Project: `prj_qkw5bNiVwQ0lEPqWOahumjy1HJm2`
- Token: stored in `.env.local` as `VERCEL_TOKEN`

Force redeploy:
```bash
npx vercel --prod --token=${VERCEL_TOKEN}
```
