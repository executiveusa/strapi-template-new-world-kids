import type { Metadata } from "next"

import { facts } from "@/content/facts"
import { Link } from "@/lib/navigation"
import { withCopyOverrides } from "@/lib/nwkids/copy"
import { pageAlternates } from "@/lib/seo"

// Facts below come from public records checked on 2026-10-09:
// - Washington Secretary of State CCFS record (UBI 604 917 764)
// - HSI member resources page (hsifiscalsponsor.org/fiscal-sponsorship-community-membership)
// - NWK FundRazr campaign (fundrazr.com/nwkids.org)
// The fiscal sponsorship agreement (Apr 13, 2023) requires HSI's prior written
// approval of fundraising text, so this page needs HSI sign-off before launch.

const HSI = "https://hsifiscalsponsor.org/wp-content/uploads"

const documents = [
  {
    key: "irs2023",
    href: `${HSI}/2024/04/HSI-2023-Determination-Letter-3.pdf`,
  },
  { key: "irs2014", href: `${HSI}/2021/02/6-Federal-Tax-Exemption.pdf` },
  { key: "form990", href: `${HSI}/2025/11/2024-990-HSI-Redacted-B.pdf` },
  { key: "audit", href: `${HSI}/2025/11/HSI-2024-Audited-Financials.pdf` },
  { key: "board", href: `${HSI}/2026-HSI-Governing-Board-.pdf` },
] as const

export const revalidate = 60

