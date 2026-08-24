"use client"

import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "New World Kids · Seattle",
    title: "We turn interests into opportunities.",
    body: "Young people already have things they care about. We connect those interests to real projects, paid experiences, mentors, and a next step forward.",
    first:
      "In 2027, we're starting in Seattle with the First 12: 12 paid opportunities with one-on-one mentorship and ongoing support.",
    primary: "See how it works ↓",
    secondary: "Support the First 12 →",
    pause: "Pause video",
    play: "Play video",
  },
  es: {
    eyebrow: "New World Kids · Seattle",
    title: "Convertimos intereses en oportunidades.",
    body: "Los jóvenes ya tienen cosas que les importan. Conectamos esos intereses con proyectos reales, experiencias pagadas, mentores y un siguiente paso.",
    first:
      "En 2027, empezamos en Seattle con los Primeros 12: 12 oportunidades pagadas con mentoría uno a uno y apoyo continuo.",
    primary: "Ver cómo funciona ↓",
    secondary: "Apoya a los Primeros 12 →",
    pause: "Pausar video",
    play: "Reproducir video",
  },
} as const

const HERO_VIDEO_SRC = "/videos/hero-garden.mp4"
const CROSSFADE_SECONDS = 0.9

function LoopingHeroVideo({ poster, paused }: { poster: string; paused: boolean }) {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const activeRef = useRef<"a" | "b">("a")
  const [aOpacity, setAOpacity] = useState(1)

  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const videoA = a
    const videoB = b
    let raf = 0

    function tick() {
      if (paused) return
      const active = activeRef.current === "a" ? videoA : videoB
      const standby = activeRef.current === "a" ? videoB : videoA
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
      videoA.pause()
      videoB.pause()
      return
    }

    ;(activeRef.current === "a" ? videoA : videoB).play().catch(() => {})
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
        style={{ opacity: aOpacity, transitionDuration: `${CROSSFADE_SECONDS}s` }}
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
        style={{ opacity: 1 - aOpacity, transitionDuration: `${CROSSFADE_SECONDS}s` }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
    </>
  )
}

export function NonprofitHero() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const [paused, setPaused] = useState(false)

  return (
    <section data-hero className="bg-[#151515]">
      <div className="relative min-h-[720px] w-full overflow-hidden md:min-h-[860px]">
        <LoopingHeroVideo poster="/videos/hero-garden-poster.jpg" paused={paused} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.80)_0%,rgba(10,10,10,0.58)_48%,rgba(10,10,10,0.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(10,10,10,0.22)_0%,rgba(10,10,10,0.52)_46%,rgba(10,10,10,0.88)_100%)]" />
        <div className="absolute top-0 left-0 h-2 w-full bg-[#2457FF]" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1440px] items-end px-6 pt-24 pb-12 md:min-h-[860px] md:items-center md:px-12 lg:px-16">
          <div className="max-w-[1040px] text-white">
            <p className="text-xs font-bold tracking-[0.22em] text-white uppercase sm:text-sm">{t.eyebrow}</p>
            <h1 className="mt-5 max-w-[1000px] text-[clamp(2.75rem,10vw,7.9rem)] leading-[0.9] font-black tracking-[-0.045em] text-balance uppercase sm:leading-[0.88] sm:tracking-[-0.055em]">
              {t.title}
            </h1>
            <div className="mt-7 grid max-w-[980px] gap-5 md:grid-cols-[1.45fr_0.75fr] md:items-end">
              <p className="max-w-3xl text-base leading-7 text-white/92 sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
              <p className="border-l-2 border-[#2457FF] pl-4 text-sm leading-6 font-semibold text-white/90 sm:text-base">{t.first}</p>
            </div>
            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link
                href="/#how"
                locale={locale}
                style={{ color: "#000" }}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-base font-semibold !text-black transition-transform duration-150 hover:-translate-y-0.5"
              >
                {t.primary}
              </Link>
              <Link
                href="/#support"
                locale={locale}
                style={{ color: "#fff" }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white bg-black/40 px-7 py-3 text-base font-semibold !text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/60"
              >
                {t.secondary}
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-6 bottom-8 z-10 hidden text-right text-[10px] font-bold tracking-[0.28em] text-white/60 uppercase md:block">First 12 / Seattle</div>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          className="absolute right-4 bottom-4 z-20 inline-flex min-h-10 items-center border border-white/35 bg-black/25 px-4 text-[11px] font-bold tracking-[0.08em] text-white uppercase backdrop-blur-sm md:right-6 md:bottom-16"
          aria-pressed={paused}
          aria-label={paused ? t.play : t.pause}
        >
          {paused ? t.play : t.pause}
        </button>
      </div>
    </section>
  )
}