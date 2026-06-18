"use client"

import { motion } from "framer-motion"

import { timelineEntries } from "../site/siteData"

export function TimelineSection() {
  return (
    <section id="timeline" className="bg-[#080f0a] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
            A story in chapters
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
            From bare soil to a living school
          </h2>
        </div>

        <div className="relative mt-12">
          <div className="absolute top-12 right-0 left-0 h-px bg-[#c9a84c]/40" />
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pt-2 pb-5">
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
                  className={`max-w-[88vw] min-w-[88vw] snap-center rounded-2xl border p-5 md:max-w-[400px] md:min-w-[400px] lg:max-w-[460px] lg:min-w-[460px] ${
                    entry.status === "current"
                      ? "border-[#c9a84c]"
                      : "border-white/10"
                  } bg-[#0d1610]`}
                >
                  <div className="mb-3 inline-block rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-semibold text-[#080f0a]">
                    {entry.season} · {entry.year}
                  </div>
                  <h3 className="font-serif text-2xl text-white md:text-3xl">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 md:text-base">
                    {entry.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/62 md:text-base md:leading-8">
                    {entry.body}
                  </p>
                  <img
                    src={entry.photo}
                    alt={entry.photoAlt ?? entry.title}
                    className="mt-4 h-44 w-full rounded-xl object-cover md:h-52"
                  />
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-white/80">
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
