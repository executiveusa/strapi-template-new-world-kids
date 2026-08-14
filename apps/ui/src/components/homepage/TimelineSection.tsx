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
    eyebrow: "Field archive",
    title: "What happened, in order.",
    body: "A dated record of the work we can document. Future plans stay separate until they are completed.",
    record: "Record",
    fieldRecord: "Field record",
    documented: "Documented",
    source: "Archive note",
    sourceValue: "Documented field image, ordered by capture date.",
    captured: "Field documentation captured",
    imageAlt: "New World Kids field documentation",
    planned: "Planned — not completed",
  },
  es: {
    eyebrow: "Archivo de campo",
    title: "Lo que ocurrió, en orden.",
    body: "Un registro fechado del trabajo que podemos documentar. Los planes futuros permanecen separados hasta que se completen.",
    record: "Registro",
    fieldRecord: "Registro de campo",
    documented: "Documentado",
    source: "Nota de archivo",
    sourceValue: "Imagen de campo documentada, ordenada por fecha de captura.",
    captured: "Documentación de campo capturada",
    imageAlt: "Documentación de campo de New World Kids",
    planned: "Planeado — no completado",
  },
} as const

function formatCaptureDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

export function TimelineSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const localizedTitles = locale === "es" ? titles.es : titles.en
  const documentedEntries = timelineEntries.filter(
    (entry) => entry.sourceStatus === "confirmed" && entry.status !== "future"
  )
  const plannedEntry = timelineEntries.find(
    (entry) => entry.status === "future"
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
          {documentedEntries.map((entry, index) => {
            const captureDate = formatCaptureDate(entry.capturedAt, locale)
            return (
              <motion.li
                key={`${entry.capturedAt}-${entry.title}`}
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
                  <p className="font-mono text-xs tracking-[0.16em] text-[var(--color-text-muted)] uppercase">
                    {t.record} {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                    {captureDate}
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
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                    {t.captured} {captureDate}.
                  </p>
                  <p className="mt-4 text-xs text-[var(--color-text-muted)]/80">
                    {t.source}: {t.sourceValue}
                  </p>
                </div>

                {entry.photo ? (
                  <figure className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
                    <img
                      src={entry.photo}
                      alt={`${t.imageAlt} — ${captureDate}`}
                      loading="lazy"
                      className="h-48 w-full object-cover md:h-52"
                    />
                  </figure>
                ) : null}
              </motion.li>
            )
          })}
        </ol>

        {plannedEntry ? (
          <div className="mt-12 border-l-2 border-[var(--color-gold)]/50 pl-6 md:pl-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-gold)] uppercase">
              {t.planned}
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
              {locale === "es"
                ? "Crecer sin perder el enfoque local"
                : plannedEntry.title}
            </h3>
          </div>
        ) : null}
      </div>
    </section>
  )
}
