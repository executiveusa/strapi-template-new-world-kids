"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    problemEyebrow: "The problem",
    problemTitle: "Knowing what you're interested in doesn't always tell you what to do with it.",
    problemBody: "A young person may love basketball, drawing, growing food, or something completely different and still have no idea how that interest connects to work, education, or a future opportunity.",
    problemClose: "Sometimes the missing piece is simple: someone gives them a chance to participate, expects something from them, and helps them figure out what comes next.",
    howEyebrow: "How it works",
    howTitle: "Start with the young person, then put that interest to work.",
    steps: [
      ["1", "Start with what they care about", "What are they interested in? What would they actually like to try? What is getting in the way?"],
      ["2", "Give them something useful to do", "That might mean helping build a garden, documenting a community event, working on a mural, helping with a sports project, or taking on another useful role."],
      ["3", "Work alongside someone who knows the field", "A coach, artist, grower, organizer, or other experienced adult helps them learn through the work."],
      ["4", "Stay involved when barriers show up", "New World Kids stays involved with transportation, applications, school, scheduling, communication, and other things that can keep a young person from moving forward."],
      ["5", "Leave with something to point to", "By the end, the young person should be able to say, ‘I worked on that,’ and have a clearer idea of what they want to do next."],
    ],
    firstEyebrow: "The First 12",
    firstTitle: "We're starting with 12 young people in Seattle over the first year.",
    firstBody: "They will come in through interests like sports, art, and urban gardening and take part in projects where their work matters. Each young person will have an adult working alongside them, a role they are responsible for, and a next step we can follow up on.",
    firstNote: "Starting with 12 gives us room to pay attention. We want to learn what actually helps a young person keep moving and where they tend to get stuck.",
    frontsEyebrow: "Where they can start",
    frontsTitle: "Start with what they already care about.",
    frontsIntro: "We're beginning with sports, art, and urban gardening because they give young people different ways to participate. The activity isn't the point by itself. What matters is giving the young person responsibility, helping them learn through the work, and making sure the experience leads somewhere.",
    fronts: [
      ["Sports", "A young person might help with a team, event, coaching activity, media project, health project, or work behind the scenes."],
      ["Art", "A young person might work on a mural, design project, photography, storytelling, public art, event, or portfolio piece."],
      ["Urban Gardening", "A young person might help build or maintain a garden, grow food, work on landscaping, improve a community space, or learn stewardship skills."],
    ],
    supportEyebrow: "The project is only part of the work",
    supportTitle: "We work on the project and the next step at the same time.",
    supportBody: "A young person might be helping build a garden, create a mural, organize an event, or work on a community project. At the same time, they may need help getting there, showing up consistently, applying for a job, finishing school, putting together a portfolio, or deciding what they want to try next. New World Kids works on both.",
    supportClose: "The project gives the young person experience. Our job is to help make sure that experience leads somewhere.",
    proofEyebrow: "What we measure",
    proofTitle: "Did the young person actually move forward?",
    proofBody: "We want to know whether the young person showed up, contributed to something, learned something useful, and had a next step afterward. If they didn't move forward, we want to understand why.",
    partnerEyebrow: "For partners",
    partnerTitle: "Work with the First 12.",
    partnerBody: "We're looking for Seattle organizations, businesses, artists, coaches, growers, and community groups with useful work young people can take part in. That might mean a project site, someone willing to teach a skill, equipment, an internship, a job lead, or simply a problem a young person can help solve. New World Kids stays involved with the young person instead of making an introduction and disappearing.",
    partnerAction: "Bring us a project",
    mexicoEyebrow: "What we learned in Puerto Vallarta",
    mexicoTitle: "Proyecto Indigo Azul gave us an early look at learning through work that matters.",
    mexicoBody: "In Puerto Vallarta, the work has centered on food, land, and community. Seattle will look different. The First 12 starts with sports, art, and urban gardening. The common idea is simple: young people learn differently when they are trusted with responsibility and can see the result of what they did.",
    mexicoAction: "See Proyecto Indigo Azul",
  },
  es: {
    problemEyebrow: "El problema",
    problemTitle: "Saber qué te interesa no siempre te dice qué hacer con ello.",
    problemBody: "Un joven puede amar el básquetbol, dibujar, cultivar alimentos o algo totalmente distinto y aun así no saber cómo conectar ese interés con trabajo, educación o una oportunidad futura.",
    problemClose: "A veces falta algo sencillo: que alguien le dé la oportunidad de participar, espere algo de su trabajo y le ayude a descubrir qué sigue.",
    howEyebrow: "Cómo funciona",
    howTitle: "Empezamos con el joven y luego ponemos ese interés a trabajar.",
    steps: [
      ["1", "Empezar con lo que le importa", "¿Qué le interesa? ¿Qué le gustaría probar de verdad? ¿Qué se está interponiendo?"],
      ["2", "Darle algo útil que hacer", "Puede ser ayudar a construir un jardín, documentar un evento comunitario, trabajar en un mural, apoyar un proyecto deportivo o asumir otro papel útil."],
      ["3", "Trabajar junto a alguien con experiencia", "Un entrenador, artista, cultivador, organizador u otro adulto con experiencia le ayuda a aprender a través del trabajo."],
      ["4", "Seguir presentes cuando aparecen barreras", "New World Kids sigue involucrado con transporte, solicitudes, escuela, horarios, comunicación y otras cosas que pueden impedir que un joven avance."],
      ["5", "Terminar con algo que pueda mostrar", "Al final, el joven debería poder decir ‘yo trabajé en eso’ y tener una idea más clara de qué quiere hacer después."],
    ],
    firstEyebrow: "Los Primeros 12",
    firstTitle: "Empezamos con 12 jóvenes en Seattle durante el primer año.",
    firstBody: "Entrarán por intereses como deportes, arte y jardinería urbana y participarán en proyectos donde su trabajo importe. Cada joven tendrá un adulto trabajando a su lado, un papel del que será responsable y un siguiente paso al que podremos dar seguimiento.",
    firstNote: "Empezar con 12 nos da espacio para prestar atención. Queremos aprender qué ayuda de verdad a que un joven siga avanzando y dónde suele quedarse atascado.",
    frontsEyebrow: "Dónde pueden empezar",
    frontsTitle: "Empezamos con algo que ya les importe.",
    frontsIntro: "Comenzamos con deportes, arte y jardinería urbana porque ofrecen distintas maneras de participar. La actividad por sí sola no es el punto. Lo importante es dar responsabilidad al joven, ayudarle a aprender haciendo y asegurarnos de que la experiencia conduzca a algo más.",
    fronts: [
      ["Deportes", "Un joven puede ayudar con un equipo, evento, actividad de entrenamiento, proyecto de medios, salud o trabajo detrás de escena."],
      ["Arte", "Un joven puede trabajar en un mural, diseño, fotografía, narración, arte público, evento o pieza de portafolio."],
      ["Jardinería urbana", "Un joven puede ayudar a construir o mantener un jardín, cultivar alimentos, trabajar en paisajismo, mejorar un espacio comunitario o aprender habilidades de cuidado del entorno."],
    ],
    supportEyebrow: "El proyecto es solo una parte del trabajo",
    supportTitle: "Trabajamos en el proyecto y en el siguiente paso al mismo tiempo.",
    supportBody: "Un joven puede estar ayudando a construir un jardín, crear un mural, organizar un evento o trabajar en un proyecto comunitario. Al mismo tiempo, quizá necesite ayuda para llegar, asistir de forma constante, solicitar un empleo, terminar la escuela, armar un portafolio o decidir qué quiere intentar después. New World Kids trabaja en ambas cosas.",
    supportClose: "El proyecto le da experiencia al joven. Nuestro trabajo es ayudar a que esa experiencia conduzca a algo más.",
    proofEyebrow: "Lo que medimos",
    proofTitle: "¿El joven realmente avanzó?",
    proofBody: "Queremos saber si el joven asistió, contribuyó a algo, aprendió algo útil y tuvo un siguiente paso después. Si no avanzó, queremos entender por qué.",
    partnerEyebrow: "Para aliados",
    partnerTitle: "Trabaja con los Primeros 12.",
    partnerBody: "Buscamos organizaciones, negocios, artistas, entrenadores, cultivadores y grupos comunitarios de Seattle con trabajo útil en el que los jóvenes puedan participar. Puede ser un sitio para un proyecto, alguien dispuesto a enseñar una habilidad, equipo, una pasantía, una oportunidad de empleo o simplemente un problema que un joven pueda ayudar a resolver. New World Kids sigue involucrado con el joven en lugar de hacer una presentación y desaparecer.",
    partnerAction: "Tráenos un proyecto",
    mexicoEyebrow: "Lo que aprendimos en Puerto Vallarta",
    mexicoTitle: "Proyecto Indigo Azul nos dio una primera mirada al aprendizaje a través de trabajo que importa.",
    mexicoBody: "En Puerto Vallarta, el trabajo se ha centrado en alimentos, tierra y comunidad. Seattle será distinto. Los Primeros 12 empiezan con deportes, arte y jardinería urbana. La idea común es sencilla: los jóvenes aprenden de otra manera cuando se les confía responsabilidad y pueden ver el resultado de lo que hicieron.",
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
          <p className="mt-4 max-w-3xl font-serif text-2xl font-semibold text-[var(--color-text-primary)]">{t.problemClose}</p>
        </div>
      </section>

      <section id="how" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.howEyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.howTitle}</h2>
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
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.firstTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{t.firstBody}</p>
          <p className="mt-5 max-w-3xl font-serif text-2xl leading-9 text-[var(--color-text-primary)]">{t.firstNote}</p>
        </div>
      </section>

      <section id="programs" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.frontsEyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.frontsTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{t.frontsIntro}</p>
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

      <section id="support-path" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.supportEyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.supportTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{t.supportBody}</p>
          <p className="mt-5 max-w-3xl font-serif text-2xl leading-9 text-[var(--color-text-primary)]">{t.supportClose}</p>
        </div>
      </section>

      <section id="results" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.proofEyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.proofTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{t.proofBody}</p>
        </div>
      </section>

      <section id="partners" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10 md:py-28">
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
