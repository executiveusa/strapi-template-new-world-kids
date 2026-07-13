"use client"

import { animate, motion, useInView } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "200+", label: "plant varieties growing" },
  { value: "1.5", label: "acres in Puerto Vallarta" },
  { value: "5+", label: "years of operation" },
  { value: "$0", label: "cost to every student" },
]

const HERO_VIDEO_SRC = "/videos/hero-garden.mp4"
const CROSSFADE_SECONDS = 0.9

/**
 * Two copies of the same clip, crossfaded into each other just before the
 * end of the active one, so the loop point never shows a hard cut/jump —
 * the standby copy is already playing from frame 0 by the time it fades in.
 */
function LoopingHeroVideo({ poster }: { poster: string }) {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const activeRef = useRef<"a" | "b">("a")
  const [aOpacity, setAOpacity] = useState(1)

  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b) return

    let raf: number

    function tick() {
      if (!a || !b) return
      const active = activeRef.current === "a" ? a : b
      const standby = activeRef.current === "a" ? b : a

      if (
        active.duration &&
        !Number.isNaN(active.duration) &&
        active.currentTime >= active.duration - CROSSFADE_SECONDS &&
        standby.paused
      ) {
        standby.currentTime = 0
        standby.play().catch(() => {})
        activeRef.current = activeRef.current === "a" ? "b" : "a"
        setAOpacity(activeRef.current === "a" ? 1 : 0)
      }

      raf = requestAnimationFrame(tick)
    }

    a.play().catch(() => {})
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <video
        ref={videoARef}
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear"
        style={{
          opacity: aOpacity,
          transitionDuration: `${CROSSFADE_SECONDS}s`,
        }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear"
        style={{
          opacity: 1 - aOpacity,
          transitionDuration: `${CROSSFADE_SECONDS}s`,
        }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
    </>
  )
}

function StatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const zeroed = (() => {
    const m = /^(\$?)(\d+(?:\.\d+)?)(\+?)$/.exec(value)
    if (!m) return value
    const [, prefix, numStr, suffix] = m

    return `${prefix}${numStr.includes(".") ? "0.0" : "0"}${suffix}`
  })()
  const [display, setDisplay] = useState(zeroed)

  useEffect(() => {
    if (!isInView) return
    const match = /^(\$?)(\d+(?:\.\d+)?)(\+?)$/.exec(value)
    if (!match) return
    const [, prefix, numStr, suffix] = match
    const target = Number.parseFloat(numStr)
    const decimals = numStr.includes(".") ? 1 : 0
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const controls = animate(0, target, {
      duration: prefersReducedMotion ? 0 : 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    })

    return () => controls.stop()
  }, [isInView, value])

  return <span ref={ref}>{display}</span>
}

export function NonprofitHero() {
  return (
    <section data-hero className="bg-[var(--color-bg)]">
      {/* Video — quote centered on top, nothing underneath it */}
      <div className="relative h-[62vh] min-h-[380px] w-full overflow-hidden sm:h-[75vh] md:h-screen">
        <LoopingHeroVideo poster="/videos/hero-garden-poster.jpg" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center"
          >
            <p className="font-serif text-[1.75rem] leading-tight text-white italic drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4.5rem]">
              &ldquo;If you ever think you&apos;re too small to make a
              difference, try going to sleep with a mosquito in the room.&rdquo;
            </p>
            <p className="mt-4 text-xs tracking-[0.28em] text-white/70 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
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
                <StatNumber value={stat.value} />
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
