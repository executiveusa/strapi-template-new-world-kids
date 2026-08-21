"use client"

import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "New World Kids · Seattle",
    title: "We help young people turn what they care about into what comes next.",
    body: "A lot of young people know what they're interested in, but they don't know how to turn that interest into a real opportunity. New World Kids helps close that gap by connecting young people to mentors, real projects, career-building opportunities, and a clear next step.",
    first: "We're starting in Seattle with the First 12 — 12 young people over our first year.",
    primary: "See how it works ↓",
    secondary: "Partner with us →",
    pause: "Pause video",
    play: "Play video",
  },
  es: {
    eyebrow: "New World Kids · Seattle",
    title: "Ayudamos a jóvenes a convertir lo que les importa en lo que viene después.",
    body: "Muchos jóvenes saben qué les interesa, pero no saben cómo convertir ese interés en una oportunidad real. New World Kids ayuda a cerrar esa brecha conectándolos con mentores, proyectos reales, oportunidades que construyen una carrera y un siguiente paso claro.",
    first: "Estamos empezando en Seattle con los Primeros 12: 12 jóvenes durante nuestro primer año.",
    primary: "Ver cómo funciona ↓",
    secondary: "Colabora con nosotros →",
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
    let raf = 0
    function tick() {
      if (paused) return
      const active = activeRef.current === "a" ? a : b
      const standby = activeRef.current === "a" ? b : a
      if (active.duration && !Number.isNaN(active.duration) && active.currentTime >= active.duration - CROSSFADE_SECONDS && standby.paused) {
        standby.currentTime = 0
        standby.play().catch(() => {})
        activeRef.current = activeRef.current === "a" ? "b" : "a"
        setAOpacity(activeRef.current === "a" ? 1 : 0)
      }
      raf = requestAnimationFrame(tick)
    }
    if (paused) { a.pause(); b.pause(); return }
    ;(activeRef.current === "a" ? a : b).play().catch(() => {})
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  return <>
    <video ref={videoARef} muted playsInline preload="auto" poster={poster} className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear" style={{opacity:aOpacity,transitionDuration:`${CROSSFADE_SECONDS}s`}} aria-hidden="true"><source src={HERO_VIDEO_SRC} type="video/mp4" /></video>
    <video ref={videoBRef} muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear" style={{opacity:1-aOpacity,transitionDuration:`${CROSSFADE_SECONDS}s`}} aria-hidden="true"><source src={HERO_VIDEO_SRC} type="video/mp4" /></video>
  </>
}

export function NonprofitHero() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const [paused, setPaused] = useState(false)

  return (
    <section data-hero className="bg-[var(--color-bg)]">
      <div className="relative min-h-[680px] w-full overflow-hidden md:min-h-[780px]">
        <LoopingHeroVideo poster="/videos/hero-garden-poster.jpg" paused={paused} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,9,0.80)_0%,rgba(10,12,9,0.60)_54%,rgba(10,12,9,0.20)_100%)] max-md:bg-[linear-gradient(180deg,rgba(10,12,9,0.42)_0%,rgba(10,12,9,0.76)_72%,rgba(10,12,9,0.84)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-end px-6 pt-24 pb-14 md:min-h-[780px] md:items-center md:px-10 md:py-20">
          <div className="max-w-4xl text-white">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/78 uppercase sm:text-sm">{t.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] font-semibold tracking-[-0.035em] text-balance sm:text-6xl md:text-7xl lg:text-[5rem]">{t.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-6 text-white/90 sm:text-base">{t.first}</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link href="/#how" locale={locale} className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-base font-semibold text-black transition-transform duration-150 hover:-translate-y-0.5">{t.primary}</Link>
              <Link href="/#partners" locale={locale} className="inline-flex min-h-12 items-center text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">{t.secondary}</Link>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => setPaused(v => !v)} className="absolute right-4 bottom-4 z-20 inline-flex min-h-11 items-center rounded-full border border-white/30 bg-black/30 px-4 text-xs font-semibold text-white backdrop-blur-sm" aria-pressed={paused} aria-label={paused ? t.play : t.pause}>{paused ? t.play : t.pause}</button>
      </div>
    </section>
  )
}
