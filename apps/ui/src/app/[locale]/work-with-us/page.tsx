import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"
import { copyForLocale, workWithUsOffers } from "@/content/site"

const copy = {
  en: {
    eyebrow: "Mission-funded studio",
    title: "We are not built to beg.",
    titleAccent: "We are built to produce.",
    body1:
      "Starting a nonprofit is overwhelming. Compliance, grant writing, fundraising, website design, social media — it crushes great ideas before they do any good. We know. We've been through all of it.",
    body2:
      "Over two years we built AI systems that drive our own mission. We now offer them to other nonprofits at a discounted rate — because we understand your challenges. We live them.",
    offersEyebrow: "What we offer",
    cta: "Start a conversation",
  },
  es: {
    eyebrow: "Estudio financiado por la misión",
    title: "No estamos hechos para mendigar.",
    titleAccent: "Estamos hechos para producir.",
    body1:
      "Comenzar una organización sin fines de lucro es abrumador. Cumplimiento, redacción de propuestas, recaudación de fondos, diseño web, redes sociales — todo eso aplasta las buenas ideas antes de que hagan algún bien. Lo sabemos. Ya pasamos por todo esto.",
    body2:
      "En dos años construimos sistemas de IA que impulsan nuestra propia misión. Ahora los ofrecemos a otras organizaciones sociales con una tarifa reducida — porque entendemos tus retos. Los vivimos.",
    offersEyebrow: "Qué ofrecemos",
    cta: "Iniciar una conversación",
  },
}

export default async function WorkWithUsPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
      <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-5xl">
        {t.title}{" "}
        <span className="text-[var(--color-accent-gold)]">{t.titleAccent}</span>
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
        {t.body1}
      </p>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
        {t.body2}
      </p>

      <p className="mt-14 text-xs tracking-[0.2em] text-[var(--color-accent-gold)] uppercase">
        {t.offersEyebrow}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {workWithUsOffers.map((offer) => (
          <div
            key={offer.title.en}
            className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
              {copyForLocale(locale, offer.title)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
              {copyForLocale(locale, offer.body)}
            </p>
          </div>
        ))}
      </div>

      <a
        href={siteLinks.email}
        className="mt-14 inline-flex h-11 items-center rounded-full bg-[var(--color-accent-gold)] px-6 text-sm font-semibold text-[var(--color-bg)] shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-gold)]/85"
      >
        {t.cta} →
      </a>
    </div>
  )
}
