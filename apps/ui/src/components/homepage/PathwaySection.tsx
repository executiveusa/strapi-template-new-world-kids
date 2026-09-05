"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    firstEyebrow: "The First 12",
    firstTitle: "12 seats. Start small. Do it well.",
    firstBody: "In 2027, New World Kids will begin in Seattle with 12 participants.",
    firstStatus: "We are securing the projects and mentors before we fill the cohort.",
    statusLine: "12 seats · 4 pathways · projects being built now",
    problemTitle: "Talent is everywhere. Opportunity is not.",
    problemBody:
      "A young person can know what they care about and still have no clear way into useful experience, a mentor, or work.",
    howEyebrow: "How it works",
    howTitle: "Interest → Project → Mentor → Next Step",
    steps: [
      ["01", "Interest", "Start with what already matters."],
      ["02", "Project", "Put that interest to useful work."],
      ["03", "Mentor", "Work beside someone who knows the field."],
      ["04", "Next Step", "Leave with proof and somewhere to go next."],
    ],
    pathwaysEyebrow: "Four pathways",
    pathwaysTitle: "Four interests. One operating model.",
    pathways: [
      ["01", "Built for Good", "Technology", "Solve a real digital problem."],
      ["02", "Beyond the Game", "Sports", "Work in the business and systems around sport."],
      ["03", "Ground Up", "Urban Gardening + Food Systems", "Build, grow, maintain, and document food systems."],
      ["04", "Make Your Mark", "Art", "Restore, design, create, and leave visible work behind."],
    ],
    pathwaysAction: "Explore the pathways →",
    proofEyebrow: "Proof of work",
    proofTitle: "Where the idea was tested.",
    proofBody:
      "Proyecto Indigo Azul gave young people a real place to contribute, learn by doing, and see the result of their work.",
    proofClose: "Seattle is the next test of the model.",
    proofAction: "See the Indigo Azul field archive →",
    measureEyebrow: "What counts",
    outcomes: [
      "Completed useful work",
      "Earned income where applicable",
      "Built a mentor relationship",
      "Left with proof",
      "Has a next step",
    ],
    partnerEyebrow: "Join the work",
    partnerTitle: "Bring one real opportunity.",
    partnerBody:
      "A project. A mentor. A supervised place to contribute. New World Kids handles the match, support, documentation, and follow-through.",
    projectAction: "Bring a project",
    mentorAction: "Become a mentor",
  },
  es: {
    firstEyebrow: "Los Primeros 12",
    firstTitle: "12 lugares. Empezar pequeño. Hacerlo bien.",
    firstBody: "En 2027, New World Kids comenzará en Seattle con 12 participantes.",
    firstStatus: "Estamos asegurando los proyectos y mentores antes de completar el grupo.",
    statusLine: "12 lugares · 4 caminos · proyectos en construcción",
    problemTitle: "El talento está en todas partes. La oportunidad no.",
    problemBody:
      "Un joven puede saber qué le importa y aun así no tener una ruta clara hacia experiencia útil, un mentor o trabajo.",
    howEyebrow: "Cómo funciona",
    howTitle: "Interés → Proyecto → Mentor → Siguiente paso",
    steps: [
      ["01", "Interés", "Empezar con lo que ya importa."],
      ["02", "Proyecto", "Poner ese interés a trabajar en algo útil."],
      ["03", "Mentor", "Trabajar al lado de alguien que conoce el campo."],
      ["04", "Siguiente paso", "Salir con evidencia y un lugar hacia dónde avanzar."],
    ],
    pathwaysEyebrow: "Cuatro caminos",
    pathwaysTitle: "Cuatro intereses. Un solo modelo operativo.",
    pathways: [
      ["01", "Built for Good", "Tecnología", "Resolver un problema digital real."],
      ["02", "Beyond the Game", "Deportes", "Trabajar en el negocio y los sistemas alrededor del deporte."],
      ["03", "Ground Up", "Jardinería urbana + sistemas alimentarios", "Construir, cultivar, mantener y documentar sistemas alimentarios."],
      ["04", "Make Your Mark", "Arte", "Restaurar, diseñar, crear y dejar trabajo visible."],
    ],
    pathwaysAction: "Explorar los caminos →",
    proofEyebrow: "Evidencia del trabajo",
    proofTitle: "Dónde se puso a prueba la idea.",
    proofBody:
      "Proyecto Indigo Azul dio a jóvenes un lugar real para contribuir, aprender haciendo y ver el resultado de su trabajo.",
    proofClose: "Seattle es la siguiente prueba del modelo.",
    proofAction: "Ver el archivo de campo de Indigo Azul →",
    measureEyebrow: "Lo que cuenta",
    outcomes: [
      "Completó trabajo útil",
      "Generó ingresos cuando correspondía",
      "Construyó una relación con un mentor",
      "Salió con evidencia",
      "Tiene un siguiente paso",
    ],
    partnerEyebrow: "Súmate al trabajo",
    partnerTitle: "Trae una oportunidad real.",
    partnerBody:
      "Un proyecto. Un mentor. Un lugar supervisado donde contribuir. New World Kids maneja la conexión, el apoyo, la documentación y el seguimiento.",
    projectAction: "Traer un proyecto",
    mentorAction: "Ser mentor",
  },
} as const

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4"

