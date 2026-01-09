# 🔐 COMPLETE SECRETS CONFIGURATION

## For Vercel Deployment

### Environment Variables (Add in Vercel Dashboard → Settings → Environment Variables)

```bash
# ============================================================================
# VERCEL DEPLOYMENT - COMPLETE SECRETS LIST
# ============================================================================

# -----------------------------------------------------------------------------
# Next.js Configuration
# -----------------------------------------------------------------------------
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://newworldkids.org

# -----------------------------------------------------------------------------
# Supabase Database (REQUIRED)
# -----------------------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiYnV4bnl2ZmxjemZ6dnNnbHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MDEwNDMsImV4cCI6MjA0Nzk3NzA0M30.YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_SERVICE_ROLE_KEY
SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.sbbuxnyvflczfzvsglpe.supabase.co:5432/postgres

# -----------------------------------------------------------------------------
# Ghost CMS (REQUIRED for Blog)
# -----------------------------------------------------------------------------
GHOST_CONTENT_API_URL=https://your-site.ghost.io
GHOST_CONTENT_API_KEY=your-32-character-content-api-key
GHOST_ADMIN_API_KEY=your-admin-api-key-optional
GHOST_VERSION=v5.0

# -----------------------------------------------------------------------------
# AI Services (REQUIRED)
# -----------------------------------------------------------------------------
# OpenAI (for DALL-E image generation, GPT-4)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_ORG_ID=org-xxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4-turbo-preview

# Anthropic Claude (for agents & Rube MCP)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Gemini (for interactive hero)
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GEMINI_MODEL=gemini-2.0-flash-exp

# -----------------------------------------------------------------------------
# Stripe Payment Processing (REQUIRED for Donations)
# -----------------------------------------------------------------------------
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# -----------------------------------------------------------------------------
# Email Services (REQUIRED for Newsletter)
# -----------------------------------------------------------------------------
# Resend (Primary)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@newworldkids.org

# SendGrid (Fallback)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@newworldkids.org

# Ghost Members API (if using Ghost for newsletter)
GHOST_MEMBERS_API_KEY=your-members-api-key

# -----------------------------------------------------------------------------
# Image & Media Storage
# -----------------------------------------------------------------------------
# AWS S3 (or compatible service)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=newworldkids-media
NEXT_PUBLIC_CDN_URL=https://cdn.newworldkids.org

# Cloudinary (Alternative)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=xxxxxxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# -----------------------------------------------------------------------------
# Authentication & Security
# -----------------------------------------------------------------------------
# NextAuth.js
NEXTAUTH_URL=https://newworldkids.org
NEXTAUTH_SECRET=your-random-secret-min-32-chars-use-openssl-rand-base64-32
JWT_SECRET=another-random-secret-for-jwt-tokens-min-32-chars

# Session Configuration
SESSION_SECRET=yet-another-random-secret-for-sessions-min-32-chars

# -----------------------------------------------------------------------------
# Rate Limiting & Redis (Optional but Recommended)
# -----------------------------------------------------------------------------
# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Or standard Redis
REDIS_URL=redis://:password@redis.example.com:6379

# -----------------------------------------------------------------------------
# Monitoring & Error Tracking
# -----------------------------------------------------------------------------
# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@oxxxxxxx.ingest.sentry.io/xxxxxxx
SENTRY_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENTRY_ORG=your-org
SENTRY_PROJECT=new-world-kids

# Vercel Analytics (Built-in)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto

# -----------------------------------------------------------------------------
# Social Media & External APIs
# -----------------------------------------------------------------------------
# Twitter/X API
TWITTER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_BEARER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Facebook
FACEBOOK_APP_ID=xxxxxxxxxxxxxxx
FACEBOOK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# -----------------------------------------------------------------------------
# MCP Servers & Services
# -----------------------------------------------------------------------------
# Linear Integration
LINEAR_API_KEY=lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINEAR_TEAM_ID=your-team-id

# GitHub Integration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_REPO=new-world-kids/platform

# Perplexity AI
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# -----------------------------------------------------------------------------
# Coolify Webhook (for CI/CD)
# -----------------------------------------------------------------------------
COOLIFY_WEBHOOK_URL=https://coolify.your-vps.com/webhooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
COOLIFY_TOKEN=your-coolify-api-token

# -----------------------------------------------------------------------------
# Feature Flags & Configuration
# -----------------------------------------------------------------------------
ENABLE_BLOG=true
ENABLE_DONATIONS=true
ENABLE_NEWSLETTER=true
ENABLE_IMPACT_DASHBOARD=true
ENABLE_AGENTS=true
ENABLE_NOTEBOOK_LLM=true
ENABLE_VOICE_COMMANDS=true
ENABLE_GEMINI_HERO=true
ENABLE_GHOST_CMS=true

# -----------------------------------------------------------------------------
# Maintenance Mode
# -----------------------------------------------------------------------------
MAINTENANCE_MODE=false
MAINTENANCE_MESSAGE="We're currently performing scheduled maintenance. Please check back soon!"

# -----------------------------------------------------------------------------
# Performance & Caching
# -----------------------------------------------------------------------------
CACHE_MAX_AGE=3600
ISR_REVALIDATE_TIME=60
IMAGE_MAX_WIDTH=2560
IMAGE_QUALITY=80
ENABLE_WEBP=true

# -----------------------------------------------------------------------------
# Security Headers
# -----------------------------------------------------------------------------
ENABLE_CSP=true
ENABLE_HSTS=true
ENABLE_RATE_LIMITING=true
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000
```

