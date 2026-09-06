"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    firstEyebrow: "The First 12",
    firstTitle: "We are matching 12 local participants with mentors for a pilot program.",
    firstBody: "Seattle & Surrounding Areas · 2027",
    howEyebrow: "How it works",
    howTitle: "Interest → Project → Mentors → Next Step",
    steps: [
      ["01", "Interest", "Begin with their interest."],
      ["02", "Project", "Match interest to paid opportunity."],
      ["03", "Mentors", "Provide support and accountability."],
      ["04", "Next Step", "Ongoing support and planning for long-term goals."],
    ],
    proofEyebrow: "Proof of work",
    proofTitle: "We started here.",
    proofBody: "Youth and community showed interest. We kept growing.",
    proofClose: "Now we bring it home.",
    proofAction: "See where it started →",
    measureEyebrow: "What success looks like",
    outcomes: ["Completed real work they can show", "Earned income", "Built a mentor relationship", "Has a clear next action and ongoing support"],
    partnerEyebrow: "Join the work",
    partnerTitle: "Provide a project. Become a mentor.",
    partnerBody: "We stay involved—from the first opportunity to what comes next.",
    projectAction: "Provide a project",
    mentorAction: "Become a mentor",
  },
  es: {
    firstEyebrow: "Los Primeros 12",
    firstTitle: "Estamos conectando a 12 participantes locales con mentores para un programa piloto.",
    firstBody: "Seattle y Áreas Cercanas · 2027",
    howEyebrow: "Cómo funciona",
    howTitle: "Interés → Proyecto → Mentores → Siguiente paso",
    steps: [
      ["01", "Interés", "Comenzar con sus intereses."],
      ["02", "Proyecto", "Conectar sus intereses con una oportunidad remunerada."],
      ["03", "Mentores", "Brindar apoyo y responsabilidad."],
      ["04", "Siguiente paso", "Apoyo continuo y planificación para objetivos a largo plazo."],
    ],
    proofEyebrow: "Evidencia del trabajo",
    proofTitle: "Empezamos aquí.",
    proofBody: "Los jóvenes y la comunidad mostraron interés. Seguimos creciendo.",
    proofClose: "Ahora lo traemos a casa.",
    proofAction: "Mira dónde empezó →",
    measureEyebrow: "Cómo se ve el éxito",
    outcomes: ["Completó trabajo real que puede mostrar", "Generó ingresos", "Construyó una relación con un mentor", "Tiene una próxima acción clara y apoyo continuo"],
    partnerEyebrow: "Súmate al trabajo",
    partnerTitle: "Aporta un proyecto. Conviértete en mentor.",
    partnerBody: "Seguimos involucrados, desde la primera oportunidad hasta lo que viene después.",
    projectAction: "Aportar un proyecto",
    mentorAction: "Ser mentor",
  },
} as const

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4"

export function PathwaySection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const projectMail = `mailto:info@nwkids.org?subject=${encodeURIComponent(locale === "es" ? "Proyecto para los Primeros 12" : "First 12 project opportunity")}`
  const mentorMail = `mailto:info@nwkids.org?subject=${encodeURIComponent(locale === "es" ? "Mentor para los Primeros 12" : "First 12 mentor interest")}`

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
              <Link href="/gallery#indigo" locale={locale} className="mt-7 inline-flex min-h-11 items-center border-y border-white/35 py-3 text-sm font-bold text-white transition-colors hover:border-white/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">{t.proofAction}</Link>
            </div>
          </div>
          <div className="mt-14 border-t border-white/25 pt-8 md:mt-18">
            <p className="text-[10px] font-bold tracking-[0.24em] text-white/55 uppercase sm:text-xs">{t.measureEyebrow}</p>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
            <h2 className="max-w-5xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance text-[var(--color-text-primary)]">{t.partnerTitle}</h2>
            <p className="max-w-xl border-t border-black/15 pt-6 text-lg leading-8 text-[var(--color-text-muted)] lg:border-t-0 lg:border-l-2 lg:border-[var(--color-nwk-blue)] lg:pt-0 lg:pl-7">{t.partnerBody}</p>
          </div>
          <div className="mt-10 grid border-t border-black/20 sm:grid-cols-2">
            <a href={projectMail} className={`group flex min-h-16 items-center justify-between border-b border-black/20 py-4 text-base font-black sm:border-r sm:px-5 ${focusRing}`}>
              <span>{t.projectAction}</span><span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href={mentorMail} className={`group flex min-h-16 items-center justify-between border-b border-black/20 py-4 text-base font-black sm:px-5 ${focusRing}`}>
              <span>{t.mentorAction}</span><span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
