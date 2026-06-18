import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'

import {
  fiscalSponsor,
  getSupportRails,
  impactPillars,
  socialLinks,
  trustDocuments,
} from './config/mission-data.js'

import { agentProfiles } from './config/agent-profiles.js'
import { HEARTBEAT_INTERVAL_MS, logHeartbeat, startHeartbeatScheduler } from './heartbeat.js'
import { answerArticleQuestion } from './lib/article-chat.js'
import { getSupabaseStatus } from './supabase.js'

type ArticleChatPayload = {
  title: string
  url?: string
  question: string
  content: string
  locale?: string
  tags?: string[]
}

const currentFile = fileURLToPath(import.meta.url)
const currentDir = dirname(currentFile)
const serviceRoot = resolve(currentDir, '..')
const repoRoot = resolve(serviceRoot, '..', '..')
const localSkillRegistryPath = resolve(serviceRoot, 'skills', 'registry.json')
const legacySkillManifestPath = resolve(repoRoot, 'agent-skills', 'source-status.json')
const startedAt = new Date().toISOString()

async function readJsonFile(path: string) {
  const raw = await readFile(path, 'utf8')
  return JSON.parse(raw) as Record<string, unknown>
}

async function readSkillRegistry() {
  try {
    const localRegistry = await readJsonFile(localSkillRegistryPath)

    let legacyManifest: Record<string, unknown> | null = null
    try {
      legacyManifest = await readJsonFile(legacySkillManifestPath)
    } catch {
      legacyManifest = null
    }

    return {
      activeSource: 'local-registry',
      registryPath: 'services/hermes/skills/registry.json',
      registry: localRegistry,
      legacyManifest,
    }
  } catch {
    const legacyManifest = await readJsonFile(legacySkillManifestPath)
    return {
      activeSource: 'legacy-manifest',
      registryPath: 'agent-skills/source-status.json',
      registry: null,
      legacyManifest,
    }
  }
}

function getIntegrations(env: NodeJS.ProcessEnv) {
  return {
    synthiaGatewayUrl: env.SYNTHIA_GATEWAY_URL || null,
    synthiaModel: env.SYNTHIA_MODEL || 'gpt-4o-mini',
    gbrainCommand: env.GBRAIN_MCP_COMMAND || 'gbrain serve',
    browserHarnessUrl: env.BROWSER_HARNESS_URL || null,
    skipPublicUrl: env.SKIP_PUBLIC_URL || 'https://helloskip.com/grants',
    creemPublicUrl: env.CREEM_PUBLIC_URL || null,
    buyMeACoffeeUrl: env.BUY_ME_A_COFFEE_URL || null,
  }
}

const app = express()

app.use(express.json({ limit: '1mb' }))

app.use((_request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.options('*path', (_request, response) => {
  response.status(204).end()
})

app.get('/health', (_request, response) => {
  response.json({
    ok: true,
    service: '@repo/hermes',
    timestamp: new Date().toISOString(),
  })
})

app.get('/status', (_request, response) => {
  const supabase = getSupabaseStatus()
  response.json({
    ok: true,
    service: '@repo/hermes',
    started_at: startedAt,
    uptime_seconds: Math.round(process.uptime()),
    heartbeat: {
      interval_hours: HEARTBEAT_INTERVAL_MS / 3600000,
      scheduler_enabled: process.env.HERMES_ENABLE_HEARTBEAT === 'true',
      supabase_configured: supabase.configured,
      missing_env: supabase.missing,
    },
    integrations: getIntegrations(process.env),
  })
})

app.get('/heartbeat', (_request, response) => {
  const supabase = getSupabaseStatus()
  response.json({
    ok: supabase.configured,
    ready_to_log: supabase.configured,
    interval_hours: HEARTBEAT_INTERVAL_MS / 3600000,
    missing_env: supabase.missing,
    timestamp: new Date().toISOString(),
  })
})

app.post('/heartbeat', async (_request, response, next) => {
  try {
    const result = await logHeartbeat()
    response.status(result.logged ? 200 : 503).json(result)
  } catch (error) {
    next(error)
  }
})

app.get('/api/trust/documents', (_request, response) => {
  const publicUrl = process.env.APP_PUBLIC_URL || 'http://localhost:3000'
  response.json({
    fiscalSponsor,
    documents: trustDocuments.map((document) => ({
      ...document,
      absoluteHref: `${publicUrl.replace(/\/$/, '')}${document.href}`,
    })),
  })
})

app.get('/api/pillars', (_request, response) => {
  response.json({ pillars: impactPillars })
})

app.get('/api/social-links', (_request, response) => {
  response.json({ socialLinks })
})

app.get('/api/agents', (_request, response) => {
  response.json({
    profiles: agentProfiles,
    sharedFiles: {
      playbook: 'services/hermes/agents/shared/PLAYBOOK.md',
      safety: 'services/hermes/agents/shared/SAFETY.md',
      tools: 'services/hermes/agents/shared/TOOLS.md',
    },
    integrations: getIntegrations(process.env),
  })
})

app.get('/api/skills', async (_request, response, next) => {
  try {
    const manifest = await readSkillRegistry()
    response.json(manifest)
  } catch (error) {
    next(error)
  }
})

app.get('/api/support-rails', (_request, response) => {
  response.json({ rails: getSupportRails(process.env) })
})

app.post('/api/chat/article', async (request, response, next) => {
  try {
    const payload = request.body as Partial<ArticleChatPayload>

    if (!payload.question || !payload.content || !payload.title) {
      response.status(400).json({
        error: 'title, question, and content are required.',
      })
      return
    }

    const result = await answerArticleQuestion(payload as ArticleChatPayload, process.env)
    response.json(result)
  } catch (error) {
    next(error)
  }
})

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found.' })
})

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    const message = error instanceof Error ? error.message : 'Unknown error'
    response.status(500).json({ error: message })
  }
)

startHeartbeatScheduler()

const port = Number(process.env.PORT || 4010)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Hermes service listening on http://localhost:${port}`)
})
