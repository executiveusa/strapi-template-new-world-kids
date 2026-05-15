"use client"

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { formatDistanceToNowStrict } from "date-fns"
import { useEffect, useMemo, useRef, useState } from "react"

import { Link } from "@/lib/navigation"

type AgentAction = {
  id: string
  agent_id: string
  action_type: string
  description: string
  status: string
  created_at: string
}

type ImpactProgram = {
  id: string
  name: string
  name_es: string | null
  location: "seattle" | "puerto-vallarta" | "both" | "remote" | string
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

type OpsMetrics = {
  grants: {
    tracked: number
    awarded: number
    pipeline_usd: number
    awarded_usd: number
    win_rate: number
  }
  content: {
    posts_published: number
    weeks_active: number
  }
  agent: {
    last_heartbeat: string | null
    actions_7d: number
    actions_30d: number
    recent: AgentAction[]
  }
  programs: ImpactProgram[]
  weekly: WeeklyReport | null
  generated_at: string
  error?: string
}

const AGENT_ACCENTS: Record<string, string> = {
  hermes: "#c9a84c",
  "grant-hunter": "#4ade80",
  "content-engine": "#60a5fa",
}

const LOCATION_LABELS: Record<string, string> = {
  seattle: "Seattle",
  "puerto-vallarta": "Puerto Vallarta",
  both: "Both",
  remote: "Remote",
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatRelativeTime(value: string | null) {
  if (!value) {
    return "Pending"
  }

  return `${formatDistanceToNowStrict(new Date(value), { addSuffix: true })}`
}

function NumberTicker({
  value,
  formatter,
}: {
  value: number
  formatter?: (value: number) => string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(formatter ? formatter(0) : "0")

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplay(formatter ? formatter(latest) : latest.toString())
    })

    return unsubscribe
  }, [formatter, rounded])

  useEffect(() => {
    if (!inView) {
      return
    }

    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: "easeOut",
    })

    return controls.stop
  }, [inView, motionValue, value])

  return <span ref={ref}>{display}</span>
}

function MetricCard({
  value,
  formatter,
  label,
  sublabel,
  delay,
}: {
  value: number
  formatter?: (value: number) => string
  label: string
  sublabel: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="rounded-[20px] border border-white/[0.08] bg-[#0c1710] p-6"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c]">{label}</p>
      <div className="mt-5 font-serif text-4xl font-semibold text-white">
        <NumberTicker value={value} formatter={formatter} />
      </div>
      <p className="mt-4 text-sm leading-6 text-white/58">{sublabel}</p>
    </motion.div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-[20px] border border-white/[0.08] bg-white/5"
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="h-80 animate-pulse rounded-[20px] border border-white/[0.08] bg-white/5" />
        <div className="h-80 animate-pulse rounded-[20px] border border-white/[0.08] bg-white/5" />
      </div>
    </div>
  )
}

