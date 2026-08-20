"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const donateAmounts = ["$25", "$50", "$100"]
const copy = {
  en: {
    eyebrow: "Seattle is next",
    title: "Help fund the first Seattle cohort.",
    body: "We're building the next Culture Shock pilot for 12 young people. Your donation helps us get the cohort funded and ready to run.",
  },
  es: {
    eyebrow: "Seattle es el siguiente paso",
    title: "Ayuda a financiar el primer grupo de Seattle.",
    body: "Estamos preparando el próximo piloto de Culture Shock para 12 jóvenes. Tu donación nos ayuda a financiar el grupo y dejarlo listo para comenzar.",
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
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight font-semibold text-[var(--color-text-primary)] md:text-6xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            {t.body}
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
        <div className="mt-10 flex justify-center gap-4 text-sm text-[var(--color-text-muted)]">
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
    </section>
  )
}
