"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    name: "Culture Shock",
    eyebrow: "Seattle · practical life-skills program",
    body: "Culture Shock brings practical life skills into mentorship, art, sports, and urban agriculture.",
    href: "/blog",
    action: "Read the field notes",
  },
  {
    name: "Proyecto Indigo Azul",
    eyebrow: "Puerto Vallarta · food forest demonstration site",
    body: "A 1.5-acre food forest where Food, Water, Energy, and Shelter are practiced in the same place.",
    href: "/gallery",
    action: "See the field gallery",
  },
] as const

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.26em] text-[var(--color-eyebrow)] uppercase">
            Two programs. One practical framework.
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            Learn by doing.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            Two places, same idea: young people learn practical skills by working on real projects.
          </p>
        </div>

        <div className="mt-14 grid border-y border-[var(--color-border-subtle)] lg:grid-cols-2">
          {programs.map((program, index) => (
            <motion.article
              key={program.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
              className={[
                "flex min-h-[360px] flex-col justify-between py-10 lg:p-12",
                index === 0
                  ? "border-b border-[var(--color-border-subtle)] lg:border-r lg:border-b-0"
                  : "",
              ].join(" ")}
            >
              <div>
                <p className="text-xs tracking-[0.22em] text-[var(--color-eyebrow)] uppercase">
                  {program.eyebrow}
                </p>
                <h3 className="mt-5 max-w-xl font-serif text-3xl font-semibold leading-tight text-[var(--color-text-primary)] md:text-4xl">
                  {program.name}
                </h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
                  {program.body}
                </p>
              </div>

              <Link
                href={program.href}
                className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--color-sage)] transition hover:text-[var(--color-text-primary)]"
              >
                {program.action}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/#timeline"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-gold)]/50 underline-offset-8 transition hover:decoration-[var(--color-gold)]"
          >
            See the documented timeline ↓
          </Link>
        </div>
      </div>
    </section>
  )
}
