import { getFirst12Status } from "@/lib/nwkids/server"

type Props = { locale: "en" | "es" }

const copy = {
  en: {
    eyebrow: "First 12 · Operating status",
    title: "Build the opportunities before filling the seats.",
    body: "This board tracks the work around each First 12 seat without publishing participant information. A seat moves forward only as the project, mentor, supervision, and next step become real.",
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
    body: "Este tablero sigue el trabajo alrededor de cada lugar sin publicar información de participantes. Un lugar avanza solo cuando el proyecto, el mentor, la supervisión y el siguiente paso son reales.",
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
    <section className="bg-white px-5 py-20 text-[var(--color-ink)] sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
            <h2 className="mt-4 max-w-5xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.title}</h2>
          </div>
          <p className="max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-black/65 md:text-lg md:leading-8 lg:border-t-0 lg:border-l-2 lg:border-[var(--color-nwk-blue)] lg:pt-0 lg:pl-7">{t.body}</p>
        </div>

        {slots.length === 0 ? (
          <p className="mt-12 border-t border-black/15 pt-6 text-sm text-black/55">{t.empty}</p>
        ) : (
          <div className="mt-12 grid border-t border-l border-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {slots.map((slot) => {
              const label = t.stages[slot.status as keyof typeof t.stages] ?? slot.public_label ?? slot.status
              return (
                <article key={slot.slot_number} className="min-h-40 border-r border-b border-black/15 p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-4xl font-black tracking-[-0.06em] text-[var(--color-nwk-blue)]">{String(slot.slot_number).padStart(2, "0")}</span>
                    <span className="text-[10px] font-bold tracking-[0.14em] text-black/35 uppercase">{slot.pathway ? `${t.pathway} · ${slot.pathway.replaceAll("_", " ")}` : t.open}</span>
                  </div>
                  <p className="mt-8 text-lg leading-6 font-black tracking-[-0.025em]">{label}</p>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