export function PathwaySection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <>
      <section id="first-12" className="bg-[var(--color-bg)] px-5 py-20 sm:px-8 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase sm:text-xs">{t.firstEyebrow}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div aria-hidden="true" className="text-[7rem] leading-[0.72] font-black tracking-[-0.1em] text-[var(--color-nwk-blue)] select-none sm:text-[11rem] md:text-[15rem] lg:text-[19rem]">12</div>
            <div className="pb-2">
              <h2 className="max-w-4xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance text-[var(--color-text-primary)]">{t.firstTitle}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] md:text-xl">{t.firstBody}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-7 border-t-2 border-[var(--color-ink)] pt-7 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
            <div>
              <h3 className="text-3xl leading-tight font-black tracking-[-0.035em] text-[var(--color-text-primary)] md:text-4xl">{t.problemTitle}</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg md:leading-8">{t.problemBody}</p>
            </div>
            <div>
              <p className="text-xl leading-8 font-bold tracking-[-0.02em] text-[var(--color-text-primary)] md:text-2xl">{t.firstStatus}</p>
              <p className="mt-5 text-[10px] font-bold tracking-[0.17em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.statusLine}</p>
            </div>
          </div>

          <div id="how" className="mt-16 scroll-mt-24 md:mt-20">
            <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.howEyebrow}</p>
            <h3 className="mt-4 max-w-6xl text-[clamp(2.25rem,7vw,5rem)] leading-[0.96] font-black tracking-[-0.045em] text-[var(--color-text-primary)]">{t.howTitle}</h3>
            <div className="mt-9 border-t border-black/15">
              {t.steps.map(([number, title, body]) => (
                <div key={number} className="grid gap-3 border-b border-black/15 py-6 md:grid-cols-[72px_0.75fr_1.25fr] md:items-center md:py-7">
                  <span className="text-sm font-bold tracking-[0.16em] text-black/35">{number}</span>
                  <h4 className="text-xl font-black tracking-[-0.025em] text-[var(--color-text-primary)] md:text-2xl">{title}</h4>
                  <p className="text-base leading-7 text-[var(--color-text-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-[var(--color-ink)] py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10">
          <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase sm:text-xs">{t.pathwaysEyebrow}</p>
          <h2 className="mt-4 max-w-5xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.pathwaysTitle}</h2>
        </div>

        <div className="mt-12 border-y border-white/20">
          {t.pathways.map(([number, name, category, body]) => (
            <article key={number} className="border-b border-white/20 last:border-b-0">
              <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:px-8 md:grid-cols-[72px_0.9fr_0.7fr_1.2fr] md:items-center md:px-10 md:py-10">
                <span className="text-xs font-bold tracking-[0.2em] text-white/35">{number}</span>
                <h3 className="text-3xl leading-none font-black tracking-[-0.04em] sm:text-4xl md:text-5xl">{name}</h3>
                <p className="text-[10px] font-bold tracking-[0.14em] text-[var(--color-action-orange)] uppercase sm:text-xs">{category}</p>
                <p className="max-w-xl text-base leading-7 text-white/68">{body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-9 max-w-7xl px-5 sm:px-8 md:px-10">
          <Link href="/projects" locale={locale} className="inline-flex min-h-11 items-center text-sm font-bold text-white underline decoration-white/40 underline-offset-8 hover:decoration-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">{t.pathwaysAction}</Link>
        </div>
      </section>

      <section id="proof" className="bg-[var(--color-nwk-blue)] px-5 py-20 text-white sm:px-8 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] font-bold tracking-[0.24em] text-white/60 uppercase sm:text-xs">{t.proofEyebrow}</p>
              <h2 className="mt-4 text-[clamp(3rem,9vw,6rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.proofTitle}</h2>
            </div>
            <div className="border-t border-white/25 pt-6 lg:border-t-0 lg:pt-0">
              <p className="max-w-2xl text-lg leading-8 text-white/78 md:text-xl md:leading-9">{t.proofBody}</p>
              <p className="mt-5 text-2xl font-black tracking-[-0.025em] md:text-3xl">{t.proofClose}</p>
              <Link href="/gallery" locale={locale} className="mt-7 inline-flex min-h-11 items-center rounded-full border border-white/35 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">{t.proofAction}</Link>
            </div>
          </div>

          <div className="mt-14 border-t border-white/25 pt-8 md:mt-18">
            <p className="text-[10px] font-bold tracking-[0.24em] text-white/55 uppercase sm:text-xs">{t.measureEyebrow}</p>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-5">
              {t.outcomes.map((outcome, index) => (
                <div key={outcome} className="border-t border-white/20 py-5 sm:border-r sm:px-5 sm:last:border-r-0 lg:border-t-0">
                  <span className="text-[10px] font-bold tracking-[0.14em] text-white/35">0{index + 1}</span>
                  <p className="mt-2 text-base leading-6 font-bold text-white/88">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="bg-[var(--color-paper)] px-5 py-20 text-[var(--color-ink)] sm:px-8 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase sm:text-xs">{t.partnerEyebrow}</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <h2 className="max-w-5xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance text-[var(--color-text-primary)]">{t.partnerTitle}</h2>
            <p className="max-w-2xl border-t border-black/15 pt-6 text-lg leading-8 text-[var(--color-text-muted)] lg:border-t-0 lg:border-l-2 lg:border-[var(--color-nwk-blue)] lg:pt-0 lg:pl-7">{t.partnerBody}</p>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/opportunity" locale={locale} className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-ink)] px-7 text-sm font-black text-white transition-transform hover:-translate-y-px ${focusRing}`}>{t.projectAction}</Link>
            <Link href="/mentor" locale={locale} className={`inline-flex min-h-12 items-center justify-center rounded-full border border-black/20 px-7 text-sm font-black text-[var(--color-text-primary)] transition-colors hover:bg-black/[0.03] ${focusRing}`}>{t.mentorAction}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
