import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export const revalidate = 60 // ISR: revalidate every 60 seconds

export async function GET() {
  try {
    // Query agent_actions for last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentActions, error: actionsError } = await supabaseAdmin
      .from("agent_actions")
      .select("*")
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(50)

    if (actionsError) {
      console.error("Error fetching agent_actions:", actionsError)
      throw actionsError
    }

    // Query weekly_reports for most recent report
    const { data: latestReport, error: reportError } = await supabaseAdmin
      .from("weekly_reports")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (reportError && reportError.code !== "PGRST116") {
      // PGRST116 = no rows returned, which is okay for initial state
      console.error("Error fetching weekly_reports:", reportError)
      throw reportError
    }

    // Query impact_projects
    const { data: projects, error: projectsError } = await supabaseAdmin
      .from("impact_projects")
      .select("*")
      .eq("status", "active")

    if (projectsError) {
      console.error("Error fetching impact_projects:", projectsError)
      throw projectsError
    }

    // Calculate metrics
    const actionsByType = (recentActions || []).reduce(
      (acc, action) => {
        acc[action.action_type] = (acc[action.action_type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const completedActions = (recentActions || []).filter(
      (a) => a.status === "completed",
    ).length

    const pendingActions = (recentActions || []).filter(
      (a) => a.status === "pending",
    ).length

    // Build response
    const metrics = {
      timestamp: new Date().toISOString(),
      summary: {
        total_actions_7d: recentActions?.length || 0,
        completed_actions: completedActions,
        pending_actions: pendingActions,
        active_projects: projects?.length || 0,
        grants_tracked: actionsByType.grant_tracked || 0,
        content_drafted: actionsByType.content_draft || 0,
      },
      recent_activity: (recentActions || []).slice(0, 10).map((action) => ({
        id: action.id,
        agent_id: action.agent_id,
        action_type: action.action_type,
        description: action.description,
        status: action.status,
        created_at: action.created_at,
      })),
      active_projects:
        projects?.map((project) => ({
          id: project.id,
          name: project.name,
          name_es: project.name_es,
          location: project.location,
          status: project.status,
          impact_metrics: project.impact_metrics,
          budget_usd: project.budget_usd,
        })) || [],
      weekly_summary: latestReport
        ? {
            week_label: latestReport.week_label,
            active_programs: latestReport.active_programs,
            grants_tracked: latestReport.grants_tracked,
            content_drafted: latestReport.content_drafted,
            summary_en: latestReport.summary_en,
            summary_es: latestReport.summary_es,
          }
        : null,
    }

    return NextResponse.json(metrics, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
      },
    })
  } catch (error) {
    console.error("Error in /api/ops/metrics:", error)
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 },
    )
  }
}
