"use client"

import Link from "next/link"
import { useLocale } from "next-intl"

const copy = {
  en: {
    eyebrow: "Built for teams doing too much by hand",
    title: "Spend less time chasing the work. More time on the mission that matters.",
    bodyOne:
      "We know what it is like to run mission-driven work with a small team. Grants have to be found. Donors need updates. Reports need to get written. Websites need attention. Follow-ups get missed. We started building systems to solve those problems for ourselves. Now we help other teams do the same.",
    bodyTwo:
      "The goal is not more software. It is fewer things your team has to remember, repeat, copy, chase, or do by hand.",
    cta: "Tell us what's eating your time →",
    problems: "Problems we remove",
    outcomes: [
      {
        title: "Stop spending hours hunting for grants",
        body: "We help find, sort, and track opportunities so your team can spend its time deciding what is worth pursuing instead of searching databases.",
      },
      {
        title: "Stop rewriting the same story five times",
        body: "Turn approved photos, notes, and program updates into material you can reuse for donors, reports, fundraising, and your website.",
      },
      {
        title: "Stop relying on somebody to remember everything",
        body: "We build simple follow-ups, reminders, and handoffs around recurring work so fewer things disappear between people.",
      },
      {
        title: "Stop answering the same questions over and over",
        body: "Your website should make it easy for donors, partners, and supporters to understand what you do, what you need, and how to act.",
      },
    ],
  },
  es: {
    eyebrow: "Hecho para equipos que todavía hacen demasiado a mano",
    title: "Menos tiempo persiguiendo tareas. Más tiempo en la misión que importa.",
    bodyOne:
      "Sabemos lo que es llevar trabajo con propósito con un equipo pequeño. Hay que encontrar subvenciones. Los donantes necesitan noticias. Los informes hay que escribirlos. El sitio web necesita atención. Los seguimientos se olvidan. Empezamos a construir sistemas para resolver esos problemas en nuestro propio trabajo. Ahora ayudamos a otros equipos a hacer lo mismo.",
    bodyTwo:
      "La meta no es tener más software. Es que tu equipo tenga menos cosas que recordar, repetir, copiar, perseguir o hacer a mano.",
    cta: "Cuéntanos qué te está quitando tiempo →",
    problems: "Problemas que quitamos del camino",
    outcomes: [
      {
        title: "Deja de pasar horas buscando subvenciones",
        body: "Ayudamos a encontrar, ordenar y dar seguimiento a oportunidades para que tu equipo decida qué vale la pena perseguir en vez de pasar horas buscando en bases de datos.",
      },
      {
        title: "Deja de reescribir la misma historia cinco veces",
        body: "Convierte fotos, notas y actualizaciones aprobadas en material reutilizable para donantes, informes, recaudación y tu sitio web.",
      },
      {
        title: "Deja de depender de que alguien recuerde todo",
        body: "Creamos seguimientos, recordatorios y entregas simples alrededor del trabajo recurrente para que menos cosas se pierdan entre personas.",
      },
      {
        title: "Deja de responder las mismas preguntas una y otra vez",
        body: "Tu sitio web debe facilitar que donantes, socios y personas que apoyan entiendan qué haces, qué necesitas y cómo pueden actuar.",
      },
    ],
  },
} as const

export function StudioSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en
  const href = `/${locale}/work-with-us`

  return (
    <section
      id="studio"
      className="border-t border-[var(--color-border-subtle)] bg-[#14120f] px-6 py-24 text-[#f7f2e8] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              {t.eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
              {t.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#c9c1b5]">
              {t.bodyOne}
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#c9c1b5]">
              {t.bodyTwo}
            </p>
            <Link
              href={href}
              className="mt-8 inline-flex rounded-full bg-[var(--color-accent-coral)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-coral-hover)]"
            >
              {t.cta}
            </Link>
          </div>

          <div className="border-t border-white/15 lg:border-t-0 lg:border-l lg:pl-12">
            <p className="pt-8 text-xs tracking-[0.22em] text-[#c9a84c] uppercase lg:pt-0">
              {t.problems}
            </p>
            <div className="mt-2 divide-y divide-white/15">
              {t.outcomes.map((outcome) => (
                <div key={outcome.title} className="py-6 first:pt-4">
                  <h3 className="text-base font-semibold text-[#f7f2e8]">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b8b0a4]">
                    {outcome.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
