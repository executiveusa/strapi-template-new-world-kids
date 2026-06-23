const programs = [
  { label: "Indigo Azul — Season 5", pct: 72, color: "#4A8C5C" },
  { label: "Culture Shock cohort", pct: 60, color: "#c9a84c" },
  { label: "Studio revenue target", pct: 28, color: "#c8400e" },
  { label: "Grant pipeline", pct: 45, color: "#378ADD" },
]

export function ProgramHealth() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-[#0d1610]">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <h2 className="text-sm font-medium text-white">Program health</h2>
        <span className="cursor-pointer text-[10px] text-white/30 hover:text-white/60">
          Details
        </span>
      </div>
      <div className="divide-y divide-white/5">
        {programs.map((p) => (
          <div key={p.label} className="flex items-center gap-3 px-4 py-3">
            <span className="flex-1 truncate text-xs text-white/70">
              {p.label}
            </span>
            <div className="h-1 w-28 shrink-0 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${p.pct}%`, background: p.color }}
              />
            </div>
            <span className="w-8 text-right font-mono text-[10px] text-white/40">
              {p.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
