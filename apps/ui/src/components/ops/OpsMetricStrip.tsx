type Props = {
  metrics: {
    heartbeatAt: string | null
    missions: number
    grants: number
    clips: number
    reports: number
  }
}

function Metric({
  label,
  value,
  sub,
}: {
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#0d1610] px-4 py-3">
      <p className="text-[10px] tracking-widest text-white/35 uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-semibold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-[10px] text-white/30">{sub}</p>}
    </div>
  )
}

export function OpsMetricStrip({ metrics }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      <Metric
        label="Heartbeat"
        value={metrics.heartbeatAt ? "Active" : "Waiting"}
        sub={metrics.heartbeatAt ? "Agent is running" : "No ping yet"}
      />
      <Metric label="Mission runs" value={metrics.missions} sub="this period" />
      <Metric
        label="Grants tracked"
        value={metrics.grants}
        sub="active leads"
      />
      <Metric
        label="Clips created"
        value={metrics.clips}
        sub="content pieces"
      />
      <Metric
        label="Impact logs"
        value={metrics.reports}
        sub="public reports"
      />
    </div>
  )
}
