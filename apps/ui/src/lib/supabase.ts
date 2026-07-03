import { type SupabaseClient, createClient } from "@supabase/supabase-js"

/**
 * Frontend Supabase access — ANON ONLY.
 *
 * Hard rule (AGENTS.md): the frontend builds and runs without any backend
 * secrets. The service role key lives in `services/hermes` exclusively.
 * These factories return `null` when env is missing instead of throwing,
 * so server components can render graceful empty states and the build
 * never fails for lack of credentials.
 */

export function hasSupabasePublicEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/**
 * @deprecated Kept for backward compatibility. Server-side access should go
 * through `readAgentActions` in `agent-actions.ts`, which is anon-only and
 * returns graceful empty states. Returns null if env is missing.
 */
export function hasSupabaseServerEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export function createSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  return createClient(url, key)
}

/**
 * Server-side Supabase client — anon key only. No service role. Returns null
 * if the anon env is missing so callers can render an empty state.
 */
export function createSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  return createClient(url, key)
}
