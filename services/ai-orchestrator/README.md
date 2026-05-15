# AI Orchestrator Service

Comprehensive AI orchestration service with REST API integrating Gemini multimodal AI, browser automation, grant management, and notifications.

## Features

- **REST API**: HTTP endpoints for UI integration
- **Gemini Integration**: Multimodal AI reasoning for grant analysis, content generation, and timeline enhancement
- **Browser Automation**: Automated grant application submission using Puppeteer
- **Grant Scheduling**: Cron-based scheduling for automatic grant submissions
- **Email Notifications**: Automated alerts for deadlines and submission status
- **Slack Integration**: Team notifications for important events
- **Agent Memory**: Continuous learning from interactions and outcomes
- **Hermes Integration**: Coordinates with existing Hermes agent system

## Installation

```bash
cd services/ai-orchestrator
pnpm install
```

## Configuration

1. Copy `.env.example` to `.env`
2. Fill in your API keys and credentials:

Required:
- `GEMINI_API_KEY`: Get from Google AI Studio
- `STRAPI_URL`: Your Strapi CMS URL
- `STRAPI_TOKEN`: Generate from Strapi admin
- `SKIP_USERNAME/PASSWORD`: Your Skip platform credentials

Optional (for notifications):
- `EMAIL_SERVICE`: Email provider (gmail, sendgrid, etc.)
- `EMAIL_USER`: Email account username
- `EMAIL_PASSWORD`: Email password or app-specific password
- `EMAIL_FROM`: From address for emails
- `SLACK_WEBHOOK_URL`: Slack incoming webhook URL

## Usage

### Development
```bash
pnpm dev
```

### Production
```bash
pnpm build
pnpm start
```

## API Tasks

The orchestrator processes various task types:

### Grant Analysis
```typescript
await orchestrator.submitTask({
  type: 'grant-analysis',
  priority: 'high',
  data: {
    grantDescription: '...',
    grantUrl: 'https://...',
    deadline: '2024-12-31'
  }
});
```

### Grant Application Generation
```typescript
await orchestrator.submitTask({
  type: 'grant-application',
  priority: 'high',
  data: {
    grantName: 'XYZ Foundation Grant',
    requirements: '...',
    fundingAmount: 50000
  }
});
```

### Timeline Enhancement
```typescript
await orchestrator.submitTask({
  type: 'timeline-enhancement',
  priority: 'medium',
  data: {
    eventId: '123',
    description: '...',
    images: ['url1', 'url2'],
    videos: ['url3']
  }
});
```

### Content Generation
```typescript
await orchestrator.submitTask({
  type: 'content-generation',
  priority: 'medium',
  data: {
    type: 'blog-post',
    topic: 'Impact of our summer program',
    tone: 'inspiring'
  }
});
```

## HTTP API Endpoints

### Health Check
```
GET /health
```

### Agent Status
```
GET /api/agents/status
```

### Submit Task
```
POST /api/tasks
Body: {
  type: 'grant-analysis' | 'grant-application' | 'timeline-enhancement' | 'content-generation',
  priority: 'low' | 'medium' | 'high' | 'urgent',
  data: { ... }
}
```

### Get Task Status
```
GET /api/tasks/:taskId
```

### Get Insights
```
GET /api/insights
```

### Get Memory
```
GET /api/memory
```

### Update Nonprofit Profile
```
POST /api/memory/profile
Body: { name, mission, achievements, ... }
```

### Record Feedback
```
POST /api/feedback
Body: { taskId, feedback, rating }
```

## Architecture

```
ai-orchestrator/
├── src/
│   ├── server.ts                 # HTTP server with Express
│   ├── agents/
│   │   └── orchestrator.ts      # Main AI orchestration logic
│   ├── integrations/
│   │   └── gemini.ts            # Gemini AI integration
│   ├── automation/
│   │   ├── browser-automation.ts # Puppeteer automation
│   │   └── grant-scheduler.ts    # Cron-based scheduling
│   ├── lib/
│   │   └── notification-service.ts # Email and Slack notifications
│   └── index.ts                  # Module exports
```

## Integration with Next.js UI

The UI can communicate with this service via API routes:

```typescript
// apps/ui/src/app/api/ai/analyze-grant/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  const taskId = await orchestrator.submitTask({
    type: 'grant-analysis',
    priority: 'high',
    data: body
  });
  
  return Response.json({ taskId });
}
```

## Notifications

The service automatically sends notifications for:

- **Grant Deadlines**: 7 days before deadline
- **Submission Success**: When a grant is successfully submitted
- **Submission Failure**: When automated submission encounters errors

Notifications can be sent via:
- Email (using nodemailer)
- Slack (using webhook)

Configure notification settings in `.env` to enable.

## Continuous Learning

The orchestrator maintains memory of:
- Nonprofit profile and achievements
- Successful grant strategies
- Best practices learned over time
- Grants to avoid based on past failures

This memory improves recommendations over time.

## Deployment

The service runs on port 3002 by default (configurable via `PORT` env variable).

Recommended deployment:
- Docker container
- Process manager (PM2, systemd)
- Reverse proxy (nginx) if exposing publicly
- SSL/TLS for production

See `docs/BACKEND-ARCHITECTURE.md` for detailed deployment instructions.
