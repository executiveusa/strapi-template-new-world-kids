"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Two places. One way of learning.",
    title: "Do the work. Learn from someone good.",
    body: "New World Kids gives young people real projects to work on and adults to learn from.",
    timeline: "See the documented timeline ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · youth project program",
        body: "Culture Shock starts in Seattle. Young adults work with mentors on real projects, build experience, and leave with a clearer next step.",
        href: "/blog",
        action: "Read the field notes",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · working food forest",
        body: "A working food forest and learning site where young people can learn by helping grow, build, repair, and care for the land.",
        href: "/gallery",
        action: "See the field gallery",
      },
    ],
  },
  es: {
    eyebrow: "Dos lugares. Una forma de aprender.",
    title: "Haz el trabajo. Aprende de alguien que sabe.",
    body: "New World Kids da a jóvenes proyectos reales en los que trabajar y adultos de quienes aprender.",
    timeline: "Ver la cronología documentada ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · programa de proyectos para jóvenes",
        body: "Culture Shock comienza en Seattle. Jóvenes adultos trabajan con mentores en proyectos reales, ganan experiencia y terminan con un próximo paso más claro.",
        href: "/blog",
        action: "Leer las notas de campo",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · bosque de alimentos en funcionamiento",
        body: "Un bosque de alimentos y sitio de aprendizaje donde jóvenes aprenden ayudando a cultivar, construir, reparar y cuidar la tierra.",
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
