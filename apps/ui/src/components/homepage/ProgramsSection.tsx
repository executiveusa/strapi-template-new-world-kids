"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Two communities. Different needs.",
    title: "Start with what matters here.",
    body: "The Culture Shock program starts small with interests young people already care about: sports, art, and urban gardening. We connect those interests to mentors, real community projects, and paid opportunities so youth build skills, confidence, and something they can actually show. The first 12 in Seattle will prove the model; our Indigo Azul Project in Puerto Vallarta shows the larger vision of what place-based learning can become.",
    timeline: "See the documented timeline ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · Art + Sports + Opportunity",
        body: "Culture Shock is our Seattle pilot. We use sports, art and urban gardening to help underserved youth discover what they're good at, connect to paid opportunities, and work on projects that make a difference in their own community. Paint the mural. Produce the game. Grow the garden. Build something you can show.",
        href: "/blog",
        action: "See how Culture Shock works",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · Land + Food + Community",
        body: "Proyecto Indigo Azul is a working food forest and learning site. We're building a demonstration center to empower youth and work on real problems around food, water, energy and shelter.",
        href: "/gallery",
        action: "See the field gallery",
      },
    ],
  },
  es: {
    eyebrow: "Dos comunidades. Necesidades diferentes.",
    title: "Empezamos con lo que importa aquí.",
    body: "El programa Culture Shock empieza con intereses que ya les importan a los jóvenes: deportes, arte y jardinería urbana. Conectamos esos intereses con mentores, proyectos comunitarios reales y oportunidades pagadas para que desarrollen habilidades, confianza y algo que realmente puedan mostrar. Los primeros 12 en Seattle pondrán a prueba el modelo; nuestro Proyecto Indigo Azul en Puerto Vallarta muestra la visión más amplia de lo que puede llegar a ser el aprendizaje basado en un lugar real.",
    timeline: "Ver la cronología documentada ↓",
    programs: [
      {
        name: "Culture Shock",
        eyebrow: "Seattle · Arte + Deportes + Oportunidad",
        body: "Culture Shock es nuestro programa piloto en Seattle. Usamos deportes, arte y jardinería urbana para ayudar a jóvenes con menos acceso a oportunidades a descubrir en qué son buenos, conectarse con oportunidades pagadas y trabajar en proyectos que marcan una diferencia en su propia comunidad. Pinta el mural. Produce el juego. Cultiva el jardín. Construye algo que puedas mostrar.",
        href: "/blog",
        action: "Ver cómo funciona Culture Shock",
      },
      {
        name: "Proyecto Indigo Azul",
        eyebrow: "Puerto Vallarta · Tierra + Alimentos + Comunidad",
        body: "Proyecto Indigo Azul es un bosque de alimentos y sitio de aprendizaje en funcionamiento. Estamos construyendo un centro de demostración para empoderar a jóvenes y trabajar en problemas reales alrededor de alimentos, agua, energía y vivienda.",
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
