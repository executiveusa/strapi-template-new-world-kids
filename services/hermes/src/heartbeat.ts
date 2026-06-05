import { getSupabaseAdmin, getSupabaseStatus } from './supabase.js'

export const HEARTBEAT_INTERVAL_MS = 4 * 60 * 60 * 1000

export type HeartbeatResult =
  | {
      logged: true
      id: string | null
      status: 'completed'
      timestamp: string
    }
  | {
      logged: false
      status: 'blocked'
      timestamp: string
      missingEnv: string[]
    }

export async function logHeartbeat(
  env: NodeJS.ProcessEnv = process.env
): Promise<HeartbeatResult> {
  const timestamp = new Date().toISOString()
  const supabase = getSupabaseStatus(env)

  if (!supabase.configured) {
    return {
      logged: false,
      status: 'blocked',
      timestamp,
      missingEnv: supabase.missing,
    }
  }

  const { data, error } = await getSupabaseAdmin(env)
    .from('agent_actions')
    .insert({
      agent_id: 'hermes',
      action_type: 'heartbeat',
      description: 'Hermes production heartbeat',
      payload: {
        service: '@repo/hermes',
        interval_hours: 4,
        uptime_seconds: Math.round(process.uptime()),
        node_env: env.NODE_ENV ?? 'development',
      },
      status: 'completed',
    })
    .select('id')
    .single()

  if (error) {
    throw new Error(`Failed to log Hermes heartbeat: ${error.message}`)
  }

  return {
    logged: true,
    id: typeof data?.id === 'string' ? data.id : null,
    status: 'completed',
    timestamp,
  }
}

export function startHeartbeatScheduler(env: NodeJS.ProcessEnv = process.env) {
  if (env.HERMES_ENABLE_HEARTBEAT !== 'true') {
    return null
  }

  const timer = setInterval(() => {
    void logHeartbeat(env).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('[Hermes] heartbeat failed', error)
    })
  }, HEARTBEAT_INTERVAL_MS)

  if (typeof timer === 'object' && timer && 'unref' in timer) {
    ;(timer as { unref: () => void }).unref()
  }

  return timer
}
