import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"

const copy = {
  en: {
    eyebrow: "Reserved for · Field journal",
    title: "The story keeps growing.",
    body: "Notes, lessons, and field updates from the work as it happens.",
    cta: "Get updates →",
  },
  es: {
    eyebrow: "Reservado para · Bitácora de campo",
    title: "La historia sigue creciendo.",
    body: "Notas, aprendizajes y actualizaciones del trabajo mientras sucede.",
    cta: "Recibir novedades →",
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
    <main className="bg-[var(--color-bg)] px-5 py-20 text-[var(--color-text-primary)] sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(3rem,10vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.title}</h1>
        <p className="mt-6 max-w-2xl border-t border-black/15 pt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{t.body}</p>
        <a
          href={siteLinks.email}
          className="mt-8 inline-flex min-h-11 items-center border-y border-black/20 py-3 text-sm font-black transition-colors hover:border-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-3"
        >
          {t.cta}
        </a>
      </div>
    </main>
  )
}
