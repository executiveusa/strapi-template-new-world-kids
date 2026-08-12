import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"
import { copyForLocale, workWithUsOffers } from "@/content/site"

const copy = {
  en: {
    eyebrow: "Services for nonprofits and social-purpose teams",
    title: "We do not sell AI.",
    titleAccent: "We remove repetitive work.",
    body1:
      "Small mission-driven teams lose too many hours to grant research, reporting, donor updates, content, and website maintenance. That work matters, but it should not swallow the week.",
    body2:
      "We build practical systems that reduce the manual searching, copying, chasing, and re-entering behind those jobs. We start with the bottleneck, measure the before-and-after workload, and automate only what is worth automating.",
    offersEyebrow: "What gets easier",
    cta: "Tell us what is eating your time",
  },
  es: {
    eyebrow: "Servicios para organizaciones sociales y equipos con propósito",
    title: "No vendemos IA.",
    titleAccent: "Quitamos trabajo repetitivo.",
    body1:
      "Los equipos pequeños pierden demasiadas horas buscando convocatorias, preparando reportes, actualizando donantes, publicando contenido y manteniendo el sitio web. Ese trabajo importa, pero no debería comerse toda la semana.",
    body2:
      "Construimos sistemas prácticos que reducen la búsqueda manual, el copiar y pegar, los seguimientos y la captura repetida de información. Empezamos por el cuello de botella, medimos la carga antes y después, y automatizamos solo lo que vale la pena automatizar.",
    offersEyebrow: "Lo que se vuelve más fácil",
    cta: "Cuéntanos qué te está quitando tiempo",
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

      <p className="mt-10 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
        {locale === "es"
          ? "No prometemos una cifra inventada de horas ahorradas. Primero medimos cuánto tiempo consume hoy el proceso y usamos esa línea base para demostrar qué cambió."
          : "We do not promise a made-up number of hours saved. We measure how long the process takes now, then use that baseline to show what actually changed."}
      </p>

      <a
        href={siteLinks.email}
        className="mt-8 inline-flex h-11 items-center rounded-full bg-[var(--color-accent-coral)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]"
      >
        {t.cta} →
      </a>
    </div>
  )
}
