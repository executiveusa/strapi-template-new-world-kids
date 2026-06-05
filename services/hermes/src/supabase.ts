import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

function readSupabaseEnv(env: NodeJS.ProcessEnv) {
  const url = env.SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const serviceKey =
    env.SUPABASE_SERVICE_KEY ?? env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  const missing = [
    url ? null : 'SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL',
    serviceKey ? null : 'SUPABASE_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY',
  ].filter((value): value is string => Boolean(value))

  return { url, serviceKey, missing }
}

export function getSupabaseStatus(env: NodeJS.ProcessEnv = process.env) {
  const { missing } = readSupabaseEnv(env)

  return {
    configured: missing.length === 0,
    missing,
  }
}

export function getSupabaseAdmin(
  env: NodeJS.ProcessEnv = process.env
): SupabaseClient {
  const { url, serviceKey, missing } = readSupabaseEnv(env)

  if (missing.length > 0) {
    throw new Error(`Supabase is not configured: ${missing.join(', ')}`)
  }

  if (!cachedClient) {
    cachedClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return cachedClient
}
