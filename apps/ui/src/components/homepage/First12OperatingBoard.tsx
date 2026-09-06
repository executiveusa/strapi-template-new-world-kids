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
    <section className="border-t border-black/15 bg-[var(--color-paper)] px-5 py-20 text-[var(--color-ink)] sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
            <h2 className="mt-4 max-w-5xl text-[clamp(2.7rem,9vw,6rem)] leading-[0.93] font-black tracking-[-0.05em] text-balance sm:mt-5 sm:tracking-[-0.055em]">{t.title}</h2>
          </div>
          <p className="max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 lg:pt-7">{t.body}</p>
        </div>

        {slots.length === 0 ? (
          <p className="mt-12 border-t border-black/15 pt-6 text-sm text-black/55">{t.empty}</p>
        ) : (
          <div className="mt-12 border-t border-black/15">
            {slots.map((slot) => {
              const label = t.stages[slot.status as keyof typeof t.stages] ?? slot.public_label ?? slot.status
              return (
                <article key={slot.slot_number} className="grid min-h-20 grid-cols-[48px_1fr] items-center gap-4 border-b border-black/15 py-5 sm:grid-cols-[72px_0.85fr_1.15fr] sm:gap-6">
                  <span className="text-2xl font-black tracking-[-0.05em] text-black/28 sm:text-3xl">{String(slot.slot_number).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold tracking-[-0.01em] text-black/52 sm:text-base">{slot.pathway ? `${t.pathway} · ${slot.pathway.replaceAll("_", " ")}` : t.open}</span>
                  <p className="col-start-2 text-lg leading-6 font-black tracking-[-0.025em] sm:col-start-3 sm:text-xl">{label}</p>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
