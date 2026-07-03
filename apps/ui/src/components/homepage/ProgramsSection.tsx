import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { siteLinks, programCards } from "../site/siteData"

// Per the design system: this section consumes `programCards` from shared
// siteData, which is reconciled against docs/copy/homepage/06-programs.md.
// The copy folder is the single source of truth for program content.
// The third card (Mission-Funded Studio) is restored here per owner decision.

const cardLinks = ["/blog", "/gallery", "/work-with-us"] as const

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-[var(--color-bg)] px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.26em] text-[var(--color-gold)] uppercase">
            Three programs. Two communities. One mission.
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
            We meet youth where they are.
          </h2>
        </div>

        {/* Program cards — driven by shared data */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {programCards.map((program, index) => {
            const linkHref = cardLinks[index] ?? "/work-with-us"
            const isFeatured = index === 1 // Indigo Azul highlighted

            return (
              <article
                key={program.title}
                className={[
                  "flex flex-col rounded-[30px] border bg-white/[0.03] p-8",
                  isFeatured
                    ? "border-[var(--color-gold)]/30"
                    : "border-white/10",
                ].join(" ")}
              >
                <p className="text-xs tracking-[0.24em] text-[var(--color-gold)] uppercase">
                  {program.eyebrow}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-white md:text-3xl">
                  {program.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-white/65">
                  {program.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {program.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-6 text-white/58"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
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
              </article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href={siteLinks.donate}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/60 px-8 py-4 text-sm font-semibold text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/10"
          >
            Support all three programs →
          </Link>
        </div>
      </div>
    </section>
  )
}
