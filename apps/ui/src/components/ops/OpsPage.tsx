"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"

type OpsMetrics = {
  timestamp: string
  summary: {
    total_actions_7d: number
    completed_actions: number
    pending_actions: number
    active_projects: number
    grants_tracked: number
    content_drafted: number
  }
  recent_activity: Array<{
    id: string
    agent_id: string
    action_type: string
    description: string
    status: string
    created_at: string
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
  weekly_summary: {
    week_label: string
    active_programs: number
    grants_tracked: number
    content_drafted: number
    summary_en: string | null
    summary_es: string | null
  } | null
}

export function OpsPage() {
  const [metrics, setMetrics] = useState<OpsMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("/api/ops/metrics")
        if (!res.ok) throw new Error("Failed to fetch metrics")
        const data = await res.json()
        setMetrics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000) // Refresh every 60s
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080f0a] flex items-center justify-center">
        <div className="text-[#c9a84c] text-lg">Loading operations data...</div>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-[#080f0a] flex items-center justify-center">
        <div className="text-red-400 text-lg">
          Error loading metrics: {error || "No data available"}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080f0a] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section 1: Header Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-2 w-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <p className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase">
              Live Operations
            </p>
          </div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Hermes Operations Dashboard
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/64 max-w-3xl">
            Real-time agent activity, grant tracking, and impact metrics. This
            dashboard shows what Hermes is doing right now — not what we plan to
            do or hope to do, but what is actually happening.
          </p>
          <p className="mt-2 text-sm text-white/40">
            Last updated:{" "}
            {new Date(metrics.timestamp).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </motion.div>

        {/* Section 2: Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <MetricCard
            label="Actions (7 days)"
            value={metrics.summary.total_actions_7d}
            status="neutral"
          />
          <MetricCard
            label="Completed"
            value={metrics.summary.completed_actions}
            status="success"
          />
          <MetricCard
            label="Grants Tracked"
            value={metrics.summary.grants_tracked}
            status="success"
          />
          <MetricCard
            label="Content Drafted"
            value={metrics.summary.content_drafted}
            status="success"
          />
        </motion.div>

        {/* Section 3: Active Programs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase mb-6">
            Active Programs
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {metrics.active_projects.map((project) => (
              <div
                key={project.id}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8"
              >
                <h3 className="text-xl font-semibold text-white">
                  {project.name}
                </h3>
                {project.name_es && (
                  <p className="mt-1 text-sm text-white/50">{project.name_es}</p>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-[#c9a84c]/20 px-3 py-1 text-xs font-medium text-[#c9a84c]">
                    {project.location}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                    {project.status}
                  </span>
                </div>
                {project.budget_usd && (
                  <p className="mt-3 text-sm text-white/50">
                    Budget: ${parseFloat(project.budget_usd).toLocaleString()}
                  </p>
                )}
                {project.impact_metrics &&
                  Object.keys(project.impact_metrics).length > 0 && (
                    <div className="mt-4 space-y-2">
                      {Object.entries(project.impact_metrics).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-white/50">
                              {key.replace(/_/g, " ")}:
                            </span>
                            <span className="text-white/80 font-medium">
                              {String(value)}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  )}
              </div>
            ))}
            {metrics.active_projects.length === 0 && (
              <div className="col-span-2 rounded-[28px] border border-white/10 bg-white/[0.03] p-12 text-center">
                <p className="text-white/40">
                  No active projects in the database yet.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Section 4: Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase mb-6">
            Recent Activity
          </h2>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <div className="space-y-4">
              {metrics.recent_activity.map((action) => (
                <div
                  key={action.id}
                  className="flex items-start gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                >
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-[#c9a84c]" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {action.description}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-white/50">
                          <span>{action.agent_id}</span>
                          <span>·</span>
                          <span>{action.action_type}</span>
                          <span>·</span>
                          <span>
                            {new Date(action.created_at).toLocaleString(
                              "en-US",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          action.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : action.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-white/10 text-white/60"
                        }`}
                      >
                        {action.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {metrics.recent_activity.length === 0 && (
                <p className="text-center text-white/40 py-8">
                  No recent activity in the last 7 days.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section 5: Weekly Summary */}
        {metrics.weekly_summary && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase mb-6">
              Weekly Summary — {metrics.weekly_summary.week_label}
            </h2>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase mb-3">
                    English
                  </p>
                  <p className="text-base leading-7 text-white/80">
                    {metrics.weekly_summary.summary_en ||
                      "No summary available yet."}
                  </p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase mb-3">
                    Español
                  </p>
                  <p className="text-base leading-7 text-white/80">
                    {metrics.weekly_summary.summary_es ||
                      "Resumen no disponible aún."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section 6: Proof Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-[28px] border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-8"
        >
          <h2 className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase mb-4">
            About This Dashboard
          </h2>
          <div className="space-y-4 text-sm leading-7 text-white/70">
            <p>
              This dashboard pulls live data from the Hermes agent operations
              database. Every action, every grant tracked, every piece of
              content drafted — all of it is logged to Supabase and displayed
              here.
            </p>
            <p>
              This is not a pitch deck. This is not a projection. This is a
              real-time view of what the agent system is doing right now to
              support New World Kids programs.
            </p>
            <p>
              The dashboard refreshes every 60 seconds. The data you see
              represents the actual state of the system at the timestamp shown
              at the top of the page.
            </p>
            <p className="text-white/50 text-xs pt-2">
              Source: Supabase agent_actions, weekly_reports, and
              impact_projects tables. Schema defined in
              infrastructure/hermes/init.sql.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  status,
}: {
  label: string
  value: number
  status: "success" | "warning" | "neutral"
}) {
  const statusColors = {
    success: "border-green-500/20 bg-green-500/5",
    warning: "border-yellow-500/20 bg-yellow-500/5",
    neutral: "border-white/10 bg-white/[0.03]",
  }

  return (
    <div
      className={`rounded-[28px] border p-6 ${statusColors[status]}`}
    >
      <p className="text-xs tracking-[0.24em] text-white/50 uppercase">
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold text-white font-serif">
        <CountUp end={value} duration={1.5} />
      </p>
    </div>
  )
}
