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
      <section id="first-12" className="bg-[var(--color-bg)] px-5 py-24 sm:px-8 md:px-10 md:py-32 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.firstEyebrow}</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <div aria-hidden="true" className="text-[7rem] leading-[0.72] font-black tracking-[-0.1em] text-[var(--color-nwk-blue)]/78 select-none sm:text-[11rem] md:text-[15rem] lg:text-[19rem]">12</div>
            <div className="pb-2">
              <h2 className="max-w-4xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance text-[var(--color-text-primary)]">{t.firstTitle}</h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] md:text-xl">{t.firstBody}</p>
            </div>
          </div>
          <div id="how" className="mt-20 scroll-mt-24 border-t border-black/15 pt-16 md:mt-28 md:pt-20">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.howEyebrow}</p>
            <h3 className="mt-5 max-w-6xl text-[clamp(2.25rem,7vw,5rem)] leading-[0.96] font-black tracking-[-0.045em] text-[var(--color-text-primary)]">{t.howTitle}</h3>
            <div className="mt-10 border-t border-black/15">
              {t.steps.map(([number, title, body]) => (
                <div key={number} className="grid gap-3 border-b border-black/15 py-7 md:grid-cols-[72px_0.75fr_1.25fr] md:items-center md:py-8">
                  <span className="text-sm font-semibold tracking-[0.14em] text-black/32">{number}</span>
                  <h4 className="text-xl font-black tracking-[-0.025em] text-[var(--color-text-primary)] md:text-2xl">{title}</h4>
                  <p className="text-base leading-7 text-[var(--color-text-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="bg-[#23231f] px-5 py-24 text-white sm:px-8 md:px-10 md:py-32 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-white/48 uppercase sm:text-xs">{t.proofEyebrow}</p>
              <h2 className="mt-5 text-[clamp(3rem,9vw,6rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.proofTitle}</h2>
            </div>
            <div className="border-t border-white/18 pt-7 lg:border-t-0 lg:pt-0">
              <p className="max-w-2xl text-lg leading-8 text-white/72 md:text-xl md:leading-9">{t.proofBody}</p>
              <p className="mt-6 text-2xl font-black tracking-[-0.025em] md:text-3xl">{t.proofClose}</p>
              <Link href="/gallery#indigo" locale={locale} className="mt-8 inline-flex min-h-11 items-center border-y border-white/28 py-3 text-sm font-bold text-white transition-colors hover:border-white/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">{t.proofAction}</Link>
            </div>
          </div>
          <div className="mt-16 border-t border-white/18 pt-10 md:mt-20">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-white/45 uppercase sm:text-xs">{t.measureEyebrow}</p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
              {t.outcomes.map((outcome, index) => (
                <div key={outcome} className="border-t border-white/15 py-6 sm:border-r sm:px-6 sm:last:border-r-0 lg:border-t-0">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-white/28">0{index + 1}</span>
                  <p className="mt-3 text-base leading-6 font-bold text-white/84">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="bg-[var(--color-paper)] px-5 py-24 text-[var(--color-ink)] sm:px-8 md:px-10 md:py-32 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.partnerEyebrow}</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-20">
            <h2 className="max-w-5xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance text-[var(--color-text-primary)]">{t.partnerTitle}</h2>
            <p className="max-w-xl border-t border-black/15 pt-7 text-lg leading-8 text-[var(--color-text-muted)] lg:border-t-0 lg:border-l lg:border-black/18 lg:pt-0 lg:pl-8">{t.partnerBody}</p>
          </div>
          <div className="mt-12 grid border-t border-black/18 sm:grid-cols-2">
            <a href={projectMail} className={`group flex min-h-16 items-center justify-between border-b border-black/18 py-4 text-base font-black sm:border-r sm:px-6 ${focusRing}`}>
              <span>{t.projectAction}</span><span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a href={mentorMail} className={`group flex min-h-16 items-center justify-between border-b border-black/18 py-4 text-base font-black sm:px-6 ${focusRing}`}>
              <span>{t.mentorAction}</span><span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
