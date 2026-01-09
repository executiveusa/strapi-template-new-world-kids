# Coolify Deployment MCP Server

Direct deployment integration for Claude Code, enabling seamless deployments to Coolify/Hostinger and other platforms.

## Features

- 🚀 **One-command deployment** - Deploy to Coolify/Hostinger from Claude conversations
- 📊 **Real-time status** - Monitor deployment progress and service health
- 📜 **Log streaming** - View service logs without leaving Claude
- 🔐 **Secret management** - Update environment variables securely
- ⏪ **Rollback support** - Quick rollback to previous versions
- 🏥 **Health checks** - Automated service health monitoring
- 🎯 **Multi-platform** - Supports Coolify, Railway, Vercel, Docker local

## Quick Start

### 1. Install Dependencies

```bash
cd services/coolify-mcp
npm install
```

### 2. Configure Environment Variables

Add to your `.env` file:

```bash
COOLIFY_URL=https://coolify.your-domain.com
COOLIFY_API_TOKEN=your-coolify-api-token
COOLIFY_WEBHOOK_URL=https://coolify.your-domain.com/webhooks/your-webhook-id
COOLIFY_PROJECT_ID=your-project-id
```

### 3. Build the MCP Server

```bash
npm run build
```

### 4. Start the MCP Server

```bash
npm start
```

The server will run on port 3016 and register with Claude Code automatically.

## Usage from Claude Code

Once the MCP server is running, you can use it directly in Claude conversations:

### Deploy Application

```
You: Deploy the app to Coolify production
Claude: [Uses coolify-deployment MCP tool]
        🚀 Starting deployment...
        ✅ All services deployed successfully!
```

### Check Status

```
You: What's the deployment status?
Claude: [Checks deployment_status]
        📊 All 6 services are healthy:
        ✅ web-frontend (245MB, 12% CPU)
        ✅ stellar-agents (1.2GB, 28% CPU)
        ...
```

### View Logs

```
You: Show me logs from the stellar-agents service
Claude: [Retrieves service_logs]
        📜 Last 100 lines from stellar-agents...
```

### Rollback Deployment

```
You: Rollback to the previous version
Claude: [Executes rollback]
        ⏪ Rolling back to version v1.2.2...
        ✅ Rollback successful!
```

## Available MCP Tools

### 1. `deploy`

Deploy application to target platform.

**Parameters:**
- `target` (optional): Platform (coolify, docker-local, railway, vercel) - default: coolify
- `environment` (optional): Environment (production, staging, development) - default: production
- `version` (optional): Version tag to deploy
- `services` (optional): Specific services to deploy
- `skipHealthCheck` (optional): Skip post-deployment health checks

**Example:**
```typescript
{
  "target": "coolify",
  "environment": "production",
  "version": "v1.3.0"
}
```

### 2. `deployment_status`

Check current deployment status and service health.

**Parameters:**
- `deploymentId` (optional): Specific deployment to check

**Returns:**
```typescript
{
  "deploymentId": "deploy-1234567890",
  "status": "healthy",
  "progress": 100,
  "services": [
    {
      "name": "web-frontend",
      "status": "up",
      "health": "healthy",
      "memory": "245MB",
      "cpu": "12%"
    }
  ]
}
```

### 3. `service_health`

Check health of a specific service.

**Parameters:**
- `service` (required): Service name

**Services:**
- `web-frontend`
- `stellar-agents`
- `big-3-orchestrator`
- `browser-service`
- `chrome-devtools-mcp`
- `rube-mcp`

### 4. `service_logs`

Retrieve logs from a service.

**Parameters:**
- `service` (required): Service name
- `lines` (optional): Number of lines - default: 100

### 5. `update_secrets`

Update environment variables/secrets.

**Parameters:**
- `secrets` (required): Array of secrets to update

**Example:**
```typescript
{
  "secrets": [
    {
      "key": "OPENAI_API_KEY",
      "value": "sk-new-key",
      "description": "Updated OpenAI key",
      "overwrite": true
    }
  ]
}
```

### 6. `rollback`

Rollback to a previous deployment.

