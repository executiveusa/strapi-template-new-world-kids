/**
 * Public agent-action ledger reader — ANON ONLY.
 *
 * The frontend never holds the service role key. If anon env is missing or
 * Supabase is unreachable, callers get `{ configured: false, actions: [] }`
 * and can render a graceful empty state. The build never fails for lack of
 * credentials.
 *
 * The old `mode: "private"` path that read `SUPABASE_SERVICE_ROLE_KEY` has
 * been removed. Private/internal views live in `services/hermes` now.
 */

export type AgentAction = {
  id: string
  agent_id: string | null
  action_type: string
  description: string | null
  status: string | null
  payload: Record<string, unknown> | null
  created_at: string
}

type AgentActionResult = {
  configured: boolean
  missing: string[]
  actions: AgentAction[]
  error?: string
}

export async function readAgentActions(limit = 20): Promise<AgentActionResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

  const missing = [
    url ? null : "NEXT_PUBLIC_SUPABASE_URL",
    key ? null : "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ].filter(Boolean)

  if (missing.length > 0) {
    return {
      configured: false,
      missing,
      actions: [],
    }
  }

  const params = new URLSearchParams({
    select: "id,agent_id,action_type,description,status,payload,created_at",
    order: "created_at.desc",
    limit: String(Math.max(limit, 50)),
  })

  try {
    const response = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/agent_actions?${params}`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      return {
        configured: true,
        missing: [],
        actions: [],
        error: `Supabase returned ${response.status}`,
      }
    }

    const actions = (await response.json()) as AgentAction[]
    const visible = actions.filter((action) => action.payload?.public === true)

    return {
      configured: true,
      missing: [],
      actions: visible.slice(0, limit),
    }
  } catch (error) {
    return {
      configured: true,
      missing: [],
      actions: [],
      error: error instanceof Error ? error.message : "Unknown Supabase error",
    }
  }
}
