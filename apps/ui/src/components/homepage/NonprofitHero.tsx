"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const proofLinks = [
  { label: "Field archive", href: "/#timeline", detail: "See the work in order" },
  { label: "Field gallery", href: "/gallery", detail: "See documented images" },
  { label: "Public records", href: "/#proof", detail: "See the paperwork" },
] as const

const HERO_VIDEO_SRC = "/videos/hero-garden.mp4"
const CROSSFADE_SECONDS = 0.9

function LoopingHeroVideo({
  poster,
  paused,
}: {
  poster: string
  paused: boolean
}) {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const activeRef = useRef<"a" | "b">("a")
  const [aOpacity, setAOpacity] = useState(1)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b) return

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (reducedMotionRef.current) return

    let raf = 0

    function tick() {
      if (!a || !b || paused) return
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

    if (paused) {
      a.pause()
      b.pause()
      return
    }

    const active = activeRef.current === "a" ? a : b
    active.play().catch(() => {})
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [paused])

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
        aria-hidden="true"
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
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
    </>
  )
}

export function NonprofitHero() {
  const [paused, setPaused] = useState(false)

  return (
    <section data-hero className="bg-[var(--color-bg)]">
      <div className="relative min-h-[620px] w-full overflow-hidden sm:min-h-[700px] md:min-h-[760px] lg:min-h-[820px]">
        <LoopingHeroVideo
          poster="/videos/hero-garden-poster.jpg"
          paused={paused}
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,9,0.74)_0%,rgba(10,12,9,0.52)_48%,rgba(10,12,9,0.18)_100%)] max-md:bg-[linear-gradient(180deg,rgba(10,12,9,0.44)_0%,rgba(10,12,9,0.68)_72%,rgba(10,12,9,0.78)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-6 pt-24 pb-12 sm:min-h-[700px] sm:px-8 sm:pb-16 md:min-h-[760px] md:items-center md:py-20 lg:min-h-[820px]">
          <div className="max-w-3xl text-left text-white">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/78 uppercase sm:text-sm">
              Practical life skills · Food · Water · Energy · Shelter
            </p>

            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] font-semibold tracking-[-0.035em] text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Kids need more than a diploma. They need life skills.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/88 sm:text-lg sm:leading-8 md:text-xl">
              Students learn food, water, energy, and shelter through real projects. Learning happens by doing.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/#timeline"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-surface)] px-7 py-3 text-base font-semibold text-[var(--color-text-primary)] shadow-lg shadow-black/15 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-0"
              >
                See the field archive ↓
              </Link>
              <Link
                href="/donate"
                className="inline-flex min-h-12 items-center text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white"
              >
                Ready to help? Donate →
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="absolute right-4 bottom-4 z-20 inline-flex min-h-11 items-center rounded-full border border-white/30 bg-black/30 px-4 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/45 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white sm:right-6 sm:bottom-6"
          aria-pressed={paused}
          aria-label={paused ? "Play background video" : "Pause background video"}
        >
          {paused ? "Play video" : "Pause video"}
        </button>
      </div>

      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {proofLinks.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "group flex min-h-28 items-center justify-between gap-5 border-t border-[var(--color-border-subtle)] px-6 py-6 transition-colors hover:bg-[var(--color-surface)] md:border-t-0 sm:px-8",
                index > 0 ? "md:border-l" : "",
              ].join(" ")}
            >
              <div>
                <p className="font-serif text-xl font-semibold text-[var(--color-text-primary)]">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {item.detail}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-lg text-[var(--color-accent-gold)] transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
