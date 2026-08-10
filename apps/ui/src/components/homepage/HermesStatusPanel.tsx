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
    <div className="rounded-[30px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
            Live backend status
          </p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
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
        <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-muted)] uppercase">
            Status
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
            {ready ? "Reachable" : "Needs attention"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-muted)] uppercase">
            Gateway
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
            {gatewayRunning ? "Running" : "CLI mode / idle"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-muted)] uppercase">
            Version
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
            {status?.data?.version ?? "Waiting for response"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-muted)] uppercase">
            Active sessions
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
            {status?.data?.active_sessions ?? 0}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
        {status?.error
          ? "Hermes status temporarily offline — backend monitoring will return after deployment sync."
          : "This card reads from the Hermes backend so the public site can prove the operations layer is alive without exposing secrets in the browser."}
      </p>
    </div>
  )
}
