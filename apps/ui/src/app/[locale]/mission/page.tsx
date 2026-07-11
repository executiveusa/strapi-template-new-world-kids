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
  const ledger = await readAgentActions(20)
  const grantsFound = countActions(ledger.actions, "grant_tracked")
  const clipsMade = countActions(ledger.actions, "clip_created")
  const impactLogs = countActions(ledger.actions, "report")
  const activeMissions = countActions(ledger.actions, "mission_run")
  const isOffline = Boolean(ledger.error) || ledger.missing.length > 0

  return (
    <PageShell
      eyebrow="Observable agents"
      title="Mission work you can inspect"
      summary="Hermes records public agent actions for grants, impact, content, and bounded missions. Missing data stays visible instead of being hidden behind fake status."
    >
      {isOffline && (
        <section className="mb-8 flex items-start gap-4 rounded-xl border border-[var(--color-accent-gold)]/25 bg-[var(--color-surface)] p-5">
          <span
            aria-hidden
            className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-gold)]"
          />
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              This ledger is connecting, not broken.
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
              The public transparency feed below is real — it just hasn&apos;t
              logged confirmed activity yet. We show &ldquo;0&rdquo; here
              instead of hiding the panel or faking numbers, because that&apos;s
              the same rule we apply to every claim on this site.
            </p>
            <details className="mt-3 text-xs text-[var(--color-text-muted)]">
              <summary className="cursor-pointer select-none">
                Technical detail
              </summary>
              <p className="mt-2 font-mono">
                {ledger.error ?? `Missing env: ${ledger.missing.join(", ")}`}
              </p>
            </details>
          </div>
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Active missions", activeMissions],
          ["Impact logs", impactLogs],
          ["Grants found", grantsFound],
          ["Clips made", clipsMade],
        ].map(([label, value]) => (
          <div
            key={label}
            className="border-border bg-panel rounded border p-5"
          >
            <p className="text-muted font-mono text-sm">{label}</p>
            <p className="text-accent mt-3 text-4xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_20rem]">
        <div className="border-border bg-panel rounded border">
          <div className="border-border border-b p-5">
            <h2 className="text-2xl font-semibold">Public ledger</h2>
            <p className="text-muted mt-2 text-sm">
              Only rows marked public in `agent_actions.payload` are shown here.
            </p>
          </div>
          <div className="divide-border divide-y">
            {ledger.actions.length === 0 ? (
              <p className="text-muted p-5">
                No public agent actions have been logged yet. Check back soon —
                this panel updates automatically once activity is recorded.
              </p>
            ) : (
              ledger.actions.map((action) => (
                <article key={action.id} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold">
                      {action.description ?? action.action_type}
                    </h3>
                    <span className="text-accent font-mono text-xs uppercase">
                      {action.status ?? "unknown"}
                    </span>
                  </div>
                  <p className="text-muted mt-2 text-sm">
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
            className="border-accent bg-accent text-background block rounded border px-5 py-4 font-semibold"
          >
            Hermes USB
          </Link>
          <Link
            href="/en/ops"
            className="border-border bg-panel block rounded border px-5 py-4 font-semibold"
          >
            Operations portal
          </Link>
        </aside>
      </section>
    </PageShell>
  )
}
