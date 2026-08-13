"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Two programs. One practical framework.",
    title: "Learn by doing.",
    body: "Two places, same idea: young people learn practical skills by working on real projects.",
    timeline: "See the documented timeline ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · practical life-skills program",
        body: "Culture Shock brings practical life skills into mentorship, art, sports, and urban agriculture.",
        href: "/blog",
        action: "Read the field notes",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · food forest demonstration site",
        body: "A food forest demonstration site where Food, Water, Energy, and Shelter are practiced in the same place.",
        href: "/gallery",
        action: "See the field gallery",
      },
    ],
  },
  es: {
    eyebrow: "Dos programas. Un marco práctico.",
    title: "Aprender haciendo.",
    body: "Dos lugares, una misma idea: los jóvenes aprenden habilidades prácticas trabajando en proyectos reales.",
    timeline: "Ver la cronología documentada ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · programa de habilidades prácticas",
        body: "Culture Shock integra habilidades prácticas con mentoría, arte, deportes y agricultura urbana.",
        href: "/blog",
        action: "Leer las notas de campo",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · sitio demostrativo de bosque de alimentos",
        body: "Un sitio demostrativo donde Alimento, Agua, Energía y Refugio se practican en un mismo lugar.",
        href: "/gallery",
        action: "Ver la galería de campo",
      },
    ],
  },
} as const

export function ProgramsSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section
      id="programs"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.26em] text-[var(--color-eyebrow)] uppercase">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            {t.body}
          </p>
        </div>

        <div className="mt-14 grid border-y border-[var(--color-border-subtle)] lg:grid-cols-2">
          {t.programs.map((program, index) => (
            <motion.article
              key={program.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
              className={[
                "flex min-h-[360px] flex-col justify-between py-10 lg:p-12",
                index === 0
                  ? "border-b border-[var(--color-border-subtle)] lg:border-r lg:border-b-0"
                  : "",
              ].join(" ")}
            >
              <div>
                <p className="text-xs tracking-[0.22em] text-[var(--color-eyebrow)] uppercase">
                  {program.eyebrow}
                </p>
                <h3 className="mt-5 max-w-xl font-serif text-3xl font-semibold leading-tight text-[var(--color-text-primary)] md:text-4xl">
                  {program.name}
                </h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
                  {program.body}
                </p>
              </div>

              <Link
                href={program.href}
                locale={locale}
                className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--color-sage)] transition hover:text-[var(--color-text-primary)]"
              >
                {program.action}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/#timeline"
            locale={locale}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-gold)]/50 underline-offset-8 transition hover:decoration-[var(--color-gold)]"
          >
            {t.timeline}
          </Link>
        </div>
      </div>
    </section>
  )
}