const copy = {
  en: {
    metaTitle: "Transparency | New World Kids",
    metaDescription:
      "Who New World Kids is, who holds donated funds, and how to verify both.",
    eyebrow: "Transparency",
    title: "Who we are, who holds the funds, and how to check.",
    intro:
      "Every claim on this page can be checked in a public record. If something here is wrong or out of date, write to info@nwkids.org.",
    checked: "Last checked October 9, 2026.",
    whoEyebrow: "Who is who",
    nwkTitle: "New World Kids",
    nwkBody:
      "A Washington nonprofit corporation formed May 16, 2022. UBI 604 917 764 (Washington’s business ID number). Status shown as Active in the Washington Secretary of State record.",
    nwkVerify: "Verify at ccfs.sos.wa.gov",
    nwkVerifyHint: "Search the UBI number.",
    hsiTitle: "Humanitarian Social Innovations (HSI)",
    hsiBody:
      "Our fiscal sponsor: a charity that holds donated money and does the paperwork for us. HSI is a 501(c)(3) public charity, EIN 46-4779591 (the IRS’s ID number for an organization). Donations to the New World Kids fund are made to HSI.",
    hsiVerify: "Verify in the IRS Tax Exempt Organization Search",
    peopleTitle: "Who is responsible",
    peopleNote:
      "Taken from the Washington record and our agreement with HSI. The Washington record lists one governor (a board member) today.",
    piaTitle: "Proyecto Indigo Azul",
    piaBody:
      "What it is: a demonstration food forest that New World Kids built in rural Puerto Vallarta, Mexico, starting in 2020. It is designed to grow into a learning center and a cultural exchange program. What it is not: the Seattle pilot. The First 12 has different participants, partners, and rules, and no results exist yet. How we use it: its photos and film are the dated record of what we built, always labeled as Proyecto Indigo Azul, never shown as Seattle participants or results.",
    notClaimTitle: "What we do not claim",
    notClaimBody:
      "New World Kids is not itself an IRS-recognized 501(c)(3). We operate under HSI’s fiscal sponsorship, and HSI is the legal recipient of gifts. The First 12 is a pilot planned for 2027, so there are no Seattle participant outcomes to report yet.",
    giveEyebrow: "How giving works",
    giveOnlineTitle: "Online",
    giveOnlineBody:
      "Our campaign runs on HSI’s FundRazr platform. Your receipt will list Humanitarian Social Innovations. That is correct.",
    giveOnlineAction: "Support the First 12",
    giveCheckTitle: "By check",
    giveCheckBody:
      "Make it payable to “Humanitarian Social Innovations” or “HSI” and write “New World Kids” on the memo line so HSI credits the right fund. Mail to:",
    giveCheckAddress: [
      "Humanitarian Social Innovations",
      "301 Broadway, Suite 115",
      "Bethlehem, PA 18015",
    ],
    supportsTitle: "What donations support",
    supportsBody:
      "Participant wages, transportation, project materials, equipment, mentor support, and program coordination.",
    taxNote:
      "The IRS letters below state that donors can deduct contributions to HSI as provided by law. Ask your tax adviser about your own situation.",
    docsEyebrow: "Documents",
    docsNote: "Hosted by HSI so you always see their current originals.",
    docs: {
      irs2023: {
        title: "IRS letter, November 2023",
        body: "Confirms HSI’s 501(c)(3) status and public charity classification.",
      },
      irs2014: {
        title: "IRS determination letter, December 2014",
        body: "The original determination of 501(c)(3) status, effective February 18, 2014.",
      },
      form990: {
        title: "HSI Form 990, 2024",
        body: "HSI’s annual return (redacted).",
      },
      audit: {
        title: "HSI audited financial statements, 2024",
        body: "Independent audit of HSI.",
      },
      board: {
        title: "HSI governing board, 2026",
        body: "Who governs our fiscal sponsor.",
      },
    },
    agreementTitle: "Fiscal sponsorship agreement",
    agreementBody:
      "Our signed agreement with HSI, dated April 13, 2023, is available on request at info@nwkids.org.",
    contactEyebrow: "Questions",
    contactBody:
      "About New World Kids: info@nwkids.org. About the sponsorship relationship: office@hsifiscalsponsor.org.",
    disclosure:
      "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org.",
    back: "Back to New World Kids",
    opens: "opens in a new tab",
  },
  es: {
    metaTitle: "Transparencia | New World Kids",
    metaDescription:
      "Quién es New World Kids, quién custodia los fondos donados y cómo verificarlo.",
    eyebrow: "Transparencia",
    title: "Quiénes somos, quién custodia los fondos y cómo verificarlo.",
    intro:
      "Cada dato de esta página se puede comprobar en un registro público. Si algo es incorrecto o está desactualizado, escribe a info@nwkids.org.",
    checked: "Última verificación: 9 de octubre de 2026.",
    whoEyebrow: "Quién es quién",
    nwkTitle: "New World Kids",
    nwkBody:
      "Corporación sin fines de lucro de Washington, constituida el 16 de mayo de 2022. UBI 604 917 764 (el número de identificación comercial de Washington). El registro del Secretario de Estado de Washington la muestra como Activa.",
    nwkVerify: "Verifica en ccfs.sos.wa.gov",
    nwkVerifyHint: "Busca el número UBI.",
    hsiTitle: "Humanitarian Social Innovations (HSI)",
    hsiBody:
      "Nuestro patrocinador fiscal: una organización benéfica que recibe el dinero donado y se encarga del papeleo por nosotros. HSI es una organización benéfica pública 501(c)(3), EIN 46-4779591 (el número de identificación del IRS para una organización). Las donaciones al fondo de New World Kids se hacen a HSI.",
    hsiVerify: "Verifica en la búsqueda de organizaciones exentas del IRS",
    peopleTitle: "Quién es responsable",
    peopleNote:
      "Tomado del registro de Washington y de nuestro acuerdo con HSI. Hoy el registro de Washington lista a una persona con el cargo de “governor” (miembro de la mesa directiva).",
    piaTitle: "Proyecto Indigo Azul",
    piaBody:
      "Qué es: un bosque comestible de demostración que New World Kids construyó en el campo de Puerto Vallarta, México, desde 2020. Está diseñado para convertirse en un centro de aprendizaje y un programa de intercambio cultural. Qué no es: el piloto de Seattle. Los Primeros 12 tienen participantes, socios y reglas distintos, y todavía no hay resultados. Cómo lo usamos: sus fotos y videos son el registro fechado de lo que construimos, siempre identificados como Proyecto Indigo Azul y nunca mostrados como participantes ni resultados de Seattle.",
    notClaimTitle: "Lo que no afirmamos",
    notClaimBody:
      "New World Kids no es, por sí misma, una organización 501(c)(3) reconocida por el IRS. Operamos bajo el patrocinio fiscal de HSI, y HSI es el destinatario legal de las donaciones. Los Primeros 12 son un piloto previsto para 2027, así que todavía no hay resultados de participantes en Seattle.",
    giveEyebrow: "Cómo funcionan las donaciones",
    giveOnlineTitle: "En línea",
    giveOnlineBody:
      "Nuestra campaña usa la plataforma FundRazr de HSI. Tu recibo mostrará Humanitarian Social Innovations. Eso es correcto.",
    giveOnlineAction: "Apoya a los Primeros 12",
    giveCheckTitle: "Con cheque",
    giveCheckBody:
      "Hazlo a nombre de “Humanitarian Social Innovations” o “HSI” y escribe “New World Kids” en la línea de memo para que HSI acredite el fondo correcto. Envíalo a:",
    giveCheckAddress: [
      "Humanitarian Social Innovations",
      "301 Broadway, Suite 115",
      "Bethlehem, PA 18015",
    ],
    supportsTitle: "Qué apoyan las donaciones",
    supportsBody:
      "Salarios de los participantes, transporte, materiales de proyecto, equipo, apoyo a mentores y coordinación del programa.",
    taxNote:
      "Las cartas del IRS que aparecen abajo indican que los donantes pueden deducir las contribuciones a HSI según la ley. Consulta a tu asesor fiscal sobre tu caso.",
    docsEyebrow: "Documentos",
    docsNote:
      "Alojados por HSI para que siempre veas sus originales vigentes. Están en inglés.",
    docs: {
      irs2023: {
        title: "Carta del IRS, noviembre de 2023",
        body: "Confirma el estatus 501(c)(3) de HSI y su clasificación como organización benéfica pública.",
      },
      irs2014: {
        title: "Carta de determinación del IRS, diciembre de 2014",
        body: "La determinación original del estatus 501(c)(3), vigente desde el 18 de febrero de 2014.",
      },
      form990: {
        title: "Formulario 990 de HSI, 2024",
        body: "Declaración anual de HSI (con datos tachados).",
      },
      audit: {
        title: "Estados financieros auditados de HSI, 2024",
        body: "Auditoría independiente de HSI.",
      },
      board: {
        title: "Junta directiva de HSI, 2026",
        body: "Quién gobierna a nuestro patrocinador fiscal.",
      },
    },
    agreementTitle: "Acuerdo de patrocinio fiscal",
    agreementBody:
      "Nuestro acuerdo firmado con HSI, con fecha del 13 de abril de 2023, está disponible a pedido en info@nwkids.org.",
    contactEyebrow: "Preguntas",
    contactBody:
      "Sobre New World Kids: info@nwkids.org. Sobre la relación de patrocinio: office@hsifiscalsponsor.org.",
    disclosure:
      "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org.",
    back: "Volver a New World Kids",
    opens: "se abre en una pestaña nueva",
  },
} as const

