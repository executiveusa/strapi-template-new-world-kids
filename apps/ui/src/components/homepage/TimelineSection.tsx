"use client"

import { motion } from "framer-motion"

import { timelineEntries } from "../site/siteData"

export function TimelineSection() {
  return (
    <section id="timeline" className="bg-[#080f0a] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl text-white md:text-5xl">
          From bare soil to food forest
        </h2>
        <p className="mt-3 text-center text-white/70">
          6 seasons of building something real
        </p>

        <div className="relative mt-10">
          <div className="absolute top-12 right-0 left-0 h-px bg-[#c9a84c]/40" />
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {timelineEntries.map((entry) => {
              const statusTone =
                entry.status === "past"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : entry.status === "current"
                    ? "bg-[#c9a84c]/20 text-[#f4d98a]"
                    : "bg-white/10 text-white/70"

              return (
                <motion.article
                  key={entry.season}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.5, once: true }}
                  className={`max-w-[300px] min-w-[300px] snap-center rounded-2xl border p-4 md:max-w-[400px] md:min-w-[400px] ${entry.status === "current" ? "border-[#c9a84c]" : "border-white/10"} bg-[#0d1610]`}
                >
                  <div className="mb-3 inline-block rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-semibold text-[#080f0a]">
                    {entry.season} · {entry.year}
                  </div>
                  <h3 className="font-serif text-2xl text-white">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{entry.tagline}</p>
                  <img
                    src={entry.photo}
                    alt={entry.photoAlt ?? entry.title}
                    className="mt-3 h-40 w-full rounded-xl object-cover"
                  />
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-white/80">
                    {entry.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <span
                    className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs ${statusTone}`}
                  >
                    {entry.status === "past"
                      ? "Complete"
                      : entry.status === "current"
                        ? "Current"
                        : "Planned"}
                  </span>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