export function OpsPage() {
  const [data, setData] = useState<OpsMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadMetrics() {
      try {
        const response = await fetch("/api/ops/metrics", {
          cache: "no-store",
        })
        const payload = (await response.json()) as OpsMetrics

        if (!active) {
          return
        }

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to load operations metrics")
        }

        setData(payload)
        setError(null)
      } catch (loadError) {
        if (!active) {
          return
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load operations metrics"
        )
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadMetrics()
    const interval = window.setInterval(() => {
      void loadMetrics()
    }, 30000)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  const hasActivity = (data?.agent.recent.length ?? 0) > 0
  const generatedLabel = useMemo(
    () => formatRelativeTime(data?.generated_at ?? null),
    [data?.generated_at]
  )

  return (
    <div className="bg-[#080f0a]">
      <div className="border-b border-white/[0.08] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.26em] text-[#c9a84c]">
            HERMES - LIVE OPERATIONS LEDGER
          </p>
          <div className="flex items-center gap-3 text-sm text-white/62">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span>Live</span>
            <span>{generatedLabel}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
        {loading && !data ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-10">
            {error ? (
              <div className="rounded-[20px] border border-red-400/20 bg-red-500/5 p-5 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                value={data?.grants.tracked ?? 0}
                label="Grant opportunities tracked"
                sublabel={`${data?.grants.awarded ?? 0} won`}
                delay={0}
              />
              <MetricCard
                value={data?.grants.win_rate ?? 0}
                formatter={(value) => `${value}%`}
                label="Grant success rate"
                sublabel={`${formatCurrency(data?.grants.pipeline_usd ?? 0)} pipeline`}
                delay={0.05}
              />
              <MetricCard
                value={data?.content.posts_published ?? 0}
                label="Bilingual posts published"
                sublabel={`${data?.content.weeks_active ?? 0} weeks active`}
                delay={0.1}
              />
              <MetricCard
                value={data?.agent.actions_7d ?? 0}
                label="Agent actions (7 days)"
                sublabel={`Last heartbeat: ${formatRelativeTime(
                  data?.agent.last_heartbeat ?? null
                )}`}
                delay={0.15}
              />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55 }}
                className="rounded-[20px] border border-white/[0.08] bg-[#0c1710] p-6"
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c]">
                      Programs running now
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-semibold text-white">
                      Active programs
                    </h2>
                  </div>
                </div>

                <div className="grid gap-4">
                  {(data?.programs ?? []).map((program) => {
                    const youthServed =
                      Number(program.impact_metrics?.youth_served) || null

                    return (
                      <div
                        key={program.id}
                        className="rounded-[20px] border border-white/[0.08] bg-black/15 p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {program.name}
                            </h3>
                            <p className="mt-1 text-sm text-[#c9a84c]">
                              {program.name_es}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/64">
                              {LOCATION_LABELS[program.location] ?? program.location}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-200">
                              <span className="h-2 w-2 rounded-full bg-emerald-400" />
                              Active
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 text-sm leading-6 text-white/58">
                          {youthServed ? `${youthServed} youth served` : "Impact metrics syncing"}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="rounded-[20px] border border-white/[0.08] bg-[#0c1710] p-6"
              >
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c]">
                    Recent agent actions
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold text-white">
                    Live activity feed
                  </h2>
                </div>

                {hasActivity ? (
                  <div className="space-y-4">
                    {(data?.agent.recent ?? []).map((action) => (
                      <div
                        key={action.id}
                        className="rounded-[18px] border border-white/[0.08] bg-black/15 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-start gap-3">
                            <span
                              className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{
                                background:
                                  AGENT_ACCENTS[action.agent_id] ?? "#f4edd9",
                              }}
                            />
                            <div className="min-w-0">
                              <p className="line-clamp-2 text-sm leading-6 text-white">
                                {action.description}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-white/58">
                                  {action.action_type}
                                </span>
                                <span className="rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-[#e5cb7d]">
                                  {action.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="shrink-0 text-xs text-white/42">
                            {formatRelativeTime(action.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[18px] border border-white/[0.08] bg-black/15 p-5 text-sm leading-7 text-white/58">
                    Hermes is in bootstrap. First heartbeat pending. Check back in
                    4 hours.
                  </div>
                )}
              </motion.div>
            </section>

            {data?.weekly ? (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55 }}
                className="rounded-[20px] border border-[#c9a84c]/30 bg-[#151108] p-6"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[#c9a84c]">
                  Week of {data.weekly.week_label}
                </p>
                <p className="mt-4 max-w-4xl text-base leading-8 text-white/72">
                  {data.weekly.summary_en}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      label: "Active programs",
                      value: data.weekly.active_programs,
                    },
                    {
                      label: "Grants tracked",
                      value: data.weekly.grants_tracked,
                    },
                    {
                      label: "Content drafted",
                      value: data.weekly.content_drafted,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[18px] border border-white/[0.08] bg-black/15 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-white/48">
                        {item.label}
                      </p>
                      <p className="mt-3 font-serif text-3xl font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ) : null}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55 }}
              className="grid gap-6 rounded-[24px] border border-[#c9a84c]/20 bg-[#19140b] p-6 md:grid-cols-[1fr_1fr]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c]">
                  What this page proves
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-white">
                  Operations are visible on purpose.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-white/66">
                  These numbers are logged by Hermes every time it acts. Every
                  row is a decision made without requiring human approval for
                  routine work.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c]">
                    What happens next
                  </p>
                  <p className="mt-4 max-w-xl text-base leading-8 text-white/66">
                    The system improves every cycle. Every grant that fails
                    improves the targeting. The operational intelligence compounds
                    automatically.
                  </p>
                </div>

                <div>
                  <Link
                    href="/donate"
                    className="inline-flex items-center rounded-full bg-[#c9a84c] px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                  >
                    Support the mission →
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        )}
      </div>
    </div>
  )
}
