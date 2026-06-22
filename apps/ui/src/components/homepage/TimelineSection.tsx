"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { timelineEntries, type TimelineEntry } from "../site/siteData"

/* ─────────────────────────────────────────────────────────
   STATUS BADGE STYLES
───────────────────────────────────────────────────────── */
function statusStyles(status: TimelineEntry["status"]) {
  if (status === "past")    return "bg-emerald-500/20 text-emerald-300"
  if (status === "current") return "bg-[#c9a84c]/20 text-[#f4d98a]"
  return "bg-white/10 text-white/60"
}

function statusLabel(status: TimelineEntry["status"]) {
  if (status === "past")    return "✓ Complete"
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
        className="relative z-10 mx-4 mb-4 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1610] sm:mx-6 sm:mb-0"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
      >
        {/* Photo */}
        {entry.photo && (
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={entry.photo}
              alt={entry.photoAlt ?? entry.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1610] via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 pb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-semibold text-[#060e08]">
                {entry.season} · {entry.year}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-white">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm text-[#c9a84c]">{entry.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="mt-1 shrink-0 rounded-full border border-white/10 p-2 text-white/50 transition hover:border-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-5 text-sm leading-7 text-white/70">{entry.body}</p>

          <ul className="mt-5 space-y-2">
            {entry.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-white/80">
                <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs ${statusStyles(entry.status)}`}>
              {statusLabel(entry.status)}
            </span>
            {entry.status === "current" && (
              <a
                href="/donate"
                className="rounded-full bg-[#c8400e] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#d9500f]"
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

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return
    const amount = 440
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <>
      <section id="timeline" className="bg-[#080f0a] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              A story in chapters
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              From bare soil to a living school
            </h2>
            <p className="mt-4 text-sm text-white/50 md:text-base">
              6 seasons of documented, continuous work. Every chapter is real.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="mt-8 flex items-center justify-end gap-2 px-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-white/10 p-2 text-white/50 transition hover:border-white/30 hover:text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-white/10 p-2 text-white/50 transition hover:border-white/30 hover:text-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Progress connector line */}
          <div className="relative mt-4">
            <div className="absolute top-[108px] right-0 left-0 h-px bg-[#c9a84c]/25" />

            {/* Cards scroll container */}
            <div
              ref={scrollRef}
              className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-2"
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
                    "group relative min-w-[88vw] max-w-[88vw] snap-center cursor-pointer rounded-2xl border p-5",
                    "md:min-w-[400px] md:max-w-[400px] lg:min-w-[440px] lg:max-w-[440px]",
                    "bg-[#0d1610] transition-all duration-200",
                    entry.status === "current"
                      ? "border-[#c9a84c] shadow-lg shadow-[#c9a84c]/10"
                      : "border-white/10 hover:border-white/25",
                  ].join(" ")}
                >
                  {/* Season connector dot */}
                  <div className="absolute -top-[25px] left-1/2 -translate-x-1/2">
                    <div
                      className={[
                        "h-3 w-3 rounded-full border-2 border-[#080f0a]",
                        entry.status === "past"
                          ? "bg-emerald-400"
                          : entry.status === "current"
                          ? "bg-[#c9a84c] pulse-gold"
                          : "bg-white/20",
                      ].join(" ")}
                    />
                  </div>

                  {/* Season + year badge */}
                  <div className="inline-block rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-semibold text-[#080f0a]">
                    {entry.season} · {entry.year}
                  </div>

                  <h3 className="mt-3 font-serif text-xl text-white md:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#c9a84c]/80">{entry.tagline}</p>

                  {/* Photo */}
                  <div className="mt-4 overflow-hidden rounded-xl">
                    <img
                      src={entry.photo}
                      alt={entry.photoAlt ?? entry.title}
                      className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 md:h-52"
                    />
                  </div>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-1.5">
                    {entry.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-xs text-white/70">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#c9a84c]" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Footer row */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1 text-xs ${statusStyles(entry.status)}`}>
                      {statusLabel(entry.status)}
                    </span>
                    <span className="text-xs text-white/30 group-hover:text-[#c9a84c]/70 transition">
                      Tap to explore →
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Mobile swipe hint */}
          <p className="mt-2 text-center text-xs text-white/30 md:hidden">
            Swipe to explore all chapters
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
