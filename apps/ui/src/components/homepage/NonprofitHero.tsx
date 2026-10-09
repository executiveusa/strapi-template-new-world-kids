"use client"

import Image from "next/image"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Seattle · First 12 · 2027",
    title: "Help turn interest into opportunity.",
    body: "Start with what they care about. Connect it to real work, a mentor, and a clear next action.",
    primary: "Join the work",
    caption:
      "Proyecto Indigo Azul · Puerto Vallarta, Mexico. Where it started. Seattle footage is coming.",
    alt: "Aerial view of a food forest with banana plants and young trees at Proyecto Indigo Azul in Puerto Vallarta, Mexico",
  },
  es: {
    eyebrow: "Seattle · Primeros 12 · 2027",
    title: "Ayuda a convertir interés en oportunidad.",
    body: "Empezamos con lo que les importa. Lo conectamos con trabajo real, un mentor y una próxima acción clara.",
    primary: "Súmate al trabajo",
    caption:
      "Proyecto Indigo Azul · Puerto Vallarta, México. Donde empezó. El material de Seattle viene en camino.",
    alt: "Vista aérea de un bosque comestible con plantas de plátano y árboles jóvenes en Proyecto Indigo Azul, Puerto Vallarta, México",
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
        <div data-montage-slot="hero" className="absolute inset-0 bg-[#20201d]">
          <Image
            src="/videos/hero-garden-poster.jpg"
            alt={t.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.35),rgba(10,10,9,0.15)_35%,rgba(10,10,9,0.82))]" />
        </div>
        <p className="absolute top-5 right-5 left-5 z-10 max-w-[22rem] text-xs leading-5 text-white/85 sm:top-7 sm:right-8 sm:left-auto sm:text-right md:right-12">
          {t.caption}
        </p>
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-64px)] max-w-[1480px] items-end px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-14 md:min-h-[calc(100svh-68px)] md:px-12 md:pb-16 lg:px-16 lg:pb-20 xl:px-20">
          <div className="w-full max-w-[980px]">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-white/85 uppercase sm:text-xs">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[900px] text-[clamp(2.9rem,12vw,7.4rem)] leading-[0.94] font-black tracking-[-0.055em] text-balance sm:mt-6 md:text-[clamp(4.6rem,7.4vw,7.4rem)] md:tracking-[-0.06em]">
              {t.title}
            </h1>
            <div className="mt-8 grid gap-6 border-t border-white/25 pt-6 sm:mt-10 sm:max-w-3xl sm:gap-7 sm:pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
              <p className="max-w-[48ch] text-base leading-[1.7] text-white/85 sm:text-lg sm:leading-[1.65] md:text-xl">
                {t.body}
              </p>
              <Link
                href="/#partners"
                locale={locale}
                className={`group inline-flex min-h-12 w-full items-center justify-between border-y border-white/35 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70 sm:w-auto sm:min-w-48 ${focusRing}`}
              >
                <span>{t.primary}</span>
                <span
                  aria-hidden="true"
                  className="ml-8 transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
