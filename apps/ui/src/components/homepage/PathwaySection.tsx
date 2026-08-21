"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    problemEyebrow: "The problem",
    problemTitle: "Knowing what you like is not the same as knowing what to do next.",
    problemBody: "A young person may love sports, art, or growing food. The hard part is knowing where to go, who to talk to, how to get started, and what comes after that.",
    problemClose: "That is the gap we are working on.",
    howEyebrow: "How it works",
    howTitle: "We help build the bridge.",
    steps: [
      ["1", "Start with the young person", "What are you interested in? What would you like to try or get better at?"],
      ["2", "Find the opportunity", "We look for real people, programs, projects, training, work, or experiences that match."],
      ["3", "Help make the connection", "We help with the introduction, application, follow-up, or next step."],
      ["4", "Stay involved", "We do not just hand someone a link and disappear. We follow the path and see what happens."],
      ["5", "Learn where the path breaks", "If young people keep getting stuck in the same place, that tells us what New World Kids needs to help solve."],
    ],
    firstEyebrow: "The First 12",
    firstTitle: "12 young people. One year. Real pathways.",
    firstBody: "We are starting small on purpose. During our first year, New World Kids will work directly with 12 young people in Seattle and help each one move from an interest to a real opportunity.",
    firstNote: "At the end of the year, we should know where young people actually get stuck — and what New World Kids should build around.",
    frontsEyebrow: "Three front doors",
    frontsTitle: "Start with what you already care about.",
    fronts: [
      ["Sports", "Connect interests in sports to coaches, mentors, projects, training, and career pathways."],
      ["Art", "Connect creative interests to working artists, public projects, portfolios, and paid opportunities."],
      ["Urban Gardening", "Connect young people to real food-growing and stewardship projects — and build hands-on community projects directly where the pathway is missing."],
    ],
    proofEyebrow: "What we measure",
    proofTitle: "Did the young person actually move forward?",
    proofBody: "We track what they cared about, what opportunity they found, what got in the way, whether they participated, what they completed, and what happened next.",
    partnerEyebrow: "For partners",
    partnerTitle: "Already creating opportunities for young people?",
    partnerBody: "We do not want to recreate what already works. If you have a place where one of the First 12 could learn, contribute, build, work, or grow, we want to know about it.",
    partnerAction: "Become a pathway partner",
    mexicoEyebrow: "What we already know",
    mexicoTitle: "Hands-on learning changes when the work is real.",
    mexicoBody: "In Puerto Vallarta, Proyecto Indigo Azul has grown into a working food forest and community learning site. It showed us what can happen when the place is real, the work is real, and people can see the result. Seattle is where we are now testing how that same principle can help young people move from interest to opportunity.",
    mexicoAction: "See Proyecto Indigo Azul",
  },
  es: {
    problemEyebrow: "El problema",
    problemTitle: "Saber lo que te gusta no es lo mismo que saber qué hacer después.",
    problemBody: "A un joven le pueden gustar los deportes, el arte o cultivar alimentos. Lo difícil es saber adónde ir, con quién hablar, cómo empezar y qué viene después.",
    problemClose: "Esa es la brecha en la que estamos trabajando.",
    howEyebrow: "Cómo funciona",
    howTitle: "Ayudamos a construir el puente.",
    steps: [
      ["1", "Empezar con el joven", "¿Qué te interesa? ¿Qué te gustaría probar o mejorar?"],
      ["2", "Encontrar la oportunidad", "Buscamos personas, programas, proyectos, capacitación, trabajo o experiencias reales que encajen."],
      ["3", "Ayudar a hacer la conexión", "Ayudamos con la presentación, solicitud, seguimiento o siguiente paso."],
      ["4", "Seguir presentes", "No entregamos un enlace y desaparecemos. Seguimos el camino y vemos qué ocurre."],
      ["5", "Aprender dónde se rompe el camino", "Si los jóvenes se atascan repetidamente en el mismo punto, eso nos dice qué debe ayudar a resolver New World Kids."],
    ],
    firstEyebrow: "Los primeros 12",
    firstTitle: "12 jóvenes. Un año. Caminos reales.",
    firstBody: "Estamos empezando en pequeño a propósito. Durante nuestro primer año, New World Kids trabajará directamente con 12 jóvenes en Seattle y ayudará a cada uno a pasar de un interés a una oportunidad real.",
    firstNote: "Al final del año, debemos saber dónde se atascan realmente los jóvenes y alrededor de qué debe construir New World Kids.",
    frontsEyebrow: "Tres puertas de entrada",
    frontsTitle: "Empieza con lo que ya te importa.",
    fronts: [
      ["Deportes", "Conectar intereses deportivos con entrenadores, mentores, proyectos, capacitación y caminos profesionales."],
      ["Arte", "Conectar intereses creativos con artistas, proyectos públicos, portafolios y oportunidades pagadas."],
      ["Jardinería urbana", "Conectar a jóvenes con proyectos reales de cultivo y cuidado del entorno, y crear proyectos comunitarios prácticos cuando falte ese camino."],
    ],
    proofEyebrow: "Lo que medimos",
    proofTitle: "¿El joven realmente avanzó?",
    proofBody: "Seguimos qué le importaba, qué oportunidad encontró, qué se interpuso, si participó, qué completó y qué ocurrió después.",
    partnerEyebrow: "Para aliados",
    partnerTitle: "¿Ya estás creando oportunidades para jóvenes?",
    partnerBody: "No queremos recrear lo que ya funciona. Si tienes un lugar donde uno de los primeros 12 pueda aprender, contribuir, construir, trabajar o crecer, queremos conocerte.",
    partnerAction: "Conviértete en aliado",
    mexicoEyebrow: "Lo que ya sabemos",
    mexicoTitle: "El aprendizaje práctico cambia cuando el trabajo es real.",
    mexicoBody: "En Puerto Vallarta, Proyecto Indigo Azul se ha convertido en un bosque de alimentos y sitio de aprendizaje comunitario en funcionamiento. Nos mostró lo que puede ocurrir cuando el lugar es real, el trabajo es real y la gente puede ver el resultado. Seattle es donde ahora estamos probando cómo ese mismo principio puede ayudar a jóvenes a pasar del interés a la oportunidad.",
    mexicoAction: "Ver Proyecto Indigo Azul",
  },
} as const

