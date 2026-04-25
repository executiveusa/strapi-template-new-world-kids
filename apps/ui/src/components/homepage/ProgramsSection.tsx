import { ArrowUpRight } from "lucide-react"

import { Link } from "@/lib/navigation"

import { programCards, siteLinks } from "../site/siteData"

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-[#071008] py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase">
              What students actually do here
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
              The work is practical by design.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/64">
              Every program is built around capability, not optics. The goal is
              to help students leave with useful habits, useful tools, and a
              clearer sense of what they can contribute.
            </p>
          </div>

          <Link
            href={siteLinks.donate}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#f7e7a7]"
          >
            Support this curriculum
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {programCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7"
            >
              <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
                {card.eyebrow}
              </p>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/64">
                {card.body}
              </p>
              <ul className="mt-6 space-y-3">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm leading-6 text-white/58"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
