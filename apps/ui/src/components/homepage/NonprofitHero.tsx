"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Seattle · First 12 · 2027",
    title: "Help turn interest into opportunity.",
    body: "Start with what they care about. Connect it to real work, a mentor, and a clear next action.",
    primary: "Join the work",
    reserved: "Reserved for · 12–15 sec hero montage",
  },
  es: {
    eyebrow: "Seattle · Primeros 12 · 2027",
    title: "Ayuda a convertir interés en oportunidad.",
    body: "Empezamos con lo que les importa. Lo conectamos con trabajo real, un mentor y una próxima acción clara.",
    primary: "Súmate al trabajo",
    reserved: "Reservado para · montaje principal de 12–15 s",
  },
} as const

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#191917]"

export function NonprofitHero() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section data-hero className="bg-[#191917] text-white">
      <div className="relative min-h-[calc(100dvh-64px)] w-full overflow-hidden md:min-h-[calc(100svh-68px)]">
        <div data-montage-slot="hero" aria-label={t.reserved} className="absolute inset-0 bg-[#20201d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.055),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(0,0,0,0.18))]" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(10,10,9,0.72))]" />
        </div>
        <div aria-hidden="true" className="absolute top-5 right-5 z-10 max-w-[11rem] text-right text-[8px] font-semibold leading-4 tracking-[0.16em] text-white/35 uppercase sm:top-7 sm:right-8 sm:max-w-none sm:text-[9px] sm:tracking-[0.2em] md:right-12">{t.reserved}</div>
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-64px)] max-w-[1480px] items-end px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-14 md:min-h-[calc(100svh-68px)] md:px-12 md:pb-16 lg:px-16 lg:pb-20 xl:px-20">
          <div className="w-full max-w-[980px]">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase sm:text-xs">{t.eyebrow}</p>
            <h1 className="mt-5 max-w-[900px] text-[clamp(2.9rem,12vw,7.4rem)] leading-[0.94] font-black tracking-[-0.055em] text-balance sm:mt-6 md:text-[clamp(4.6rem,7.4vw,7.4rem)] md:tracking-[-0.06em]">{t.title}</h1>
            <div className="mt-8 grid gap-6 border-t border-white/25 pt-6 sm:mt-10 sm:max-w-3xl sm:gap-7 sm:pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
              <p className="max-w-[48ch] text-base leading-[1.7] text-white/85 sm:text-lg sm:leading-[1.65] md:text-xl">{t.body}</p>
              <Link href="/#partners" locale={locale} className={`group inline-flex min-h-12 w-full items-center justify-between border-y border-white/35 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70 sm:w-auto sm:min-w-48 ${focusRing}`}>
                <span>{t.primary}</span>
                <span aria-hidden="true" className="ml-8 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
