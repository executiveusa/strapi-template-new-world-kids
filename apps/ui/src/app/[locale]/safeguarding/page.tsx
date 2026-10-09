import type { Metadata } from "next"

import { Link } from "@/lib/navigation"

// Commitments here follow Washington and federal rules read on 2026-10-09 (see
// docs/NWK_COMPLIANCE_CROSSWALK.md). Counsel and HSI should review before launch.

type Item = { readonly h: string; readonly items: readonly string[] }

const copy = {
  en: {
    metaTitle: "Safeguards | New World Kids",
    metaDescription:
      "How we keep young people safe in the First 12: who works with them, the work rules, how we report concerns, and how we protect their information.",
    eyebrow: "Safeguards",
    title: "How we keep young people safe.",
    intro:
      "These apply to everyone who works with the First 12: staff, mentors, and host programs. The young people are 16 to 19.",
    groups: [
      {
        h: "Who works with them",
        items: [
          "Mentors and host contacts are approved before they meet a participant. We run Washington State Patrol background checks on them (RCW 43.43.830 to 43.43.838).",
          "Every project has a named adult supervisor who is present during the work.",
          "Mentors agree to our screening in writing before they are matched.",
        ],
      },
      {
        h: "The work",
        items: [
          "Hours are set together by the young person, their parent or guardian, and the host program. All three must agree.",
          "For anyone under 18 we follow Washington’s child labor rules: hour limits, a signed parent and school authorization each school year, proof of age, and the employer’s minor work permit.",
          "No one under 18 does prohibited work, such as roofing, demolition, mechanical excavation, or power-driven woodworking machines and saws. We screen every project before it is offered.",
          "Participants are paid at least the minimum wage plus $3 an hour.",
        ],
      },
      {
        h: "How people behave",
        items: [
          "Mentors and hosts meet participants in program settings, in public, or through program channels. They do not give gifts or money outside the program.",
          "Nobody is alone with a participant out of sight of other adults.",
          "Nobody shares a participant’s personal information.",
        ],
      },
      {
        h: "If something worries you",
        items: [
          "In immediate danger, call 911.",
          "Staff and mentors must report suspected abuse or neglect. Washington law (RCW 26.44.030) requires it, including from anyone supervising people who coach, teach, or counsel children at a nonprofit.",
          "Anyone can tell us at info@nwkids.org. Nobody is punished for reporting in good faith.",
        ],
      },
      {
        h: "Their information",
        items: [
          "We do not publish participant names, schools, or schedules.",
          "Photos or video of a participant need written consent from them and, if under 18, a parent or guardian. Consent can be withdrawn.",
          "Proyecto Indigo Azul footage is never shown as Seattle participants.",
        ],
      },
    ] as readonly Item[],
    linksH: "Official sources",
    links: [
      [
        "Washington hours of work for minors (L&I)",
        "https://www.lni.wa.gov/workers-rights/youth-employment/hours-of-work",
      ],
      [
        "Prohibited duties for minors (L&I)",
        "https://www.lni.wa.gov/workers-rights/youth-employment/prohibited-duties",
      ],
      [
        "How to report child abuse or neglect (DCYF)",
        "https://dcyf.wa.gov/safety/mandated-reporter",
      ],
      [
        "File a child labor complaint (L&I)",
        "https://secure.lni.wa.gov/ChildLaborComplaint/#/",
      ],
      [
        "Federal youth work rules (U.S. Department of Labor)",
        "https://www.dol.gov/agencies/whd/youthrules",
      ],
    ] as readonly (readonly [string, string])[],
    reviewed: "Last reviewed October 9, 2026.",
    back: "Back to the First 12",
    opens: "opens in a new tab",
  },
  es: {
    metaTitle: "Protección | New World Kids",
    metaDescription:
      "Cómo protegemos a los jóvenes en los Primeros 12: quién trabaja con ellos, las reglas del trabajo, cómo reportamos preocupaciones y cómo protegemos su información.",
    eyebrow: "Protección",
    title: "Cómo protegemos a los jóvenes.",
    intro:
      "Esto aplica a todas las personas que trabajan con los Primeros 12: personal, mentores y programas anfitriones. Los jóvenes tienen de 16 a 19 años.",
    groups: [
      {
        h: "Quién trabaja con ellos",
        items: [
          "Los mentores y contactos anfitriones se aprueban antes de conocer a un participante. Les hacemos verificaciones de antecedentes de la Policía Estatal de Washington (RCW 43.43.830 a 43.43.838).",
          "Cada proyecto tiene un adulto supervisor con nombre que está presente durante el trabajo.",
          "Los mentores aceptan nuestra evaluación por escrito antes de ser asignados.",
        ],
      },
      {
        h: "El trabajo",
        items: [
          "Las horas las fijan juntos el joven, su madre, padre o tutor, y el programa anfitrión. Los tres deben estar de acuerdo.",
          "Para menores de 18 seguimos las reglas de trabajo infantil de Washington: límites de horas, una autorización firmada de padres y escuela cada año escolar, prueba de edad y el permiso de trabajo de menores del empleador.",
          "Ningún menor de 18 hace trabajo prohibido, como techado, demolición, excavación mecánica o máquinas y sierras de carpintería motorizadas. Revisamos cada proyecto antes de ofrecerlo.",
          "A los participantes se les paga al menos el salario mínimo más $3 por hora.",
        ],
      },
      {
        h: "Cómo se comportan las personas",
        items: [
          "Los mentores y anfitriones se reúnen con los participantes en espacios del programa, en público o por canales del programa. No dan regalos ni dinero fuera del programa.",
          "Nadie está a solas con un participante fuera de la vista de otros adultos.",
          "Nadie comparte la información personal de un participante.",
        ],
      },
      {
        h: "Si algo te preocupa",
        items: [
          "Si hay peligro inmediato, llama al 911.",
          "El personal y los mentores deben reportar sospechas de abuso o negligencia. La ley de Washington (RCW 26.44.030) lo exige, incluso a quien supervise a personas que entrenan, enseñan o aconsejan a menores en una organización sin fines de lucro.",
          "Cualquiera puede avisarnos en info@nwkids.org. Nadie recibe castigo por reportar de buena fe.",
        ],
      },
      {
        h: "Su información",
        items: [
          "No publicamos nombres, escuelas ni horarios de participantes.",
          "Las fotos o videos de un participante requieren consentimiento por escrito de él o ella y, si es menor de 18, de su madre, padre o tutor. El consentimiento se puede retirar.",
          "El material de Proyecto Indigo Azul nunca se muestra como participantes de Seattle.",
        ],
      },
    ] as readonly Item[],
    linksH: "Fuentes oficiales",
    links: [
      [
        "Horas de trabajo para menores en Washington (L&I)",
        "https://www.lni.wa.gov/workers-rights/youth-employment/hours-of-work",
      ],
      [
        "Trabajos prohibidos para menores (L&I)",
        "https://www.lni.wa.gov/workers-rights/youth-employment/prohibited-duties",
      ],
      [
        "Cómo reportar abuso o negligencia infantil (DCYF)",
        "https://dcyf.wa.gov/safety/mandated-reporter",
      ],
      [
        "Presentar una queja de trabajo infantil (L&I)",
        "https://secure.lni.wa.gov/ChildLaborComplaint/#/",
      ],
      [
        "Reglas federales de trabajo juvenil (Departamento de Trabajo de EE. UU.)",
        "https://www.dol.gov/agencies/whd/youthrules",
      ],
    ] as readonly (readonly [string, string])[],
    reviewed: "Última revisión: 9 de octubre de 2026.",
    back: "Volver a los Primeros 12",
    opens: "se abre en una pestaña nueva",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? copy.es : copy.en

  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function SafeguardingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === "es" ? "es" : "en"
  const t = copy[locale]

  return (
    <div className="bg-[var(--color-paper)] px-5 py-16 text-[var(--color-ink)] sm:px-8 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
          {t.eyebrow}
        </p>
        <h1 className="mt-4 text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.98] font-black tracking-[-0.045em] text-balance">
          {t.title}
        </h1>
        <p className="mt-7 border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.intro}
        </p>
        <div className="mt-10 divide-y divide-black/15 border-y border-black/15">
          {t.groups.map((group) => (
            <section key={group.h} className="py-7">
              <h2 className="text-xl font-black tracking-[-0.02em]">
                {group.h}
              </h2>
              <ul className="mt-3 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-black/30 pl-4 text-base leading-7 text-[var(--color-text-muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <h2 className="mt-10 text-xl font-black tracking-[-0.02em]">
          {t.linksH}
        </h2>
        <ul className="mt-3 divide-y divide-black/15 border-y border-black/15">
          {t.links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 items-center justify-between gap-4 py-3 text-base font-semibold focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span>{label}</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only">({t.opens})</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-[var(--color-text-muted)]">
          {t.reviewed}
        </p>
        <Link
          href="/first-12"
          locale={locale}
          className="mt-8 inline-flex min-h-12 items-center gap-3 border-y border-black/25 py-3 text-sm font-black focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <span>{t.back}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
