import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"
import { journalTeaser } from "@/content/site"

const copy = {
  en: {
    eyebrow: "Field journal",
    title: "The blog is being built alongside the food forest.",
    cta: "Get notified when it launches",
  },
  es: {
    eyebrow: "Bitácora de campo",
    title: "El blog se está construyendo junto con el bosque comestible.",
    cta: "Avísenme cuando esté listo",
  },
}

export default async function BlogComingSoonPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
      <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-[var(--color-text-primary)] md:text-4xl">
        {t.title}
      </h1>
      <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)]">
        {locale === "es" ? journalTeaser.es : journalTeaser.en}
      </p>
      <a
        href={siteLinks.email}
        className="mt-10 inline-flex h-11 items-center rounded-full bg-[var(--color-accent-gold)] px-6 text-sm font-semibold text-[var(--color-bg)] shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-gold)]/85"
      >
        {t.cta} →
      </a>
    </div>
  )
}
