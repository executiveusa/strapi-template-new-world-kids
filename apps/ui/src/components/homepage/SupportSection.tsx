"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const donateAmounts = ["$25", "$50", "$100"]
const copy = {
  en: {
    eyebrow: "Support the pilot",
    title: "Help us prove the First 12.",
    body: "Funding covers the practical costs that make participation possible: participant wages, mentors, transportation, materials, equipment, coordination, and follow-up. The first-year goal is simple: give 12 participants real opportunities and measure whether they actually move forward.",
    quote: "If you ever think you're too small to make a difference, try going to sleep with a mosquito in the room.",
    source: "West African Proverb",
  },
  es: {
    eyebrow: "Apoya el piloto",
    title: "Ayúdanos a demostrar los Primeros 12.",
    body: "El financiamiento cubre los costos prácticos que hacen posible la participación: salarios de participantes, mentores, transporte, materiales, equipo, coordinación y seguimiento. La meta del primer año es sencilla: dar a 12 participantes oportunidades reales y medir si realmente avanzan.",
    quote: "Si alguna vez piensas que eres demasiado pequeño para hacer una diferencia, intenta dormir con un mosquito en la habitación.",
    source: "Proverbio de África Occidental",
  },
} as const

export function SupportSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const reduceMotion = useReducedMotion()

  return (
    <section id="support" className="bg-[var(--color-ink)] px-5 py-20 text-white sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase sm:text-xs">{t.eyebrow}</p>
            <h2 className="mt-4 max-w-5xl text-[clamp(3rem,12vw,6.5rem)] leading-[0.9] font-black tracking-[-0.055em] text-balance sm:mt-5">{t.title}</h2>
          </div>
          <p className="max-w-2xl border-t border-white/20 pt-6 text-[15px] leading-7 text-white/68 sm:text-base md:border-t-0 md:border-l-2 md:border-[var(--color-nwk-blue)] md:pt-0 md:pl-7 md:text-lg md:leading-8">{t.body}</p>
        </div>

        <div className="mt-10 grid border-y border-white/20 sm:mt-14 sm:grid-cols-3">
          {donateAmounts.map((amount, i) => (
            <motion.div
              key={amount}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : i * 0.04 }}
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              className="border-b border-white/20 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
            >
              <Link href="/donate" locale={locale} className="group flex min-h-20 items-center justify-between px-2 py-5 text-white transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:min-h-32 sm:px-6">
                <span className="text-4xl font-black tracking-[-0.055em] sm:text-5xl">{amount}</span>
                <span aria-hidden="true" className="text-xl text-white/45 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/20 pt-8 md:mt-16 md:grid-cols-[1fr_auto] md:items-end md:pt-10">
          <div>
            <blockquote className="max-w-4xl text-xl leading-tight font-bold tracking-[-0.025em] text-white/88 sm:text-2xl md:text-4xl">“{t.quote}”</blockquote>
            <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase sm:text-xs">{t.source}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold tracking-[0.1em] text-white/50 uppercase sm:text-xs">
            <a href="https://www.instagram.com/proyectoindigoazul/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Instagram</a>
            <a href="https://www.facebook.com/nwkidsorg" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Facebook</a>
            <a href="https://www.linkedin.com/company/nwkids/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  )
}