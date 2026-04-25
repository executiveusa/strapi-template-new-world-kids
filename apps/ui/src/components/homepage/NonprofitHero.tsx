"use client"

import { motion } from "framer-motion"
import { ArrowRight, Bot, ShieldCheck, Sprout } from "lucide-react"

import { Link } from "@/lib/navigation"

import { homepageStats } from "../site/siteData"

export function NonprofitHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#091109]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-20rem] mx-auto h-[42rem] w-[42rem] rounded-full bg-[#c9a84c]/12 blur-3xl" />
        <div className="absolute top-[20%] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(8,15,10,0.3),rgba(8,15,10,0.92))]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-xs tracking-[0.28em] text-[#c9a84c] uppercase">
              Free regenerative education in Puerto Vallarta
            </p>
            <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-white md:text-6xl">
              We teach young people how to grow food, protect water, make
              energy, and build shelter.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              New World Kids is building a real learning site in Paso de
              Guayabo, Mexico where students practice the basics most systems
              leave out. The work is hands-on, tuition-free for accepted
              students, and designed to leave behind usable skills instead of
              empty inspiration.
            </p>

            <div className="mt-8 rounded-[28px] border border-[#c9a84c]/25 bg-[#c9a84c]/8 p-6">
              <p className="text-xs tracking-[0.22em] text-[#f7e7a7] uppercase">
                Our promise
              </p>
              <p className="mt-3 text-base leading-8 text-white/78">
                If a young person shows up here, they should leave more capable,
                more employable, and more able to care for themselves and the
                people around them.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a84c] px-6 py-4 text-sm font-semibold text-[#091109] transition-transform hover:-translate-y-0.5"
              >
                Support the mission
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#timeline"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white/82"
              >
                See the timeline
              </Link>
              <Link
                href="/#hermes"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white/82"
              >
                Meet Hermes
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center gap-3 text-[#c9a84c]">
                <Sprout className="h-5 w-5" />
                <p className="text-xs tracking-[0.24em] uppercase">
                  What visitors should understand fast
                </p>
              </div>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-white">
                This is a school-in-public, not a pitch deck.
              </h2>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3 text-sm leading-7 text-white/60">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                  <span>
                    Real land, real curriculum, real local relationships.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-7 text-white/60">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                  <span>
                    Students learn through work that matters in daily life.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-7 text-white/60">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                  <span>
                    The site is written to reduce guesswork and increase trust.
                  </span>
                </li>
              </ul>
            </article>

            <article className="rounded-[32px] border border-white/10 bg-[#0c1710] p-7">
              <div className="flex items-center gap-3 text-[#c9a84c]">
                <ShieldCheck className="h-5 w-5" />
                <p className="text-xs tracking-[0.24em] uppercase">
                  Seth-guided brand question
                </p>
              </div>
              <p className="mt-4 font-serif text-2xl font-semibold text-white">
                Who are we helping students become?
              </p>
              <p className="mt-4 text-sm leading-7 text-white/62">
                More self-sufficient. More bilingual. More rooted. More trusted
                with responsibility. That question shapes the curriculum, the
                copy, and the Hermes operating layer behind the scenes.
              </p>
            </article>

            <article className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center gap-3 text-[#c9a84c]">
                <Bot className="h-5 w-5" />
                <p className="text-xs tracking-[0.24em] uppercase">
                  Backend posture
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/62">
                Hermes is integrated as the operations layer. The frontend stays
                simple and zero-secret, while the backend handles status,
                reporting, grant work, and future automation.
              </p>
            </article>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </section>
  )
}
