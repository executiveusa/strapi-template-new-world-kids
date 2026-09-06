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
      <div className="relative min-h-[calc(100svh-64px)] w-full overflow-hidden md:min-h-[calc(100svh-68px)]">
        <div
          data-montage-slot="hero"
          aria-label={t.reserved}
          className="absolute inset-0 bg-[#20201d]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.055),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(0,0,0,0.18))]" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(10,10,9,0.72))]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] max-w-[1480px] items-end px-5 pt-28 pb-10 sm:px-8 sm:pb-14 md:min-h-[calc(100svh-68px)] md:px-12 md:pb-16 lg:px-16 lg:pb-20 xl:px-20">
          <div className="w-full max-w-[980px]">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/62 uppercase sm:text-xs">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[900px] text-[clamp(3.35rem,11vw,7.4rem)] leading-[0.89] font-black tracking-[-0.06em] text-balance sm:mt-6 md:text-[clamp(4.6rem,7.4vw,7.4rem)]">
              {t.title}
            </h1>
            <div className="mt-8 grid gap-7 border-t border-white/22 pt-6 sm:mt-10 sm:max-w-3xl md:grid-cols-[1fr_auto] md:items-end md:gap-12">
              <p className="max-w-xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
                {t.body}
              </p>
              <Link
                href="/#partners"
                locale={locale}
                className={`group inline-flex min-h-12 min-w-48 items-center justify-between border-y border-white/30 py-3 text-sm font-black text-white transition-colors hover:border-white/70 ${focusRing}`}
              >
                <span>{t.primary}</span>
                <span aria-hidden="true" className="ml-8 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="absolute right-5 bottom-5 z-10 hidden text-[9px] font-semibold tracking-[0.2em] text-white/28 uppercase md:block">
          {t.reserved}
        </div>
      </div>
    </section>
  )
}