---

## For Coolify Deployment

### Environment Variables (Add in Coolify UI → Service → Environment)

```bash
# ============================================================================
# COOLIFY DEPLOYMENT - COMPLETE SECRETS LIST
# ============================================================================

# -----------------------------------------------------------------------------
# Deployment Configuration
# -----------------------------------------------------------------------------
NODE_ENV=production
DEPLOYMENT_ENV=production
VERSION=1.0.0
DOCKER_REGISTRY=ghcr.io
DOMAIN=newworldkids.org

# -----------------------------------------------------------------------------
# Next.js Configuration
# -----------------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=https://newworldkids.org
NEXT_PUBLIC_API_URL=https://api.newworldkids.org
PORT=3000

# -----------------------------------------------------------------------------
# Supabase Database (REQUIRED)
# -----------------------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_SERVICE_ROLE_KEY
SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.sbbuxnyvflczfzvsglpe.supabase.co:5432/postgres

# -----------------------------------------------------------------------------
# Ghost CMS (REQUIRED for Blog)
# -----------------------------------------------------------------------------
GHOST_CONTENT_API_URL=https://your-site.ghost.io
GHOST_CONTENT_API_KEY=your-32-character-content-api-key
GHOST_ADMIN_API_KEY=your-admin-api-key-optional
GHOST_VERSION=v5.0

# -----------------------------------------------------------------------------
# AI Services (REQUIRED)
# -----------------------------------------------------------------------------
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_ORG_ID=org-xxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4-turbo-preview

ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GEMINI_MODEL=gemini-2.0-flash-exp

# -----------------------------------------------------------------------------
# Stripe Payment Processing
# -----------------------------------------------------------------------------
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# -----------------------------------------------------------------------------
# Email Services
# -----------------------------------------------------------------------------
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@newworldkids.org
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@newworldkids.org
EMAIL_FROM=hello@newworldkids.org
EMAIL_FROM_NAME=New World Kids
SUPPORT_EMAIL=support@newworldkids.org

# -----------------------------------------------------------------------------
# AWS S3 Storage
# -----------------------------------------------------------------------------
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=newworldkids-media
S3_BUCKET=newworldkids-media
S3_REGION=us-east-1
S3_ACCESS_KEY=AKIAXXXXXXXXXXXXXXXX
S3_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CDN_URL=https://cdn.newworldkids.org
CDN_URL=https://cdn.newworldkids.org

# -----------------------------------------------------------------------------
# Authentication & Security
# -----------------------------------------------------------------------------
NEXTAUTH_URL=https://newworldkids.org
NEXTAUTH_SECRET=your-random-secret-min-32-chars-use-openssl-rand-base64-32
JWT_SECRET=another-random-secret-for-jwt-tokens-min-32-chars
JWT_EXPIRATION=7d
SESSION_SECRET=yet-another-random-secret-for-sessions-min-32-chars
BCRYPT_ROUNDS=10

# -----------------------------------------------------------------------------
# Redis (for Rate Limiting & Caching)
# -----------------------------------------------------------------------------
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password-if-needed
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# -----------------------------------------------------------------------------
# Service Ports (for docker-compose)
# -----------------------------------------------------------------------------
WEB_PORT=3000
STELLAR_AGENTS_PORT=3004
BIG_3_ORCHESTRATOR_PORT=3010
BROWSER_SERVICE_PORT=3013
CHROME_DEVTOOLS_PORT=3014
RUBE_MCP_PORT=3015
REDIS_PORT=6379
NGINX_PORT=80
NGINX_SSL_PORT=443

# -----------------------------------------------------------------------------
# Monitoring & Logging
# -----------------------------------------------------------------------------
SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@oxxxxxxx.ingest.sentry.io/xxxxxxx
SENTRY_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENTRY_ORG=your-org
SENTRY_PROJECT=new-world-kids
ENABLE_SENTRY=true
SENTRY_ENVIRONMENT=production

DATADOG_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ENABLE_DATADOG=false

LOG_LEVEL=info
ENABLE_LOGGING=true
ENABLE_METRICS=true
METRICS_PORT=9090

# -----------------------------------------------------------------------------
# External Integrations
# -----------------------------------------------------------------------------
LINEAR_API_KEY=lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINEAR_TEAM_ID=your-team-id

GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_REPO=new-world-kids/platform

PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

TWITTER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_BEARER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

FACEBOOK_APP_ID=xxxxxxxxxxxxxxx
FACEBOOK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# -----------------------------------------------------------------------------
# SSL/TLS Configuration
# -----------------------------------------------------------------------------
ENABLE_SSL=true
CERT_PATH=/etc/letsencrypt/live/newworldkids.org/fullchain.pem
KEY_PATH=/etc/letsencrypt/live/newworldkids.org/privkey.pem

# -----------------------------------------------------------------------------
# Feature Flags
# -----------------------------------------------------------------------------
FEATURE_BLOG_ENABLED=true
FEATURE_DONATIONS_ENABLED=true
FEATURE_NEWSLETTER_ENABLED=true
FEATURE_IMPACT_ENABLED=true
FEATURE_AGENTS_ENABLED=true
FEATURE_NOTEBOOK_ENABLED=true
FEATURE_VOICE_ENABLED=true
FEATURE_GEMINI_HERO_ENABLED=true
GHOST_CMS_ENABLED=true

# -----------------------------------------------------------------------------
# Performance Settings
# -----------------------------------------------------------------------------
ENABLE_CACHING=true
CACHE_MAX_AGE=3600
ISR_REVALIDATE_TIME=60
ENABLE_COMPRESSION=true
ENABLE_IMAGE_OPTIMIZATION=true
IMAGE_MAX_WIDTH=2560
IMAGE_QUALITY=80
ENABLE_WEBP=true
MAX_FILE_SIZE=10485760

# -----------------------------------------------------------------------------
# Security Settings
# -----------------------------------------------------------------------------
ENABLE_HONEYPOT=true
ENABLE_BOT_DETECTION=true
ENABLE_CLOUDFLARE=false
CLOUDFLARE_TOKEN=your-cloudflare-token
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# -----------------------------------------------------------------------------
# Backup Configuration
# -----------------------------------------------------------------------------
BACKUP_SCHEDULE=0 2 * * *
BACKUP_RETENTION_DAYS=30
BACKUP_S3_BUCKET=newworldkids-backups

# -----------------------------------------------------------------------------
# Alerting
# -----------------------------------------------------------------------------
ALERT_EMAIL=alerts@newworldkids.org
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX

# -----------------------------------------------------------------------------
# Custom Configuration (White-Label Support)
# -----------------------------------------------------------------------------
BRAND_NAME=New World Kids
BRAND_DESCRIPTION=Building for 7 generations
PRIMARY_COLOR=#00d9ff
SECONDARY_COLOR=#a855f7
ACCENT_COLOR=#22c55e
BACKGROUND_COLOR=#0f172a
TEXT_COLOR=#ffffff
LOGO_URL=https://cdn.newworldkids.org/logo.png
FAVICON_URL=https://cdn.newworldkids.org/favicon.ico

# -----------------------------------------------------------------------------
# Social Media Links
# -----------------------------------------------------------------------------
SOCIAL_MEDIA_LINKS={"twitter":"https://twitter.com/newworldkids","facebook":"https://facebook.com/newworldkids","instagram":"https://instagram.com/newworldkids"}
```

