import type { Metadata } from "next"

import { facts } from "@/content/facts"
import { Link } from "@/lib/navigation"
import { withCopyOverrides } from "@/lib/nwkids/copy"
import { pageAlternates } from "@/lib/seo"

// Verified sources: the New World Kids FundRazr campaign text (program shape,
// who it is for, what donations pay for), the intake forms (screening and
// review commitments) and HSI's public progress-report requirement.
// "How we will measure" is a proposal for the team to approve before launch.

export const revalidate = 60

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
      [
        "Where",
        "Seattle and surrounding areas: King, Snohomish, Pierce, and Skagit counties",
      ],
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
      "Young people ages 16 to 19 in King, Snohomish, Pierce, and Skagit counties who have real interests and talent but limited access to opportunity. You do not need to have been in the justice system, foster care, or unstable housing to take part, and no one has to share their history. We do support young people who have, because opportunity is hardest to find there. Because this is a pilot, participants join by referral only.",
    applyEyebrow: "How to apply",
    applyNot:
      "Participation is by referral only for this pilot. We do not take direct applications. It takes about 3 minutes to refer someone. It is free for the 12 young people we select.",
    applyOpen: "Apply now",
    payEyebrow: "Pay and paid work",
    payBody:
      "Participants earn income on real projects. Donations help cover participant wages, transportation, project materials, equipment, mentor support, and program coordination.",
    lawEyebrow: "Paid work and the law",
    lawIntro:
      "Participants are paid employees. If you are under 18, Washington’s child labor rules protect you. We build every project to fit them:",
    law: [
      "Hours limits for 16 and 17 year olds: in a school week, up to 4 hours a day and 20 hours a week, between 7 a.m. and 10 p.m.; in a non-school week, up to 8 hours a day and 48 hours a week.",
      "A signed parent and school authorization for each minor, renewed every school year, and proof of age on file.",
      "A minor work permit endorsement on the employer’s business license for every worksite.",
      "No prohibited duties for anyone under 18, such as roofing, demolition, mechanical excavation, or power-driven woodworking machines and saws.",
      "Participants who are 18 or 19 are adults under these rules, and we still keep their projects to the same safety standard.",
    ],
    lawSource:
      "Source: Washington Department of Labor and Industries and chapter 296-125 WAC. Rules changed on July 1, 2026.",
    lawLink: "Read the L&I rules",
    safeEyebrow: "How we keep it safe",
    safe: [
      "Nothing is offered to a participant until we have reviewed the project for fit, safety, supervision, timing, and pathway.",
      "Every project has a named person who supervises and supports the work.",
      "Mentors must agree to complete our required screening before working directly with a participant.",
      "We do not publish participant names, schools, or schedules.",
    ],
    policy: "Read our safeguards",
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
      "This is a pilot, so we are not setting outcome targets in advance. We will publish what we learn from the first 12, and set targets for later groups, once they finish.",
    pathwaysAction: "See the four project pathways",
    referAction: "Refer a young person",
    jumpLabel: "On this page",
    hours:
      "Hours are set together by the young person, their parent or guardian, and the host program. All three must agree.",
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
      [
        "Dónde",
        "Seattle y zonas cercanas: condados de King, Snohomish, Pierce y Skagit",
      ],
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
      "Jóvenes de 16 a 19 años en los condados de King, Snohomish, Pierce y Skagit con intereses y talento reales pero con poco acceso a oportunidades. No hace falta haber estado en el sistema de justicia, en cuidado de crianza temporal (foster care) o sin vivienda estable para participar, y nadie tiene que contar su historia. Sí apoyamos a quienes lo han vivido, porque ahí es donde más cuesta encontrar oportunidades. Como es un piloto, los participantes entran solo por recomendación.",
    applyEyebrow: "Cómo participar",
    applyNot:
      "En este piloto la participación es solo por recomendación. No recibimos solicitudes directas. Recomendar a alguien toma unos 3 minutos. Es gratis para los 12 jóvenes que seleccionemos.",
    applyOpen: "Postúlese ahora",
    payEyebrow: "Pago y trabajo remunerado",
    payBody:
      "Los participantes ganan ingresos en proyectos reales. Las donaciones ayudan a cubrir salarios de participantes, transporte, materiales de proyecto, equipo, apoyo a mentores y coordinación del programa.",
    lawEyebrow: "Trabajo pagado y la ley",
    lawIntro:
      "Los participantes son empleados con sueldo. Si el participante tiene menos de 18 años, las reglas de trabajo infantil de Washington lo protegen. Diseñamos cada proyecto para cumplirlas:",
    law: [
      "Límites de horas para jóvenes de 16 y 17 años: en semana escolar, hasta 4 horas al día y 20 a la semana, entre las 7 a. m. y las 10 p. m.; en semana sin clases, hasta 8 horas al día y 48 a la semana.",
      "Una autorización firmada por la madre, el padre o tutor y la escuela para cada menor, renovada cada año escolar, y prueba de edad en el expediente.",
      "Una autorización para emplear a menores (minor work permit) agregada a la licencia comercial del empleador, para cada lugar de trabajo.",
      "Ningún trabajo prohibido para menores de 18, como techado, demolición, excavación mecánica o máquinas y sierras de carpintería motorizadas.",
      "Los participantes de 18 o 19 años son adultos según estas reglas, y aun así mantenemos sus proyectos con el mismo estándar de seguridad.",
    ],
    lawSource:
      "Fuente: Departamento de Trabajo e Industrias de Washington y el capítulo 296-125 del WAC. Las reglas cambiaron el 1 de julio de 2026.",
    lawLink: "Lea las reglas de L&I (en inglés)",
    safeEyebrow: "Cómo lo mantenemos seguro",
    safe: [
      "No se ofrece nada a un participante hasta revisar el proyecto en cuanto a compatibilidad, seguridad, supervisión, tiempo y camino.",
      "Cada proyecto tiene una persona con nombre que supervisa y apoya el trabajo.",
      "Los mentores deben aceptar completar nuestra evaluación requerida antes de trabajar directamente con un participante.",
      "No publicamos nombres, escuelas ni horarios de participantes.",
    ],
    policy: "Lea nuestras medidas de protección",
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
      "Este es un piloto, así que no fijamos metas de resultados de antemano. Publicaremos lo que aprendamos de los primeros 12 y fijaremos metas para grupos futuros cuando terminen.",
    pathwaysAction: "Ver los cuatro caminos de proyectos",
    referAction: "Recomiende a un joven",
    jumpLabel: "En esta página",
    hours:
      "Las horas las fijan juntos el joven, su madre, padre o tutor, y el programa anfitrión. Los tres deben estar de acuerdo.",
    transparency: "Quiénes somos y cómo verificarlo",
    back: "Volver a New World Kids",
  },
} as const

