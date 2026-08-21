import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"

const copy = {
  en: {
    eyebrow: "Built for teams doing too much by hand",
    title: "Give your team more time for",
    titleAccent: "the work that matters.",
    body1:
      "We know what it is like to run mission-driven work with a small team. Grants have to be found. Donors need updates. Reports need to get written. Websites need attention. Follow-ups get missed. We started building systems to solve those problems for ourselves. Now we help other teams do the same.",
    body2:
      "The goal is not more software. It is fewer things your team has to remember, repeat, copy, chase, or do by hand.",
    offersEyebrow: "Problems we remove",
    cta: "Tell us what's eating your time",
    baseline:
      "We start with the work that is actually slowing your team down, measure the process as it works today, and build only what makes that process simpler.",
    metaTitle: "Services for Mission-Driven Teams | New World Kids",
    metaDescription:
      "Practical systems for mission-driven teams that reduce repetitive grant research, reporting, donor updates, content, and administrative work.",
    offers: [
      {
        title: "Stop spending hours hunting for grants",
        body: "We help find, sort, and track opportunities so your team can spend its time deciding what is worth pursuing instead of searching databases.",
      },
      {
        title: "Stop rewriting the same story five times",
        body: "Turn approved photos, notes, and program updates into material you can reuse for donors, reports, fundraising, and your website.",
      },
      {
        title: "Stop relying on somebody to remember everything",
        body: "We build simple follow-ups, reminders, and handoffs around recurring work so fewer things disappear between people.",
      },
      {
        title: "Stop answering the same questions over and over",
        body: "Your website should make it easy for donors, partners, and supporters to understand what you do, what you need, and how to act.",
      },
    ],
  },
  es: {
    eyebrow: "Para equipos que hacen demasiado trabajo a mano",
    title: "Dale a tu equipo más tiempo para",
    titleAccent: "el trabajo que importa.",
    body1:
      "Sabemos lo que significa hacer trabajo con propósito con un equipo pequeño. Hay que encontrar fondos. Los donantes necesitan actualizaciones. Hay que escribir reportes. El sitio web necesita atención. Los seguimientos se pierden. Empezamos a construir sistemas para resolver esos problemas para nosotros mismos. Ahora ayudamos a otros equipos a hacer lo mismo.",
    body2:
      "La meta no es más software. Es tener menos cosas que tu equipo tenga que recordar, repetir, copiar, perseguir o hacer a mano.",
    offersEyebrow: "Problemas que eliminamos",
    cta: "Cuéntanos qué te está quitando tiempo",
    baseline:
      "Empezamos por el trabajo que realmente está frenando a tu equipo, medimos cómo funciona hoy el proceso y construimos solo lo que lo hace más simple.",
    metaTitle: "Servicios para equipos con misión | New World Kids",
    metaDescription:
      "Sistemas prácticos para equipos con propósito que reducen la búsqueda repetitiva de fondos, reportes, actualizaciones a donantes, contenido y trabajo administrativo.",
    offers: [
      {
        title: "Deja de pasar horas buscando fondos",
        body: "Ayudamos a encontrar, ordenar y dar seguimiento a oportunidades para que tu equipo pueda dedicar su tiempo a decidir cuáles vale la pena perseguir en lugar de buscar en bases de datos.",
      },
      {
        title: "Deja de reescribir la misma historia cinco veces",
        body: "Convierte fotos, notas y actualizaciones de programas ya aprobadas en material reutilizable para donantes, reportes, recaudación y tu sitio web.",
      },
      {
        title: "Deja de depender de que alguien recuerde todo",
        body: "Construimos seguimientos, recordatorios y traspasos simples alrededor del trabajo recurrente para que menos cosas se pierdan entre personas.",
      },
      {
        title: "Deja de responder las mismas preguntas una y otra vez",
        body: "Tu sitio web debe facilitar que donantes, aliados y seguidores entiendan qué haces, qué necesitas y cómo pueden actuar.",
      },
    ],
  },
} as const

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
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
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {t.offers.map((offer) => (
          <div
            key={offer.title}
            className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
              {offer.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
              {offer.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
        {t.baseline}
      </p>

      <a
        href={siteLinks.email}
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--color-accent-coral)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]"
      >
        {t.cta} →
      </a>
    </div>
  )
}
