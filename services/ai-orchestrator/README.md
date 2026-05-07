# AI Orchestrator Service

Comprehensive AI orchestration service integrating Gemini multimodal AI, browser automation, and grant management.

## Features

- **Gemini Integration**: Multimodal AI reasoning for grant analysis, content generation, and timeline enhancement
- **Browser Automation**: Automated grant application submission using Puppeteer
- **Grant Scheduling**: Cron-based scheduling for automatic grant submissions
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
   - `GEMINI_API_KEY`: Get from Google AI Studio
   - `STRAPI_TOKEN`: Generate from Strapi admin
   - `SKIP_USERNAME/PASSWORD`: Your Skip platform credentials

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

## Architecture

```
ai-orchestrator/
├── src/
│   ├── agents/
│   │   └── orchestrator.ts      # Main AI orchestration logic
│   ├── integrations/
│   │   └── gemini.ts            # Gemini AI integration
│   ├── automation/
│   │   ├── browser-automation.ts # Puppeteer automation
│   │   └── grant-scheduler.ts    # Cron-based scheduling
│   └── index.ts                  # Service entry point
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

## Continuous Learning

The orchestrator maintains memory of:
- Nonprofit profile and achievements
- Successful grant strategies
- Best practices learned over time
- Grants to avoid based on past failures

This memory improves recommendations over time.
