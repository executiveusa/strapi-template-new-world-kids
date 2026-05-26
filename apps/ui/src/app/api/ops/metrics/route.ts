import { NextResponse } from "next/server"

import {
  createSupabaseServerClient,
  hasSupabaseServerEnv,
} from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const revalidate = 60

type AgentAction = {
  id: string
  agent_id: string
  action_type: string
  description: string
  payload: Record<string, unknown> | null
  status: string
  created_at: string
}

type ImpactProgram = {
  id: string
  name: string
  name_es: string | null
  location: string
  status: string
  impact_metrics: Record<string, unknown> | null
}

type WeeklyReport = {
  week_label: string
  active_programs: number
  grants_tracked: number
  content_drafted: number
  summary_en: string | null
}

const GRANT_ACTION_TYPES = ["grant_tracked", "grant_draft"] as const

export async function GET() {
  if (!hasSupabaseServerEnv()) {
    return NextResponse.json(
      {
        grants: {
          tracked: 0,
          awarded: 0,
          pipeline_usd: 0,
          awarded_usd: 0,
          win_rate: 0,
        },
        content: {
          posts_published: 0,
          weeks_active: 0,
        },
        agent: {
          last_heartbeat: null,
          actions_7d: 0,
          actions_30d: 0,
          recent: [],
        },
        programs: [],
        weekly: null,
        generated_at: new Date().toISOString(),
        disabled_reason: "Supabase environment variables are not configured.",
      },
      { status: 503 }
    )
  }

  const supabase = createSupabaseServerClient()

  try {
    const [
      grantResult,
      contentResult,
      recentResult,
      heartbeatResult,
      actions7dResult,
      actions30dResult,
      programsResult,
      weeklyResult,
    ] = await Promise.all([
      supabase
        .from("agent_actions")
        .select("*")
        .in("action_type", [...GRANT_ACTION_TYPES]),
      supabase
        .from("agent_actions")
        .select("created_at")
        .eq("action_type", "content_draft")
        .eq("status", "completed"),
      supabase
        .from("agent_actions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("agent_actions")
        .select("created_at")
        .eq("action_type", "heartbeat")
        .order("created_at", { ascending: false })
        .limit(1),
      supabase
        .from("agent_actions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date(Date.now() - 7 * 86400000).toISOString()),
      supabase
        .from("agent_actions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date(Date.now() - 30 * 86400000).toISOString()),
      supabase.from("impact_projects").select("*").eq("status", "active"),
      supabase
        .from("weekly_reports")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1),
    ])

    const grantActions = (grantResult.data ?? []) as AgentAction[]
    const contentActions = (contentResult.data ?? []) as Pick<
      AgentAction,
      "created_at"
    >[]
    const recentActions = (recentResult.data ?? []) as AgentAction[]
    const heartbeat = heartbeatResult.data?.[0]?.created_at ?? null
    const programs = (programsResult.data ?? []) as ImpactProgram[]
    const weekly = (weeklyResult.data?.[0] ?? null) as WeeklyReport | null

    const tracked = grantActions.length
    const awarded = grantActions.filter((action) => {
      const payload = action.payload ?? {}

      return (
        action.status === "completed" &&
        (payload.outcome === "awarded" || payload.status === "awarded")
      )
    }).length

    const pipelineUsd = grantActions.reduce((sum, action) => {
      return sum + (Number(action.payload?.amount_requested) || 0)
    }, 0)

    const awardedUsd = grantActions.reduce((sum, action) => {
      return sum + (Number(action.payload?.amount_awarded) || 0)
    }, 0)

    const uniqueWeeks = new Set(
      contentActions.map((action) => {
        const date = new Date(action.created_at)
        const januaryFirst = new Date(date.getFullYear(), 0, 1)
        const week =
          Math.ceil(
            ((date.getTime() - januaryFirst.getTime()) / 86400000 +
              januaryFirst.getDay() +
              1) /
              7
          ) || 1

        return `${date.getFullYear()}-W${week}`
      })
    )

    return NextResponse.json({
      grants: {
        tracked,
        awarded,
        pipeline_usd: pipelineUsd,
        awarded_usd: awardedUsd,
        win_rate: tracked > 0 ? Math.round((awarded / tracked) * 100) : 0,
      },
      content: {
        posts_published: contentActions.length,
        weeks_active: uniqueWeeks.size,
      },
      agent: {
        last_heartbeat: heartbeat,
        actions_7d: actions7dResult.count ?? 0,
        actions_30d: actions30dResult.count ?? 0,
        recent: recentActions,
      },
      programs,
      weekly,
      generated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[NWKids ops/metrics]", error)

    return NextResponse.json(
      {
        error: "Failed to load metrics",
        generated_at: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
