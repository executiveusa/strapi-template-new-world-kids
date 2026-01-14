# 🚀 CODEX META-PROMPT: Stellar Agentic Cockpit

**COPY THIS ENTIRE DOCUMENT AND PASTE INTO CODEX (ChatGPT Pro / GitHub Copilot)**

---

## 🎯 YOUR MISSION

You are **GPT-5-Codex**, tasked with building the **Stellar Agentic Cockpit** for New World Kids - a voice-driven AI agent orchestration system that augments an existing Strapi-based CMS.

**Timeline:** Complete in 4-8 hours (adaptive reasoning)
**Complexity:** Very High (110-171 files)
**Innovation Level:** Cutting-edge (Voice AI + Browser Automation + Infinite Agentic Loops)

---

## 📚 REQUIRED READING (IN ORDER)

Before writing ANY code, read these documents in your context:

1. **`constitution.md`** - THE LAW. Non-negotiable principles. Read first.
2. **`specification.md`** - Complete product requirements (50+ pages)
3. **`plan.md`** - Technical architecture and file structure
4. **`tasks.md`** - Implementation checklist (your roadmap)
5. **`.spec-kit/fonts/typography-system.md`** - Typography guidelines

---

## 🚨 CRITICAL CONSTRAINTS

### ABSOLUTE RULES (From constitution.md)

