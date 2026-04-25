"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Link } from "@/lib/navigation"

import {
  heroFactStrip,
  heroFeatureCards,
  homepageStats,
} from "../site/siteData"

export function NonprofitHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#091109]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-24rem] mx-auto h-[48rem] w-[48rem] rounded-full bg-[#c9a84c]/14 blur-3xl" />
        <div className="absolute top-[14%] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[#1d3f2b]/60 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(6,11,7,0.14),rgba(6,11,7,0.94))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(5,9,5,0.9))]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-81px)] max-w-7xl flex-col justify-end px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl pb-4"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/8 px-4 py-2 text-[11px] tracking-[0.24em] text-[#f7e7a7] uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Free regenerative education in Puerto Vallarta
            </div>
            <h1 className="mt-8 max-w-5xl font-serif text-5xl font-semibold tracking-tight text-white md:text-7xl xl:text-[6.2rem] xl:leading-[0.92]">
              We teach young people how to grow food, protect water, make
              energy, and build shelter.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
              New World Kids is building a real learning site in Paso de
              Guayabo, Mexico where students practice the basics most systems
              leave out. The work is hands-on, tuition-free for accepted
              students, and designed to leave behind usable skills instead of
              empty inspiration.
            </p>

            <div className="mt-10 rounded-[32px] border border-[#c9a84c]/25 bg-[#c9a84c]/8 p-6 md:p-7">
              <p className="text-xs tracking-[0.22em] text-[#f7e7a7] uppercase">
                Our promise
              </p>
              <p className="mt-4 text-base leading-8 text-white/78 md:text-lg">
                If a young person shows up here, they should leave more capable,
                more employable, and more able to care for themselves and the
                people around them.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a84c] px-7 py-4 text-sm font-semibold text-[#091109] transition-transform hover:-translate-y-0.5"
              >
                Support the mission
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#timeline"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-medium text-white/82"
              >
                See the timeline
              </Link>
              <Link
                href="/#hermes"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-medium text-white/82"
              >
                Meet Hermes
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 lg:pb-4"
          >
            {heroFeatureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7"
              >
                <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
                  {card.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-semibold text-white">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {card.body}
                </p>
                {"bullets" in card && card.bullets ? (
                  <ul className="mt-5 space-y-3">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-7 text-white/60"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {homepageStats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
                className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="font-serif text-4xl font-semibold text-[#c9a84c]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  {stat.label}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="grid gap-3 rounded-[30px] border border-white/10 bg-white/[0.03] p-6"
          >
            {heroFactStrip.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-white/8 pb-3 last:border-b-0 last:pb-0 md:grid-cols-[150px_1fr]"
              >
                <p className="text-xs tracking-[0.22em] text-[#c9a84c] uppercase">
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-white/64">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
