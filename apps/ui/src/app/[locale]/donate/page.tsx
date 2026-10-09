import type { Metadata } from "next"

import { FUNDRAZR_CAMPAIGN_URL } from "@/content/donation"
import { Link } from "@/lib/navigation"

// Wording mirrors the New World Kids FundRazr campaign and HSI's published
// instructions. HSI must approve fundraising text in writing (sponsorship
// agreement, section 3) before this page goes live.

const copy = {
  en: {
    metaTitle: "Support the First 12 | New World Kids",
    metaDescription:
      "What your gift pays for, who receives it, and how to give by card or check.",
    eyebrow: "Support the First 12",
    title: "Help prove the First 12.",
    intro:
      "A pilot for 12 young people in Seattle in 2027. Each is matched with a mentor and a real project, with paid experience and a clear next step.",
    pays: "What your gift pays for",
    paysBody:
      "Participant wages, transportation, project materials, equipment, mentor support, and program coordination.",
    who: "Who receives it",
    whoBody:
      "Gifts are made to Humanitarian Social Innovations (HSI), our fiscal sponsor and a 501(c)(3) public charity, EIN 46-4779591, for the New World Kids fund. Your receipt will list HSI. That is correct.",
    give: "Give online",
    giveNote: "Opens our campaign on HSI’s FundRazr platform in a new tab.",
    check: "Prefer a check?",
    checkBody:
      "Make it payable to Humanitarian Social Innovations and write “New World Kids” on the memo line. Details are on our transparency page.",
    proof: "Where we are today",
    proofBody:
      "The First 12 has not started. We are building real projects and mentor commitments first, and we publish our progress as we go.",
    more: "Who we are and how to check",
    program: "Read the program details",
  },
  es: {
    metaTitle: "Apoya a los Primeros 12 | New World Kids",
    metaDescription:
      "Qué paga tu donación, quién la recibe y cómo donar con tarjeta o cheque.",
    eyebrow: "Apoya a los Primeros 12",
    title: "Ayuda a comprobar los Primeros 12.",
    intro:
      "Un piloto para 12 jóvenes en Seattle en 2027. Cada uno se conecta con un mentor y un proyecto real, con experiencia pagada y un siguiente paso claro.",
    pays: "Qué paga tu donación",
    paysBody:
      "Salarios de participantes, transporte, materiales de proyecto, equipo, apoyo a mentores y coordinación del programa.",
    who: "Quién la recibe",
    whoBody:
      "Las donaciones se hacen a Humanitarian Social Innovations (HSI), nuestro patrocinador fiscal y organización benéfica pública 501(c)(3), EIN 46-4779591, para el fondo de New World Kids. Tu recibo mostrará a HSI. Eso es correcto.",
    give: "Donar en línea",
    giveNote:
      "Abre nuestra campaña en la plataforma FundRazr de HSI, en una pestaña nueva.",
    check: "¿Prefieres cheque?",
    checkBody:
      "Hazlo a nombre de Humanitarian Social Innovations y escribe “New World Kids” en la línea de memo. Los detalles están en nuestra página de transparencia.",
    proof: "Dónde estamos hoy",
    proofBody:
      "Los Primeros 12 todavía no han empezado. Primero construimos proyectos reales y compromisos de mentores, y publicamos el avance.",
    more: "Quiénes somos y cómo verificarlo",
    program: "Lee los detalles del programa",
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

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === "es" ? "es" : "en"
  const t = copy[locale]
  const blocks = [
    [t.pays, t.paysBody],
    [t.who, t.whoBody],
    [t.proof, t.proofBody],
  ] as const

  return (
    <div className="bg-[var(--color-paper)] px-5 py-16 text-[var(--color-ink)] sm:px-8 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className={eyebrow}>{t.eyebrow}</p>
        <h1 className="mt-4 text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.98] font-black tracking-[-0.045em] text-balance">
          {t.title}
        </h1>
        <p className="mt-7 border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.intro}
        </p>
        <div className="mt-10 divide-y divide-black/15 border-y border-black/15">
          {blocks.map(([heading, body]) => (
            <section key={heading} className="py-7">
              <h2 className="text-xl font-black tracking-[-0.02em]">
                {heading}
              </h2>
              <p className="mt-2 text-base leading-7 text-[var(--color-text-muted)]">
                {body}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-10">
          <a
            href={FUNDRAZR_CAMPAIGN_URL}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-14 w-full items-center justify-between bg-[var(--color-ink)] px-6 text-base font-black text-white focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto sm:min-w-72"
          >
            <span>{t.give}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            {t.giveNote}
          </p>
          <p className="mt-6 text-base leading-7">
            <span className="font-black">{t.check} </span>
            <span className="text-[var(--color-text-muted)]">
              {t.checkBody}
            </span>
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/transparency" locale={locale} className={link}>
            <span>{t.more}</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/first-12" locale={locale} className={link}>
            <span>{t.program}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
