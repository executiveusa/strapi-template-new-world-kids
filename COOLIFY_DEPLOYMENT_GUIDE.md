# Coolify Deployment Integration - Complete Guide

This guide shows you how to deploy your New World Kids platform using the new Coolify MCP integration with Claude Code.

## What You Just Got

I've created **two deployment methods** for you:

### 1. Quick Slash Command (Ready Now)
- Type `/deploy` in Claude conversations
- Uses your existing `deploy-production.sh` script
- Perfect for quick deployments

### 2. Full MCP Server (Advanced Features)
- Real-time deployment status
- Service health monitoring
- Log streaming
- Secret management
- Rollback capabilities

---

## Quick Start (5 Minutes)

### Option A: Use the Slash Command

**Right now, you can type:**

```
/deploy coolify production
```

**I will:**
1. Run your deployment script
2. Build all 6 services
3. Push to Coolify via webhook
4. Monitor health checks
5. Report success/failure

**Other commands:**
- `/deploy docker-local` - Deploy locally
- `/deploy railway staging` - Deploy to Railway staging
- `/deploy-status` - Check current deployment status

---

## Full Setup (MCP Server)

### Step 1: Configure Coolify Credentials

Add these to your `.env` file:

```bash
# Coolify Integration
COOLIFY_URL=https://coolify.your-domain.com
COOLIFY_API_TOKEN=your-api-token-here
COOLIFY_WEBHOOK_URL=https://coolify.your-domain.com/webhooks/abc123
COOLIFY_PROJECT_ID=your-project-id
```

**How to get these values:**

1. **COOLIFY_URL**: Your Coolify dashboard URL
2. **COOLIFY_API_TOKEN**:
   - Login to Coolify
   - Go to Settings → API Tokens
   - Create new token with deployment permissions
3. **COOLIFY_WEBHOOK_URL**:
   - In Coolify, go to your project
   - Settings → Webhooks
   - Copy the webhook URL
4. **COOLIFY_PROJECT_ID**: Found in Coolify project URL

### Step 2: Install MCP Server Dependencies

```bash
cd services/coolify-mcp
npm install
npm run build
```

### Step 3: Start the MCP Server

```bash
npm start
```

The server will run on port 3016 and register with Claude Code.

### Step 4: Test It

In a new Claude conversation:

```
You: Deploy to Coolify
Claude: 🚀 Starting deployment to Coolify production...
        ✅ Deployment successful!
```

---

## Usage Examples

### Deploy to Production

```
You: Deploy the latest changes to production
Claude: [Deploys to Coolify]
        📦 Building services...
        🚀 Deploying to Coolify...
        ✅ All 6 services deployed and healthy!
```

### Check Deployment Status

```
You: What's the status of my deployment?
Claude: [Checks all services]
        📊 Deployment Status:
        ✅ web-frontend - Healthy (245MB, 12% CPU)
        ✅ stellar-agents - Healthy (1.2GB, 28% CPU)
        ✅ big-3-orchestrator - Healthy (1.1GB, 25% CPU)
        ✅ browser-service - Healthy (1.8GB, 35% CPU)
        ✅ chrome-devtools-mcp - Healthy (890MB, 15% CPU)
        ✅ rube-mcp - Healthy (650MB, 8% CPU)

        Overall: All systems operational
```

### View Service Logs

```
You: Show me the last 50 lines of logs from stellar-agents
Claude: [Retrieves logs]
        📜 Logs from stellar-agents:
        [timestamps and log entries...]
```

### Update Environment Variable

```
You: Update the OPENAI_API_KEY to sk-new-key-123
Claude: [Updates secret securely]
        🔐 Updated OPENAI_API_KEY
        ⚠️ Restart services for changes to take effect?
```

### Rollback Deployment

```
You: Something's wrong, rollback to the previous version
Claude: [Executes rollback]
        ⏪ Rolling back to v1.2.2...
        ✅ Rollback successful, all services healthy
```

---

## Advanced Features

### Multi-Service Deployment

Deploy only specific services:

```
You: Deploy just the web-frontend and stellar-agents services
Claude: [Deploys selected services]
        🚀 Deploying 2 services...
        ✅ Deployment complete
```

### Different Environments

```
You: Deploy to staging environment
Claude: [Deploys to staging]
        🚀 Deploying to staging...
```

### Skip Health Checks (Faster)

```
You: Deploy to production and skip health checks
Claude: [Deploys without waiting]
        🚀 Deployment triggered
        ⏭️ Skipping health checks
```

---

## Architecture

```
You (Claude Code)
    ↓
┌───────────────────────────────────┐
│   /deploy Slash Command           │
│   (Quick deployments)              │
└───────────────┬───────────────────┘
                │
                ▼
┌───────────────────────────────────┐
│   Coolify MCP Server (Port 3016)  │
│   (Advanced features)              │
└───────────────┬───────────────────┘
                │
       ┌────────┴────────┐
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│  Deployment  │  │   Coolify    │
│    Script    │  │   Webhook    │
│              │  │              │
│  deploy-     │  │  POST /hook  │
│  production  │  │              │
│  .sh         │  │              │
└──────────────┘  └──────────────┘
       │                 │
       └────────┬────────┘
                ▼
      ┌──────────────────┐
      │ Docker Compose   │
      │ (6 Services)     │
      └──────────────────┘
```