---

## 🔑 How to Generate Secrets

### Random Secrets (for JWT, Session, etc.)
```bash
# Generate 32-character random secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Or online
https://generate-secret.vercel.app/32
```

### Supabase Keys
1. Go to https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
2. Copy:
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`

### Ghost CMS Keys
1. Self-hosted: Go to Settings → Integrations → Add Custom Integration
2. Ghost(Pro): Use your hosted instance URL
3. Copy:
   - Content API URL → `GHOST_CONTENT_API_URL`
   - Content API Key → `GHOST_CONTENT_API_KEY`

### Stripe Keys
1. Go to https://dashboard.stripe.com/apikeys
2. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
3. For webhooks: https://dashboard.stripe.com/webhooks → `STRIPE_WEBHOOK_SECRET`

### OpenAI Key
1. Go to https://platform.openai.com/api-keys
2. Create new secret key → `OPENAI_API_KEY`

### Anthropic Claude Key
1. Go to https://console.anthropic.com/settings/keys
2. Create new key → `ANTHROPIC_API_KEY`

### Google Gemini Key
1. Go to https://makersuite.google.com/app/apikey
2. Create API key → `GEMINI_API_KEY`

### Resend Email Key
1. Go to https://resend.com/api-keys
2. Create API key → `RESEND_API_KEY`

---

## 📋 Priority Levels

### 🔴 CRITICAL (Required for Basic Functionality)
```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_SECRET
JWT_SECRET
```

### 🟡 HIGH (Required for Blog & AI Features)
```bash
GHOST_CONTENT_API_URL
GHOST_CONTENT_API_KEY
OPENAI_API_KEY
ANTHROPIC_API_KEY
GEMINI_API_KEY
```

### 🟢 MEDIUM (Required for Payments & Email)
```bash
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
RESEND_API_KEY
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

