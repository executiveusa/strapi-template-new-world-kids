"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { timelineEntries, type TimelineEntry } from "../site/siteData"

/* ─────────────────────────────────────────────────────────
   STATUS BADGE STYLES
───────────────────────────────────────────────────────── */
function statusStyles(status: TimelineEntry["status"]) {
  if (status === "past") return "bg-emerald-500/20 text-emerald-300"
  if (status === "current")
    return "bg-[var(--color-gold)]/20 text-[var(--color-gold-bright)]"

  return "bg-[var(--color-border-subtle)] text-[var(--color-text-muted)]"
}

function statusLabel(status: TimelineEntry["status"]) {
  if (status === "past") return "✓ Complete"
  if (status === "current") return "● Active now"

  return "◌ Planned"
}

/* ─────────────────────────────────────────────────────────
   DETAIL MODAL
───────────────────────────────────────────────────────── */
function TimelineModal({
  entry,
  onClose,
}: {
  entry: TimelineEntry
  onClose: () => void
}) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 mx-4 mb-4 w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] sm:mx-6 sm:mb-0"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
      >
        {/* Photo — lazy-loaded */}
        {entry.photo && (
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={entry.photo}
              alt={entry.photoAlt ?? entry.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 pb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-semibold text-[var(--color-bg)]">
                {entry.season} · {entry.year}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-gold)]">
                {entry.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close chapter detail"
              className="mt-1 shrink-0 rounded-full border border-[var(--color-border-subtle)] p-2 text-[var(--color-text-muted)] transition hover:border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
            {entry.body}
          </p>

          <ul className="mt-5 space-y-2">
            {entry.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--color-gold)]" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs ${statusStyles(entry.status)}`}
            >
              {statusLabel(entry.status)}
            </span>
            {entry.status === "current" && (
              <a
                href="/donate"
                className="rounded-full bg-[var(--color-coral)] px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-coral-hover)]"
              >
                Support this phase →
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN TIMELINE SECTION
───────────────────────────────────────────────────────── */
export function TimelineSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeEntry, setActiveEntry] = useState<TimelineEntry | null>(null)
  const [progress, setProgress] = useState(0) // 0..1 scroll position
  const [activeIndex, setActiveIndex] = useState(0) // which chapter is centered

  const total = timelineEntries.length

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return
    const amount = 440
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  // Track scroll position → progress bar + active chapter index
  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 0
    setProgress(Math.min(1, Math.max(0, p)))
    const idx = Math.min(total - 1, Math.round(p * (total - 1)))
    setActiveIndex(idx)
  }

  // Keyboard arrow navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Only when no modal is open and focus is within the timeline section
      if (activeEntry) return
      const el = scrollRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return
      if (e.key === "ArrowRight") {
        e.preventDefault()
        scroll("right")
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        scroll("left")
      }
    }
    window.addEventListener("keydown", onKey)

    return () => window.removeEventListener("keydown", onKey)
  }, [activeEntry])

  const pastCount = timelineEntries.filter((e) => e.status === "past").length
  const currentEntry = timelineEntries.find((e) => e.status === "current")

  return (
    <>
      <section
        id="timeline"
        className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 py-20 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
              A story in chapters
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[var(--color-text-primary)] md:text-5xl">
              From bare soil to a living school
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-muted)] md:text-base">
              6 seasons of documented, continuous work. Every chapter is real.
            </p>
            {currentEntry && (
              <p className="mt-3 text-sm font-medium text-[var(--color-gold)]/80">
                {pastCount} of {total} chapters complete. We&apos;re in{" "}
                {currentEntry.season} now.
              </p>
            )}
          </div>

          {/* Chapter indicator + progress bar + arrows (single row) */}
          <div className="mt-8 flex items-center gap-4 px-2">
            <span className="shrink-0 font-mono text-xs tracking-widest text-[var(--color-text-muted)] uppercase">
              Chapter {activeIndex + 1} / {total}
            </span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-gold)] transition-[width] duration-150"
                style={{ width: `${Math.max(8, progress * 100)}%` }}
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="rounded-full border border-[var(--color-border-subtle)] p-2 text-[var(--color-text-muted)] transition hover:border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] disabled:opacity-30"
                aria-label="Previous chapter"
                disabled={activeIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="rounded-full border border-[var(--color-border-subtle)] p-2 text-[var(--color-text-muted)] transition hover:border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] disabled:opacity-30"
                aria-label="Next chapter"
                disabled={activeIndex === total - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Cards scroll container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="hide-scrollbar mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pt-6 pb-6"
          >
            {timelineEntries.map((entry, i) => (
              <motion.article
                key={entry.season}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3, once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                onClick={() => setActiveEntry(entry)}
                className={[
                  "group relative max-w-[88vw] min-w-[88vw] cursor-pointer snap-center rounded-2xl border p-5",
                  "md:max-w-[400px] md:min-w-[400px] lg:max-w-[440px] lg:min-w-[440px]",
                  "bg-[var(--color-surface)] transition-all duration-200",
                  entry.status === "current"
                    ? "border-[var(--color-gold)] shadow-[var(--color-gold)]/10 shadow-lg"
                    : "border-[var(--color-border-subtle)] hover:border-[var(--color-border-subtle)]",
                ].join(" ")}
              >
                {/* Season connector dot — pulsing on current chapter */}
                <div className="absolute -top-[22px] left-1/2 -translate-x-1/2">
                  <div
                    className={[
                      "h-3 w-3 rounded-full border-2 border-[var(--color-bg)]",
                      entry.status === "past"
                        ? "bg-emerald-400"
                        : entry.status === "current"
                          ? "pulse-gold bg-[var(--color-gold)]"
                          : "bg-[var(--color-border-subtle)]",
                    ].join(" ")}
                  />
                </div>

                {/* Season + year badge */}
                <div className="inline-block rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-semibold text-[var(--color-bg)]">
                  {entry.season} · {entry.year}
                </div>

                <h3 className="mt-3 font-serif text-xl text-[var(--color-text-primary)] md:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-gold)]/80">
                  {entry.tagline}
                </p>

                {/* Photo */}
                <div className="mt-4 overflow-hidden rounded-xl">
                  <img
                    src={entry.photo}
                    alt={entry.photoAlt ?? entry.title}
                    loading="lazy"
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 md:h-52"
                  />
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-1.5">
                  {entry.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2.5 text-xs text-[var(--color-text-muted)]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-gold)]" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Footer row */}
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${statusStyles(entry.status)}`}
                  >
                    {statusLabel(entry.status)}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] transition group-hover:text-[var(--color-gold)]/70">
                    Tap to explore →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Mobile swipe hint */}
          <p className="mt-2 text-center text-xs text-[var(--color-text-muted)] md:hidden">
            Swipe or use ← → to explore all chapters
          </p>
        </div>
      </section>

      {/* Detail modal */}
      <AnimatePresence>
        {activeEntry && (
          <TimelineModal
            entry={activeEntry}
            onClose={() => setActiveEntry(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
