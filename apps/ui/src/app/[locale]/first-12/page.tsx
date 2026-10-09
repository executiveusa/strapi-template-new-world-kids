import type { Metadata } from "next"

import { facts } from "@/content/facts"
import { Link } from "@/lib/navigation"

// Verified sources: the New World Kids FundRazr campaign text (program shape,
// who it is for, what donations pay for), the intake forms (screening and
// review commitments) and HSI's public progress-report requirement.
// "How we will measure" is a proposal for the team to approve before launch.

const copy = {
  en: {
    metaTitle: "The First 12 | New World Kids",
    metaDescription:
      "What the Seattle pilot is, who it is for, how it works, how we keep it safe, and how we will measure it.",
    eyebrow: "The First 12 · Seattle · 2027",
    title: "What the pilot is, in plain terms.",
    intro:
      "A pilot for 12 young people in Seattle, over one year. Each is matched with a mentor and a real community project based on their interests.",
    glanceLabel: "At a glance",
    glance: [
      ["Where", "Seattle and surrounding areas"],
      ["When", "2027, 12 participants spread over 1 year"],
      [
        "What",
        "Paid experience on a real project, with a mentor and a clear next step",
      ],
    ],
    ages: "Ages",
    cost: "Cost to participants",
    schedule: "Schedule",
    forEyebrow: "Who it is for",
    forBody:
      "Young people in Seattle who have real interests and talent but limited access to opportunity, including those affected by the justice system, foster care, or housing instability. We start small, with 12, so we can do it well before we grow.",
    applyEyebrow: "How to apply",
    applyNot:
      "We are not accepting participant applications yet. To be told when we do, or to ask about the program, write to info@nwkids.org.",
    applyOpen: "Apply now",
    payEyebrow: "Pay and paid work",
    payBody:
      "Participants earn income on real projects. Donations help cover participant wages, transportation, project materials, equipment, mentor support, and program coordination.",
    safeEyebrow: "How we keep it safe",
    safe: [
      "Nothing is offered to a participant until we have reviewed the project for fit, safety, supervision, timing, and pathway.",
      "Every project has a named person who supervises and supports the work.",
      "Mentors must agree to complete our required screening before working directly with a participant.",
      "We do not publish participant names, schools, or schedules.",
    ],
    policy: "Read our safeguarding policy",
    measureEyebrow: "How we will measure it",
    measureIntro:
      "We will report totals only, never individual participants. We report progress to our fiscal sponsor each quarter.",
    measures: [
      [
        "Completed",
        "The participant finishes the agreed project, confirmed by their mentor or project host.",
      ],
      ["Earned income", "Wages paid to participants through the program."],
      [
        "Mentor relationship",
        "The participant and mentor are still working together at the end of the program.",
      ],
      [
        "Next step",
        "The participant leaves with a written plan and someone to call.",
      ],
    ],
    targets: "Targets",
    targetsNot:
      "We will publish targets before the pilot starts and results after each quarter.",
    pathwaysAction: "See the four project pathways",
    transparency: "Who we are and how to check",
    back: "Back to New World Kids",
  },
  es: {
    metaTitle: "Los Primeros 12 | New World Kids",
    metaDescription:
      "Qué es el piloto de Seattle, para quién es, cómo funciona, cómo lo mantenemos seguro y cómo lo mediremos.",
    eyebrow: "Los Primeros 12 · Seattle · 2027",
    title: "Qué es el piloto, en palabras sencillas.",
    intro:
      "Un piloto para 12 jóvenes en Seattle, durante un año. Cada uno se conecta con un mentor y un proyecto comunitario real según sus intereses.",
    glanceLabel: "De un vistazo",
    glance: [
      ["Dónde", "Seattle y áreas cercanas"],
      ["Cuándo", "2027, 12 participantes a lo largo de 1 año"],
      [
        "Qué",
        "Experiencia pagada en un proyecto real, con un mentor y un siguiente paso claro",
      ],
    ],
    ages: "Edades",
    cost: "Costo para participantes",
    schedule: "Horario",
    forEyebrow: "Para quién es",
    forBody:
      "Jóvenes de Seattle con intereses y talento reales pero con poco acceso a oportunidades, incluidos quienes han sido afectados por el sistema de justicia, el sistema de acogida o la inestabilidad de vivienda. Empezamos con 12 para hacerlo bien antes de crecer.",
    applyEyebrow: "Cómo aplicar",
    applyNot:
      "Todavía no recibimos solicitudes de participantes. Para que te avisemos cuando abramos, o para preguntar sobre el programa, escribe a info@nwkids.org.",
    applyOpen: "Aplicar ahora",
    payEyebrow: "Pago y trabajo remunerado",
    payBody:
      "Los participantes ganan ingresos en proyectos reales. Las donaciones ayudan a cubrir salarios de participantes, transporte, materiales de proyecto, equipo, apoyo a mentores y coordinación del programa.",
    safeEyebrow: "Cómo lo mantenemos seguro",
    safe: [
      "No se ofrece nada a un participante hasta revisar el proyecto en cuanto a encaje, seguridad, supervisión, tiempo y camino.",
      "Cada proyecto tiene una persona con nombre que supervisa y apoya el trabajo.",
      "Los mentores deben aceptar completar nuestra evaluación requerida antes de trabajar directamente con un participante.",
      "No publicamos nombres, escuelas ni horarios de participantes.",
    ],
    policy: "Lee nuestra política de protección",
    measureEyebrow: "Cómo lo mediremos",
    measureIntro:
      "Informaremos solo totales, nunca participantes individuales. Informamos el avance a nuestro patrocinador fiscal cada trimestre.",
    measures: [
      [
        "Completado",
        "El participante termina el proyecto acordado, confirmado por su mentor o anfitrión del proyecto.",
      ],
      [
        "Ingresos ganados",
        "Salarios pagados a participantes mediante el programa.",
      ],
      [
        "Relación con mentor",
        "El participante y el mentor siguen trabajando juntos al final del programa.",
      ],
      [
        "Siguiente paso",
        "El participante sale con un plan por escrito y alguien a quien llamar.",
      ],
    ],
    targets: "Metas",
    targetsNot:
      "Publicaremos metas antes de que empiece el piloto y resultados después de cada trimestre.",
    pathwaysAction: "Ver los cuatro caminos de proyectos",
    transparency: "Quiénes somos y cómo verificarlo",
    back: "Volver a New World Kids",
  },
} as const