export function PathwaySection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <>
      <section id="problem" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.problemEyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">{t.problemTitle}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">{t.problemBody}</p>
          <p className="mt-4 font-serif text-2xl font-semibold text-[var(--color-text-primary)]">{t.problemClose}</p>
        </div>
      </section>

      <section id="how" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.howEyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.howTitle}</h2>
          <div className="mt-12 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
            {t.steps.map(([number, title, body]) => (
              <div key={number} className="grid gap-3 py-6 md:grid-cols-[64px_260px_1fr] md:items-start">
                <span className="font-serif text-2xl font-semibold text-[var(--color-accent-gold)]">{number}</span>
                <h3 className="font-serif text-xl font-semibold text-[var(--color-text-primary)]">{title}</h3>
                <p className="text-sm leading-7 text-[var(--color-text-muted)] md:text-base">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="first-12" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.firstEyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.firstTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{t.firstBody}</p>
          <p className="mt-5 max-w-3xl font-serif text-2xl leading-9 text-[var(--color-text-primary)]">{t.firstNote}</p>
        </div>
      </section>

      <section id="programs" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.frontsEyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.frontsTitle}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.fronts.map(([title, body]) => (
              <article key={title} className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-7">
                <h3 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.proofEyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.proofTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{t.proofBody}</p>
        </div>
      </section>

      <section id="partners" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.partnerEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-5xl">{t.partnerTitle}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">{t.partnerBody}</p>
            <a href="mailto:info@nwkids.org" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-[var(--color-accent-coral)] px-6 py-3 text-sm font-semibold text-white">{t.partnerAction} →</a>
          </div>
          <div>
            <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.mexicoEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-5xl">{t.mexicoTitle}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">{t.mexicoBody}</p>
            <Link href="/gallery" locale={locale} className="mt-7 inline-flex text-sm font-semibold text-[var(--color-sage)] underline underline-offset-6">{t.mexicoAction} →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
