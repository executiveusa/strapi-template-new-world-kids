"use client"

import { motion } from "framer-motion"

import { timelineEntries } from "../site/siteData"

function formatCaptureDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

export function TimelineSection() {
  const documentedEntries = timelineEntries.filter(
    (entry) => entry.sourceStatus === "confirmed" && entry.status !== "future"
  )
  const plannedEntry = timelineEntries.find((entry) => entry.status === "future")

  return (
    <section
      id="timeline"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
            Field archive
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            What happened, in order.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            A year-by-year record of the work we can document. Future plans stay separate until they are real.
          </p>
        </div>

        <ol className="mt-14 border-t border-[var(--color-border-subtle)]">
          {documentedEntries.map((entry, index) => (
            <motion.li
              key={`${entry.capturedAt}-${entry.title}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index * 0.05, 0.2) }}
              className="grid gap-7 border-b border-[var(--color-border-subtle)] py-10 md:grid-cols-[180px_minmax(0,1fr)_320px] md:items-center"
            >
              <div>
                <p className="font-mono text-xs tracking-[0.16em] text-[var(--color-text-muted)] uppercase">
                  Record {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                  {formatCaptureDate(entry.capturedAt)}
                </p>
                <span className="mt-3 inline-flex rounded-full border border-[var(--color-sage)]/35 px-3 py-1 text-[11px] font-semibold text-[var(--color-sage)]">
                  Documented
                </span>
              </div>

              <div>
                <p className="text-xs tracking-[0.18em] text-[var(--color-eyebrow)] uppercase">
                  {entry.season} · {entry.year}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[var(--color-text-primary)] md:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                  {entry.tagline}
                </p>
                <p className="mt-4 text-xs text-[var(--color-text-muted)]/80">
                  Source note: {entry.sourceNote}
                </p>
              </div>

              {entry.photo ? (
                <figure className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
                  <img
                    src={entry.photo}
                    alt={entry.photoAlt ?? `Field documentation captured ${entry.capturedAt}`}
                    loading="lazy"
                    className="h-48 w-full object-cover md:h-52"
                  />
                </figure>
              ) : null}
            </motion.li>
          ))}
        </ol>

        {plannedEntry ? (
          <div className="mt-12 border-l-2 border-[var(--color-gold)]/50 pl-6 md:pl-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-gold)] uppercase">
              Planned — not completed
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
              {plannedEntry.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
              {plannedEntry.body}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
