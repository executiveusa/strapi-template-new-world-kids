import Link from "next/link"

import { PageShell } from "../../../components/PageShell"
import { readAgentActions } from "../../../lib/agent-actions"

export const dynamic = "force-dynamic"

function countActions(
  actions: Awaited<ReturnType<typeof readAgentActions>>["actions"],
  actionType: string
) {
  return actions.filter((action) => action.action_type === actionType).length
}

export default async function MissionPage() {
  const ledger = await readAgentActions("public", 20)
  const grantsFound = countActions(ledger.actions, "grant_tracked")
  const clipsMade = countActions(ledger.actions, "clip_created")
  const impactLogs = countActions(ledger.actions, "report")
  const activeMissions = countActions(ledger.actions, "mission_run")

  return (
    <PageShell
      eyebrow="Observable agents"
      title="Mission work you can inspect"
      summary="Hermes records public agent actions for grants, impact, content, and bounded missions. Missing data stays visible instead of being hidden behind fake status."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Active missions", activeMissions],
          ["Impact logs", impactLogs],
          ["Grants found", grantsFound],
          ["Clips made", clipsMade],
        ].map(([label, value]) => (
          <div key={label} className="rounded border border-border bg-panel p-5">
            <p className="font-mono text-sm text-muted">{label}</p>
            <p className="mt-3 text-4xl font-semibold text-accent">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_20rem]">
        <div className="rounded border border-border bg-panel">
          <div className="border-b border-border p-5">
            <h2 className="text-2xl font-semibold">Public ledger</h2>
            <p className="mt-2 text-sm text-muted">
              Only rows marked public in `agent_actions.payload` are shown here.
            </p>
          </div>
          <div className="divide-y divide-border">
            {ledger.actions.length === 0 ? (
              <p className="p-5 text-muted">
                No public agent actions returned. The mission page is live, but
                Supabase public ledger access still needs configured data and RLS.
              </p>
            ) : (
              ledger.actions.map((action) => (
                <article key={action.id} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold">
                      {action.description ?? action.action_type}
                    </h3>
                    <span className="font-mono text-xs uppercase text-accent">
                      {action.status ?? "unknown"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {action.agent_id ?? "unknown"} / {action.action_type}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <Link
            href="/en/hermes-usb"
            className="block rounded border border-accent bg-accent px-5 py-4 font-semibold text-background"
          >
            Hermes USB
          </Link>
          <Link
            href="/en/ops"
            className="block rounded border border-border bg-panel px-5 py-4 font-semibold"
          >
            Operations portal
          </Link>
          {ledger.error ? (
            <p className="rounded border border-warm/40 bg-warm/10 p-4 text-sm text-warm">
              {ledger.error}
            </p>
          ) : null}
          {ledger.missing.length > 0 ? (
            <p className="rounded border border-warm/40 bg-warm/10 p-4 text-sm text-warm">
              Missing public Supabase env: {ledger.missing.join(", ")}
            </p>
          ) : null}
        </aside>
      </section>
    </PageShell>
  )
}
