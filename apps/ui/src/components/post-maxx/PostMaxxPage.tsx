"use client"

import { useEffect, useState } from "react"
import { ExternalLink, RefreshCw, ShieldCheck, Sparkles, Target } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { socialOpsHighlights, socialOpsMetrics } from "../site/siteData"

type StatusPayload = {
  ok: boolean
  reachable: boolean
  serverUrl: string
  status?: number
  elapsedMs?: number
  error?: string
  source?: string
}

const KRUG_RULES = [
  "Make the main action obvious in the first screen.",
  "Use plain labels so a non-technical owner can act fast.",
  "Group related tasks together instead of hiding them in menus.",
  "Show status, not mystery.",
]

export function PostMaxxPage() {
  const [status, setStatus] = useState<StatusPayload | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadStatus() {
      try {
        const response = await fetch("/api/post-maxx/status", { cache: "no-store" })
        const payload = (await response.json()) as StatusPayload

        if (!cancelled) {
          setStatus(payload)
        }
      } catch (error) {
        if (!cancelled) {
          setStatus({
            ok: false,
            reachable: false,
            serverUrl: "unknown",
            error: error instanceof Error ? error.message : "POST-MAXX status unavailable",
          })
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadStatus()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="bg-[#071008] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.08),transparent_35%),linear-gradient(180deg,#08110a,#071008)]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.28em] text-[#c9a84c] uppercase">
              POST-MAXX management
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-6xl">
              Social publishing, approval, and distribution in one place.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              This page is built for business owners first. It shows whether the social
              server is reachable, what the agent is scheduled to do, and how social
              turns into leads, trust, and repeatable reach without becoming a daily chore.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={status?.serverUrl || "#status"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-6 py-3 text-sm font-semibold text-[#091109]"
              >
                Open server
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="/ops"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/82"
              >
                Back to ops
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="status" className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-5 w-5 text-[#c9a84c]" />
                Connection status
              </CardTitle>
              <CardDescription className="text-white/60">
                {loading
                  ? "Checking the server..."
                  : status?.ok
                    ? "The POST-MAXX server responded successfully."
                    : "The server is not reachable right now."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">Server URL</p>
                  <p className="mt-2 break-all text-sm text-white/80">{status?.serverUrl ?? "Loading..."}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">Reachability</p>
                  <p className="mt-2 text-sm text-white/80">
                    {status?.reachable ? "Reachable" : "Blocked or offline"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">HTTP status</p>
                  <p className="mt-2 text-sm text-white/80">{status?.status ?? "Pending"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">Response time</p>
                  <p className="mt-2 text-sm text-white/80">{status?.elapsedMs ? `${status.elapsedMs}ms` : "Pending"}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/6 p-4 text-sm leading-7 text-white/70">
                {status?.error
                  ? status.error
                  : "Krug rule: the first thing this page should tell a business owner is whether the system is connected and what to do next."}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4" />
                  Refresh status
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-[#c9a84c]" />
                What this does for the business
              </CardTitle>
              <CardDescription className="text-white/60">
                Clear outcomes first. Features only matter if they change the result.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialOpsHighlights.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/68">
                  {item}
                </div>
              ))}

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Krug-friendly rules
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-white/68">
                  {KRUG_RULES.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <Target className="mt-1 h-4 w-4 shrink-0 text-[#c9a84c]" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {socialOpsMetrics.map((metric) => (
            <Card key={metric.label} className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#c9a84c]">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-serif text-4xl font-semibold text-white">{metric.value}</div>
                <p className="mt-3 text-sm leading-7 text-white/60">{metric.note}</p>
                <Badge className="mt-4 bg-[#c9a84c]/15 text-[#f2d79c]">Business outcome</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-[#c9a84c]/20 bg-[#c9a84c]/6 p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#c9a84c]">
            Next step
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/70">
            Use this page as the owner dashboard for POST-MAXX. When the server is live, this page should show the connection as reachable, show the main actions at a glance, and let the team launch social work without digging through settings.
          </p>
        </div>
      </section>
    </main>
  )
}
