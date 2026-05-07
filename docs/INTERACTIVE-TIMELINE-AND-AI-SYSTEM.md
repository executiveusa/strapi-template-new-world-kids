# Interactive Timeline & AI-Powered Grant Management System

## 📚 Complete Implementation Guide

This document describes the comprehensive interactive timeline and AI-powered grant automation system built for New World Kids.

---

## 🎯 System Overview

The system combines:

1. **Interactive Timeline** with video, images, and animations
2. **AI-Powered Grant Discovery** using Gemini multimodal AI
3. **Browser Automation** for grant submissions via Puppeteer
4. **Intelligent Agent System** coordinating Hermes, Grant Hunter, and custom AI agents
5. **Unified Dashboard** for managing grants, timeline, and AI insights

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 16)                   │
├─────────────────────────────────────────────────────────────┤
│  - Enhanced Timeline with GSAP animations                   │
│  - Video Player Component (React Player)                    │
│  - Grant Management Dashboard                               │
│  - AI Insights Panel                                        │
│  - Onboarding Wizard                                        │
└──────────────┬──────────────────────────────────────────────┘
               │ API Routes
               │
┌──────────────┴──────────────────────────────────────────────┐
│                   Backend Services                          │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │  Strapi CMS    │  │ AI Orchestrator│  │    Hermes    │ │
│  │                │  │                │  │              │ │
│  │ - Timeline     │  │ - Gemini AI    │  │ - Mission    │ │
│  │ - Videos       │  │ - Grant Hunter │  │   Operator   │ │
│  │ - Grants       │  │ - Automation   │  │ - Content    │ │
│  │ - Events       │  │ - Scheduling   │  │   Engine     │ │
│  └────────────────┘  └────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 New Components & Services

### 1. **Strapi Content Types**

#### `/apps/strapi/src/api/video/`
Video content type with support for:
- YouTube, Vimeo, local, and external videos
- Thumbnails and metadata
- Autoplay, controls, loop settings
- Multi-language support (i18n)

#### `/apps/strapi/src/api/timeline-event/`
Enhanced timeline events with:
- Rich text descriptions
- Multiple images and videos
- Status tracking (completed, in-progress, pending)
- Categories, tags, and location data
- Expanded content sections

#### `/apps/strapi/src/api/grant-application/`
Comprehensive grant tracking:
- Grant details and funder info
- Status workflow (discovered → researching → drafting → submitted → awarded)
- Priority levels
- AI-generated content storage
- Automation logs
- Scheduling for auto-submission

---

### 2. **React Components**

#### `/apps/ui/src/components/video/VideoPlayer.tsx`
Full-featured video player:
- React Player integration
- Custom thumbnail with play button
- Framer Motion animations
- Support for YouTube, Vimeo, local files
- Event callbacks (onPlay, onPause, onEnded)

#### `/apps/ui/src/components/timeline/EnhancedTimeline.tsx`
Cinematic timeline component:
- GSAP scroll animations
- Accordion expansion for details
- Video and image galleries
- Left/right alternating layout
- Mobile-responsive
- Status indicators with colors

#### `/apps/ui/src/components/dashboard/GrantManagementDashboard.tsx`
Comprehensive grant management:
- Stats overview (total, in-progress, submitted, funding)
- Filterable grant list
- Priority indicators
- AI fit scores
- Deadline tracking
- Status badges

#### `/apps/ui/src/components/dashboard/AIInsightsPanel.tsx`
Real-time AI insights:
- Agent activity monitoring
- Recommendations and alerts
- Confidence scores
- Actionable insights
- Analytics dashboard

#### `/apps/ui/src/components/onboarding/OnboardingWizard.tsx`
Multi-step onboarding:
- Organization profile setup
- Mission and impact details
- Automation configuration
- Progress tracking
- Data validation

---

### 3. **AI Orchestrator Service**

Location: `/services/ai-orchestrator/`

#### **Gemini Integration** (`src/integrations/gemini.ts`)
- Multimodal AI analysis (text, images, videos)
- Grant fit scoring
- Application drafting
- Timeline content enhancement
- Continuous learning from interactions

#### **Browser Automation** (`src/automation/browser-automation.ts`)
- Puppeteer-based automation
- Skip platform integration
- Form filling and submission
- Screenshot capture
- Error handling and retry logic

