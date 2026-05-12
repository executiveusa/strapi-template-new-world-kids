import { HermesStatusInput } from "../tools/schemas.js"
import { adminClient } from "../lib/database.js"

export interface HermesStatusResult {
  summary: {
    total_actions: number
    by_agent: Record<string, number>
    by_action_type: Record<string, number>
    by_status: Record<string, number>
    date_range: {
      start: string
      end: string
      days: number
    }
  }
  recent_activity: Array<{
    id: string
    agent_id: string
    action_type: string
    description: string
    status: string
    created_at: string
    payload: Record<string, unknown>
  }>
  active_projects: Array<{
    id: string
    name: string
    name_es: string | null
    location: string
    status: string
    impact_metrics: Record<string, unknown>
    budget_usd: string | null
  }>
}

/**
 * Get current Hermes agent status and recent activity.
 * Queries agent_actions table and returns summary + details.
 */
export async function handleHermesStatus(
  input: HermesStatusInput,
): Promise<HermesStatusResult> {
  const { days, agent_id, action_type } = input

  // Calculate date range
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Build query
  let query = adminClient
    .from("agent_actions")
    .select("*")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())
    .order("created_at", { ascending: false })

  if (agent_id && agent_id !== "all") {
    query = query.eq("agent_id", agent_id)
  }

  if (action_type) {
    query = query.eq("action_type", action_type)
  }

  const { data: actions, error: actionsError } = await query

  if (actionsError) {
    throw new Error(`Failed to fetch agent actions: ${actionsError.message}`)
  }

  // Calculate summary statistics
  const byAgent: Record<string, number> = {}
  const byActionType: Record<string, number> = {}
  const byStatus: Record<string, number> = {}

  for (const action of actions || []) {
    byAgent[action.agent_id] = (byAgent[action.agent_id] || 0) + 1
    byActionType[action.action_type] = (byActionType[action.action_type] || 0) + 1
    byStatus[action.status] = (byStatus[action.status] || 0) + 1
  }

  // Fetch active projects
  const { data: projects, error: projectsError } = await adminClient
    .from("impact_projects")
    .select("*")
    .eq("status", "active")

  if (projectsError) {
    throw new Error(`Failed to fetch projects: ${projectsError.message}`)
  }

  return {
    summary: {
      total_actions: (actions || []).length,
      by_agent: byAgent,
      by_action_type: byActionType,
      by_status: byStatus,
      date_range: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        days,
      },
    },
    recent_activity: (actions || []).slice(0, 20).map((action) => ({
      id: action.id,
      agent_id: action.agent_id,
      action_type: action.action_type,
      description: action.description,
      status: action.status,
      created_at: action.created_at,
      payload: action.payload || {},
    })),
    active_projects:
      projects?.map((project) => ({
        id: project.id,
        name: project.name,
        name_es: project.name_es,
        location: project.location,
        status: project.status,
        impact_metrics: project.impact_metrics || {},
        budget_usd: project.budget_usd,
      })) || [],
  }
}
