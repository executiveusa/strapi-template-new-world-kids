"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const donateAmounts = ["$25", "$50", "$100"]
const copy = {
  en: {
    eyebrow: "The first-year goal",
    title: "Help us start with 12 young people.",
    body: "The first year is intentionally small. Support will help cover the practical things that make participation possible: project materials, transportation, mentors, equipment, youth compensation when funding and the project allow for it, and follow-up after the project ends. The goal is not to run as many activities as possible. It is to learn what it takes to help 12 young people make meaningful progress.",
    quote: "If you ever think you're too small to make a difference, try going to sleep with a mosquito in the room.",
    source: "Proverb",
  },
  es: {
    eyebrow: "La meta del primer año",
    title: "Ayúdanos a empezar con 12 jóvenes.",
    body: "El primer año es pequeño a propósito. El apoyo ayudará a cubrir las cosas prácticas que hacen posible la participación: materiales para proyectos, transporte, mentores, equipo, compensación juvenil cuando el financiamiento y el proyecto lo permitan, y seguimiento después de que termine el proyecto. La meta no es ofrecer la mayor cantidad posible de actividades. Es aprender qué hace falta para ayudar a 12 jóvenes a avanzar de manera significativa.",
    quote: "Si alguna vez piensas que eres demasiado pequeño para hacer una diferencia, intenta dormir con un mosquito en la habitación.",
    source: "Proverbio",
  },
} as const

export function SupportSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section id="support" className="bg-[var(--color-ink)] px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase">{t.eyebrow}</p>
            <h2 className="mt-5 max-w-5xl text-5xl leading-[0.94] font-black tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.8rem]">{t.title}</h2>
          </div>
          <p className="max-w-2xl border-l-4 border-[var(--color-nwk-blue)] pl-6 text-base leading-8 text-white/70 md:pl-8 md:text-lg">{t.body}</p>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          {donateAmounts.map((amount, i) => (
            <motion.div key={amount} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link href="/donate" locale={locale} className="flex min-h-28 items-center justify-between border-2 border-white px-6 py-5 text-white transition-colors hover:border-[var(--color-action-orange)] hover:bg-[var(--color-action-orange)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <span className="text-4xl font-black tracking-[-0.05em] md:text-5xl">{amount}</span>
                <span aria-hidden="true" className="text-2xl">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <blockquote className="max-w-4xl text-2xl leading-tight font-bold tracking-[-0.025em] text-white/90 md:text-4xl">“{t.quote}”</blockquote>
            <p className="mt-4 text-xs font-bold tracking-[0.2em] text-white/45 uppercase">{t.source}</p>
          </div>
          <div className="flex gap-5 text-xs font-bold tracking-[0.08em] text-white/55 uppercase">
            <a href="https://www.instagram.com/proyectoindigoazul/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
            <a href="https://www.facebook.com/nwkidsorg" target="_blank" rel="noreferrer" className="transition hover:text-white">Facebook</a>
            <a href="https://www.linkedin.com/company/nwkids/" target="_blank" rel="noreferrer" className="transition hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  )
}
