import type { AgentAction } from "../../lib/agent-actions"

function formatTime(value: string | null) {
  if (!value) return "—"
  const diff = Date.now() - new Date(value).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`

  return `${Math.floor(hours / 24)}d ago`
}

function StatusTag({ status }: { status: string | null }) {
  const s = status ?? "unknown"
  const styles: Record<string, string> = {
    complete: "bg-emerald-500/15 text-emerald-400",
    done: "bg-emerald-500/15 text-emerald-400",
    running: "bg-blue-500/15 text-blue-400",
    error: "bg-red-500/15 text-red-400",
    queued: "bg-white/8 text-white/50",
    unknown: "bg-white/8 text-white/40",
  }

  return (
    <span
      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${styles[s] ?? styles.unknown}`}
    >
      {s}
    </span>
  )
}

const ACTION_TYPE_LABELS: Record<string, string> = {
  heartbeat: "Heartbeat",
  mission_run: "Mission run",
  grant_tracked: "Grant tracked",
  clip_created: "Clip created",
  report: "Impact report",
}

export function AgentLedger({
  actions,
  error,
}: {
  actions: AgentAction[]
  error?: string | null
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-[#0d1610]">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div>
          <h2 className="text-sm font-medium text-white">
            Agent action ledger
          </h2>
          <p className="mt-0.5 text-[10px] text-white/30">
            Last 50 rows from Supabase agent_actions
          </p>
        </div>
        <span className="text-[10px] text-white/30">{actions.length} rows</span>
      </div>

      {error && (
        <div className="border-b border-amber-500/15 bg-amber-500/8 px-4 py-2.5 text-xs text-amber-400">
          {error}
        </div>
      )}

      {actions.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-white/30">
          No agent actions yet. Check Supabase credentials and RLS policies.
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {actions.map((action) => (
            <div
              key={action.id}
              className="grid grid-cols-[80px_1fr_80px] items-start gap-3 px-4 py-3 hover:bg-white/[0.02]"
            >
              <p className="pt-0.5 font-mono text-[10px] text-white/30">
                {formatTime(action.created_at)}
              </p>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {action.description ??
                    ACTION_TYPE_LABELS[action.action_type] ??
                    action.action_type}
                </p>
                <p className="mt-0.5 text-[10px] text-white/35">
                  {action.agent_id ?? "hermes"} · {action.action_type}
                </p>
              </div>
              <StatusTag status={action.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
