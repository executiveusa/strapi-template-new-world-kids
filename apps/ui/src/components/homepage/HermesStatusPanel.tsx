"use client"

import { useEffect, useState } from "react"

type HermesStatusPayload = {
  ok: boolean
  error?: string
  dashboardUrl?: string
  data?: {
    active_sessions?: number
    gateway_running?: boolean
    release_date?: string
    version?: string
  }
}

export function HermesStatusPanel() {
  const [status, setStatus] = useState<HermesStatusPayload | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadStatus() {
      try {
        const response = await fetch("/api/hermes/status", {
          cache: "no-store",
        })
        const payload = (await response.json()) as HermesStatusPayload

        if (!cancelled) {
          setStatus(payload)
        }
      } catch {
        if (!cancelled) {
          setStatus({
            ok: false,
            error: "Hermes status is temporarily unavailable.",
          })
        }
      }
    }

    void loadStatus()

    return () => {
      cancelled = true
    }
  }, [])

  const ready = status?.ok
  const gatewayRunning = status?.data?.gateway_running

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#0c1710] p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
            Live backend status
          </p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-white">
            Hermes operations layer
          </h3>
        </div>
        <div
          className={`h-3 w-3 rounded-full ${
            ready ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs tracking-[0.18em] text-white/45 uppercase">
            Status
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {ready ? "Reachable" : "Needs attention"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs tracking-[0.18em] text-white/45 uppercase">
            Gateway
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {gatewayRunning ? "Running" : "CLI mode / idle"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs tracking-[0.18em] text-white/45 uppercase">
            Version
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {status?.data?.version ?? "Waiting for response"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs tracking-[0.18em] text-white/45 uppercase">
            Active sessions
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {status?.data?.active_sessions ?? 0}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-white/60">
        {status?.error ??
          "This card reads from the Hermes backend so the public site can prove the operations layer is alive without exposing secrets in the browser."}
      </p>
    </div>
  )
}
