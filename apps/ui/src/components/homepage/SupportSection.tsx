"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const donateOptions = [
  { amount: "$25", label: "Plant a tree", detail: "at Proyecto Indigo Azul" },
  {
    amount: "$50",
    label: "Sponsor a child",
    detail: "for one month of programs",
    featured: true,
  },
  {
    amount: "$100",
    label: "Fund language classes",
    detail: "for 4 weeks of instruction",
  },
]

export function SupportSection() {
  return (
    <section
      id="support"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
            Support the mission
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[var(--color-text-primary)] md:text-4xl">
            Choose one clear next step.
          </h2>
        </div>

        {/* Amount-anchored donation options */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {donateOptions.map((opt, i) => (
            <motion.div
              key={opt.amount}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: "var(--shadow-sm)" }}
              className="transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <Link
                href="/donate"
                className={[
                  "group relative flex h-full flex-col rounded-2xl border p-8 text-center transition-colors duration-200",
                  opt.featured
                    ? "border-[var(--color-accent-coral)] bg-[var(--color-accent-coral)]/10 hover:bg-[var(--color-accent-coral)]/20"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-sage)]/40",
                ].join(" ")}
              >
                {opt.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent-coral)] px-3 py-0.5 text-xs font-semibold text-white">
                    Most impactful
                  </span>
                )}
                <p className="font-serif text-4xl font-semibold text-[var(--color-accent-gold)]">
                  {opt.amount}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                  {opt.label}
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {opt.detail}
                </p>
                <div
                  className={[
                    "mt-4 rounded-full py-2 text-xs font-semibold transition-colors duration-200",
                    opt.featured
                      ? "bg-[var(--color-accent-coral)] text-white group-hover:bg-[var(--color-accent-coral-hover)]"
                      : "bg-[var(--color-border-subtle)] text-[var(--color-text-muted)] group-hover:bg-[var(--color-sage)]/15 group-hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  Give {opt.amount} →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Secondary CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/work-with-us"
            className="rounded-full border border-[var(--color-border-subtle)] px-8 py-3 text-sm font-semibold text-[var(--color-text-muted)] transition hover:border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]"
          >
            Volunteer
          </Link>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <a
              href="https://www.instagram.com/proyectoindigoazul/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--color-text-muted)]"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/nwkidsorg"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--color-text-muted)]"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/nwkids/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--color-text-muted)]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