const eyebrow =
  "text-[11px] font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs"
const link =
  "group inline-flex min-h-12 items-center gap-3 border-y border-black/25 py-3 text-sm font-black hover:border-black/55 focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4 focus-visible:outline-none"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? copy.es : copy.en

  return { title: t.metaTitle, description: t.metaDescription }
}

function Row({
  label,
  children,
}: {
  readonly label: string
  readonly children: React.ReactNode
}) {
  return (
    <section className="border-b border-black/15 px-5 py-12 sm:px-8 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
        <h2 className={eyebrow}>{label}</h2>
        <div className="max-w-3xl">{children}</div>
      </div>
    </section>
  )
}

export default async function First12Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === "es" ? "es" : "en"
  const t = copy[locale]
  const extra = [
    facts.ageRange && [t.ages, facts.ageRange[locale]],
    facts.cost && [t.cost, facts.cost[locale]],
    facts.schedule && [t.schedule, facts.schedule[locale]],
  ].filter((row): row is string[] => Array.isArray(row))
  const glance = [...t.glance, ...extra]

  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="border-b border-black/15 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrow}>{t.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.96] font-black tracking-[-0.045em] text-balance sm:mt-5">
            {t.title}
          </h1>
          <p className="mt-7 max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {t.intro}
          </p>
        </div>
      </section>

      <Row label={t.glanceLabel}>
        <dl className="divide-y divide-black/15 border-y border-black/15">
          {glance.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <dt className="text-sm font-semibold text-[var(--color-text-muted)]">
                {label}
              </dt>
              <dd className="text-base leading-7 font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row label={t.forEyebrow}>
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.forBody}
        </p>
      </Row>

      <Row label={t.applyEyebrow}>
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {facts.applyOpen ? "" : t.applyNot}
        </p>
        {facts.applyOpen ? (
          <a href={facts.applyOpen.href} className={link}>
            <span>{t.applyOpen}</span>
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </Row>

      <Row label={t.payEyebrow}>
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.payBody}
        </p>
        {facts.pay ? (
          <p className="mt-4 text-base leading-7 font-semibold">
            {facts.pay[locale]}
          </p>
        ) : null}
      </Row>

      <Row label={t.safeEyebrow}>
        <ul className="space-y-4">
          {t.safe.map((line) => (
            <li
              key={line}
              className="border-l-2 border-black/30 pl-4 text-base leading-7 text-[var(--color-text-muted)]"
            >
              {line}
            </li>
          ))}
        </ul>
        {facts.safeguardingPolicyHref ? (
          <a href={facts.safeguardingPolicyHref} className={`${link} mt-6`}>
            <span>{t.policy}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </Row>

      <Row label={t.measureEyebrow}>
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.measureIntro}
        </p>
        <dl className="mt-6 divide-y divide-black/15 border-y border-black/15">
          {t.measures.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <dt className="text-base font-black">{label}</dt>
              <dd className="text-base leading-7 text-[var(--color-text-muted)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-base leading-7">
          <span className="font-black">{t.targets}. </span>
          <span className="text-[var(--color-text-muted)]">
            {facts.targets ? facts.targets[locale] : t.targetsNot}
          </span>
        </p>
      </Row>

      <section className="px-5 py-12 sm:px-8 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row">
          <Link href="/projects" locale={locale} className={link}>
            <span>{t.pathwaysAction}</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/transparency" locale={locale} className={link}>
            <span>{t.transparency}</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/" locale={locale} className={link}>
            <span>{t.back}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