const eyebrow =
  "text-xs font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs"
const link =
  "group inline-flex min-h-12 items-center gap-3 border-y border-black/25 py-3 text-sm font-bold hover:border-black/55 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-4 focus-visible:outline-none"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? copy.es : copy.en

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: pageAlternates(locale, "/first-12"),
  }
}

function Row({
  label,
  id,
  children,
}: {
  readonly label: string
  readonly id?: string
  readonly children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-black/15 px-5 py-12 sm:px-8 md:px-10 md:py-16"
    >
      <div className="rise mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
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
  const t = await withCopyOverrides("first-12", locale, copy[locale])
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
          <h1 className="t-h1 mt-4 max-w-5xl text-balance sm:mt-5">
            {t.title}
          </h1>
          <p className="mt-7 max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {t.intro}
          </p>
          <Link
            href="/refer"
            locale={locale}
            className="btn-primary mt-8 w-full sm:w-auto sm:min-w-72"
          >
            <span>{t.referAction}</span>
            <span aria-hidden="true">→</span>
          </Link>
          <nav aria-label={t.jumpLabel} className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
              {[
                ["for", t.forEyebrow],
                ["pay", t.payEyebrow],
                ["safe", t.safeEyebrow],
                ["measure", t.measureEyebrow],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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

      <Row label={t.forEyebrow} id="for">
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.forBody}
        </p>
      </Row>

      <Row label={t.applyEyebrow}>
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.applyNot}
        </p>
        <Link
          href="/refer"
          locale={locale}
          className="btn-primary mt-5 w-full sm:w-auto sm:min-w-72"
        >
          <span>{t.referAction}</span>
          <span aria-hidden="true">→</span>
        </Link>
        {facts.applyOpen ? (
          <a href={facts.applyOpen.href} className={link}>
            <span>{t.applyOpen}</span>
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </Row>

      <Row label={t.payEyebrow} id="pay">
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.payBody}
        </p>
        {facts.pay ? (
          <p className="mt-4 text-base leading-7 font-semibold">
            {facts.pay[locale]}
          </p>
        ) : null}
        <p className="mt-4 text-base leading-7 font-semibold">
          {facts.employer[locale]}
        </p>
        <p className="mt-4 text-base leading-7 font-semibold">{t.hours}</p>
        <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
          {facts.insurance[locale]}
        </p>
      </Row>

      <Row label={t.lawEyebrow}>
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.lawIntro}
        </p>
        <ul className="mt-5 space-y-4">
          {t.law.map((line) => (
            <li
              key={line}
              className="border-l-2 border-black/30 pl-4 text-base leading-7 text-[var(--color-text-muted)]"
            >
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-6 text-[var(--color-text-muted)]">
          {t.lawSource}
        </p>
        <a
          href="https://www.lni.wa.gov/workers-rights/youth-employment/hours-of-work"
          target="_blank"
          rel="noreferrer"
          className={`${link} mt-4`}
        >
          <span>{t.lawLink}</span>
          <span aria-hidden="true">↗</span>
          <span className="sr-only">
            (
            {locale === "es"
              ? "se abre en una pestaña nueva"
              : "opens in a new tab"}
            )
          </span>
        </a>
      </Row>

      <Row label={t.safeEyebrow} id="safe">
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
          <Link
            href={facts.safeguardingPolicyHref}
            locale={locale}
            className={`${link} mt-6`}
          >
            <span>{t.policy}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </Row>

      <Row label={t.measureEyebrow} id="measure">
        <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.measureIntro}
        </p>
        <dl className="mt-6 divide-y divide-black/15 border-y border-black/15">
          {t.measures.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <dt className="text-base font-bold">{label}</dt>
              <dd className="text-base leading-7 text-[var(--color-text-muted)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-base leading-7">
          <span className="font-bold">{t.targets}. </span>
          <span className="text-[var(--color-text-muted)]">
            {facts.targets ? facts.targets[locale] : t.targetsNot}
          </span>
        </p>
      </Row>

      <section className="px-5 py-12 sm:px-8 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/refer"
            locale={locale}
            className="btn-primary w-full sm:w-auto sm:min-w-72"
          >
            <span>{t.referAction}</span>
            <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            <Link
              href="/projects"
              locale={locale}
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              {t.pathwaysAction}
            </Link>
            <span aria-hidden="true"> · </span>
            <Link
              href="/transparency"
              locale={locale}
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              {t.transparency}
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
