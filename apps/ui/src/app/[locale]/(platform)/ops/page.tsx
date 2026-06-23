import Link from "next/link"

import { HermesVoiceChat } from "../../../../components/homepage/HermesVoiceChat"
import { ActivePrograms } from "../../../../components/ops/ActivePrograms"
import { AgentLedger } from "../../../../components/ops/AgentLedger"
import { OpsMetricStrip } from "../../../../components/ops/OpsMetricStrip"
import { ProgramHealth } from "../../../../components/ops/ProgramHealth"
import { readAgentActions } from "../../../../lib/agent-actions"

export const dynamic = "force-dynamic"

function formatTime(value: string | null | undefined) {
  if (!value) return "No heartbeat"
  const diff = Date.now() - new Date(value).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`

  return `${Math.floor(hours / 24)}d ago`
}

export default async function OpsPage() {
  const actions = await readAgentActions("private", 50)

  const lastHeartbeat = actions.actions.find(
    (a) => a.action_type === "heartbeat"
  )
  const metrics = {
    heartbeatAt: lastHeartbeat?.created_at ?? null,
    missions: actions.actions.filter((a) => a.action_type === "mission_run")
      .length,
    grants: actions.actions.filter((a) => a.action_type === "grant_tracked")
      .length,
    clips: actions.actions.filter((a) => a.action_type === "clip_created")
      .length,
    reports: actions.actions.filter((a) => a.action_type === "report").length,
  }

  return (
    <div className="min-h-screen space-y-4 bg-[#060e08] p-5">
      {/* Topbar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-white">Mission control</h1>
          <p className="mt-0.5 text-xs text-white/40">
            Hermes ·{" "}
            {metrics.heartbeatAt
              ? `last heartbeat ${formatTime(metrics.heartbeatAt)}`
              : "no heartbeat logged"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${
              metrics.heartbeatAt
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-amber-500/20 bg-amber-500/10 text-amber-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                metrics.heartbeatAt ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            {metrics.heartbeatAt ? "Agent active" : "Waiting for heartbeat"}
          </div>
          <Link
            href="https://pauli-hermes-agent-web.vercel.app"
            target="_blank"
            className="rounded-lg bg-[#c9a84c] px-3 py-1.5 text-xs font-semibold text-[#060e08] transition hover:bg-[#e0bc6a]"
          >
            Full dashboard ↗
          </Link>
        </div>
      </div>

      {/* Metric strip */}
      <OpsMetricStrip metrics={metrics} />

      {/* Main 2-col grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Hermes voice/text chat */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-white/8 bg-[#0d1610]">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div>
              <p className="text-xs tracking-widest text-white/30 uppercase">
                Hermes
              </p>
              <h2 className="text-sm font-medium text-white">
                Voice interface
              </h2>
            </div>
            <span className="rounded-full bg-[#1a3a2a] px-2 py-0.5 text-[10px] text-[#c9a84c]">
              Private
            </span>
          </div>
          <HermesVoiceChat />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <ProgramHealth />
          <ActivePrograms />
        </div>
      </div>

      {/* Agent action ledger */}
      <AgentLedger actions={actions.actions} error={actions.error} />

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 pt-2">
        {[
          { label: "Public mission ledger", href: "/mission" },
          { label: "Hermes hardware", href: "/hermes-usb" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/50 transition hover:border-white/25 hover:text-white/80"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
