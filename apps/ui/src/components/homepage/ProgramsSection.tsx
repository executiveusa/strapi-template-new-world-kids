import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteLinks } from "../site/siteData"

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-[#071008] py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Section header */}
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase">
            Two programs. Two communities. One mission.
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
            We meet youth where they are.
          </h2>
        </div>

        {/* Program cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">

          {/* Culture Shock */}
          <article className="flex flex-col rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              Inner city youth · Culture Shock Program
            </p>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-white md:text-3xl">
              From survival mode to purpose.
            </h3>
            <p className="mt-5 text-base leading-8 text-white/65">
              After graduation most inner-city youth are thrown into an economy
              that values financial gain over creativity, and success over
              service. Without the right life skills, young people with raw
              talent and real potential get stuck in a desperate loop just
              trying to survive. Those pressures lead to poor decisions and the
              pull of crime, drugs, and destructive behavior.
            </p>
            <p className="mt-4 text-base leading-8 text-white/65">
              Our Culture Shock program uses mentors with backgrounds in art,
              sports, and urban agriculture to help youth discover their full
              potential, find meaningful employment, and contribute their gifts
              to the world.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Earn-while-you-learn stipends",
                "Mentors in art, sports, and urban agriculture",
                "International travel and cultural immersion",
                "Second language acquisition",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm leading-6 text-white/58"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a84c]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex-1 flex items-end">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#f7e7a7]"
              >
                Learn more on our blog
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Indigo Azul */}
          <article className="flex flex-col rounded-[30px] border border-[#c9a84c]/30 bg-white/[0.03] p-8">
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              Rural youth · Proyecto Indigo Azul
            </p>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-white md:text-3xl">
              The ability to grow your own food changes everything.
            </h3>
            <p className="mt-5 text-base leading-8 text-white/65">
              Youth in rural areas face different challenges than youth in the
              city. Many families live day to day, markets are far away and
              expensive, and the basics — food, water, shelter — are never
              guaranteed. Knowing how to produce your own can be life-changing.
            </p>
            <p className="mt-4 text-base leading-8 text-white/65">
              Our Indigo Azul Project is a 1.5-acre experimental food forest in
              Puerto Vallarta, Mexico. We began planting in 2020 with the goal
              of building systems for food, water, energy, and shelter that can
              be duplicated anywhere. The site has grown to over 200 plant
              species, fruit trees, medicinal herbs, and flowers. We are now
              ready to open the doors to local youth.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "200+ plant species, fruit trees, and medicinal herbs",
                "Techniques practiced and documented year-round",
                "Sustainable systems designed to be replicated anywhere",
                "Free for every student, no exceptions",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm leading-6 text-white/58"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a84c]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex-1 flex items-end">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#f7e7a7]"
              >
                See the gallery
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href={siteLinks.donate}
            className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/60 px-8 py-4 text-sm font-semibold text-[#c9a84c] transition hover:bg-[#c9a84c]/10"
          >
            Support both programs →
          </Link>
        </div>

      </div>
    </section>
  )
}
