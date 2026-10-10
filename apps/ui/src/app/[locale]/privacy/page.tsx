import type { Metadata } from "next"

import { Link } from "@/lib/navigation"
import { withCopyOverrides } from "@/lib/nwkids/copy"
import { pageAlternates } from "@/lib/seo"

// Plain-language notice limited to what the code does today (forms store to our
// database; donations are handled by HSI/FundRazr). Needs counsel and HSI review
// before launch; do not add retention periods or legal claims without that review.

export const revalidate = 60

const copy = {
  en: {
    metaTitle: "Privacy | New World Kids",
    metaDescription:
      "What New World Kids collects through this site, why, who sees it, how long we keep it, and how to ask us to change or delete it.",
    eyebrow: "Privacy",
    title: "How we handle what you send us.",
    intro:
      "We collect as little as we can and we do not sell it. This page covers the mentor, project, referral, and email-list forms on this site. Questions: info@nwkids.org.",
    sections: [
      {
        h: "What we collect",
        p: "Only what you type into a form: name or organization, email, an optional phone number, location, and your answers about the work or help you can offer. Our web host and database provider also see technical details any website sees, such as your IP address and browser type, in their server logs.",
      },
      {
        h: "Referrals for young people",
        p: "The First 12 is referral only, and referrals come from adults such as coaches, counselors, and mentors. A referral includes the young person’s first name, age, county, and interests, and who is referring them. We never ask about a young person’s health, legal, school discipline, or family history. For anyone under 18, the referrer confirms a parent or guardian knows. We reach out through the referrer first.",
      },
      {
        h: "Why we collect it",
        p: "To review fit, safety, and timing, and to follow up with you. A mentor or project is never connected to a participant until we have reviewed it and, for mentors, completed screening. The email list is used only to tell you once when the new site opens.",
      },
      {
        h: "Who can see it",
        p: "New World Kids staff who need it. Our database is hosted by Supabase and our site by our hosting provider, and both are expected to protect it. We share information with our fiscal sponsor, Humanitarian Social Innovations, or with authorities only when a safety report or the law requires it. We do not sell or rent your information, and we do not use it for advertising.",
      },
      {
        h: "Donations",
        p: "Donations are not collected on this site. They are processed by our fiscal sponsor, Humanitarian Social Innovations, through its FundRazr page, under their terms and privacy practices.",
      },
      {
        h: "How long we keep it",
        p: "Only as long as we need it to run the First 12 and meet legal duties. We plan to delete referrals we do not move forward after the selection round. We will publish exact retention periods before the pilot starts. If you ask us to delete something sooner, we will, unless the law requires us to keep it.",
      },
      {
        h: "How we protect it",
        p: "Connections to this site are encrypted. Forms write to a private database that the public cannot read, and only staff with a reason can open it. No system is perfectly secure, so we collect only what we need.",
      },
      {
        h: "Cookies and tracking",
        p: "We do not run advertising or analytics trackers. The site remembers your language choice, and may hold what you typed in a form in your browser for a few minutes so a connection problem does not erase it.",
      },
      {
        h: "Your choices",
        p: "You can ask to see, correct, or delete what you sent, or to leave the email list, by emailing info@nwkids.org from the address you used. A parent or guardian can make the same request for a young person.",
      },
      {
        h: "Young visitors",
        p: "This site is not meant for children under 13, and we do not knowingly collect information directly from them. Young people ages 16 to 19 enter the First 12 only through an adult’s referral.",
      },
      {
        h: "Changes",
        p: "If we change this page we will update the date below. Material changes will be noted on the page.",
      },
    ],
    revised:
      "Last updated October 10, 2026. Pending review by counsel and our fiscal sponsor.",
    back: "Back to New World Kids",
  },
  es: {
    metaTitle: "Privacidad | New World Kids",
    metaDescription:
      "Qué recopila New World Kids en este sitio, para qué, quién lo ve, cuánto tiempo lo guardamos y cómo pedir que lo cambiemos o eliminemos.",
    eyebrow: "Privacidad",
    title: "Cómo manejamos lo que nos envía.",
    intro:
      "Recopilamos lo mínimo posible y no lo vendemos. Esta página cubre los formularios de mentor, proyecto, recomendación y lista de correo de este sitio. Preguntas: info@nwkids.org.",
    sections: [
      {
        h: "Qué recopilamos",
        p: "Solo lo que usted escribe en un formulario: nombre u organización, correo electrónico, teléfono opcional, ubicación y sus respuestas sobre el trabajo o la ayuda que puede ofrecer. Nuestro proveedor de hospedaje y de base de datos también ven datos técnicos que cualquier sitio web ve, como la dirección IP y el tipo de navegador, en sus registros del servidor.",
      },
      {
        h: "Recomendaciones de jóvenes",
        p: "Los Primeros 12 es solo por recomendación, y las recomendaciones vienen de adultos como entrenadores, consejeros y mentores. Una recomendación incluye el nombre de pila, la edad, el condado y los intereses del joven, y quién lo recomienda. Nunca pedimos su historial de salud, legal, disciplinario escolar ni familiar. Si el joven es menor de 18 años, quien recomienda confirma que su madre, padre o tutor lo sabe. Nos comunicamos primero con quien recomienda.",
      },
      {
        h: "Para qué la recopilamos",
        p: "Para revisar la compatibilidad, la seguridad y los tiempos, y para darle seguimiento. Nunca conectamos a un mentor o proyecto con un participante sin haberlo revisado y, en el caso de los mentores, sin completar la evaluación. La lista de correo se usa solo para avisarle una vez cuando abra el nuevo sitio.",
      },
      {
        h: "Quién puede verla",
        p: "El personal de New World Kids que la necesite. Nuestra base de datos la aloja Supabase y nuestro sitio, nuestro proveedor de hospedaje; y se espera que ambos la protejan. Compartimos información con nuestro patrocinador fiscal, Humanitarian Social Innovations, o con las autoridades solo cuando un reporte de seguridad o la ley lo exige. No vendemos ni rentamos su información ni la usamos para publicidad.",
      },
      {
        h: "Donaciones",
        p: "En este sitio no se reciben donaciones. Las procesa nuestro patrocinador fiscal, Humanitarian Social Innovations, mediante su página de FundRazr, bajo sus términos y prácticas de privacidad.",
      },
      {
        h: "Cuánto tiempo la guardamos",
        p: "Solo el tiempo necesario para operar Los Primeros 12 y cumplir con obligaciones legales. Planeamos eliminar las recomendaciones que no avancen después de la ronda de selección. Publicaremos los plazos exactos antes de que inicie el piloto. Si nos pide eliminar algo antes, lo haremos, salvo que la ley nos obligue a conservarlo.",
      },
      {
        h: "Cómo la protegemos",
        p: "Las conexiones con este sitio están cifradas. Los formularios escriben en una base de datos privada que el público no puede leer, y solo el personal con una razón para hacerlo puede abrirla. Ningún sistema es perfectamente seguro, por eso recopilamos solo lo necesario.",
      },
      {
        h: "Cookies y rastreo",
        p: "No usamos rastreadores de publicidad ni de analítica. El sitio recuerda su idioma y puede guardar en su navegador, unos minutos, lo que escribió en un formulario para que un problema de conexión no lo borre.",
      },
      {
        h: "Sus opciones",
        p: "Puede pedir ver, corregir o eliminar lo que envió, o salir de la lista de correo, escribiendo a info@nwkids.org desde el correo que usó. La madre, el padre o el tutor de un joven puede hacer la misma solicitud.",
      },
      {
        h: "Visitantes jóvenes",
        p: "Este sitio no está dirigido a menores de 13 años y no recopilamos información directamente de ellos a sabiendas. Los jóvenes de 16 a 19 años entran a Los Primeros 12 solo mediante la recomendación de un adulto.",
      },
      {
        h: "Cambios",
        p: "Si cambiamos esta página, actualizaremos la fecha de abajo. Los cambios importantes se indicarán en la página.",
      },
    ],
    revised:
      "Última actualización: 10 de octubre de 2026. Pendiente de revisión por un abogado y por nuestro patrocinador fiscal.",
    back: "Volver a New World Kids",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: (locale === "es" ? copy.es : copy.en).metaTitle,
    description: (locale === "es" ? copy.es : copy.en).metaDescription,
    alternates: pageAlternates(locale, "/privacy"),
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === "es" ? "es" : "en"
  const t = await withCopyOverrides("privacy", locale, copy[locale])

  return (
    <div className="bg-[var(--color-paper)] px-5 py-16 text-[var(--color-ink)] sm:px-8 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
          {t.eyebrow}
        </p>
        <h1 className="t-h1 mt-4 text-balance">{t.title}</h1>
        <p className="mt-7 border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.intro}
        </p>
        <div className="mt-10 divide-y divide-black/15 border-y border-black/15">
          {t.sections.map((section) => (
            <section key={section.h} className="rise py-7">
              <h2 className="text-xl font-bold tracking-[-0.02em]">
                {section.h}
              </h2>
              <p className="mt-2 text-base leading-7 text-[var(--color-text-muted)]">
                {section.p}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          {t.revised}
        </p>
        <Link
          href="/"
          locale={locale}
          className="mt-10 inline-flex min-h-12 items-center gap-3 border-y border-black/25 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <span>{t.back}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
