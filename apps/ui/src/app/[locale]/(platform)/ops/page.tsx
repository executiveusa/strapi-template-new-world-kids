import Link from "next/link"
import { cookies } from "next/headers"

import { readAgentActions } from "../../../../lib/agent-actions"
import { HermesVoiceChat } from "../../../../components/homepage/HermesVoiceChat"

export const dynamic = "force-dynamic"

async function getOpsAccessState() {
  const accessToken = process.env.OPS_ACCESS_TOKEN
  if (!accessToken) return { authorized: false, reason: "missing-secret" as const }
  const sessionCookie = (await cookies()).get("nwkids_ops")?.value
  if (sessionCookie !== accessToken) return { authorized: false, reason: "missing-session" as const }
  return { authorized: true, reason: null }
}

function formatTime(value: string | null | undefined) {
  if (!value) return "No heartbeat logged"
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
}

export default async function OpsPage() {
  const auth = await getOpsAccessState()
  const actions = auth.authorized
    ? await readAgentActions("private", 50)
    : { configured: false, missing: [], actions: [], error: null }

  const lastHeartbeat = actions.actions.find((a) => a.action_type === "heartbeat")

  const metrics = {
    missions: actions.actions.filter((a) => a.action_type === "mission_run").length,
    grants: actions.actions.filter((a) => a.action_type === "grant_tracked").length,
    clips: actions.actions.filter((a) => a.action_type === "clip_created").length,
    reports: actions.actions.filter((a) => a.action_type === "report").length,
  }

  if (!auth.authorized) {
    return (
      <div className="min-h-screen bg-[#060e08] px-6 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-[#c9a84c]/20 bg-[#0d1610] p-8 text-center">
          <p className="text-xs tracking-[0.22em] text-[#c9a84c]/70 uppercase">Auth gate active</p>
          <h2 className="mt-4 font-serif text-2xl text-white">Private ops — access required</h2>
          <p className="mt-3 text-sm text-white/50">
            {auth.reason === "missing-secret"
              ? "OPS_ACCESS_TOKEN is not configured in environment."
              : "No valid session cookie. Set nwkids_ops cookie to the access token value."}
          </p>
          <Link href="/en" className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2 text-sm text-white/60">
            ← Back to site
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#060e08] px-6 py-12 md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-[#c9a84c]/70 uppercase">Private ops</p>
            <h1 className="mt-1 font-serif text-3xl text-white">Hermes mission control</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${lastHeartbeat ? "bg-emerald-400" : "bg-amber-400"}`} />
            <span className="text-sm text-white/50">{lastHeartbeat ? "Agent active" : "Waiting for heartbeat"}</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-white/8 bg-[#0d1610] p-5">
            <p className="text-xs text-white/40">Last heartbeat</p>
            <p className="mt-2 text-sm font-semibold text-[#c9a84c]">{formatTime(lastHeartbeat?.created_at)}</p>
          </div>
          {[
            ["Mission runs", metrics.missions],
            ["Impact reports", metrics.reports],
            ["Grants tracked", metrics.grants],
            ["Clips created", metrics.clips],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-2xl border border-white/8 bg-[#0d1610] p-5">
              <p className="text-xs text-white/40">{label}</p>
              <p className="mt-2 text-4xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Main grid — voice chat + ledger */}
        <div className="grid gap-6 lg:grid-cols-[26rem_1fr]">

          {/* Voice chat with Hermes */}
          <div className="rounded-2xl border border-[#c9a84c]/20 bg-[#0d1610] overflow-hidden">
            <div className="border-b border-white/8 px-6 py-4">
              <p className="text-xs tracking-[0.22em] text-[#c9a84c]/70 uppercase">Hermes voice interface</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Talk to the agent</h2>
              <p className="mt-1 text-xs text-white/40">Private ops only — not visible publicly</p>
            </div>
            <HermesVoiceChat />
          </div>

          {/* Agent action ledger */}
          <div className="rounded-2xl border border-white/8 bg-[#0d1610] overflow-hidden">
            <div className="border-b border-white/8 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Latest agent actions</h2>
              <p className="mt-1 text-xs text-white/40">Last 50 rows from Supabase agent_actions</p>
            </div>
            <div className="divide-y divide-white/5 overflow-y-auto max-h-[600px]">
              {actions.actions.length === 0 ? (
                <div className="p-6 text-sm text-white/40">
                  No actions returned. Check Supabase service credentials and RLS.
                  {actions.error && (
                    <p className="mt-2 text-[#c9a84c]/60">{actions.error}</p>
                  )}
                </div>
              ) : (
                actions.actions.map((action) => (
                  <article key={action.id} className="grid gap-1 px-6 py-4 md:grid-cols-[9rem_1fr_7rem]">
                    <p className="font-mono text-xs text-white/30">{formatTime(action.created_at)}</p>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{action.description ?? action.action_type}</h3>
                      <p className="mt-0.5 text-xs text-white/40">{action.agent_id ?? "unknown"} / {action.action_type}</p>
                    </div>
                    <p className={`font-mono text-xs uppercase ${
                      action.status === "complete" ? "text-emerald-400"
                      : action.status === "error" ? "text-red-400"
                      : "text-[#c9a84c]"
                    }`}>
                      {action.status ?? "unknown"}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3">
          <Link href="/en/mission" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/60 transition hover:border-white/25 hover:text-white">
            Public mission ledger
          </Link>
          <Link href="/en/hermes-usb" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/60 transition hover:border-white/25 hover:text-white">
            Hermes hardware
          </Link>
          <a href="https://pauli-hermes-agent-web.vercel.app" target="_blank" rel="noreferrer" className="rounded-full border border-[#c9a84c]/30 px-5 py-2 text-sm text-[#c9a84c]/70 transition hover:border-[#c9a84c] hover:text-[#c9a84c]">
            Full Hermes dashboard ↗
          </a>
        </div>
      </div>
    </div>
  )
}
