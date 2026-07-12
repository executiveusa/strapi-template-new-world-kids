"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const stats = [
  { value: "200+", label: "plant varieties growing" },
  { value: "1.5", label: "acres in Puerto Vallarta" },
  { value: "5+", label: "years of operation" },
  { value: "$0", label: "cost to every student" },
]

export function NonprofitHero() {
  return (
    <section data-hero className="bg-[var(--color-bg)]">
      {/* Video — quote centered on top, everything else below */}
      <div className="relative h-[62vh] min-h-[380px] w-full overflow-hidden sm:h-[75vh] md:h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-garden-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-garden.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center"
          >
            <p className="font-serif text-[1.2rem] leading-relaxed text-[var(--color-accent-gold)] italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-[1.5rem]">
              &ldquo;If you ever think you&apos;re too small to make a
              difference, try going to sleep with a mosquito in the room.&rdquo;
            </p>
            <p className="mt-2 text-xs tracking-[0.28em] text-[var(--color-accent-gold)]/70 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              West African Proverb
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content — below the video */}
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center md:px-10 md:py-28">
        {/* Headline — problem-first rewrite */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-4xl leading-tight font-semibold text-[var(--color-text-primary)] md:text-6xl lg:text-7xl"
        >
          Most kids graduate
          <br className="hidden md:block" /> without ever learning
          <br className="hidden md:block" /> the most important life skills.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 font-serif text-xl text-[var(--color-accent-gold)] md:text-2xl"
        >
          We fix that. Free. No exceptions.
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg"
        >
          New World Kids is a Seattle-based nonprofit. We create projects and
          programs that teach inner-city and rural youth life skills. No matter
          the situation, we meet them where they are — then inspire them with
          the possibilities and skills to go beyond.
        </motion.p>

        {/* Core four callout */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 font-serif text-sm tracking-wide text-[var(--color-accent-gold)]/80"
        >
          Our framework: Food · Water · Energy · Shelter. Every program teaches
          all four.
        </motion.p>

        {/* CTAs — donate is dominant primary; timeline is a quiet text link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Link href="/donate">
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block rounded-full bg-[var(--color-accent-coral)] px-12 py-4 text-base font-semibold text-white shadow-[var(--color-accent-coral)]/25 shadow-xl transition-colors hover:bg-[var(--color-accent-coral-hover)] hover:shadow-[var(--color-accent-coral)]/40"
            >
              Plant a seed — give $25 →
            </motion.span>
          </Link>
          <Link
            href="/#timeline"
            className="text-sm text-[var(--color-accent-gold)]/55 transition hover:text-[var(--color-accent-gold)]"
          >
            or see 5 years of work →
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-[var(--color-border-subtle)] pt-10 text-center sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-semibold text-[var(--color-accent-gold)] md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
