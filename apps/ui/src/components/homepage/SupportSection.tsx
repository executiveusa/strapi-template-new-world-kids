"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const donateAmounts = ["$25", "$50", "$100"]
const copy = {
  en: {
    eyebrow: "The first-year goal",
    title: "Help 12 Seattle young people reach a real opportunity.",
    body: "Over our first year, New World Kids will work directly with 12 young people and help each one move from an interest to a real next step. Your support helps cover outreach, transportation, project materials, mentor support, applications, follow-up, and hands-on urban gardening work when we need to build the pathway ourselves.",
    quote: "If you ever think you're too small to make a difference, try going to sleep with a mosquito in the room.",
    source: "Proverb",
  },
  es: {
    eyebrow: "La meta del primer año",
    title: "Ayuda a 12 jóvenes de Seattle a llegar a una oportunidad real.",
    body: "Durante nuestro primer año, New World Kids trabajará directamente con 12 jóvenes y ayudará a cada uno a pasar de un interés a un siguiente paso real. Tu apoyo ayuda a cubrir alcance, transporte, materiales, apoyo de mentores, solicitudes, seguimiento y trabajo práctico de jardinería urbana cuando tengamos que construir el camino nosotros mismos.",
    quote: "Si alguna vez piensas que eres demasiado pequeño para hacer una diferencia, intenta dormir con un mosquito en la habitación.",
    source: "Proverbio",
  },
} as const

export function SupportSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section id="support" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">{t.body}</p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {donateAmounts.map((amount, i) => (
            <motion.div key={amount} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/donate" locale={locale} className="inline-flex min-w-28 items-center justify-center rounded-full border border-[var(--color-accent-coral)] bg-[var(--color-accent-coral)] px-8 py-4 font-serif text-2xl font-semibold text-white transition-colors hover:bg-[var(--color-accent-coral-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-coral)]">{amount}</Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-4 text-sm text-[var(--color-text-muted)]">
          <a href="https://www.instagram.com/proyectoindigoazul/" target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-text-primary)]">Instagram</a>
          <a href="https://www.facebook.com/nwkidsorg" target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-text-primary)]">Facebook</a>
          <a href="https://www.linkedin.com/company/nwkids/" target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-text-primary)]">LinkedIn</a>
        </div>
        <div className="mt-14 text-center">
          <blockquote className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-[var(--color-text-primary)] italic md:text-5xl">“{t.quote}”</blockquote>
          <p className="mt-4 text-xs tracking-[0.2em] text-[var(--color-text-muted)] uppercase">{t.source}</p>
        </div>
      </div>
    </section>
  )
}
