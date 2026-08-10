import { Mail } from "lucide-react"
import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"
import { fiscalSponsor, supportRails } from "@/content/site"

const copy = {
  en: {
    eyebrow: "Support the mission",
    title: "Plant a seed in Paso de Guayabo.",
    body: "Every gift goes directly toward keeping Culture Shock and Proyecto Indigo Azul free for every student, always. New World Kids operates under fiscal sponsorship, so your contribution is handled by a verified 501(c)(3) partner.",
    tiersEyebrow: "What your gift funds",
    ctaTitle: "Ready to give?",
    ctaBody:
      "Online, self-serve donation processing is being finalized right now. In the meantime, the fastest way to give is to email us directly — we'll send a secure payment link or wire instructions within one business day.",
    ctaButton: "Email us to donate",
    sponsor: "Fiscal sponsor",
  },
  es: {
    eyebrow: "Apoya la misión",
    title: "Siembra una semilla en Paso de Guayabo.",
    body: "Cada donativo se destina directamente a mantener Culture Shock y Proyecto Indigo Azul gratuitos para cada estudiante, siempre. New World Kids opera bajo patrocinio fiscal, así que tu contribución la gestiona un socio 501(c)(3) verificado.",
    tiersEyebrow: "En qué se usa tu donativo",
    ctaTitle: "¿Listo para donar?",
    ctaBody:
      "El procesamiento de donativos en línea se está finalizando en este momento. Mientras tanto, la forma más rápida de donar es escribirnos directamente — te enviaremos un enlace de pago seguro o datos de transferencia en menos de un día hábil.",
    ctaButton: "Escríbenos para donar",
    sponsor: "Patrocinador fiscal",
  },
}

const tiers = {
  en: [
    { amount: "$25", label: "Plant a tree", detail: "at Proyecto Indigo Azul" },
    {
      amount: "$50",
      label: "Sponsor a child",
      detail: "for one month of programs",
      featured: true,
    },
    {
      amount: "$100",
      label: "Fund language classes",
      detail: "for 4 weeks of instruction",
    },
  ],
  es: [
    {
      amount: "$25",
      label: "Siembra un árbol",
      detail: "en Proyecto Indigo Azul",
    },
    {
      amount: "$50",
      label: "Apadrina a un niño",
      detail: "por un mes de programas",
      featured: true,
    },
    {
      amount: "$100",
      label: "Financia clases de idiomas",
      detail: "por 4 semanas de instrucción",
    },
  ],
}

export default async function DonatePage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  const tierList = locale === "es" ? tiers.es : tiers.en

  // Once a real processor is configured (NEXT_PUBLIC_DONORBOX_URL etc.),
  // supportRails.donorbox stops equalling the internal fallback and this
  // page should link straight out to it instead of the email fallback.
  const hasRealProcessor = supportRails.donorbox !== "/donate"

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

      <p className="mt-14 text-xs tracking-[0.2em] text-[var(--color-accent-gold)] uppercase">
        {t.tiersEyebrow}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {tierList.map((tier) => (
          <div
            key={tier.amount}
            className={[
              "relative rounded-2xl border p-6 text-center transition-colors duration-200",
              tier.featured
                ? "border-[var(--color-accent-coral)] bg-[var(--color-accent-coral)]/10"
                : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]",
            ].join(" ")}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent-coral)] px-3 py-0.5 text-xs font-semibold text-white">
                {locale === "es" ? "Más impacto" : "Most impactful"}
              </span>
            )}
            <p className="font-serif text-4xl font-semibold text-[var(--color-accent-gold)]">
              {tier.amount}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
              {tier.label}
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {tier.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8">
        <h2 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
          {t.ctaTitle}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
          {t.ctaBody}
        </p>
        <a
          href={hasRealProcessor ? supportRails.donorbox : siteLinks.email}
          target={hasRealProcessor ? "_blank" : undefined}
          rel={hasRealProcessor ? "noreferrer" : undefined}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-accent-coral)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]"
        >
          <Mail className="h-4 w-4" />
          {t.ctaButton}
        </a>
      </div>

      <p className="mt-8 text-xs text-[var(--color-text-muted)]">
        {t.sponsor}: {fiscalSponsor.name} &middot; EIN {fiscalSponsor.ein}
      </p>
    </div>
  )
}
