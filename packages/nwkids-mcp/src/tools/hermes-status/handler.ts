import { authenticate } from "../../auth/api-keys.js"
import { supabaseAdmin } from "../../db/client.js"

export async function hermesStatus(input: { api_key: string }) {
  const org = await authenticate(input.api_key)

  const [grantData, contentData, heartbeatData, programsData, budgetData] =
    await Promise.all([
      supabaseAdmin
        .from("agent_actions")
        .select("status, payload")
        .in("action_type", ["grant_tracked", "grant_draft"]),
      supabaseAdmin
        .from("agent_actions")
        .select("created_at")
        .eq("action_type", "content_draft")
        .eq("status", "completed"),
      supabaseAdmin
        .from("agent_actions")
        .select("created_at")
        .eq("action_type", "heartbeat")
        .order("created_at", { ascending: false })
        .limit(1),
      supabaseAdmin
        .from("impact_projects")
        .select("name, name_es, status, location, impact_metrics")
        .eq("status", "active"),
      supabaseAdmin
        .from("agent_actions")
        .select("payload")
        .eq("action_type", "heartbeat")
        .order("created_at", { ascending: false })
        .limit(1),
    ])

  const grants = (grantData.data ?? []).filter((grant) => {
    const payload =
      grant.payload && typeof grant.payload === "object"
        ? (grant.payload as Record<string, unknown>)
        : {}

    return !payload.org_id || payload.org_id === org.org_id
  })
  const lastHeartbeat = heartbeatData.data?.[0]?.created_at ?? null
  const lastBudget = budgetData.data?.[0]?.payload as
    | Record<string, unknown>
    | undefined

  return {
    org: { id: org.org_id, name: org.org_name, plan: org.plan },
    grants: {
      tracked: grants.length,
      in_review: grants.filter((grant) => grant.status === "pending").length,
      awarded_ytd: grants.filter((grant) => {
        const payload =
          grant.payload && typeof grant.payload === "object"
            ? (grant.payload as Record<string, unknown>)
            : {}

        return payload.status === "awarded"
      }).length,
      pipeline_usd: grants.reduce((sum, grant) => {
        const payload =
          grant.payload && typeof grant.payload === "object"
            ? (grant.payload as Record<string, unknown>)
            : {}

        return sum + (Number(payload.amount_requested) || 0)
      }, 0),
    },
    content: {
      posts_this_week:
        contentData.data?.filter((item) => {
          const createdAt = new Date(item.created_at)

          return Date.now() - createdAt.getTime() < 7 * 86400000
        }).length ?? 0,
    },
    budget: {
      daily_cap: 50,
      used_today: Number(lastBudget?.cost_today) || 0,
      remaining: 50 - (Number(lastBudget?.cost_today) || 0),
    },
    programs: programsData.data ?? [],
    last_heartbeat: lastHeartbeat,
    health: !lastHeartbeat
      ? "red"
      : Date.now() - new Date(lastHeartbeat).getTime() < 5 * 3600000
        ? "green"
        : "yellow",
  }
}
