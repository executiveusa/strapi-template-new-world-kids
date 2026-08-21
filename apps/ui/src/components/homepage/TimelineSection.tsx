"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

import { timelineEntries } from "../site/siteData"

const titles = {
  en: [
    "The soil gets repaired first",
    "The community starts to return",
    "The food forest takes root",
    "Infrastructure documentation",
    "Program documentation",
  ],
  es: [
    "Primero se recupera el suelo",
    "La comunidad empieza a regresar",
    "El bosque de alimentos echa raíces",
    "Documentación de infraestructura",
    "Documentación del programa",
  ],
} as const

const copy = {
  en: {
    eyebrow: "Field archive · 2021–2026",
    title: "What happened, year by year.",
    body: "A record of the work we can document. We keep the archive focused on what actually happened.",
    fieldRecord: "Field archive",
    documented: "Documented",
    source: "Archive note",
    sourceValue: "Documented field image from the archive.",
    imageAlt: "New World Kids field documentation",
  },
  es: {
    eyebrow: "Archivo de campo · 2021–2026",
    title: "Lo que ocurrió, año por año.",
    body: "Un registro del trabajo que podemos documentar. Mantenemos el archivo enfocado en lo que realmente ocurrió.",
    fieldRecord: "Archivo de campo",
    documented: "Documentado",
    source: "Nota de archivo",
    sourceValue: "Imagen de campo documentada del archivo.",
    imageAlt: "Documentación de campo de New World Kids",
  },
} as const

export function TimelineSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const localizedTitles = locale === "es" ? titles.es : titles.en
  const documentedEntries = timelineEntries.filter(
    (entry) => entry.sourceStatus === "confirmed" && entry.status !== "future"
  )

  return (
    <section
      id="timeline"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            {t.body}
          </p>
        </div>

        <ol className="mt-14 border-t border-[var(--color-border-subtle)]">
          {documentedEntries.map((entry, index) => (
            <motion.li
              key={`${entry.year}-${entry.title}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: Math.min(index * 0.05, 0.2),
              }}
              className="grid gap-7 border-b border-[var(--color-border-subtle)] py-10 md:grid-cols-[180px_minmax(0,1fr)_320px] md:items-center"
            >
              <div>
                <p className="font-serif text-3xl font-semibold text-[var(--color-text-primary)] md:text-4xl">
                  {entry.year}
                </p>
                <span className="mt-3 inline-flex rounded-full border border-[var(--color-sage)]/35 px-3 py-1 text-[11px] font-semibold text-[var(--color-sage)]">
                  {t.documented}
                </span>
              </div>

              <div>
                <p className="text-xs tracking-[0.18em] text-[var(--color-eyebrow)] uppercase">
                  {t.fieldRecord}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-tight font-semibold text-[var(--color-text-primary)] md:text-3xl">
                  {localizedTitles[index] ?? entry.title}
                </h3>
                <p className="mt-4 text-xs text-[var(--color-text-muted)]/80">
                  {t.source}: {t.sourceValue}
                </p>
              </div>

              {entry.photo ? (
                <figure className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
                  <img
                    src={entry.photo}
                    alt={`${t.imageAlt} — ${entry.year}`}
                    loading="lazy"
                    className="h-48 w-full object-cover md:h-52"
                  />
                </figure>
              ) : null}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
