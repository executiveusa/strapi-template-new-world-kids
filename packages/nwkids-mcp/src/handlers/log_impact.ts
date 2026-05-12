import { LogImpactInput } from "../tools/schemas.js"
import { adminClient } from "../lib/database.js"

export interface ImpactLogResult {
  success: boolean
  project_id: string | null
  metric_name: string
  metric_value: string | number
  updated_at: string
  error?: string
}

/**
 * Log impact metrics for NWKids programs.
 * Updates the impact_metrics JSONB field in the impact_projects table.
 */
export async function handleLogImpact(
  input: LogImpactInput,
): Promise<ImpactLogResult> {
  const { project_name, metric_name, metric_value, notes } = input

  try {
    // Find the project by name
    const { data: project, error: fetchError } = await adminClient
      .from("impact_projects")
      .select("id, impact_metrics")
      .ilike("name", project_name)
      .single()

    if (fetchError || !project) {
      return {
        success: false,
        project_id: null,
        metric_name,
        metric_value,
        updated_at: new Date().toISOString(),
        error: `Project not found: ${project_name}. Available projects can be queried via hermes_status tool.`,
      }
    }

    // Update the impact_metrics JSONB field
    const currentMetrics = (project.impact_metrics as Record<string, unknown>) || {}
    const updatedMetrics = {
      ...currentMetrics,
      [metric_name]: metric_value,
    }

    const { error: updateError } = await adminClient
      .from("impact_projects")
      .update({
        impact_metrics: updatedMetrics,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id)

    if (updateError) {
      return {
        success: false,
        project_id: project.id,
        metric_name,
        metric_value,
        updated_at: new Date().toISOString(),
        error: `Failed to update metrics: ${updateError.message}`,
      }
    }

    // Log the impact update to agent_actions
    await adminClient.from("agent_actions").insert({
      agent_id: "hermes",
      action_type: "report",
      description: `Impact metric updated: ${project_name} - ${metric_name} = ${metric_value}${notes ? ` (${notes})` : ""}`,
      payload: {
        project_id: project.id,
        project_name,
        metric_name,
        metric_value,
        notes,
      },
      status: "completed",
    })

    return {
      success: true,
      project_id: project.id,
      metric_name,
      metric_value,
      updated_at: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      project_id: null,
      metric_name,
      metric_value,
      updated_at: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
