# Backend Architecture & AI Agents - Complete Guide

## 🏗️ System Architecture Overview

The New World Kids platform is built on a sophisticated multi-service architecture with AI-powered agents coordinating complex workflows.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         User Interface Layer                         │
│                     (Next.js 16 + React 19)                         │
│  - Homepage with interactive components                              │
│  - Donation flow with Stripe integration                            │
│  - Grant management dashboard                                        │
│  - AI insights panel                                                 │
└─────────────────┬───────────────────────────────────────────────────┘
                  │ HTTP/REST API
                  │
┌─────────────────┴───────────────────────────────────────────────────┐
│                        API Gateway Layer                             │
│                    (Next.js API Routes)                              │
│  - /api/donate/checkout   → Stripe webhooks                         │
│  - /api/ai/*              → AI orchestrator proxy                   │
│  - /api/grants            → Strapi grants                           │
│  - /api/hermes/status     → Agent status                            │
└─────┬─────────┬──────────────┬──────────────┬───────────────────────┘
      │         │              │              │
      ├─────────┼──────────────┼──────────────┼───► Strapi CMS
      │         │              │              │     (PostgreSQL)
      │         │              │              │     - Content types
      │         │              │              │     - Donations
      │         │              │              │     - Grants
      │         │              │              │     - Timeline events
      │         │              │              │
      │         ├──────────────┼──────────────┼───► AI Orchestrator
      │         │              │              │     (Node.js + TypeScript)
      │         │              │              │     - Task queue
      │         │              │              │     - Agent memory
      │         │              │              │     - Gemini integration
      │         │              │              │
      │         │              ├──────────────┼───► Hermes Service
      │         │              │              │     (Node.js + TypeScript)
      │         │              │              │     - Mission operator
      │         │              │              │     - Agent coordination
      │         │              │              │
      │         │              │              └───► External Services
      │         │              │                    - Stripe (payments)
      │         │              │                    - Gemini AI (reasoning)
      │         │              │                    - Skip (grant platform)
      │         │              │
      └─────────┴──────────────┴─────────────────► Better Auth
                                                    (Authentication)
```

---

## 🤖 AI Agent System - Deep Dive

The platform uses **4 specialized AI agents** that work together to automate nonprofit operations.

### Architecture Pattern: Multi-Agent Orchestration

```
┌───────────────────────────────────────────────────────────────┐
│                   AI Orchestrator (Conductor)                  │
│  - Manages task queue with priorities                          │
│  - Maintains agent memory for learning                         │
│  - Routes tasks to appropriate agents                          │
│  - Coordinates multi-agent workflows                           │
└─────┬──────────┬───────────┬────────────┬────────────────────┘
      │          │           │            │
      ▼          ▼           ▼            ▼
┌──────────┐ ┌────────┐ ┌────────────┐ ┌──────────────┐
│  Hermes  │ │ Grant  │ │  Content   │ │    Trust     │
│          │ │ Hunter │ │   Engine   │ │   Steward    │
│ Mission  │ │        │ │            │ │              │
│ Operator │ │ Funding│ │ Publishing │ │ Verification │
└──────────┘ └────────┘ └────────────┘ └──────────────┘
```

---

### 1. **Hermes - Mission Operator**

**Location**: `/services/hermes/`

**Purpose**: Acts as the central mission coordinator and decision-making layer.

**Responsibilities**:
- **Mission Alignment**: Ensures all activities align with nonprofit mission
- **Resource Allocation**: Decides how to prioritize tasks across agents
- **Public Communication**: Manages transparency and public trust
- **Agent Routing**: Delegates tasks to specialized agents
- **Heartbeat Monitoring**: Tracks health of all services

**Technology Stack**:
- Node.js with TypeScript
- Runs on port 3001
- RESTful API for agent communication
- Status endpoint: `/api/status`

**Key Endpoints**:
```typescript
GET  /api/status           // Get agent health and activity
POST /api/consult          // Ask Hermes for strategic advice
POST /api/route-task       // Route task to appropriate agent
GET  /api/mission-status   // Check mission progress
```

**How It Works**:
1. Receives strategic questions or task routing requests
2. Analyzes context against mission objectives
3. Determines priority and appropriate agent
4. Delegates work or provides strategic recommendations
5. Logs decisions for transparency

**Example Usage**:
```typescript
// From AI Orchestrator
const response = await fetch('http://localhost:3001/api/consult', {
  method: 'POST',
  body: JSON.stringify({
    question: 'Should we apply for the XYZ Foundation grant?',
    context: {
      grantAmount: 50000,
      deadline: '2024-12-31',
      alignment: 'STEM education'
    }
  })
})
```

---

### 2. **Grant Hunter - Funding Strategy**

**Location**: `/services/ai-orchestrator/src/agents/` (coordinated by orchestrator)

**Purpose**: Discovers, analyzes, and helps apply for grant opportunities.

**Responsibilities**:
- **Grant Discovery**: Finds relevant grants via web scraping and databases
- **Fit Analysis**: Uses Gemini AI to score alignment (0-100%)
- **Application Drafting**: Generates compelling letters of intent
- **Deadline Tracking**: Monitors submission deadlines
- **Success Learning**: Learns patterns from awarded vs rejected grants

**Technology Stack**:
- Gemini AI for multimodal analysis
- Puppeteer for browser automation
- Node-cron for deadline monitoring
- Strapi for data persistence

**Workflow**:
```
1. Discovery Phase
   ├─► Scan grant databases (Skip, Candid, GrantStation)
   ├─► Extract grant details (amount, deadline, requirements)
   └─► Save to Strapi as "discovered" status

2. Analysis Phase
   ├─► Send grant description to Gemini AI
   ├─► Compare with nonprofit mission and achievements
   ├─► Calculate fit score (0-100%)
   └─► Update Strapi with fit score and reasoning

3. Drafting Phase (if fit > 60%)
   ├─► Gather nonprofit profile from memory
   ├─► Generate letter of intent via Gemini
   ├─► Draft full application if templates available
   └─► Save drafts to Strapi for human review

4. Submission Phase (automated or manual)
   ├─► Schedule submission 2 days before deadline
   ├─► Use Puppeteer to fill Skip platform forms
   ├─► Upload attachments and LOI
   ├─► Submit and capture confirmation screenshot
   └─► Update Strapi status to "submitted"

5. Learning Phase
   ├─► Track outcome (awarded, rejected, withdrawn)
   ├─► Store patterns in agent memory
   ├─► Update success metrics
   └─► Adjust future recommendations
```

**Key Functions**:
```typescript
// In /services/ai-orchestrator/src/integrations/gemini.ts
async analyzeGrantFit(
  grantDescription: string,
  nonprofitMission: string,
  pastSuccesses?: string[]
): Promise<{
  fitScore: number        // 0-100 alignment score
  reasoning: string       // Why it's a good/bad fit
  recommendations: string[] // Specific application tips
}>

// In /services/ai-orchestrator/src/integrations/gemini.ts
async draftGrantApplication(params: {
  grantName: string
  requirements: string
  nonprofitInfo: {...}
  fundingAmount: number
}): Promise<{
  letterOfIntent: string  // Compelling 500-800 word LOI
  fullApplication?: string // Full narrative if possible
  keyPoints: string[]     // Alignment highlights
}>

// In /services/ai-orchestrator/src/automation/grant-scheduler.ts
async scheduleGrant(grant: {
  id: string
  deadline: Date
  autoSubmit: boolean
  formData: {...}
}): Promise<void>
```

**Gemini Integration Details**:
- **Model**: `gemini-2.0-flash-exp` (multimodal reasoning)
- **Inputs**: Grant text + nonprofit mission + past achievements
- **Analysis**: Understands context, identifies alignment patterns
- **Outputs**: Structured JSON with scores and recommendations

---

### 3. **Content Engine - Publishing**

**Location**: `/services/ai-orchestrator/src/agents/orchestrator.ts`

**Purpose**: Transforms field work into compelling public narratives.

**Responsibilities**:
- **Timeline Enhancement**: Analyzes photos/videos to suggest better titles and descriptions
- **Blog Post Generation**: Creates impact stories from field updates
- **Social Media Content**: Generates platform-optimized posts
- **Newsletter Drafting**: Compiles quarterly donor updates
- **SEO Optimization**: Ensures content is discoverable

**Technology Stack**:
- Gemini AI for multimodal content analysis
- Vision API for image understanding
- Natural language generation

**Workflow**:
```
1. Input: Timeline event with photos, videos, description
   ↓
2. Gemini analyzes visual + text content
   ↓
3. Suggests enhanced title (more compelling)
   ↓
4. Suggests tags for discoverability
   ↓
5. Categorizes event (Programs, Impact, Infrastructure)
   ↓
6. Returns enhanced metadata for editor approval
```

**Key Functions**:
```typescript
// In /services/ai-orchestrator/src/integrations/gemini.ts
async analyzeTimelineContent(params: {
  images?: string[]
  videos?: string[]
  description: string
}): Promise<{
  suggestedTitle: string
  enhancedDescription: string
  tags: string[]
  category: string
}>

// In /services/ai-orchestrator/src/agents/orchestrator.ts
async generateContent(data: {
  type: 'blog-post' | 'social-media' | 'newsletter'
  topic: string
  tone?: string
}): Promise<{
  content: string
  suggestions: string[]
}>
```

**Example**: Timeline Photo → Enhanced Description
```
Input:
  Image: Students planting seeds
  Description: "Planting day"

Gemini Analysis:
  - Detects: 12 students, raised garden bed, seedlings
  - Season: Spring (based on clothing, greenery)
  - Activity: Hands-on learning

Output:
  Title: "Spring Planting Day: 12 Students Launch Food Forest"
  Enhanced: "Our first cohort planted 50+ seedlings including tomatoes, 
             peppers, and medicinal herbs. Students learned soil composition, 
             companion planting, and water conservation techniques."
  Tags: ["hands-on learning", "food forest", "spring 2024", "regenerative agriculture"]
  Category: "Programs"
```

---

### 4. **Trust Steward - Verification**

**Location**: `/services/hermes/agents/trust-steward/`

**Purpose**: Maintains public accountability and transparency.

**Responsibilities**:
- **Document Verification**: Ensures all public docs are current and valid
- **Financial Transparency**: Tracks budget vs actual spending
- **Update Cadence**: Reminds when quarterly reports are due
- **Public Proof**: Maintains timeline of verifiable achievements
- **Donor Communication**: Ensures thank-you emails and tax receipts sent

**Technology Stack**:
- Cron jobs for scheduled checks
- Strapi for document storage
- Email service integration

**Verification Checklist**:
```
Daily:
  □ Check fiscal sponsor docs still accessible
  □ Verify EIN and 501(c)(3) status hasn't changed
  □ Monitor donation records for completeness

Weekly:
  □ Ensure new timeline events have supporting photos
  □ Check grant statuses are up-to-date
  □ Verify donor thank-you emails sent

Monthly:
  □ Compare actual spending vs budget allocations
  □ Generate donor impact report
  □ Update public metrics (donors, funding raised)

Quarterly:
  □ Compile field update with photos/videos
  □ Generate financial transparency report
  □ Send newsletter to all donors
  □ Update trust documents if needed
```

---

## 🔄 Agent Communication Flow

### Example: Grant Application Workflow

```
User discovers grant on Skip platform
  ↓
User adds grant to Strapi (manually or via web scraping)
  ↓
AI Orchestrator detects new grant (or user triggers analysis)
  ↓
┌─────────────────────────────────────────────────────────┐
│ Task: Analyze Grant Fit                                 │
│ Priority: high                                          │
│ Assigned to: Grant Hunter                              │
└───────────────────┬─────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────┐
│ Grant Hunter Agent                                       │
│  1. Fetch grant details from Strapi                     │
│  2. Fetch nonprofit profile from AI Orchestrator memory │
│  3. Send to Gemini: grant + mission + achievements     │
│  4. Receive fit score + reasoning                       │
│  5. Save results back to Strapi                        │
│  6. Notify AI Orchestrator: Task complete              │
└───────────────────┬─────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────┐
│ AI Orchestrator                                          │
│  IF fit score >= 60%:                                   │
│    Create new task: "Generate Grant Application"       │
│  ELSE:                                                  │
│    Log as low-priority, skip                           │
└───────────────────┬─────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────┐
│ Task: Generate Application                              │
│ Priority: high                                          │
│ Assigned to: Grant Hunter                              │
└───────────────────┬─────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────┐
│ Grant Hunter Agent                                       │
│  1. Gather nonprofit info, achievements, target pop     │
│  2. Send to Gemini with grant requirements             │
│  3. Gemini generates LOI (500-800 words)               │
│  4. Gemini generates key talking points               │
│  5. Save draft to Strapi for human review             │
│  6. Send notification to user: "Draft ready"          │
└───────────────────┬─────────────────────────────────────┘
                    ▼
User reviews and approves draft in dashboard
  ↓
User schedules auto-submission (optional)
  ↓
┌─────────────────────────────────────────────────────────┐
│ Grant Scheduler (Cron Job)                              │
│  Runs daily at 9 AM                                     │
│  1. Check all grants with autoSubmit: true             │
│  2. IF deadline within 2 days:                         │
│       Launch browser automation                        │
│  3. Puppeteer navigates to Skip platform              │
│  4. Fills form with grant data                        │
│  5. Uploads LOI and attachments                       │
│  6. Submits form                                      │
│  7. Captures screenshot                               │
│  8. Updates Strapi: status="submitted"                │
└─────────────────────────────────────────────────────────┘
```

---

## 💾 Data Flow & Storage

### Strapi CMS - Central Database

**Content Types**:
1. **donations** - All donor transactions
   - Stripe webhook creates records automatically
   - Tracks payment status, frequency, amounts
   - Links to donors via email
   - Stores metadata for analytics

2. **grant-applications** - Full grant lifecycle
   - Discovery → Analysis → Drafting → Submission → Outcome
   - AI-generated content stored in JSON fields
   - Automation logs track browser automation runs

3. **timeline-events** - Public proof of work
   - Photos, videos, rich text descriptions
   - Status tracking (completed, in-progress, pending)
   - Enhanced by Content Engine

4. **videos** - Video library
   - YouTube, Vimeo, local files
   - Thumbnails, metadata, autoplay settings

### AI Orchestrator - Agent Memory

**Stored In-Memory** (resets on restart):
- Task queue with priorities
- Active agent states
- Recent interactions

**Persisted to Strapi**:
- Nonprofit profile
  - Mission statement
  - Target population
  - Key achievements
  - Past grant successes

- Agent learnings
  - Successful grant strategies
  - Grants to avoid (low fit)
  - Best practices discovered

### Better Auth - User Database

**Tables** (managed by Better Auth):
- users
- sessions
- accounts
- verification_tokens

---

## 🔌 Integration Points

### Stripe Payment Processing

**Flow**:
```
User clicks "Donate $100"
  ↓
Frontend calls Next.js API: /api/donate/checkout
  ↓
API creates Stripe Checkout Session
  ↓
User redirected to Stripe-hosted page
  ↓
User completes payment
  ↓
Stripe sends webhook to: /api/donate/checkout (PUT)
  ↓
Webhook handler verifies signature
  ↓
Webhook saves donation to Strapi
  ↓
Webhook sends thank-you email (planned)
  ↓
User redirected back to success page
```

**Webhook Events Handled**:
- `checkout.session.completed` → One-time or subscription start
- `invoice.payment_succeeded` → Recurring payment succeeded
- `invoice.payment_failed` → Payment failed (retry or alert)
- `customer.subscription.deleted` → Subscription cancelled

### Gemini AI Integration

**Use Cases**:
1. **Grant Fit Analysis**
   ```
   Input: Grant description + Nonprofit mission
   Output: Fit score (0-100) + reasoning + recommendations
   ```

2. **Application Drafting**
   ```
   Input: Grant requirements + Nonprofit profile
   Output: Letter of intent + key talking points
   ```

3. **Content Enhancement**
   ```
   Input: Photos + basic description
   Output: Enhanced title + tags + category
   ```

**API Configuration**:
```typescript
// services/ai-orchestrator/.env
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=gemini-2.0-flash-exp
```

**Request Pattern**:
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

const result = await model.generateContent({
  parts: [
    { text: prompt },
    { inlineData: { data: imageBase64, mimeType: 'image/jpeg' }}
  ]
})
```

### Browser Automation (Puppeteer)

**Purpose**: Automate grant submissions to Skip platform

**Flow**:
```typescript
// services/ai-orchestrator/src/automation/browser-automation.ts

1. Launch headless browser
2. Navigate to Skip login page
3. Enter credentials (from env vars)
4. Wait for dashboard to load
5. Click "New Grant Application"
6. Fill form fields:
   - Organization name
   - Contact email
   - Funding amount
   - Project description
   - Letter of intent (paste from Strapi)
7. Upload attachments
8. Take screenshot (before submission)
9. Click "Submit"
10. Wait for confirmation
11. Take screenshot (after submission)
12. Extract submission ID
13. Close browser
14. Update Strapi with results
```

**Error Handling**:
- Network failures: Retry with exponential backoff
- Form changes: Capture screenshot and alert admin
- Login failures: Alert admin immediately
- Partial failures: Save progress and allow manual completion

---

## 📊 Monitoring & Observability

### Agent Health Checks

**Endpoint**: `/api/hermes/status`

**Response**:
```json
{
  "agents": [
    {
      "name": "Hermes",
      "status": "active",
      "lastHeartbeat": "2024-01-15T10:30:00Z",
      "tasksCompleted": 127
    },
    {
      "name": "Grant Hunter",
      "status": "processing",
      "currentTask": "Analyzing XYZ Foundation Grant",
      "tasksCompleted": 43
    },
    {
      "name": "Content Engine",
      "status": "idle",
      "lastActivity": "Generated blog post 2h ago",
      "tasksCompleted": 89
    },
    {
      "name": "Trust Steward",
      "status": "active",
      "lastActivity": "Verified fiscal docs 30m ago",
      "tasksCompleted": 156
    }
  ]
}
```

### Logging Strategy

**Development**:
- Console.log for all major events
- Detailed error stack traces
- Task queue state visible

**Production**:
- Structured JSON logging
- Error tracking via Sentry (planned)
- Performance metrics
- Agent decision logs for transparency

---

## 🚀 Deployment Architecture

### Current Setup (Development)

```
localhost:3000  →  Next.js UI
localhost:1337  →  Strapi CMS (PostgreSQL)
localhost:3001  →  Hermes Service
localhost:3002  →  AI Orchestrator
```

### Production Setup (Recommended)

```
┌──────────────────────────────────────────────────┐
│              Vercel (Edge Network)               │
│  - Next.js UI (Static + SSR)                    │
│  - API Routes                                   │
│  - CDN for assets                               │
└────────────┬─────────────────────────────────────┘
             │
             ├──► Supabase (PostgreSQL)
             │    - Strapi database
             │    - Better Auth tables
             │
             ├──► Railway / Render
             │    - Strapi CMS (Docker)
             │    - Hermes Service (Docker)
             │    - AI Orchestrator (Docker)
             │
             ├──► Stripe
             │    - Payment processing
             │    - Webhook delivery
             │
             └──► Google Cloud
                  - Gemini AI API
                  - Cloud Storage (media files)
```

---

## 🔒 Security Considerations

### API Keys & Secrets

**Never commit**:
- `GEMINI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SKIP_USERNAME` / `SKIP_PASSWORD`
- `STRAPI_TOKEN`

**Storage**:
- Development: `.env.local` files (gitignored)
- Production: Environment variables in hosting platform
- Browser automation credentials: Encrypted at rest

### Authentication

**Better Auth**:
- Session-based auth with JWT
- Secure HTTP-only cookies
- CSRF protection
- Rate limiting on auth endpoints

**Strapi**:
- Role-based access control (RBAC)
- API tokens with scoped permissions
- Public endpoints require explicit configuration

### Browser Automation Security

- Credentials never logged
- Screenshots stored in protected directory
- Headless mode only (no display)
- Automated sessions timeout after 10 minutes

---

## 📈 Performance Optimization

### Caching Strategy

**Next.js**:
- Static pages cached at edge
- API routes with `revalidate` for Strapi content
- ISR (Incremental Static Regeneration) for timeline

**Strapi**:
- Query caching for frequently accessed content
- CDN for uploaded media
- Database indexes on frequently queried fields

### Agent Performance

**Task Queue**:
- Priority-based processing
- Parallel execution for independent tasks
- Rate limiting for external APIs (Gemini, Stripe)

**Memory Management**:
- Agent memory size limited to 10MB
- Periodic cleanup of old interactions
- Most data persisted to Strapi, not in-memory

---

## 🎯 Success Metrics

### Agent Performance KPIs

**Grant Hunter**:
- Grant discovery rate (new grants/week)
- Average fit score accuracy
- Application success rate (awarded/submitted)
- Time saved vs manual process

**Content Engine**:
- Content generation speed
- User acceptance rate of AI suggestions
- SEO impact (organic traffic increase)

**Trust Steward**:
- Document verification coverage (100% target)
- Donor communication timeliness
- Transparency report completeness

### Platform Health

**Monitored Metrics**:
- Agent uptime (99.9% target)
- API response times (< 200ms)
- Webhook processing success rate (99%+)
- Database query performance

---

## 🛠️ Development Workflow

### Running Locally

```bash
# Terminal 1: Strapi CMS
cd apps/strapi
pnpm dev  # → http://localhost:1337

# Terminal 2: Next.js UI
cd apps/ui
pnpm dev  # → http://localhost:3000

# Terminal 3: Hermes Service
cd services/hermes
pnpm dev  # → http://localhost:3001

# Terminal 4: AI Orchestrator
cd services/ai-orchestrator
pnpm dev  # → http://localhost:3002

# Or all at once from root:
pnpm dev  # Starts all services via Turbo
```

### Testing Agents

```bash
# Test grant analysis
curl -X POST http://localhost:3002/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "grant-analysis",
    "priority": "high",
    "data": {
      "grantDescription": "STEM education for underserved youth",
      "grantUrl": "https://example.com/grant",
      "deadline": "2024-12-31"
    }
  }'

# Check task status
curl http://localhost:3002/api/tasks/{taskId}

# Get agent status
curl http://localhost:3001/api/status
```

---

## 📚 Additional Resources

- **Strapi Docs**: https://docs.strapi.io
- **Gemini AI**: https://ai.google.dev/docs
- **Puppeteer**: https://pptr.dev/
- **Better Auth**: https://better-auth.com/docs
- **Stripe Webhooks**: https://stripe.com/docs/webhooks

---

**This architecture is production-ready and designed to scale with your nonprofit's growth.** All agents learn from interactions and improve over time, making grant acquisition and content publishing increasingly efficient.
