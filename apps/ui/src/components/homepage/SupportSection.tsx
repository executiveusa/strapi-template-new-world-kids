"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const donateAmounts = ["$25", "$50", "$100"]
const copy = {
  en: {
    eyebrow: "Support the mission",
    quote:
      "If you ever think you're too small to make a difference, try going to sleep with a mosquito in the room.",
    source: "Proverb",
    services: "Services",
  },
  es: {
    eyebrow: "Apoya la misión",
    quote:
      "Si alguna vez piensas que eres demasiado pequeño para hacer una diferencia, intenta dormir con un mosquito en la habitación.",
    source: "Proverbio",
    services: "Servicios",
  },
} as const

export function SupportSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section
      id="support"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
            {t.eyebrow}
          </p>
          <blockquote className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[var(--color-text-primary)] italic md:text-5xl">
            “{t.quote}”
          </blockquote>
          <p className="mt-4 text-xs tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
            {t.source}
          </p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {donateAmounts.map((amount, i) => (
            <motion.div
              key={amount}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/donate"
                locale={locale}
                className="inline-flex min-w-28 items-center justify-center rounded-full border border-[var(--color-accent-coral)] bg-[var(--color-accent-coral)] px-8 py-4 font-serif text-2xl font-semibold text-white transition-colors hover:bg-[var(--color-accent-coral-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-coral)]"
              >
                {amount}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/work-with-us"
            locale={locale}
            className="rounded-full border border-[var(--color-border-subtle)] px-8 py-3 text-sm font-semibold text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
          >
            {t.services}
          </Link>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <a
              href="https://www.instagram.com/proyectoindigoazul/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--color-text-primary)]"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/nwkidsorg"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--color-text-primary)]"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/nwkids/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--color-text-primary)]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
