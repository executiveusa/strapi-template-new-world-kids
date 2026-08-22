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
      <section id="problem" className="bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase">{t.problemEyebrow}</p>
            <h2 className="mt-6 max-w-5xl text-5xl leading-[0.94] font-black tracking-[-0.055em] text-[var(--color-text-primary)] sm:text-6xl md:text-7xl lg:text-[5.6rem]">{t.problemTitle}</h2>
          </div>
          <div className="border-l-4 border-[var(--color-nwk-blue)] pl-6 md:pl-8">
            <p className="text-lg leading-8 text-[var(--color-text-muted)] md:text-xl md:leading-9">{t.problemBody}</p>
            <p className="mt-8 text-2xl leading-tight font-bold tracking-[-0.02em] text-[var(--color-text-primary)] md:text-3xl">{t.problemClose}</p>
          </div>
        </div>
      </section>

      <section id="how" className="bg-[var(--color-nwk-blue)] px-6 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <p className="text-xs font-bold tracking-[0.24em] text-white/70 uppercase">{t.howEyebrow}</p>
            <h2 className="max-w-5xl text-4xl leading-[0.98] font-black tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">{t.howTitle}</h2>
          </div>
          <div className="mt-14 border-t border-white/30">
            {t.steps.map(([number, title, body]) => (
              <div key={number} className="grid gap-4 border-b border-white/30 py-7 md:grid-cols-[96px_0.8fr_1.2fr] md:items-start md:py-9">
                <span className="text-6xl leading-none font-black tracking-[-0.06em] text-white/35 md:text-7xl">{number}</span>
                <h3 className="text-xl leading-tight font-bold tracking-[-0.02em] text-white md:text-2xl">{title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/80 md:text-base md:leading-8">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="first-12" className="overflow-hidden bg-white px-6 py-24 text-[var(--color-ink)] md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase">{t.firstEyebrow}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div aria-hidden="true" className="select-none text-[10rem] leading-[0.72] font-black tracking-[-0.1em] text-[var(--color-nwk-blue)] sm:text-[14rem] md:text-[18rem] lg:text-[22rem]">12</div>
            <h2 className="pb-3 text-4xl leading-[0.98] font-black tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">{t.firstTitle}</h2>
          </div>
          <div className="mt-12 grid gap-8 border-t-2 border-[var(--color-ink)] pt-8 md:grid-cols-2 md:gap-16">
            <p className="text-lg leading-8 text-black/70 md:text-xl md:leading-9">{t.firstBody}</p>
            <p className="text-2xl leading-tight font-bold tracking-[-0.025em] md:text-3xl">{t.firstNote}</p>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-[var(--color-ink)] py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase">{t.frontsEyebrow}</p>
          <h2 className="mt-5 max-w-5xl text-5xl leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl md:text-7xl">{t.frontsTitle}</h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">{t.frontsIntro}</p>
        </div>
        <div className="mt-14 border-y border-white/20">
          {t.fronts.map(([title, body], index) => (
            <article key={title} className="group border-b border-white/20 last:border-b-0">
              <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-[100px_0.8fr_1.2fr] md:items-center md:px-10 md:py-14">
                <span className="text-sm font-bold tracking-[0.2em] text-white/35">0{index + 1}</span>
                <h3 className="text-4xl leading-none font-black tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">{title}</h3>
                <p className="max-w-2xl text-base leading-8 text-white/65 md:text-lg">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="support-path" className="bg-[var(--color-paper)] px-6 py-24 text-[var(--color-ink)] md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase">{t.supportEyebrow}</p>
          <h2 className="mt-5 max-w-5xl text-5xl leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl md:text-7xl">{t.supportTitle}</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
            <p className="max-w-2xl text-lg leading-8 text-black/70 md:text-xl md:leading-9">{t.supportBody}</p>
            <div aria-hidden="true" className="hidden text-8xl leading-none font-black text-[var(--color-nwk-blue)] lg:block">+</div>
            <p className="max-w-2xl border-t-4 border-[var(--color-action-orange)] pt-6 text-2xl leading-tight font-bold tracking-[-0.025em] md:text-3xl">{t.supportClose}</p>
          </div>
        </div>
      </section>

      <section id="results" className="bg-[var(--color-ink)] px-6 py-24 text-white md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase">{t.proofEyebrow}</p>
          <h2 className="mt-6 max-w-6xl text-5xl leading-[0.94] font-black tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.8rem]">{t.proofTitle}</h2>
          <p className="mt-10 max-w-3xl border-l-4 border-[var(--color-action-orange)] pl-6 text-lg leading-8 text-white/72 md:pl-8 md:text-xl md:leading-9">{t.proofBody}</p>
        </div>
      </section>

      <section id="partners" className="bg-white text-[var(--color-ink)]">
        <div className="grid lg:grid-cols-2">
          <div className="px-6 py-24 md:px-10 md:py-32 lg:pl-[max(2.5rem,calc((100vw-80rem)/2))] lg:pr-16">
            <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase">{t.partnerEyebrow}</p>
            <h2 className="mt-5 text-5xl leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl">{t.partnerTitle}</h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-black/65 md:text-lg">{t.partnerBody}</p>
            <a href="mailto:info@nwkids.org" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-action-orange)] px-7 py-3 text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5">{t.partnerAction} →</a>
          </div>
          <div className="bg-[var(--color-nwk-blue)] px-6 py-24 text-white md:px-10 md:py-32 lg:pl-16 lg:pr-[max(2.5rem,calc((100vw-80rem)/2))]">
            <p className="text-xs font-bold tracking-[0.24em] text-white/65 uppercase">{t.mexicoEyebrow}</p>
            <h2 className="mt-5 text-4xl leading-[0.98] font-black tracking-[-0.045em] sm:text-5xl md:text-6xl">{t.mexicoTitle}</h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 md:text-lg">{t.mexicoBody}</p>
            <Link href="/gallery" locale={locale} className="mt-9 inline-flex text-sm font-bold text-white underline decoration-white/40 underline-offset-8 hover:decoration-white">{t.mexicoAction} →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
