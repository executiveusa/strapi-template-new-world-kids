"use client"

import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Seattle · First 12 · 2027",
    title: "Help turn interest into opportunity.",
    body: "Start with what they care about. Connect it to real work, a mentor, and a clear next action.",
    primary: "Join the work",
    pause: "Pause video",
    play: "Play video",
  },
  es: {
    eyebrow: "Seattle · Primeros 12 · 2027",
    title: "Ayuda a convertir interés en oportunidad.",
    body: "Empezamos con lo que les importa. Lo conectamos con trabajo real, un mentor y una próxima acción clara.",
    primary: "Súmate al trabajo",
    pause: "Pausar video",
    play: "Reproducir video",
  },
} as const

const HERO_VIDEO_SRC = "/videos/hero-garden.mp4"
const CROSSFADE_SECONDS = 0.9
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"

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

  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const videoA = a
    const videoB = b
    let raf = 0

    function tick() {
      if (paused || document.hidden) return
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
        preload="metadata"
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] transition-opacity ease-linear motion-reduce:hidden sm:object-[54%_center] md:object-center"
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
        preload="none"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] transition-opacity ease-linear motion-reduce:hidden sm:object-[54%_center] md:object-center"
        style={{
          opacity: 1 - aOpacity,
          transitionDuration: `${CROSSFADE_SECONDS}s`,
        }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/videos/hero-garden-poster.jpg')] bg-cover bg-[position:58%_center] motion-safe:hidden sm:bg-[position:54%_center] md:bg-center"
      />
    </>
  )
}

export function NonprofitHero() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const [paused, setPaused] = useState(false)

  return (
    <section data-hero className="bg-[#111]">
      <div className="relative min-h-[max(660px,calc(100svh-64px))] w-full overflow-hidden md:min-h-[min(860px,calc(100svh-68px))]">
        <LoopingHeroVideo poster="/videos/hero-garden-poster.jpg" paused={paused} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08)_0%,rgba(10,10,10,0.22)_36%,rgba(10,10,10,0.9)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,10,0.78)_0%,rgba(10,10,10,0.5)_46%,rgba(10,10,10,0.08)_100%)]" />
        <div className="absolute top-0 left-0 h-1 w-full bg-[#2457FF]" />

        <div className="relative z-10 mx-auto flex min-h-[max(660px,calc(100svh-64px))] max-w-[1440px] items-end px-5 pt-24 pb-9 sm:px-8 sm:pb-11 md:min-h-[min(860px,calc(100svh-68px))] md:items-center md:px-12 md:py-16 lg:px-16">
          <div className="max-w-[980px] text-white">
            <p className="text-[10px] font-bold tracking-[0.22em] text-white/75 uppercase sm:text-xs">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[940px] text-[clamp(3rem,11vw,7rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance sm:mt-5 md:text-[clamp(4.4rem,7.5vw,7rem)]">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl border-t border-white/25 pt-5 text-base leading-7 text-white/90 sm:mt-7 sm:text-lg sm:leading-8 md:border-t-0 md:pt-0 md:text-xl">
              {t.body}
            </p>
            <div className="mt-7 border-t border-white/30 sm:mt-8 sm:max-w-sm">
              <Link
                href="/#partners"
                locale={locale}
                className={`group flex min-h-14 items-center justify-between border-b border-white/30 py-4 text-sm font-black text-white sm:text-base ${focusRing}`}
              >
                <span>{t.primary}</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className={`absolute right-4 bottom-4 z-20 hidden min-h-11 items-center border-y border-white/25 bg-black/20 px-4 text-[10px] font-bold tracking-[0.1em] text-white/85 uppercase backdrop-blur-md transition-colors duration-200 hover:bg-black/35 motion-reduce:hidden md:right-6 md:bottom-16 md:inline-flex ${focusRing}`}
          aria-pressed={paused}
          aria-label={paused ? t.play : t.pause}
        >
          {paused ? t.play : t.pause}
        </button>
      </div>
    </section>
  )
}
