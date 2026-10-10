import type { Metadata } from "next"

import { Link } from "@/lib/navigation"
import { pageAlternates } from "@/lib/seo"

export const revalidate = 3600

type Section = { readonly h: string; readonly p: readonly string[] }

const copy = {
  en: {
    metaTitle: "Safeguarding policy (draft) | New World Kids",
    metaDescription:
      "The full draft safeguarding policy for the First 12, with what is decided and what is still open.",
    eyebrow: "Safeguarding policy",
    title: "Our safeguarding policy, in draft.",
    status:
      "Draft 0.1, October 2026. Not yet adopted. Our board and our fiscal sponsor, Humanitarian Social Innovations, have not yet approved it, and a Washington lawyer has not yet reviewed it. No young person joins the First 12 until it is adopted. Items marked “open” are decisions we have not made yet.",
    sections: [
      {
        h: "1. Who this protects",
        p: [
          "Young people ages 16 to 19 in the First 12 (referral only; King, Snohomish, Pierce, and Skagit counties), and the staff, mentors, and host programs who work with them. It applies to everyone who has contact with a participant.",
        ],
      },
      {
        h: "2. Who may work with a young person",
        p: [
          "Mentors, host contacts, and staff are approved before any contact. Each gets a Washington State Patrol background check under RCW 43.43.830 to 43.43.838.",
          "Open: whether to add an FBI fingerprint check, which provider we use, how often checks renew, how many references we ask for, and whether we require that no adult is ever alone with a participant out of sight of others.",
        ],
      },
      {
        h: "3. Projects",
        p: [
          "Every project is reviewed for safety, supervision, timing, and fit before it is offered. Every project has a named adult supervisor who is present during the work.",
          "Work must be lawful for the participant’s age. For 16 and 17 year olds that means Washington’s hour limits, parent and school authorization, minor work permit, and prohibited-duty rules.",
        ],
      },
      {
        h: "4. Conduct",
        p: [
          "Mentors and hosts must not be alone with a participant privately, online or off site, give gifts or money outside the program, share a participant’s information, or take photos or video without written consent.",
          "Open: rules on alcohol, drugs, and social media.",
        ],
      },
      {
        h: "5. Reporting concerns",
        p: [
          "Anyone who suspects abuse or neglect must tell our safeguarding lead right away. Open: we have not yet named the lead; this is required before the pilot starts.",
          "Washington law (RCW 26.44.030) requires certain professionals to report suspected child abuse or neglect, and requires people in a supervisory role at a nonprofit to report suspected abuse by someone they supervise who coaches, trains, educates, counsels, or has unsupervised access to a child. Participants who are 16 or 17 are children for this purpose.",
          "No one is punished for reporting in good faith.",
        ],
      },
      {
        h: "6. Handling a report",
        p: [
          "We record facts only, protect the young person, do not investigate on our own, keep records private, and cooperate with authorities. We tell our fiscal sponsor about any serious incident. Open: how quickly, and who decides to remove a mentor or host.",
        ],
      },
      {
        h: "7. Photos, video, and information",
        p: [
          "We do not publish a participant’s name, school, schedule, or identifiable image without written consent from the participant and, if under 18, a parent or guardian. Consent can be withdrawn. Proyecto Indigo Azul footage is never shown as Seattle participant activity.",
        ],
      },
      {
        h: "8. Training and review",
        p: [
          "Mentors and hosts complete training before they start. Open: the training. We will review this policy every year and after any serious incident.",
        ],
      },
    ] satisfies readonly Section[],
    contact: "Questions or concerns: info@nwkids.org",
    back: "Back to safeguards",
  },
  es: {
    metaTitle: "Política de protección (borrador) | New World Kids",
    metaDescription:
      "El borrador completo de la política de protección de Los Primeros 12, con lo que ya está decidido y lo que sigue abierto.",
    eyebrow: "Política de protección",
    title: "Nuestra política de protección, en borrador.",
    status:
      "Borrador 0.1, octubre de 2026. Todavía no está adoptada. Nuestra mesa directiva y nuestro patrocinador fiscal, Humanitarian Social Innovations, aún no la han aprobado, y un abogado de Washington aún no la ha revisado. Ningún joven entra a Los Primeros 12 hasta que se adopte. Los puntos marcados como “abierto” son decisiones que todavía no tomamos.",
    sections: [
      {
        h: "1. A quién protege",
        p: [
          "A los jóvenes de 16 a 19 años de Los Primeros 12 (solo por recomendación; condados de King, Snohomish, Pierce y Skagit), y al personal, los mentores y los programas anfitriones que trabajan con ellos. Aplica a todas las personas que tengan contacto con un participante.",
        ],
      },
      {
        h: "2. Quién puede trabajar con un joven",
        p: [
          "Los mentores, los contactos de los programas anfitriones y el personal se aprueban antes de cualquier contacto. A cada uno se le hace una verificación de antecedentes de la Patrulla Estatal de Washington, conforme a RCW 43.43.830 a 43.43.838.",
          "Abierto: si agregamos verificación de huellas del FBI, con qué proveedor, cada cuánto se renueva, cuántas referencias pedimos y si exigimos que ningún adulto esté nunca a solas con un participante fuera de la vista de otros.",
        ],
      },
      {
        h: "3. Proyectos",
        p: [
          "Cada proyecto se revisa en cuanto a seguridad, supervisión, horarios y compatibilidad antes de ofrecerse. Cada proyecto tiene un adulto supervisor con nombre, presente durante el trabajo.",
          "El trabajo debe ser legal para la edad del participante. Para jóvenes de 16 y 17 años eso significa los límites de horas de Washington, la autorización de madre, padre o tutor y de la escuela, el permiso de trabajo para menores y las reglas de tareas prohibidas.",
        ],
      },
      {
        h: "4. Conducta",
        p: [
          "Los mentores y anfitriones no deben estar a solas en privado con un participante, ni en línea ni fuera del lugar de trabajo; no deben dar regalos ni dinero fuera del programa, compartir información del participante ni tomar fotos o video sin consentimiento por escrito.",
          "Abierto: reglas sobre alcohol, drogas y redes sociales.",
        ],
      },
      {
        h: "5. Cómo reportar una preocupación",
        p: [
          "Quien sospeche abuso o negligencia debe avisar de inmediato a nuestra persona responsable de protección. Abierto: todavía no hemos nombrado a esa persona; es indispensable antes de que inicie el piloto.",
          "La ley de Washington (RCW 26.44.030) obliga a ciertos profesionales a reportar sospechas de abuso o negligencia infantil, y obliga a quienes ocupan un cargo de supervisión en una organización sin fines de lucro a reportar sospechas de abuso por parte de alguien a quien supervisan que entrena, enseña, orienta o tiene acceso sin supervisión a un menor. Los participantes de 16 o 17 años son menores para este efecto.",
          "Nadie sufre represalias por reportar de buena fe.",
        ],
      },
      {
        h: "6. Cómo se atiende un reporte",
        p: [
          "Solo registramos hechos, protegemos al joven, no investigamos por nuestra cuenta, mantenemos los registros en privado y colaboramos con las autoridades. Avisamos a nuestro patrocinador fiscal de cualquier incidente grave. Abierto: en cuánto tiempo, y quién decide retirar a un mentor o anfitrión.",
        ],
      },
      {
        h: "7. Fotos, video e información",
        p: [
          "No publicamos el nombre, la escuela, el horario ni una imagen identificable de un participante sin consentimiento por escrito del participante y, si es menor de 18 años, de su madre, padre o tutor. El consentimiento se puede retirar. Las imágenes de Proyecto Indigo Azul nunca se presentan como actividad de participantes en Seattle.",
        ],
      },
      {
        h: "8. Capacitación y revisión",
        p: [
          "Los mentores y anfitriones completan una capacitación antes de empezar. Abierto: la capacitación. Revisaremos esta política cada año y después de cualquier incidente grave.",
        ],
      },
    ] satisfies readonly Section[],
    contact: "Preguntas o inquietudes: info@nwkids.org",
    back: "Volver a protección",
  },
} as const

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
    alternates: pageAlternates(locale, "/safeguarding/policy"),
  }
}

export default async function SafeguardingPolicyPage({
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
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase">
          {t.eyebrow}
        </p>
        <h1 className="t-h1 mt-4 text-balance">{t.title}</h1>
        <p
          role="note"
          className="mt-7 border-l-4 border-[var(--color-brand)] bg-white/60 p-4 text-base leading-7"
        >
          {t.status}
        </p>
        <div className="mt-10 divide-y divide-black/15 border-y border-black/15">
          {t.sections.map((section) => (
            <section key={section.h} className="rise py-7">
              <h2 className="t-h3">{section.h}</h2>
              {section.p.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-base leading-7 text-[var(--color-text-muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          {t.contact}
        </p>
        <Link
          href="/safeguarding"
          locale={locale}
          className="btn-quiet press mt-8 inline-flex"
        >
          <span>{t.back}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
