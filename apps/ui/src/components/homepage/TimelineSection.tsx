"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"

export interface TimelineEntry {
  season: string
  year: string
  status: "past" | "current" | "future"
  title: string
  tagline: string
  body: string
  highlights: string[]
  photo: string
  photoAlt?: string
}

const TIMELINE: TimelineEntry[] = [
  {
    season: "Season 1",
    year: "2020",
    status: "past",
    title: "The land. The idea. The leap.",
    tagline: "Completely degraded soil. Pure vision.",
    body: "Volunteers from Seattle's Culture Shock program arrived in Paso de Guayabo and rented 1.5 acres that could barely support life. Soil restoration started anyway.",
    highlights: [
      "1.5 acres secured",
      "Soil restoration begun",
      "Volunteer network formed across three countries",
    ],
    photo: "",
    photoAlt: "Season 1 land preparation in Paso de Guayabo",
  },
  {
    season: "Season 2",
    year: "2021-2022",
    status: "past",
    title: "Community. Proof. Momentum.",
    tagline: "The neighborhood showed up. We listened.",
    body: "The founder lived full-time in the community. Local children started arriving to plant, learn, and spend time on the site. Trust and proof of concept grew together.",
    highlights: [
      "Community relationships built",
      "15 to 20 local children engaged weekly",
      "Early plants established and language classes launched",
    ],
    photo: "",
    photoAlt: "Season 2 community work and early garden growth",
  },
  {
    season: "Season 3",
    year: "2023-2025",
    status: "current",
    title: "200 plants. AI layer. Hinge moment.",
    tagline: "The food forest is alive. Now we finish the school.",
    body: "The site crossed 200 plant varieties. Syntropic agriculture is working. Hermes is being brought online to support grants, reporting, and operations while fundraising pushes the next build phase forward.",
    highlights: [
      "200+ plant varieties growing",
      "$25K season fundraise in motion",
      "Hermes operations layer connected",
      "Grant applications in progress",
    ],
    photo: "",
    photoAlt: "Season 3 food forest growth",
  },
  {
    season: "Season 4",
    year: "2025-2026",
    status: "future",
    title: "School doors open.",
    tagline: "Five students. Real curriculum. Real change.",
    body: "The learning center opens to its first student cohort, blending local youth participation with Culture Shock students from Seattle. Hermes supports the reporting and operational layer.",
    highlights: [
      "Learning center operational",
      "First Culture Shock cohort onboarded",
      "Hermes live for reporting and follow-through",
      "Earn-while-you-learn stipends activated",
    ],
    photo: "",
    photoAlt: "Season 4 opening day plan",
  },
  {
    season: "Season 5",
    year: "2026-2027",
    status: "future",
    title: "Scale. Replicate. Train the trainers.",
    tagline: "A model that can travel.",
    body: "Graduates bring skills home. The food forest feeds more of the school. Revenue diversifies through seeds, plants, oils, tours, and creative work tied back to the mission.",
    highlights: [
      "Toward 50% food self-sufficiency on site",
      "More diversified revenue streams",
      "Replication playbook documented",
      "Quarterly art and story-based fundraising",
    ],
    photo: "",
    photoAlt: "Season 5 scale phase",
  },
  {
    season: "Season 6",
    year: "2027-2030",
    status: "future",
    title: "Own the land. Expand the network.",
    tagline: "A durable model, not a one-off.",
    body: "The long-term goal is land ownership or a next-site build, paired with deeper food self-sufficiency and a network of programs that can fund and teach themselves with more resilience.",
    highlights: [
      "Toward 85% food self-sufficiency",
      "Property acquisition decision",
      "Global replication network",
      "B-Corp social ventures supporting mission work",
    ],
    photo: "",
    photoAlt: "Season 6 full vision",
  },
]

const STATUS_STYLES = {
  current: {
    dot: "#C9A84C",
    label: "Now",
    labelBg: "rgba(201,168,76,0.14)",
    labelColor: "#C9A84C",
  },
  future: {
    dot: "#4CAF50",
    label: "Planned",
    labelBg: "rgba(76,175,80,0.12)",
    labelColor: "#7cd27d",
  },
  past: {
    dot: "#8B949E",
    label: "Completed",
    labelBg: "rgba(139,148,158,0.12)",
    labelColor: "#c4ccd4",
  },
} as const

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #163121 0%, #2E5B3C 100%)",
  "linear-gradient(135deg, #101f17 0%, #c9a84c 100%)",
  "linear-gradient(135deg, #11281c 0%, #34744c 100%)",
  "linear-gradient(135deg, #162117 0%, #487760 100%)",
] as const

function TimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isEven = index % 2 === 0
  const style = STATUS_STYLES[entry.status]
  const [imgError, setImgError] = useState(false)

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-6 md:gap-14 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isEven ? -32 : 32 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 md:py-8"
      >
        <article
          className="rounded-[30px] p-8"
          style={{
            background:
              entry.status === "current"
                ? "rgba(201,168,76,0.06)"
                : "rgba(255,255,255,0.03)",
            border:
              entry.status === "current"
                ? "1px solid rgba(201,168,76,0.25)"
                : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{
                background: style.labelBg,
                color: style.labelColor,
              }}
            >
              {style.label}
            </span>
            <span className="text-xs tracking-[0.2em] text-white/35 uppercase">
              {entry.season} | {entry.year}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-semibold text-white md:text-3xl">
            {entry.title}
          </h3>
          <p className="mt-3 text-sm font-medium tracking-[0.02em] text-[#c9a84c]">
            {entry.tagline}
          </p>
          <p className="mt-4 text-sm leading-8 text-white/60">{entry.body}</p>

          <ul className="mt-6 space-y-3">
            {entry.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm leading-7 text-white/56"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: style.dot }}
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </article>
      </motion.div>

      <div className="hidden shrink-0 flex-col items-center pt-8 md:flex">
        <div
          className="h-5 w-5 rounded-full"
          style={{
            background: style.dot,
            boxShadow:
              entry.status === "current"
                ? "0 0 0 6px rgba(201,168,76,0.16), 0 0 0 12px rgba(201,168,76,0.06)"
                : "none",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 32 : -32 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 md:py-8"
      >
        <div
          className="relative overflow-hidden rounded-[30px]"
          style={{ aspectRatio: "16 / 9" }}
        >
          {entry.photo && !imgError ? (
            <Image
              src={entry.photo}
              alt={entry.photoAlt || entry.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                background:
                  PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
              }}
            >
              <span className="text-[10px] tracking-[0.2em] text-white/45 uppercase">
                {entry.season}
              </span>
              <span className="mt-2 font-serif text-4xl font-semibold text-white/16">
                {entry.year}
              </span>
              <span className="absolute right-4 bottom-4 rounded-full bg-black/30 px-3 py-1 text-[10px] tracking-[0.18em] text-white/40 uppercase">
                Field archive
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative overflow-hidden bg-[#080f0a] py-32"
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.24), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headerRef} className="mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#c9a84c]" />
            <span className="text-xs tracking-[0.22em] text-[#c9a84c] uppercase">
              Building in public
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl"
          >
            This is not a concept deck.
            <br />
            <span className="text-[#c9a84c]">
              This is the actual build path.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-white/56"
          >
            Every season marks a real turn in the project: land restoration,
            community trust, plant growth, fundraising pressure, and the move
            toward a fully operating learning center.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 md:block">
            <div className="absolute inset-0 bg-white/6" />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                scaleY: lineScaleY,
                background:
                  "linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.15))",
              }}
            />
          </div>

          <div className="space-y-12">
            {TIMELINE.map((entry, index) => (
              <TimelineCard key={entry.season} entry={entry} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid gap-4 rounded-[30px] border border-[#c9a84c]/14 bg-[#c9a84c]/[0.04] p-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="text-xs tracking-[0.22em] text-[#c9a84c] uppercase">
              What the timeline proves
            </p>
            <p className="mt-4 text-sm leading-8 text-white/56">
              The project did not arrive all at once. It grew through repeated
              presence, practical work, and a willingness to keep going before
              the support structure was fully in place.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.22em] text-[#c9a84c] uppercase">
              What happens next
            </p>
            <p className="mt-4 text-sm leading-8 text-white/56">
              The next public milestone is straightforward: complete the site,
              open the first student cohort, and keep the operating story
              visible as Hermes and the learning center come fully online.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export type { TimelineEntry }
