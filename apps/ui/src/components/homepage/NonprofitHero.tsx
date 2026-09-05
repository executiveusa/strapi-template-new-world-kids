"use client"

import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Seattle · First 12 · 2027",
    title: "Help turn interest into opportunity.",
    body: "New World Kids starts with something a young person already cares about and connects it to a real project, an experienced mentor, and a next step.",
    primary: "Bring an opportunity",
    secondary: "See the First 12",
    pause: "Pause video",
    play: "Play video",
  },
  es: {
    eyebrow: "Seattle · Primeros 12 · 2027",
    title: "Ayuda a convertir interés en oportunidad.",
    body: "New World Kids empieza con algo que ya le importa a un joven y lo conecta con un proyecto real, un mentor con experiencia y un siguiente paso.",
    primary: "Traer una oportunidad",
    secondary: "Ver los Primeros 12",
    pause: "Pausar video",
    play: "Reproducir video",
  },
} as const

const HERO_VIDEO_SRC = "/videos/hero-garden.mp4"
const CROSSFADE_SECONDS = 0.9
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"

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
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear motion-reduce:hidden"
        style={{ opacity: aOpacity, transitionDuration: `${CROSSFADE_SECONDS}s` }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear motion-reduce:hidden"
        style={{ opacity: 1 - aOpacity, transitionDuration: `${CROSSFADE_SECONDS}s` }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/videos/hero-garden-poster.jpg')] bg-cover bg-center motion-safe:hidden"
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.18)_0%,rgba(10,10,10,0.36)_34%,rgba(10,10,10,0.88)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,10,0.82)_0%,rgba(10,10,10,0.58)_50%,rgba(10,10,10,0.13)_100%)]" />
        <div className="absolute top-0 left-0 h-1 w-full bg-[#2457FF]" />

        <div className="relative z-10 mx-auto flex min-h-[max(660px,calc(100svh-64px))] max-w-[1440px] items-end px-5 pt-24 pb-8 sm:px-8 sm:pb-10 md:min-h-[min(860px,calc(100svh-68px))] md:items-center md:px-12 md:py-16 lg:px-16">
          <div className="max-w-[1040px] text-white">
            <p className="text-[10px] font-bold tracking-[0.22em] text-white/75 uppercase sm:text-xs">{t.eyebrow}</p>
            <h1 className="mt-4 max-w-[1000px] text-[clamp(2.6rem,12vw,7.9rem)] leading-[0.89] font-black tracking-[-0.052em] text-balance uppercase sm:mt-5 sm:leading-[0.88] md:text-[clamp(4.5rem,8vw,7.9rem)]">
              {t.title}
            </h1>
            <p className="mt-6 max-w-3xl border-t border-white/25 pt-5 text-[15px] leading-6 text-white/88 sm:mt-7 sm:text-lg sm:leading-8 md:max-w-2xl md:border-t-0 md:pt-0 md:text-xl">
              {t.body}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/#partners"
                locale={locale}
                className={`inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform duration-200 hover:-translate-y-px active:translate-y-0 sm:px-7 sm:text-base ${focusRing}`}
              >
                {t.primary}
              </Link>
              <Link
                href="/#first-12"
                locale={locale}
                className={`inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 bg-black/20 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/35 sm:px-7 sm:text-base ${focusRing}`}
              >
                {t.secondary}
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className={`absolute right-4 bottom-4 z-20 hidden min-h-11 items-center rounded-full border border-white/25 bg-black/30 px-4 text-[10px] font-bold tracking-[0.1em] text-white/85 uppercase backdrop-blur-md transition-colors duration-200 hover:bg-black/45 motion-reduce:hidden md:inline-flex md:right-6 md:bottom-16 ${focusRing}`}
          aria-pressed={paused}
          aria-label={paused ? t.play : t.pause}
        >
          {paused ? t.play : t.pause}
        </button>
      </div>
    </section>
  )
}
