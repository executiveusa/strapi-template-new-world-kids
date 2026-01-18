# Deploy to Coolify

Execute the production deployment script to deploy the New World Kids platform to Coolify on Hostinger.

## Usage

When the user types `/deploy [target] [environment]`, execute the deployment workflow.

## Parameters

- `target`: Deployment target (coolify, docker-local, railway, vercel) - default: coolify
- `environment`: Environment (production, staging) - default: production

## Deployment Process

1. **Pre-flight checks**: Verify deployment script exists and is executable
2. **Execute deployment**: Run `./deploy-production.sh [target] [registry] [environment]`
3. **Monitor progress**: Show deployment phases as they complete
4. **Report results**: Display deployment summary with URLs and status

## Script Execution

```bash
# Make sure script is executable
chmod +x ./deploy-production.sh

# Execute deployment
./deploy-production.sh coolify ghcr.io production
```

## Expected Flow

The deployment script runs 9 phases:
1. Pre-deployment checks (Docker, docker-compose)
2. Registry authentication (GitHub Container Registry)
3. Docker image building (6 services)
4. Image tagging (version + latest)
5. Registry push (optional)
6. Database migrations (Supabase)
7. Deploy to target (Coolify webhook trigger)
8. Health checks (30 retries, 10s intervals)
9. Smoke tests (blog, API, donations)

## Success Indicators

- ✅ All 6 services healthy
- ✅ Health check responds with 200 OK
- ✅ Blog loads successfully
- ✅ API endpoints responding
- ✅ Donations page accessible

## Failure Handling

If deployment fails:
- Show error phase and message
- Suggest rollback if needed
- Provide logs location
- Offer to retry with fixes

## Environment Variables Required

Ensure these are set before deployment:
- `COOLIFY_WEBHOOK_URL` - Coolify deployment webhook
- `GITHUB_TOKEN` - For GitHub Container Registry
- `SUPABASE_URL` - Database connection
- `SUPABASE_SERVICE_ROLE_KEY` - Migration access

## Post-Deployment Actions

After successful deployment:
1. Verify all services are running: `vercel inspect` or check Coolify dashboard
2. Test critical endpoints
3. Monitor logs for errors
4. Update deployment documentation

## Examples

**Full production deployment:**
```
User: /deploy
You: Deploying to Coolify production environment...
```

**Specific target:**
```
User: /deploy railway staging
You: Deploying to Railway staging environment...
```

**Local testing:**
```
User: /deploy docker-local
You: Deploying to local Docker environment...
```

## Response Format

When executing deployment, provide:
1. **Start message**: "🚀 Starting deployment to [target] [environment]..."
2. **Phase updates**: Show each phase as it completes
3. **Progress indicators**: Use checkmarks for completed phases
4. **Final summary**:
   - Deployment ID
   - Status (success/failed)
   - Duration
   - URLs (if applicable)
   - Next steps

## Error Messages

Common errors and solutions:

**"Docker not found"**
→ Install Docker and docker-compose

**"COOLIFY_WEBHOOK_URL not set"**
→ Add webhook URL to .env file

**"Health check failed"**
→ Check service logs: `docker-compose logs -f [service]`

**"Registry authentication failed"**
→ Verify GITHUB_TOKEN is valid

## Quick Deploy Command

For immediate execution without prompts:

```bash
./deploy-production.sh coolify ghcr.io production --skip-prompts
```

---

**Note**: This command wraps the existing `deploy-production.sh` script. For advanced deployment features (real-time logs, rollbacks, secret management), use the Coolify MCP server tools when available.