const eyebrow =
  "text-xs font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs"
const linkClass =
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
    alternates: pageAlternates(locale, "/transparency"),
  }
}

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === "es" ? "es" : "en"
  const t = await withCopyOverrides("transparency", locale, copy[locale])
  const fundrazr = "https://fundrazr.com/nwkids.org"

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
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            {t.checked}
          </p>
        </div>
      </section>

      <section className="border-b border-black/15 px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="rise mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <p className={eyebrow}>{t.whoEyebrow}</p>
          <div className="max-w-3xl divide-y divide-black/15 border-y border-black/15">
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.nwkTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                {t.nwkBody}
              </p>
              <a
                href="https://ccfs.sos.wa.gov/"
                target="_blank"
                rel="noreferrer"
                className={`${linkClass} mt-4`}
              >
                <span>{t.nwkVerify}</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only">
                  ({t.opens}) {t.nwkVerifyHint}
                </span>
              </a>
            </div>
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.hsiTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                {t.hsiBody}
              </p>
              <a
                href="https://apps.irs.gov/app/eos/"
                target="_blank"
                rel="noreferrer"
                className={`${linkClass} mt-4`}
              >
                <span>{t.hsiVerify}</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only">({t.opens})</span>
              </a>
            </div>
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.peopleTitle}
              </h2>
              <ul className="mt-3 space-y-2">
                {facts.team.map((person) => (
                  <li key={person.name} className="text-base leading-7">
                    <span className="font-semibold">{person.name}</span>
                    <span className="text-[var(--color-text-muted)]">
                      {" "}
                      · {person.role[locale]}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                {t.peopleNote}
              </p>
            </div>
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.piaTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                {t.piaBody}
              </p>
            </div>
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.notClaimTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                {t.notClaimBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/15 px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="rise mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <p className={eyebrow}>{t.giveEyebrow}</p>
          <div className="max-w-3xl divide-y divide-black/15 border-y border-black/15">
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.giveOnlineTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                {t.giveOnlineBody}
              </p>
              <a
                href={fundrazr}
                target="_blank"
                rel="noreferrer"
                className={`${linkClass} mt-4`}
              >
                <span>{t.giveOnlineAction}</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only">({t.opens})</span>
              </a>
            </div>
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.giveCheckTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                {t.giveCheckBody}
              </p>
              <address className="mt-3 text-base leading-7 font-semibold not-italic">
                {t.giveCheckAddress.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div className="py-7">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">
                {t.supportsTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                {t.supportsBody}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                {t.taxNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/15 px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="rise mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <div>
            <p className={eyebrow}>{t.docsEyebrow}</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--color-text-muted)]">
              {t.docsNote}
            </p>
          </div>
          <div className="max-w-3xl border-y border-black/15">
            <ul className="divide-y divide-black/15">
              {documents.map((doc) => (
                <li key={doc.key}>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 py-5 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-4 focus-visible:outline-none"
                  >
                    <span>
                      <span className="block text-lg font-bold tracking-[-0.02em]">
                        {t.docs[doc.key].title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[var(--color-text-muted)]">
                        {t.docs[doc.key].body}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                    <span className="sr-only">({t.opens})</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/15 py-6">
              <h2 className="text-lg font-bold tracking-[-0.02em]">
                {t.agreementTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                {t.agreementBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="rise mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <p className={eyebrow}>{t.contactEyebrow}</p>
          <div className="max-w-3xl">
            <p className="text-base leading-7 text-[var(--color-text-muted)]">
              {t.contactBody}
            </p>
            <p className="mt-6 border-t border-black/15 pt-5 text-xs leading-6 text-[var(--color-text-muted)]">
              {t.disclosure}
            </p>
            <Link href="/" locale={locale} className={`${linkClass} mt-8`}>
              <span>{t.back}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
