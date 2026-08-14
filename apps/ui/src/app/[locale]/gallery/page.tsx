import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { timelineEntries } from "../../../components/site/siteData"

const copy = {
  en: {
    eyebrow: "Field gallery",
    title: "See the work up close.",
    body: "Documented field images from New World Kids programs, presented with capture dates and archive notes.",
    empty: "No documented field images are available yet.",
    archiveNote: "Documented field image, ordered by capture date.",
    imageAlt: "New World Kids field documentation",
    metaTitle: "Field Gallery | New World Kids",
    metaDescription:
      "See documented New World Kids field work in Seattle and Puerto Vallarta through dated program images.",
  },
  es: {
    eyebrow: "Galería de campo",
    title: "Mira el trabajo de cerca.",
    body: "Imágenes documentadas de los programas de New World Kids, presentadas con fechas de captura y notas de archivo.",
    empty: "Todavía no hay imágenes de campo documentadas disponibles.",
    archiveNote: "Imagen de campo documentada, ordenada por fecha de captura.",
    imageAlt: "Documentación de campo de New World Kids",
    metaTitle: "Galería de campo | New World Kids",
    metaDescription:
      "Conoce el trabajo documentado de New World Kids en Seattle y Puerto Vallarta mediante imágenes fechadas de los programas.",
  },
} as const

function formatCaptureDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function GalleryPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  const documentedPhotos = timelineEntries.filter(
    (entry) =>
      entry.sourceStatus === "confirmed" &&
      entry.imageStatus === "confirmed" &&
      entry.status !== "future"
  )

  return (
    <main className="bg-[var(--color-bg)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            {t.body}
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {documentedPhotos.map((entry) => {
            const captureDate = formatCaptureDate(entry.capturedAt, locale)
            return (
              <figure key={`${entry.capturedAt}-${entry.title}`}>
                <div className="overflow-hidden bg-[var(--color-surface)]">
                  <img
                    src={entry.photo}
                    alt={`${t.imageAlt} — ${captureDate}`}
                    loading="lazy"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 border-t border-[var(--color-border-subtle)] pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="font-serif text-xl font-semibold text-[var(--color-text-primary)] md:text-2xl">
                      {captureDate}
                    </h2>
                    <span className="text-xs tracking-[0.16em] text-[var(--color-eyebrow)] uppercase">
                      {t.eyebrow}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                    {t.archiveNote}
                  </p>
                </figcaption>
              </figure>
            )
          })}
        </div>

        {documentedPhotos.length === 0 && (
          <div className="mt-14 border-y border-[var(--color-border-subtle)] py-12">
            <p className="text-sm text-[var(--color-text-muted)]">{t.empty}</p>
          </div>
        )}
      </div>
    </main>
  )
}
