import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { timelineEntries } from "../../../components/site/siteData"

const ARCHIVE_YEARS = ["2021", "2022", "2023", "2024", "2025", "2026"] as const

const copy = {
  en: {
    eyebrow: "Proyecto Indigo Azul · Field archive",
    title: "The work, year by year.",
    body: "A living visual record of Proyecto Indigo Azul from 2021 through today. Every year stays visible so the archive can grow without losing the history of the work.",
    empty: "No capture-dated field images have been added for this year yet.",
    archiveNote: "Documented field image, ordered by capture date.",
    imageAlt: "Proyecto Indigo Azul field documentation",
    jumpLabel: "Jump to year",
    yearLabel: "Archive year",
    metaTitle: "Proyecto Indigo Azul Field Archive | New World Kids",
    metaDescription:
      "Explore Proyecto Indigo Azul year by year from 2021 through 2026 through dated field documentation.",
  },
  es: {
    eyebrow: "Proyecto Indigo Azul · Archivo de campo",
    title: "El trabajo, año por año.",
    body: "Un registro visual vivo de Proyecto Indigo Azul desde 2021 hasta hoy. Cada año permanece visible para que el archivo pueda crecer sin perder la historia del trabajo.",
    empty: "Todavía no se han agregado imágenes de campo con fecha de captura para este año.",
    archiveNote: "Imagen de campo documentada, ordenada por fecha de captura.",
    imageAlt: "Documentación de campo de Proyecto Indigo Azul",
    jumpLabel: "Ir al año",
    yearLabel: "Año del archivo",
    metaTitle: "Archivo de campo de Proyecto Indigo Azul | New World Kids",
    metaDescription:
      "Explora Proyecto Indigo Azul año por año desde 2021 hasta 2026 mediante documentación de campo fechada.",
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

  const photosByYear = new Map(
    ARCHIVE_YEARS.map((year) => [
      year,
      documentedPhotos.filter((entry) => entry.capturedAt.startsWith(year)),
    ])
  )

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 max-w-5xl text-[clamp(3rem,12vw,7rem)] leading-[0.9] font-black tracking-[-0.055em] text-balance sm:mt-5 sm:leading-[0.93]">
              {t.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 md:text-xl">
              {t.body}
            </p>
          </div>

          <nav
            aria-label={t.jumpLabel}
            className="mt-10 flex flex-wrap gap-x-2 gap-y-2 border-y border-black/15 py-4 sm:mt-12"
          >
            {ARCHIVE_YEARS.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 px-5 text-sm font-bold transition-colors duration-200 hover:border-black/40 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              >
                {year}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-t border-black/15">
        {ARCHIVE_YEARS.map((year, yearIndex) => {
          const photos = photosByYear.get(year) ?? []

          return (
            <section
              key={year}
              id={`year-${year}`}
              aria-labelledby={`year-${year}-heading`}
              className="scroll-mt-24 border-b border-black/15 px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-24"
            >
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-5 md:grid-cols-[160px_1fr] md:items-end md:gap-10">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-action-orange)] uppercase sm:text-xs">
                    {t.yearLabel} · {String(yearIndex + 1).padStart(2, "0")}
                  </p>
                  <h2
                    id={`year-${year}-heading`}
                    className="text-[clamp(4rem,17vw,10rem)] leading-[0.78] font-black tracking-[-0.075em]"
                  >
                    {year}
                  </h2>
                </div>

                {photos.length > 0 ? (
                  <div className="mt-10 grid gap-x-6 gap-y-12 border-t border-black/15 pt-8 sm:mt-12 sm:grid-cols-2 md:gap-x-8 md:pt-10">
                    {photos.map((entry) => {
                      const captureDate = formatCaptureDate(entry.capturedAt, locale)
                      return (
                        <figure key={`${entry.capturedAt}-${entry.title}`}>
                          <div className="overflow-hidden bg-[var(--color-surface)]">
                            <img
                              src={entry.photo}
                              alt={entry.photoAlt || `${t.imageAlt} — ${captureDate}`}
                              loading="lazy"
                              className="aspect-[4/3] h-full w-full object-cover"
                            />
                          </div>
                          <figcaption className="mt-4 border-t border-black/15 pt-4">
                            <div className="flex flex-wrap items-baseline justify-between gap-3">
                              <h3 className="text-lg font-black tracking-[-0.025em] md:text-xl">
                                {captureDate}
                              </h3>
                              <span className="text-[10px] font-bold tracking-[0.16em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
                                {year}
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
                ) : (
                  <div className="mt-10 border-y border-black/15 py-8 sm:mt-12 md:py-10">
                    <p className="max-w-xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
                      {t.empty}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </section>
    </main>
  )
}