### 🔵 OPTIONAL (Nice to Have)
```bash
REDIS_URL
SENTRY_DSN
TWITTER_API_KEY
CLOUDINARY_API_KEY
LINEAR_API_KEY
```

---

## ⚡ Quick Setup Commands

### Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add secrets one by one
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add GHOST_CONTENT_API_KEY production
vercel env add OPENAI_API_KEY production

# Or import from file
vercel env pull .env.production
```

### Coolify
```bash
# Via UI: Coolify Dashboard → Your Service → Environment Variables → Bulk Edit
# Paste all variables from the Coolify section above

# Or via API
curl -X POST https://coolify.your-vps.com/api/v1/services/YOUR_SERVICE_ID/env \
  -H "Authorization: Bearer YOUR_COOLIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @env-vars.json
```

---

## 🛡️ Security Best Practices

1. **Never commit secrets** to Git
2. **Use different keys** for development vs production
3. **Rotate keys** every 90 days
4. **Use separate Stripe** test vs live keys
5. **Enable IP restrictions** on API keys where possible
6. **Monitor API usage** for anomalies
7. **Use environment-specific** secrets (staging vs production)
8. **Store backups** of secrets in encrypted password manager

---

## ✅ Validation Checklist

Before deploying, verify:

- [ ] All CRITICAL secrets added
- [ ] Ghost CMS accessible with API key
- [ ] Supabase connection working
- [ ] Stripe test payment successful
- [ ] Email sending works (Resend/SendGrid)
- [ ] AI services responding (OpenAI, Claude, Gemini)
- [ ] S3 bucket accessible
- [ ] Redis connection active (if using)
- [ ] No secrets in Git history
- [ ] All keys rotated from defaults

---

**Save this file securely and do NOT commit to Git!**

Use a password manager like 1Password, LastPass, or Bitwarden to store these secrets.
