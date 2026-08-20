"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Two communities. Different needs.",
    title: "Start with what matters here.",
    body: "New World Kids builds around the community we're in. The setting changes, but the method stays simple: real work, good mentors, useful skills, and a next step.",
    timeline: "See the documented timeline ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · Art + Sports + Opportunity",
        body: "Art and sports are the starting point. Young people work alongside artists, coaches, mentors, businesses, and community organizations on real projects. They build skills through the work and get connected to jobs, internships, training, school, or another opportunity.",
        href: "/blog",
        action: "See how Culture Shock works",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · Land + Food + Community",
        body: "Proyecto Indigo Azul is a working food forest and learning site. Local young people learn by growing food, caring for the land, building, repairing, and taking part in projects that matter in their own community.",
        href: "/gallery",
        action: "See the field gallery",
      },
    ],
  },
  es: {
    eyebrow: "Dos comunidades. Necesidades diferentes.",
    title: "Empezamos con lo que importa aquí.",
    body: "New World Kids se adapta a la comunidad donde trabaja. El entorno cambia, pero el método sigue siendo simple: trabajo real, buenos mentores, habilidades útiles y un siguiente paso.",
    timeline: "Ver la cronología documentada ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · Arte + Deportes + Oportunidad",
        body: "El arte y los deportes son el punto de partida. Los jóvenes trabajan junto a artistas, entrenadores, mentores, empresas y organizaciones comunitarias en proyectos reales. Desarrollan habilidades haciendo el trabajo y se conectan con empleos, prácticas, capacitación, estudios u otras oportunidades.",
        href: "/blog",
        action: "Ver cómo funciona Culture Shock",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · Tierra + Alimentos + Comunidad",
        body: "Proyecto Indigo Azul es un bosque de alimentos y sitio de aprendizaje en funcionamiento. Los jóvenes locales aprenden cultivando alimentos, cuidando la tierra, construyendo, reparando y participando en proyectos que importan en su propia comunidad.",
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