#### **Grant Scheduler** (`src/automation/grant-scheduler.ts`)
- Cron-based scheduling
- Deadline monitoring
- Auto-submission workflows
- Alert system for approaching deadlines
- Strapi integration for status updates

#### **AI Orchestrator** (`src/agents/orchestrator.ts`)
- Task queue management
- Agent memory and learning
- Multi-agent coordination
- Hermes integration
- Analytics and reporting

---

### 4. **API Routes**

All located in `/apps/ui/src/app/api/`:

- `/api/ai/analyze-grant` - Submit grant for AI analysis
- `/api/ai/generate-application` - Generate grant application draft
- `/api/ai/insights` - Fetch AI insights and recommendations
- `/api/ai/agent-status` - Get agent activity status
- `/api/grants` - Fetch all grants from Strapi
- `/api/analytics` - Track user events and interactions
- `/api/onboarding` - Save onboarding data

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10.28.1+
- Docker (for PostgreSQL)
- Gemini API key
- Optional: Skip platform credentials

### Installation

```bash
# Clone repository
git clone <repository-url>
cd strapi-template-new-world-kids

# Install dependencies
pnpm install

# Set up environment variables
cp apps/strapi/.env.example apps/strapi/.env
cp apps/ui/.env.example apps/ui/.env
cp services/ai-orchestrator/.env.example services/ai-orchestrator/.env

# Configure your API keys and credentials
# Edit the .env files with your values
```

### Running the System

```bash
# Start all services (Strapi, UI, Hermes, AI Orchestrator)
pnpm dev

# Or start individually:
pnpm dev:strapi           # Strapi CMS on http://localhost:1337
pnpm dev:ui               # Next.js UI on http://localhost:3000
pnpm dev:hermes           # Hermes agents on http://localhost:3001
pnpm dev:ai-orchestrator  # AI Orchestrator on http://localhost:3002
```

### First-Time Setup

1. **Access Strapi Admin**: http://localhost:1337/admin
   - Create admin account
   - Configure roles & permissions
   - Make content types public (grant-applications, timeline-events, videos)

2. **Generate Strapi Types**:
   ```bash
   cd apps/strapi
   pnpm generate:types
   ```

3. **Complete Onboarding**: http://localhost:3000/onboarding
   - Enter organization details
   - Configure AI settings
   - Set up automation credentials

4. **Create Your First Timeline Event**:
   - Go to Strapi admin
   - Create timeline-event with title, date, description
   - Upload images/videos
   - Publish

5. **Add a Grant**:
   - Create grant-application in Strapi
   - Use AI to analyze fit score
   - Generate application draft

---

## 🎨 Key Features

### Interactive Timeline

- **GSAP Scroll Animations**: Smooth entrance effects as users scroll
- **Accordion Expansions**: Click "Show More" to reveal detailed content
- **Video Embedding**: Inline video players with custom controls
- **Image Galleries**: Grid layout for multiple images
- **Status Tracking**: Visual indicators for completed, in-progress, pending
- **Responsive Design**: Mobile-friendly alternating layout

### AI-Powered Grant Management

- **Grant Discovery**: AI finds grants matching your mission
- **Fit Scoring**: Gemini analyzes alignment (0-100% fit score)
- **Application Drafting**: AI writes letters of intent and full applications
- **Automated Submission**: Browser automation submits to platforms
- **Deadline Alerts**: Notifications for approaching deadlines
- **Continuous Learning**: Agent memory improves over time

### Agent System

- **Hermes**: Mission operator and coordinator
- **Grant Hunter**: Discovers and analyzes grant opportunities
- **Content Engine**: Generates blog posts, social media content
- **Trust Steward**: Maintains transparency and accountability
- **AI Orchestrator**: Coordinates all AI activities

### Dashboard & Analytics

- **Grant Pipeline**: Visual overview of all grants and their status
- **AI Insights**: Real-time recommendations and predictions
- **Agent Activity**: Monitor what each AI agent is doing
- **Analytics Tracking**: User interactions, grant outcomes, video views
- **Onboarding Flow**: Guided setup for new users

---

## 📊 Data Flow

### Timeline Event Creation

```
User creates event in Strapi
    ↓
Uploads videos/images
    ↓
Publishes event
    ↓
AI analyzes content (optional)
    ↓
Suggests title, tags, category
    ↓
Event appears on timeline with animations
    ↓
Users click to expand and watch videos
    ↓
Analytics tracked
```

