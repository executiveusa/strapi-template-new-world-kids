import { getFirst12Status } from "@/lib/nwkids/server"

type Props = { locale: "en" | "es" }

const copy = {
  en: {
    eyebrow: "First 12 · Operating status",
    title: "Build the opportunities before filling the seats.",
    body: "This tracks readiness around each First 12 seat without publishing participant information. A seat moves only when the project, mentor, supervision, and next step are real.",
    empty: "Status data is temporarily unavailable.",
    stages: {
      seeking_project: "Seeking project",
      mentor_needed: "Mentor needed",
      project_scoping: "Project being scoped",
      opportunity_confirmed: "Opportunity confirmed",
      participant_matched: "Participant matched",
      project_active: "Project active",
      completed: "Completed",
    },
    pathway: "Pathway",
    open: "Open",
  },
  es: {
    eyebrow: "Primeros 12 · Estado operativo",
    title: "Construir las oportunidades antes de llenar los lugares.",
    body: "Esto sigue la preparación de cada lugar sin publicar información de participantes. Un lugar avanza solo cuando el proyecto, mentor, supervisión y siguiente paso son reales.",
    empty: "Los datos de estado no están disponibles temporalmente.",
    stages: {
      seeking_project: "Buscando proyecto",
      mentor_needed: "Se necesita mentor",
      project_scoping: "Proyecto en definición",
      opportunity_confirmed: "Oportunidad confirmada",
      participant_matched: "Participante conectado",
      project_active: "Proyecto activo",
      completed: "Completado",
    },
    pathway: "Camino",
    open: "Abierto",
  },
} as const

export async function First12OperatingBoard({ locale }: Props) {
  const t = copy[locale]
  const slots = await getFirst12Status()

  return (
    <div className="py-10 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--color-text-muted)] uppercase">{t.eyebrow}</p>
          <h3 className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.04em] text-balance">{t.title}</h3>
        </div>
        <p className="max-w-[62ch] text-base leading-[1.75] text-[var(--color-text-muted)] sm:text-lg">{t.body}</p>
      </div>
      {slots.length === 0 ? (
        <p role="status" className="mt-8 border-t border-black/15 pt-5 text-sm leading-6 text-[var(--color-text-muted)]">{t.empty}</p>
      ) : (
        <div className="mt-8 border-t border-black/15">
          {slots.map((slot) => {
            const label = t.stages[slot.status as keyof typeof t.stages] ?? slot.public_label ?? slot.status
            return (
              <article key={slot.slot_number} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-b border-black/15 py-5 sm:grid-cols-[3.5rem_minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-x-6 sm:py-6">
                <span className="text-2xl font-semibold tabular-nums tracking-[-0.04em] text-[var(--color-text-muted)]">{String(slot.slot_number).padStart(2, "0")}</span>
                <span className="min-w-0 text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">{slot.pathway ? `${t.pathway} · ${slot.pathway.replaceAll("_", " ")}` : t.open}</span>
                <p className="col-start-2 min-w-0 text-base leading-6 font-semibold tracking-[-0.02em] sm:col-start-3 sm:text-lg">{label}</p>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
