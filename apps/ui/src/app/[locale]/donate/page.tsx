import { Mail } from "lucide-react"
import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"
import { fiscalSponsor } from "@/content/site"

const copy = {
  en: {
    eyebrow: "Support the mission",
    title: "Support New World Kids.",
    body: "Choose $25, $50, or $100, then email us for the current donation instructions.",
    ctaTitle: "Ready to give?",
    ctaBody: "Email us and we will send the current donation instructions.",
    ctaButton: "Email us to donate",
    sponsor: "Fiscal sponsorship agreement with",
  },
  es: {
    eyebrow: "Apoya la misión",
    title: "Apoya a New World Kids.",
    body: "Elige $25, $50 o $100 y escríbenos para recibir las instrucciones actuales para donar.",
    ctaTitle: "¿Listo para donar?",
    ctaBody: "Escríbenos y te enviaremos las instrucciones actuales para donar.",
    ctaButton: "Escríbenos para donar",
    sponsor: "Acuerdo de patrocinio fiscal con",
  },
}

const amounts = ["$25", "$50", "$100"] as const

export default async function DonatePage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
        {t.body}
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {amounts.map((amount) => (
          <div
            key={amount}
            className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 text-center"
          >
            <p className="font-serif text-4xl font-semibold text-[var(--color-accent-gold)]">
              {amount}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-[var(--color-border-subtle)] pt-8">
        <h2 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
          {t.ctaTitle}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
          {t.ctaBody}
        </p>
        <a
          href={siteLinks.email}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-accent-coral)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {t.ctaButton}
        </a>
      </div>

      <p className="mt-8 text-xs text-[var(--color-text-muted)]">
        {t.sponsor} {fiscalSponsor.name}.
      </p>
    </div>
  )
}
