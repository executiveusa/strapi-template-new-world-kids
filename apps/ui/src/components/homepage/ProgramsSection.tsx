"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { siteLinks, programCards } from "../site/siteData"

// Per the design system: this section consumes `programCards` from shared
// siteData, which is reconciled against docs/copy/homepage/06-programs.md.
// The copy folder is the single source of truth for program content.

const cardLinks = ["/blog", "/gallery", "/work-with-us"] as const

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-28 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.26em] text-[var(--color-eyebrow)] uppercase">
            Two programs. Two communities. One mission.
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            We meet youth where they are.
          </h2>
        </div>

        {/* Program cards — driven by shared data */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {programCards.map((program, index) => {
            const linkHref = cardLinks[index] ?? "/work-with-us"
            const isFeatured = index === 1 // Indigo Azul highlighted

            return (
              <motion.article
                key={program.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.12,
                }}
                style={{ boxShadow: "var(--shadow-sm)" }}
                className={[
                  "relative flex flex-col rounded-[30px] border bg-[var(--color-border-subtle)] p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]",
                  isFeatured
                    ? "border-[var(--color-sage)]/35"
                    : "border-[var(--color-border-subtle)]",
                ].join(" ")}
              >
                {"badge" in program && program.badge ? (
                  <span className="absolute top-5 right-5 rounded-full border border-[var(--color-coral)]/40 bg-[var(--color-coral)]/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-[var(--color-coral)] uppercase">
                    {program.badge}
                  </span>
                ) : null}
                <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
                  {program.eyebrow}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
                  {program.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">
                  {program.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {program.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-6 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-sage)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-1 items-end">
                  <Link
                    href={linkHref}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold-bright)]"
                  >
                    {index === 0 && "Learn more on our blog"}
                    {index === 1 && "See the gallery"}
                    {index === 2 && "Work with the studio"}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href={siteLinks.donate}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-sage)]/60 px-8 py-4 text-sm font-semibold text-[var(--color-sage)] transition hover:bg-[var(--color-sage)]/10"
          >
            Support both programs →
          </Link>
        </div>
      </div>
    </section>
  )
}
