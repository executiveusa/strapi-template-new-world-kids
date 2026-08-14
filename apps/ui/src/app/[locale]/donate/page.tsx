import { ArrowUpRight, Mail } from "lucide-react"
import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"
import { fiscalSponsor } from "@/content/site"

const copy = {
  en: {
    eyebrow: "Support the mission",
    title: "Support New World Kids.",
    body: "Choose an amount, then continue to our FundRazr campaign to complete your donation.",
    fallbackBody:
      "Our FundRazr campaign link is still being configured. Email us for the current donation instructions.",
    ctaTitle: "Ready to give?",
    ctaBody: "Continue to FundRazr to make your donation through the HSI-supported fundraising platform.",
    fallbackCtaBody:
      "Email us and we will send the current donation instructions while FundRazr setup is being completed.",
    ctaButton: "Donate on FundRazr",
    fallbackButton: "Email us to donate",
    sponsor: "Fiscal sponsorship agreement with",
    metaTitle: "Support New World Kids",
    metaDescription:
      "Support New World Kids mission work in practical food, water, energy, shelter, and youth programs through our fiscal-sponsorship fundraising process.",
  },
  es: {
    eyebrow: "Apoya la misión",
    title: "Apoya a New World Kids.",
    body: "Elige una cantidad y continúa a nuestra campaña de FundRazr para completar tu donación.",
    fallbackBody:
      "El enlace de nuestra campaña de FundRazr todavía se está configurando. Escríbenos para recibir las instrucciones actuales para donar.",
    ctaTitle: "¿Listo para donar?",
    ctaBody:
      "Continúa a FundRazr para hacer tu donación mediante la plataforma de recaudación respaldada por HSI.",
    fallbackCtaBody:
      "Escríbenos y te enviaremos las instrucciones actuales mientras terminamos la configuración de FundRazr.",
    ctaButton: "Donar en FundRazr",
    fallbackButton: "Escríbenos para donar",
    sponsor: "Acuerdo de patrocinio fiscal con",
    metaTitle: "Apoya a New World Kids",
    metaDescription:
      "Apoya el trabajo de New World Kids en alimentos, agua, energía, vivienda y programas juveniles mediante nuestro proceso de patrocinio fiscal.",
  },
} as const

const amounts = ["$25", "$50", "$100"] as const

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function DonatePage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  const fundRazrUrl = process.env.FUNDRAZR_CAMPAIGN_URL?.trim()
  const donationHref = fundRazrUrl || siteLinks.email

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
        {fundRazrUrl ? t.body : t.fallbackBody}
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {amounts.map((amount) => (
          <a
            key={amount}
            href={donationHref}
            target={fundRazrUrl ? "_blank" : undefined}
            rel={fundRazrUrl ? "noreferrer" : undefined}
            className="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 text-center transition hover:-translate-y-0.5 hover:border-[var(--color-accent-gold)]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-coral)]"
            aria-label={
              fundRazrUrl
                ? `${locale === "es" ? "Donar" : "Donate"} ${amount} ${locale === "es" ? "en FundRazr" : "on FundRazr"}`
                : `${locale === "es" ? "Solicitar instrucciones para donar" : "Request donation instructions"} ${amount}`
            }
          >
            <p className="font-serif text-4xl font-semibold text-[var(--color-accent-gold)]">
              {amount}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-text-muted)] transition group-hover:text-[var(--color-text-primary)]">
              {fundRazrUrl
                ? locale === "es"
                  ? "Continuar"
                  : "Continue"
                : locale === "es"
                  ? "Pedir instrucciones"
                  : "Get instructions"}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-12 border-t border-[var(--color-border-subtle)] pt-8">
        <h2 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
          {t.ctaTitle}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
          {fundRazrUrl ? t.ctaBody : t.fallbackCtaBody}
        </p>
        <a
          href={donationHref}
          target={fundRazrUrl ? "_blank" : undefined}
          rel={fundRazrUrl ? "noreferrer" : undefined}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-accent-coral)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-coral)]"
        >
          {fundRazrUrl ? (
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Mail className="h-4 w-4" aria-hidden="true" />
          )}
          {fundRazrUrl ? t.ctaButton : t.fallbackButton}
        </a>
      </div>

      <p className="mt-8 text-xs text-[var(--color-text-muted)]">
        {t.sponsor} {fiscalSponsor.name}.
      </p>
    </div>
  )
}
