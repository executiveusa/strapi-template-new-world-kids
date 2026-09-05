"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Support the pilot",
    title: "Fund the First 12.",
    body: "Support helps cover participant compensation, transportation, materials, equipment, mentor support, and follow-through.",
    cta: "Donate on FundRazr",
  },
  es: {
    eyebrow: "Apoya el piloto",
    title: "Financia a los Primeros 12.",
    body: "El apoyo ayuda a cubrir compensación de participantes, transporte, materiales, equipo, apoyo a mentores y seguimiento.",
    cta: "Donar en FundRazr",
  },
} as const

export function SupportSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section id="support" className="bg-[var(--color-ink)] px-5 py-20 text-white sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase sm:text-xs">{t.eyebrow}</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2 className="max-w-5xl text-[clamp(3rem,10vw,6.5rem)] leading-[0.9] font-black tracking-[-0.055em] text-balance">{t.title}</h2>
          <div className="border-t border-white/20 pt-6 lg:border-t-0 lg:border-l-2 lg:border-[var(--color-nwk-blue)] lg:pt-0 lg:pl-7">
            <p className="max-w-2xl text-base leading-7 text-white/72 md:text-lg md:leading-8">{t.body}</p>
            <Link
              href="/donate"
              locale={locale}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-7 text-sm font-black text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] sm:w-auto"
            >
              {t.cta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
