const programs = [
  { label: "Indigo Azul · Season 5", color: "#4A8C5C", status: "active" },
  { label: "Culture Shock · Cohort 1", color: "#c9a84c", status: "active" },
  { label: "Studio · Live", color: "#c8400e", status: "active" },
  { label: "Afromations · Planning", color: "#378ADD", status: "planning" },
  { label: "Benevolencia · Pending", color: "#888780", status: "pending" },
]

export function ActivePrograms() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-[#0d1610]">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <h2 className="text-sm font-medium text-white">Active programs</h2>
        <span className="cursor-pointer text-[10px] text-white/30 hover:text-white/60">
          Manage
        </span>
      </div>
      <div className="flex flex-wrap gap-2 p-4">
        {programs.map((p) => (
          <span
            key={p.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/8 px-2.5 py-1 text-[11px] text-white/60"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: p.color }}
            />
            {p.label}
          </span>
        ))}
      </div>
    </div>
  )
}
