# Check Deployment Status

Check the current status of deployed services on Coolify/Hostinger.

## Usage

When user types `/deploy-status`, check the health and status of all deployed services.

## What to Check

1. **Service Health**: Query health endpoints for all 6 services
2. **Docker Status**: Check if containers are running
3. **Resource Usage**: Memory and CPU utilization
4. **Recent Deployments**: Last deployment time and status
5. **Error Logs**: Check for recent errors

## Services to Monitor

1. **web-frontend** (Port 3000)
   - Health: `http://your-domain.com/health`
   - Expected: 200 OK

2. **stellar-agents** (Port 3004)
   - Health: `http://your-domain.com/api/agents/health`
   - Expected: 200 OK

3. **big-3-orchestrator** (Port 3010)
   - Health: `http://your-domain.com/api/orchestrator/health`
   - Expected: 200 OK

4. **browser-service** (Port 3013)
   - Health: `http://your-domain.com/api/browser/health`
   - Expected: 200 OK

5. **chrome-devtools-mcp** (Port 3014)
   - Health check via Docker

6. **rube-mcp** (Port 3015)
   - Health: `http://your-domain.com/mcp/health`
   - Expected: 200 OK

## Commands to Execute

```bash
# Check if deployment script shows running services
docker-compose -f docker-compose.coolify.yml ps

# Check service health
curl -f http://your-domain.com/health || echo "Health check failed"

# Check docker stats
docker stats --no-stream

# View recent logs (last 50 lines per service)
docker-compose -f docker-compose.coolify.yml logs --tail=50
```

## Response Format

Provide a status table:

```
Service Status Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service                 Status    Uptime      Memory    CPU
─────────────────────────────────────────────────────────────
web-frontend            ✅ UP      2d 14h      245MB     12%
stellar-agents          ✅ UP      2d 14h      1.2GB     28%
big-3-orchestrator      ✅ UP      2d 14h      1.1GB     25%
browser-service         ✅ UP      2d 14h      1.8GB     35%
chrome-devtools-mcp     ✅ UP      2d 14h      890MB     15%
rube-mcp                ✅ UP      2d 14h      650MB     8%

Last Deployment: 2 days ago (v1.2.3)
Overall Health: ✅ All systems operational
```

## If Services Are Down

If any service shows as down:
1. Show which service failed
2. Display recent error logs
3. Suggest restart command
4. Offer to restart automatically

## Local vs Remote

- **Local**: Use `docker-compose ps` and `docker stats`
- **Remote (Coolify)**: Use Coolify API or webhook status endpoint

## Error States

**No services running:**
→ "No services detected. Run `/deploy` to deploy."

**Partial outage:**
→ "⚠️ 2 of 6 services down. Would you like me to restart them?"

**Complete outage:**
→ "🚨 All services down. Checking logs... [show errors]"
