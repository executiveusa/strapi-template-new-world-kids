import Link from "next/link"

import { PageShell } from "../../../../components/PageShell"
import { getOpsAuthState } from "../../../../lib/auth"
import { readAgentActions } from "../../../../lib/agent-actions"

export const dynamic = "force-dynamic"

function formatTime(value: string | null | undefined) {
  if (!value) {
    return "No heartbeat logged"
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export default async function OpsPage() {
  const auth = await getOpsAuthState()
  const actions = auth.authorized
    ? await readAgentActions("private", 20)
    : { configured: false, missing: [], actions: [] }
  const lastHeartbeat = actions.actions.find(
    (action) => action.action_type === "heartbeat"
  )

  return (
    <PageShell
      eyebrow="Private operations"
      title="Hermes mission control"
      summary="A private operator surface for heartbeat state, mission runs, and the latest ledger actions."
    >
      {!auth.authorized ? (
        <section className="rounded border border-warm/40 bg-warm/10 p-6">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-warm">
            Auth gate active
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Private data is withheld.</h2>
          <p className="mt-3 max-w-2xl text-muted">
            {auth.reason === "missing-secret"
              ? "BETTER_AUTH_SECRET is not configured, so the ops page cannot verify a better-auth session."
              : "No better-auth session cookie was present for this request."}
          </p>
        </section>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[22rem_1fr]">
          <aside className="rounded border border-border bg-panel p-5">
            <p className="font-mono text-sm text-accent">Heartbeat</p>
            <p className="mt-4 text-3xl font-semibold">
              {lastHeartbeat ? "Recorded" : "Waiting"}
            </p>
            <p className="mt-2 text-sm text-muted">
              Last: {formatTime(lastHeartbeat?.created_at)}
            </p>
            {actions.error ? (
              <p className="mt-4 rounded border border-warm/40 p-3 text-sm text-warm">
                {actions.error}
              </p>
            ) : null}
            <Link
              href="/en/mission"
              className="mt-6 inline-flex rounded bg-accent px-4 py-2 text-sm font-semibold text-background"
            >
              Open mission dashboard
            </Link>
          </aside>
          <section className="rounded border border-border bg-panel">
            <div className="border-b border-border p-5">
              <h2 className="text-xl font-semibold">Latest agent actions</h2>
              <p className="mt-1 text-sm text-muted">
                Last 20 rows from Supabase `agent_actions`.
              </p>
            </div>
            <div className="divide-y divide-border">
              {actions.actions.length === 0 ? (
                <p className="p-5 text-muted">
                  No actions returned. Check Supabase service credentials and RLS.
                </p>
              ) : (
                actions.actions.map((action) => (
                  <article key={action.id} className="grid gap-2 p-5 md:grid-cols-[10rem_1fr_8rem]">
                    <p className="font-mono text-xs text-muted">
                      {formatTime(action.created_at)}
                    </p>
                    <div>
                      <h3 className="font-semibold">{action.description}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {action.agent_id ?? "unknown"} / {action.action_type}
                      </p>
                    </div>
                    <p className="font-mono text-xs uppercase text-accent">
                      {action.status ?? "unknown"}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </PageShell>
  )
}
