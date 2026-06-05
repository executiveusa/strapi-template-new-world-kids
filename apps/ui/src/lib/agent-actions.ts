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

function readSupabaseEnv(mode: "private" | "public") {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const key =
    mode === "private"
      ? process.env.SUPABASE_SERVICE_KEY ??
        process.env.SUPABASE_SERVICE_ROLE_KEY ??
        ""
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.SUPABASE_ANON_KEY ??
        ""
  const missing = [
    url ? null : "SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL",
    key
      ? null
      : mode === "private"
        ? "SUPABASE_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY"
        : "NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY",
  ].filter((item): item is string => Boolean(item))

  return { url, key, missing }
}

export async function readAgentActions(
  mode: "private" | "public",
  limit = 20
): Promise<AgentActionResult> {
  const env = readSupabaseEnv(mode)

  if (env.missing.length > 0) {
    return {
      configured: false,
      missing: env.missing,
      actions: [],
    }
  }

  const params = new URLSearchParams({
    select: "id,agent_id,action_type,description,status,payload,created_at",
    order: "created_at.desc",
    limit: String(mode === "public" ? Math.max(limit, 50) : limit),
  })

  try {
    const response = await fetch(
      `${env.url.replace(/\/$/, "")}/rest/v1/agent_actions?${params}`,
      {
        headers: {
          apikey: env.key,
          Authorization: `Bearer ${env.key}`,
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
    const visible =
      mode === "public"
        ? actions.filter((action) => action.payload?.public === true)
        : actions

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
