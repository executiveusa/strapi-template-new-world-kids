"use client"

import Link from "next/link"
import { useLocale } from "next-intl"

const copy = {
  en: {
    eyebrow: "Services for mission-driven teams",
    title: "Stop losing your week to admin.",
    bodyOne:
      "We build practical systems around the work that steals time from the mission: grant research, reporting, donor updates, content publishing, and website upkeep.",
    bodyTwo:
      "The outcome is simple: less hunting, copying, chasing, and re-entering information. More time running programs, raising money, and doing the work people came to you for.",
    cta: "See what we can take off your plate →",
    problems: "Problems we solve",
    outcomes: [
      {
        title: "Find better-fit grants faster",
        body: "Automate grant research and organize opportunities before your team loses hours searching databases by hand.",
      },
      {
        title: "Turn field work into donor-ready proof",
        body: "Reuse approved photos, notes, and updates across reports, pages, and campaigns instead of rewriting the same story from scratch.",
      },
      {
        title: "Keep recurring admin moving",
        body: "Automate handoffs, reminders, reporting, and publishing so fewer tasks depend on someone remembering to push them forward.",
      },
      {
        title: "Make your website do the explaining",
        body: "Build a clear public site that answers donor and partner questions before they become another email or meeting.",
      },
    ],
  },
  es: {
    eyebrow: "Servicios para equipos con misión",
    title: "Deja de perder tu semana en tareas administrativas.",
    bodyOne:
      "Construimos sistemas prácticos para el trabajo que le quita tiempo a la misión: investigación de subvenciones, informes, actualizaciones para donantes, publicación de contenido y mantenimiento del sitio web.",
    bodyTwo:
      "El resultado es simple: menos tiempo buscando, copiando, persiguiendo pendientes y volviendo a ingresar información. Más tiempo ejecutando programas, recaudando fondos y haciendo el trabajo principal.",
    cta: "Ver qué podemos quitarte de encima →",
    problems: "Problemas que resolvemos",
    outcomes: [
      {
        title: "Encontrar subvenciones adecuadas más rápido",
        body: "Automatiza la investigación de subvenciones y organiza oportunidades antes de perder horas buscando manualmente en bases de datos.",
      },
      {
        title: "Convertir el trabajo de campo en evidencia para donantes",
        body: "Reutiliza fotos, notas y actualizaciones aprobadas en informes, páginas y campañas sin reescribir la misma historia cada vez.",
      },
      {
        title: "Mantener en movimiento las tareas recurrentes",
        body: "Automatiza entregas, recordatorios, informes y publicación para que menos tareas dependan de que alguien recuerde impulsarlas.",
      },
      {
        title: "Hacer que tu sitio web explique el trabajo",
        body: "Construye un sitio público claro que responda preguntas de donantes y socios antes de que se conviertan en otro correo o reunión.",
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