**Parameters:**
- `deploymentId` (optional): Specific deployment to rollback to
- `targetVersion` (optional): Version tag
- `reason` (optional): Reason for rollback

## Architecture

```
┌─────────────────────────────────────┐
│     Claude Code (User Interface)    │
└──────────────┬──────────────────────┘
               │ MCP Protocol
               ▼
┌─────────────────────────────────────┐
│   Coolify MCP Server (Port 3016)    │
│  ┌──────────────────────────────┐   │
│  │  MCP Tools                   │   │
│  │  - deploy()                  │   │
│  │  - deployment_status()       │   │
│  │  - service_health()          │   │
│  │  - service_logs()            │   │
│  │  - update_secrets()          │   │
│  │  - rollback()                │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
       ┌───────┴──────────┐
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│   Coolify    │   │ Deployment   │
│   Webhook    │   │   Script     │
│              │   │              │
│  POST /hook  │   │  deploy-     │
│              │   │  production  │
│              │   │  .sh         │
└──────────────┘   └──────────────┘
```

## Development

### Project Structure

```
services/coolify-mcp/
├── src/
│   ├── index.ts           # MCP server main file
│   ├── coolify-client.ts  # Coolify API client
│   └── types.ts           # TypeScript interfaces
├── package.json
├── tsconfig.json
└── README.md
```

### Build

```bash
npm run build
```

### Development Mode (Hot Reload)

```bash
npm run dev
```

### Testing

```bash
# Test deployment
curl -X POST http://localhost:3016/deploy \
  -H "Content-Type: application/json" \
  -d '{"target": "docker-local", "environment": "development"}'

# Test health check
curl http://localhost:3016/health
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `COOLIFY_URL` | Yes | Coolify instance URL |
| `COOLIFY_API_TOKEN` | Yes | Coolify API token |
| `COOLIFY_WEBHOOK_URL` | Yes | Webhook URL for deployments |
| `COOLIFY_PROJECT_ID` | No | Project ID (optional) |
| `PORT` | No | MCP server port (default: 3016) |

## Troubleshooting

### MCP Server Not Starting

**Problem:** Server fails to start

**Solution:**
1. Check environment variables are set
2. Verify port 3016 is available
3. Check logs: `npm start 2>&1 | tee mcp-server.log`

### Deployment Fails

**Problem:** Deployment webhook returns error

**Solution:**
1. Verify webhook URL is correct
2. Check Coolify project is configured
3. Ensure services are properly defined in `docker-compose.coolify.yml`

### Health Checks Fail

**Problem:** Services show as unhealthy

**Solution:**
1. Check if services are actually running: `docker-compose ps`
2. Verify health check endpoints are accessible
3. Check service logs: `docker-compose logs [service-name]`

### Cannot Update Secrets

**Problem:** Secret updates fail

**Solution:**
1. Verify Coolify API token has write permissions
2. Check secret key names match environment variables
3. Ensure Coolify project ID is set

## Integration with Existing Tools

### Deployment Script

The MCP server uses your existing `deploy-production.sh` script:

```typescript
// In coolify-client.ts
const command = `./deploy-production.sh ${request.target} ghcr.io ${request.environment}`;
await execAsync(command);
```

### Docker Compose

Service definitions come from `docker-compose.coolify.yml`:

```typescript
// In types.ts
export const SERVICES = [
  { name: 'web-frontend', port: 3000, healthPath: '/health' },
  { name: 'stellar-agents', port: 3004, healthPath: '/health' },
  ...
];
```

## Security

- API tokens stored in `.env` (never committed)
- Secrets encrypted in transit
- Webhook URLs use HTTPS
- API token permissions scoped to deployment only

## Roadmap

- [ ] GitHub Actions integration
- [ ] Slack notifications
- [ ] Deployment analytics dashboard
- [ ] Multi-region deployment support
- [ ] Canary deployments
- [ ] A/B testing support

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request

## License

MIT

## Support

For issues or questions:
- GitHub Issues: https://github.com/your-org/new-world-kids/issues
- Email: support@newworldkids.org