---

## Deployment Workflow

### Using Slash Command

```bash
1. User: /deploy coolify production
2. Claude runs: ./deploy-production.sh coolify ghcr.io production
3. Script phases:
   ✅ Pre-deployment checks
   ✅ Registry authentication
   ✅ Docker image building (6 services)
   ✅ Image tagging (version + latest)
   ✅ Registry push
   ✅ Database migrations
   ✅ Coolify webhook trigger
   ✅ Health checks (30 attempts, 10s each)
   ✅ Smoke tests
4. Claude reports: ✅ Deployment successful!
```

### Using MCP Server

```bash
1. User: Deploy to production
2. MCP server receives request
3. Triggers Coolify webhook with payload:
   {
     "version": "v1.3.0",
     "environment": "production",
     "services": ["all"]
   }
4. Coolify pulls latest images
5. Deploys via docker-compose.coolify.yml
6. MCP server polls health endpoints
7. Reports status in real-time
8. Returns success when all healthy
```

---

## Services Deployed

| Service | Port | Health Check | Purpose |
|---------|------|--------------|---------|
| **web-frontend** | 3000 | `/health` | Next.js web app |
| **stellar-agents** | 3004 | `/health` | AI agent service |
| **big-3-orchestrator** | 3010 | `/health` | Agent orchestration |
| **browser-service** | 3013 | `/health` | Playwright automation |
| **chrome-devtools-mcp** | 3014 | N/A | Browser debugging |
| **rube-mcp** | 3015 | `/health` | NotebookLLM bridge |

---

## Hostinger VPS Setup

### If You Don't Have Coolify Yet

**1. Get a Hostinger VPS:**
- 8GB RAM, 4 CPU cores recommended
- Ubuntu 22.04 LTS

**2. Install Docker & Docker Compose:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose v2
sudo apt install docker-compose-plugin

# Verify
docker --version
docker compose version
```

**3. Install Coolify:**
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

**4. Access Coolify:**
- Open browser: `http://your-vps-ip:8000`
- Complete setup wizard
- Create admin account
- Set up your domain

**5. Create Project in Coolify:**
- Click "New Project"
- Name: "new-world-kids"
- Type: "Docker Compose"
- Upload your `docker-compose.coolify.yml`
- Configure environment variables
- Get webhook URL from Settings

**6. Configure DNS:**
- Add A record: `your-domain.com` → Your VPS IP
- Add A record: `*.your-domain.com` → Your VPS IP (for services)

**7. Enable SSL:**
- Coolify will auto-generate Let's Encrypt certificates
- Or manually configure SSL in Coolify settings

---

## Troubleshooting

### Deployment Fails

**Error:** "COOLIFY_WEBHOOK_URL not set"

**Solution:**
```bash
# Add to .env
COOLIFY_WEBHOOK_URL=https://coolify.your-domain.com/webhooks/abc123
```

### Health Checks Fail

**Error:** "Service xyz is unhealthy"

**Solution:**
1. Check service logs: `/deploy-status` or manual `docker logs`
2. Verify service actually started: `docker ps`
3. Check health endpoint manually: `curl http://localhost:3000/health`

### Services Can't Connect

**Error:** "Cannot connect to database"

**Solution:**
1. Ensure all services on same Docker network
2. Check `docker-compose.coolify.yml` has `networks` defined
3. Verify environment variables are set in Coolify

### Port Conflicts

**Error:** "Port 3000 already in use"

**Solution:**
1. Stop conflicting service: `docker stop <container>`
2. Change port in `docker-compose.coolify.yml`
3. Update nginx.conf proxy rules

---

## Environment Variables Checklist

**Required for deployment:**
- ✅ `COOLIFY_WEBHOOK_URL`
- ✅ `GITHUB_TOKEN` (for ghcr.io registry)
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

**Optional but recommended:**
- ⚪ `COOLIFY_API_TOKEN` (for MCP server)
- ⚪ `COOLIFY_URL` (for MCP server)
- ⚪ `OPENAI_API_KEY` (for AI features)
- ⚪ `GHOST_CONTENT_API_URL` (for blog)
- ⚪ `STRIPE_SECRET_KEY` (for payments)

---

## Next Steps

1. **Test slash command now:**
   ```
   /deploy docker-local
   ```

2. **Set up Coolify credentials** (when ready for production)

3. **Install MCP server dependencies:**
   ```bash
   cd services/coolify-mcp && npm install
   ```

4. **First production deployment:**
   ```
   Deploy to Coolify production
   ```

5. **Monitor and enjoy!** 🎉

---

## Support

**Questions?** Just ask me in the conversation:
- "How do I deploy to staging?"
- "What's the deployment status?"
- "Show me service logs"
- "Rollback the deployment"

I'm now equipped to handle all your deployment needs!

---

*Last updated: 2024*
*For more details, see [services/coolify-mcp/README.md](services/coolify-mcp/README.md)*