### Grant Application Workflow

```
Grant discovered (manual or AI)
    ↓
AI analyzes fit score via Gemini
    ↓
If fit > 60%, AI drafts application
    ↓
User reviews and edits draft
    ↓
User schedules auto-submission (optional)
    ↓
Grant Scheduler monitors deadline
    ↓
Browser automation submits to Skip platform
    ↓
Status updated to "submitted"
    ↓
AI learns from outcome (awarded/rejected)
```

---

## 🔧 Configuration

### Environment Variables

#### Strapi (`apps/strapi/.env`)
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
```

#### Next.js UI (`apps/ui/.env.local`)
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_token
AI_ORCHESTRATOR_URL=http://localhost:3002
```

#### AI Orchestrator (`services/ai-orchestrator/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_token
HERMES_URL=http://localhost:3001
SKIP_USERNAME=your_skip_username
SKIP_PASSWORD=your_skip_password
```

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Test specific service
pnpm test:ui
pnpm test:strapi
pnpm test:ai-orchestrator

# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix
```

---

## 🚢 Deployment

### Build for Production

```bash
# Build all services
pnpm build

# Or build individually
pnpm build:ui
pnpm build:strapi
pnpm build:hermes
pnpm build:ai-orchestrator
```

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure PostgreSQL database
- [ ] Set up Gemini API key
- [ ] Configure Skip platform credentials (if using automation)
- [ ] Set up domain and SSL
- [ ] Enable Strapi production mode
- [ ] Configure CDN for media files
- [ ] Set up monitoring and logging
- [ ] Test all integrations
- [ ] Run smoke tests

---

## 📈 Analytics & Monitoring

The system tracks:

- **Grant Events**: Discovery, analysis, submission, outcomes
- **Timeline Events**: Views, expansions, video plays
- **AI Interactions**: Task submissions, confidence scores, successes
- **User Behavior**: Onboarding completion, dashboard usage
- **Agent Activity**: Tasks completed, processing times

View analytics in:
- AI Insights Panel (real-time)
- Strapi admin (historical data)
- External analytics tools (via `/api/analytics` endpoint)

---

## 🤝 Integration Points

### Hermes Integration

The AI Orchestrator can consult Hermes agents:

```typescript
const response = await orchestrator.consultHermes(
  "Should we apply for the XYZ Foundation grant?"
)
```

### Gemini API

Direct integration for:
- Grant fit analysis
- Application drafting
- Content generation
- Multimodal analysis (images + videos)

### Strapi CMS

All content stored and managed in Strapi:
- Timeline events
- Videos
- Grants
- User profiles
- Analytics events (optional)

---

## 🔒 Security Considerations

- **API Keys**: Store securely in environment variables
- **Skip Credentials**: Encrypted at rest, never logged
- **Strapi Permissions**: Configure role-based access
- **Browser Automation**: Runs in headless mode, screenshots stored securely
- **Analytics**: No PII tracked without consent
- **CORS**: Configure allowed origins in production

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: AI Orchestrator not starting
- **Solution**: Check Gemini API key is set, verify ports are available

**Issue**: Timeline animations not working
- **Solution**: Ensure GSAP is installed (`pnpm install` in apps/ui)

**Issue**: Grant automation failing
- **Solution**: Verify Skip credentials, check browser automation logs

**Issue**: Strapi types not generating
- **Solution**: Run `cd apps/strapi && pnpm generate:types`

**Issue**: Videos not playing
- **Solution**: Check video URL format, verify react-player is installed

---

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [React Player Documentation](https://github.com/cookpete/react-player)
- [Puppeteer Documentation](https://pptr.dev/)

---

## 🎉 Success Metrics

Your system is working when:

✅ Timeline displays with smooth scroll animations  
✅ Videos play inline with custom controls  
✅ AI discovers and scores grants automatically  
✅ Applications are drafted by Gemini AI  
✅ Grants submitted automatically via browser automation  
✅ Dashboard shows real-time insights  
✅ Agents coordinate and learn from interactions  
✅ Onboarding flow completes successfully  

---

## 📝 License

MIT License - New World Kids Platform

---

**Built with ❤️ for New World Kids**