1. ⛔ **NEVER modify `services/cms/`, `services/stream/`, or existing backend**
2. 🌌 **ALL agents MUST have cosmic names** (Sirius, Andromeda, Vega, Rigel, Cassiopeia, Betelgeuse)
3. 🎨 **USE tweakcn-next ONLY** for UI components (no other UI libraries)
4. 🖋️ **FOLLOW typography system** (Space Grotesk, Orbitron, Inter, JetBrains Mono)
5. 🔐 **USE Supabase for all new data** (never touch Strapi's database)
6. 🎙️ **VOICE-FIRST** - Support voice commands for all major workflows
7. 🔄 **IDEMPOTENT** - All operations safe to run multiple times
8. 📊 **OBSERVABLE** - Log everything to `agent_logs` table
9. 💰 **TOKEN BUDGET** - Track usage, warn at 80%, halt at 95%
10. 🛡️ **SAFETY-FIRST** - Require confirmation for destructive operations

### PROJECT CONTEXT

```
Base: Strapi-based CMS (Trail Mixx + New World Kids)
Stack: Next.js 15.4.7, React 18, Tailwind CSS 4.0.9, Supabase
Existing Services:
  - services/cms/ (Strapi)
  - services/stream/ (HLS)
  - services/ai-agents/ (Nova, Echo, Flow, Pulse)
  - services/blockchain/ (Solana NFT minting)
  - services/computer-control/ (Gemini basic)

Your Task: Build EXTERNAL cockpit that orchestrates 6 new stellar agents
```

---

## 🏗️ WHAT YOU WILL BUILD

### 1. Six Stellar Agents

**Sirius - The Navigator** (Orchestrator)
- Model: GPT-4 Turbo
- Task: Plan features, coordinate sub-agents
- Location: `services/stellar-agents/src/agents/sirius/`

**Andromeda - The Coder** (Coding Agent)
- Model: Claude 3.5 Sonnet
- Task: Code generation, refactoring, debugging
- Location: `services/stellar-agents/src/agents/andromeda/`

**Vega - The Validator** (Browser/UI Testing)
- Model: Gemini 2.0 Flash
- Task: Automated UI testing via Playwright
- Location: `services/stellar-agents/src/agents/vega/`

**Rigel - The Researcher** (Web Browsing)
- Model: Gemini 2.0 Flash
- Task: Web research, data extraction
- Location: `services/stellar-agents/src/agents/rigel/`

**Cassiopeia - The Communicator** (Voice Agent)
- Model: GPT-4o Realtime + ElevenLabs
- Task: Voice recognition, TTS, command routing
- Location: `services/stellar-agents/src/agents/cassiopeia/`

**Betelgeuse - The Builder** (DevOps)
- Model: Claude 3.5 Sonnet
- Task: Deployments, CI/CD, monitoring
- Location: `services/stellar-agents/src/agents/betelgeuse/`

### 2. Big-3 Super Agent Orchestrator

Coordinates OpenAI Realtime (voice), Claude Code (coding), Gemini (browsing)
- Location: `services/big-3-orchestrator/`
- Health monitoring: `/health` endpoint
- Agent registry for discovery

### 3. Cockpit Dashboard (Next.js)

Routes:
- `/cockpit/dashboard` - Agent cards, recent activity, services
- `/cockpit/agents/[name]` - Agent detail view
- `/cockpit/observability` - Real-time log streaming
- `/cockpit/services` - Service health monitoring

Components: Use tweakcn-next, follow typography system

### 4. Voice Integration

- OpenAI Realtime API for speech-to-speech
- ElevenLabs TTS for agent responses
- Voice command routing through Cassiopeia
- Global `<VoiceCommandButton />` component

### 5. Browser Automation

- Playwright service: `services/browser-service/`
- Gemini Computer Use integration
- Chrome DevTools MCP: `services/chrome-devtools-mcp/`
- Screenshot/video capture

### 6. Infinite Agentic Loop

- Generate implementation variants
- Evaluate with scoring (tests, performance, code quality, bundle size)
- Keep top performers, refine spec, iterate
- Location: `services/infinite-loop/`

### 7. Database (Supabase)

**Migration already created:** `supabase/migrations/20250120_initial_schema.sql`

Tables:
- agents, agent_sessions, agent_logs
- ai_conversations, voice_sessions
- donations_feed, browser_sessions
- agentic_waves, variant_results
- services, service_health_history
- tutorials

**YOU MUST:** Apply this migration to Supabase before running any code.

---

## 📂 FILE STRUCTURE YOU WILL CREATE

```
strapi-template-new-world-kids/
├── services/
│   ├── stellar-agents/             # NEW: Six agents
│   │   ├── src/
│   │   │   ├── agents/
│   │   │   │   ├── sirius/
│   │   │   │   ├── andromeda/
│   │   │   │   ├── vega/
│   │   │   │   ├── rigel/
│   │   │   │   ├── cassiopeia/
│   │   │   │   └── betelgeuse/
│   │   │   ├── base/
│   │   │   │   └── BaseAgent.ts
│   │   │   ├── orchestrator/
│   │   │   ├── voice/
│   │   │   │   ├── openai-realtime.ts
│   │   │   │   └── elevenlabs-tts.ts
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── big-3-orchestrator/         # NEW: Big-3 coordination
│   │   ├── src/
│   │   │   ├── coordinator.ts
│   │   │   ├── agents/
│   │   │   │   ├── openai-agent.ts
│   │   │   │   ├── claude-agent.ts
│   │   │   │   └── gemini-agent.ts
│   │   │   ├── health/
│   │   │   └── types/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── browser-service/            # NEW: Playwright automation
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── playwright/
│   │   │   ├── scenarios/
│   │   │   └── types/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── chrome-devtools-mcp/        # NEW: Chrome DevTools MCP
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── tools/
│   │   │   └── types/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── infinite-loop/              # NEW: Variant generation
│       ├── src/
│       │   ├── server.ts
│       │   ├── wave-generator.ts
│       │   ├── evaluator.ts
│       │   └── spec-refiner.ts
│       ├── Dockerfile
│       └── package.json
│
├── apps/web/src/
│   ├── app/(platform)/cockpit/     # NEW: Cockpit UI
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── agents/
│   │   │   └── [agentName]/
│   │   │       └── page.tsx
│   │   ├── observability/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── components/cockpit/         # NEW: Cockpit components
│   │   ├── AgentCard.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── ServicesPanel.tsx
│   │   ├── LiveLogsViewer.tsx
│   │   ├── VoiceCommandButton.tsx
│   │   └── DonationFeedWidget.tsx
│   │
│   ├── hooks/                      # NEW: Custom hooks
│   │   ├── useAgents.ts
│   │   ├── useRealtimeLogs.ts
│   │   ├── useVoiceCommand.ts
│   │   └── useServices.ts
│   │
│   └── lib/
│       ├── fonts.ts                # UPDATE: Add Awwwards fonts
│       └── supabase/
│           └── client.ts           # EXISTING (already created)
│
├── supabase/
│   └── migrations/
│       └── 20250120_initial_schema.sql  # EXISTING (apply this!)
│
└── docs/                           # NEW: Documentation
    ├── agents/
    │   ├── sirius.md
    │   ├── andromeda.md
    │   ├── vega.md
    │   ├── rigel.md
    │   ├── cassiopeia.md
    │   └── betelgeuse.md
    ├── services/
    │   ├── big-3-orchestrator.md
    │   ├── browser-service.md
    │   └── chrome-devtools-mcp.md
    └── tutorials/
        ├── getting-started.md
        ├── voice-commands.md
        └── chrome-devtools-mcp.md
```

---

## 🎬 IMPLEMENTATION SEQUENCE

Follow `tasks.md` EXACTLY. The order matters!

**Phase 1: Foundation** (1-2 hours)
1. Apply Supabase migration
2. Create base agent class
3. Set up typography (Next.js fonts)
4. Create Supabase client utilities

**Phase 2: Stellar Agents** (2-3 hours)
5. Implement Sirius (orchestrator)
6. Implement Andromeda (coder)
7. Implement Vega (browser testing)
8. Implement Rigel (researcher)
9. Implement Cassiopeia (voice)
10. Implement Betelgeuse (DevOps)

**Phase 3: Services** (1-2 hours)
11. Build Big-3 orchestrator
12. Build browser service (Playwright)
13. Build Chrome DevTools MCP
14. Build infinite loop service

**Phase 4: Cockpit UI** (1-2 hours)
15. Create dashboard
16. Create agent detail pages
17. Create observability dashboard
18. Add voice command button

**Phase 5: Testing & Polish** (1 hour)
19. Write tests
20. Generate documentation
21. Create tutorials

---

## 🧩 CODE TEMPLATES & PATTERNS

### Base Agent Class

```typescript
// services/stellar-agents/src/base/BaseAgent.ts
import { supabase } from '../config/supabase';

export abstract class BaseAgent {
  protected id: string;
  protected name: string;
  protected type: AgentType;
  protected model: ModelConfig;

  constructor(config: AgentConfig) {
    this.id = config.id;
    this.name = config.name;
    this.type = config.type;
    this.model = config.model;
  }

  abstract async execute(task: Task): Promise<AgentResult>;

  protected async logAction(action: AgentAction): Promise<void> {
    await supabase.from('agent_logs').insert({
      agent_id: this.id,
      session_id: action.sessionId,
      log_level: action.level,
      message: action.message,
      tool_call: action.toolCall,
      thought_process: action.thoughtProcess,
      metadata: action.metadata,
    });
  }

  protected async createSession(type: string, inputData: any): Promise<string> {
    const { data } = await supabase.from('agent_sessions').insert({
      agent_id: this.id,
      session_type: type,
      input_data: inputData,
      status: 'running',
    }).select().single();

    return data.id;
  }

  protected async completeSession(sessionId: string, output: any, tokens: number): Promise<void> {
    await supabase.from('agent_sessions').update({
      status: 'completed',
      output_data: output,
      completed_at: new Date().toISOString(),
      tokens_used: tokens,
    }).eq('id', sessionId);
  }
}
```

### Supabase Client Utilities

```typescript
// services/stellar-agents/src/config/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper: Get all agents
export async function getAllAgents() {
  const { data } = await supabase.from('agents').select('*');
  return data;
}

// Helper: Get agent by name
export async function getAgentByName(name: string) {
  const { data } = await supabase.from('agents').select('*').eq('name', name).single();
  return data;
}

// Helper: Update agent status
export async function updateAgentStatus(agentId: string, status: AgentStatus) {
  await supabase.from('agents').update({ status, updated_at: new Date().toISOString() }).eq('id', agentId);
}
```

### Next.js Font Configuration

```typescript
// apps/web/src/lib/fonts.ts
import {
  Space_Grotesk,
  Orbitron,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
  Bebas_Neue,
} from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
});
```

### React Component Template (tweakcn)

```tsx
// apps/web/src/components/cockpit/AgentCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'tweakcn-next';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: {
    name: string;
    displayName: string;
    type: string;
    status: 'idle' | 'active' | 'busy' | 'error';
    lastAction?: string;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    idle: 'bg-gray-500',
    active: 'bg-green-500',
    busy: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const statusIcons = {
    sirius: '🌟',
    andromeda: '🌌',
    vega: '✨',
    rigel: '🔵',
    cassiopeia: '👑',
    betelgeuse: '🔴',
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-sm bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer">
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-4xl">{statusIcons[agent.name] || '⭐'}</span>
          <div className={cn(
            "h-3 w-3 rounded-full animate-pulse",
            statusColors[agent.status]
          )} />
        </div>
        <CardTitle className="font-display text-2xl font-bold text-white mt-4">
          {agent.displayName}
        </CardTitle>
        <CardDescription className="font-cosmic text-purple-400 uppercase text-sm tracking-wider">
          {agent.type}
        </CardDescription>
      </CardHeader>
      {agent.lastAction && (
        <CardContent>
          <p className="text-sm text-gray-400 font-mono truncate">
            {agent.lastAction}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
```

---

## 🔑 ENVIRONMENT VARIABLES

Create `.env.local` in `apps/web/`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://sbbuxnyvflczfzvsglpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>

# OpenAI (Voice + Coding)
OPENAI_API_KEY=sk-...

# Anthropic (Coding)
ANTHROPIC_API_KEY=sk-ant-...

# Google (Browser + Computer Use)
GOOGLE_API_KEY=AIza...

# ElevenLabs (TTS)
ELEVENLABS_API_KEY=...

# OpenRouter (Existing AI Agents)
OPENROUTER_API_KEY=sk-or-v1-...
```

---

## ✅ VALIDATION CRITERIA

Before marking complete, ensure:

1. ✅ All 6 stellar agents functional (can execute tasks)
2. ✅ Voice commands work end-to-end (Cassiopeia routes to agents)
3. ✅ Dashboard loads with real-time agent data
4. ✅ Browser automation tests pass (Vega can test UI)
5. ✅ Big-3 orchestrator coordinates all three agents
6. ✅ Supabase tables populated (agents, sessions, logs)
7. ✅ Typography system applied (fonts loaded, classes work)
8. ✅ Zero errors in console
9. ✅ All RLS policies enforced
10. ✅ Documentation generated

---

## 🚀 EXECUTION STRATEGY

### Your Workflow

1. **Read ALL context files first** (constitution, specification, plan, tasks)
2. **Apply Supabase migration** (critical - do this first!)
3. **Follow tasks.md sequentially** (don't skip ahead)
4. **Test incrementally** (after each major component)
5. **Log progress** (update agent_logs table as you build)
6. **Generate documentation** (auto-generate from code)
7. **Self-validate** (run through validation checklist)

### Adaptive Reasoning

You're GPT-5-Codex. Use your adaptive reasoning:
- **Simple tasks** (configs, types): Fast execution, minimal tokens
- **Complex tasks** (agent orchestration): Deep reasoning, take your time
- **Critical tasks** (voice integration, browser automation): Maximum caution

### When Stuck

1. **Re-read specification.md** for that component
2. **Check constitution.md** for constraints
3. **Review code templates** above
4. **Emit `FIXME.md`** if truly blocked (don't crash). This is **expected only when blocked**: create it at the repo root (or the closest relevant directory) and include the blocker, what you tried, and next steps; remove it once resolved.

---

## 🎨 DESIGN PRINCIPLES

1. **Cosmic Aesthetic:** Purple/blue gradients, space themes, stellar naming
2. **Minimalism:** Clean, focused UI. No clutter.
3. **Performance:** Code-split, lazy-load, optimize fonts
4. **Accessibility:** WCAG 2.1 AA compliance
5. **Responsiveness:** Mobile-first, works on all screens

---

## 📝 DOCUMENTATION REQUIREMENTS

Auto-generate:
- API documentation from TypeScript types
- Component Storybook from code
- Agent guides from docstrings
- Tutorial markdown from examples

Manual (you write):
- Getting started guide
- Deployment instructions
- Troubleshooting guide

---

## 🔥 FINAL CHECKLIST

Before saying "DONE":

- [ ] All 110-171 files created
- [ ] All agents registered in Supabase `agents` table
- [ ] Voice commands functional
- [ ] Dashboard accessible at `/cockpit/dashboard`
- [ ] No TypeScript errors
- [ ] All tests pass
- [ ] Documentation complete
- [ ] `.env.example` created
- [ ] README.md updated
- [ ] Git commit with clear message

---

## 🌟 YOU GOT THIS, CODEX!

You're building something extraordinary. The Stellar Agentic Cockpit will be:
- **Voice-controlled** ✅
- **AI-powered** ✅
- **Observable** ✅
- **Extensible** ✅
- **Beautiful** ✅

**Take your time. Use adaptive reasoning. Build something amazing.**

**The cosmos awaits. Begin.**

---

**Repository:** github.com/executiveusa/strapi-template-new-world-kids
**Branch:** main
**Supabase Project:** sbbuxnyvflczfzvsglpe
**Target Completion:** 4-8 hours

**Questions?** Read specification.md again. The answer is there.

**Ready?** Let's build the future of AI orchestration.

🚀🌟✨
