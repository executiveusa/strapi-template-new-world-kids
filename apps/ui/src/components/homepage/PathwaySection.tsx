"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    problemEyebrow: "The problem",
    problemTitle: "Talent is everywhere. Opportunity is not.",
    problemBody:
      "A young person may know what they care about and still have no clear way to turn it into experience, income, training, or work. That is the gap we are trying to close.",
    howEyebrow: "How it works",
    howTitle: "Interest → Project → Mentor → Next Step",
    steps: [
      ["01", "Find the interest", "Start with something the participant already cares about."],
      ["02", "Put it to work", "Connect that interest to a real project with useful responsibility."],
      ["03", "Learn beside someone", "Work alongside an experienced mentor who knows the field."],
      ["04", "Build the next step", "Finish with proof of work, follow-up, and a concrete path forward."],
    ],
    firstEyebrow: "The First 12",
    firstTitle: "The First 12",
    firstBody:
      "We're starting with 12 participants in Seattle over the first year. Each will enter a real project, work with a mentor, earn through meaningful work, and leave with something they can point to.",
    firstNote:
      "Starting small lets us pay attention to the question that matters most: did they actually move forward?",
    pathwaysEyebrow: "Four pathways",
    pathwaysTitle: "Four ways to start. One model underneath.",
    pathwaysIntro:
      "These are four entry points into the same youth-development model: paid opportunities, an experienced mentor, and a next step.",
    pathways: [
      ["01", "Built for Good", "Technology", "Solve a real digital problem for a nonprofit, community group, or social-purpose business."],
      ["02", "Beyond the Game", "Sports", "Use existing sports environments to expose participants to the work and economy around the game."],
      ["03", "Ground Up", "Urban Gardening + Food Systems", "Build practical experience through food systems, sustainability, stewardship, and hands-on community projects."],
      ["04", "Make Your Mark", "Art", "Turn restoration, design, public art, and documentation into paid work and visible community improvement."],
    ],
    pathwaysAction: "Explore the pathways →",
    mentorEyebrow: "Mentorship + follow-through",
    mentorTitle: "The project gets them in the door. The relationship helps them move forward.",
    mentorBody:
      "Projects are the vehicle. Mentorship and follow-through are the intervention. New World Kids stays involved through the work, helps remove practical barriers, documents what was completed, and follows the participant into the next step.",
    resultsEyebrow: "What we measure",
    resultsTitle: "Did they actually move forward?",
    resultsBody:
      "We keep the measurement simple and useful. The point is not activity for activity's sake; it is movement toward a stronger next step.",
    outcomes: [
      "Showed up",
      "Completed something",
      "Learned something useful",
      "Earned income where applicable",
      "A next step exists",
      "Moved into work, training, education, or another opportunity",
    ],
    proofEyebrow: "Where we started",
    proofTitle: "We saw what happens when the work is real.",
    proofBody:
      "Our Indigo Azul Project in Puerto Vallarta showed us the potential of place-based learning: people taking responsibility for real work, contributing to a place, and learning through doing.",
    proofClose: "Seattle will look different. The principle stays the same.",
    proofAction: "See the Indigo Azul field archive →",
    partnerEyebrow: "For partners",
    partnerTitle: "We're looking for projects, mentors, spaces, and partners.",
    partnerBody:
      "New World Kids operates the opportunity layer: participant and project matching, mentor support, project structure, participant experience, documentation, measurement, and follow-up. Partners can bring the real environments and opportunities.",
    partnerQuestion:
      "Do you have a real project, mentor, space, or opportunity that one of our First 12 could contribute to?",
    partnerAction: "Bring us an opportunity →",
  },
  es: {
    problemEyebrow: "El problema",
    problemTitle: "El talento está en todas partes. La oportunidad no.",
    problemBody:
      "Un joven puede saber qué le importa y aun así no tener una forma clara de convertirlo en experiencia, ingresos, capacitación o trabajo. Esa es la brecha que buscamos cerrar.",
    howEyebrow: "Cómo funciona",
    howTitle: "Interés → Proyecto → Mentor → Siguiente paso",
    steps: [
      ["01", "Encontrar el interés", "Empezar con algo que ya le importa al participante."],
      ["02", "Ponerlo a trabajar", "Conectar ese interés con un proyecto real y una responsabilidad útil."],
      ["03", "Aprender junto a alguien", "Trabajar con un mentor con experiencia en el campo."],
      ["04", "Construir el siguiente paso", "Terminar con evidencia del trabajo, seguimiento y un camino concreto."],
    ],
    firstEyebrow: "Los Primeros 12",
    firstTitle: "Los Primeros 12",
    firstBody:
      "Empezamos con 12 participantes en Seattle durante el primer año. Cada uno entrará en un proyecto real, trabajará con un mentor, ganará a través de trabajo significativo y saldrá con algo concreto que pueda mostrar.",
    firstNote:
      "Empezar con un grupo pequeño nos permite concentrarnos en la pregunta más importante: ¿realmente avanzó?",
    pathwaysEyebrow: "Cuatro caminos",
    pathwaysTitle: "Cuatro formas de empezar. Un solo modelo.",
    pathwaysIntro:
      "Son cuatro puntos de entrada al mismo modelo de desarrollo juvenil: trabajo real, un mentor con experiencia y un siguiente paso.",
    pathways: [
      ["01", "Built for Good", "Tecnología", "Resolver un problema digital real para una organización comunitaria, sin fines de lucro o de propósito social."],
      ["02", "Beyond the Game", "Deportes", "Usar entornos deportivos existentes para mostrar el trabajo y la economía alrededor del juego."],
      ["03", "Ground Up", "Jardinería urbana + sistemas alimentarios", "Crear experiencia práctica en alimentos, sostenibilidad, cuidado comunitario y proyectos reales."],
      ["04", "Make Your Mark", "Arte", "Convertir restauración, diseño, arte público y documentación en trabajo pagado y mejora comunitaria visible."],
    ],
    pathwaysAction: "Explorar los caminos →",
    mentorEyebrow: "Mentoría + seguimiento",
    mentorTitle: "El proyecto abre la puerta. La relación ayuda a avanzar.",
    mentorBody:
      "Los proyectos son el vehículo. La mentoría y el seguimiento son la intervención. New World Kids permanece involucrado, ayuda con barreras prácticas, documenta lo realizado y acompaña al participante hacia el siguiente paso.",
    resultsEyebrow: "Lo que medimos",
    resultsTitle: "¿Realmente avanzó?",
    resultsBody:
      "Mantenemos la medición sencilla y útil. El objetivo no es acumular actividades, sino lograr movimiento hacia un siguiente paso más fuerte.",
    outcomes: [
      "Asistió",
      "Completó algo",
      "Aprendió algo útil",
      "Ganó ingresos cuando correspondía",
      "Existe un siguiente paso",
      "Pasó a trabajo, capacitación, educación u otra oportunidad",
    ],
    proofEyebrow: "Dónde empezamos",
    proofTitle: "Vimos lo que ocurre cuando el trabajo es real.",
    proofBody:
      "Nuestro Proyecto Indigo Azul en Puerto Vallarta nos mostró el potencial del aprendizaje basado en el lugar: personas asumiendo responsabilidad por trabajo real, contribuyendo a un lugar y aprendiendo al hacerlo.",
    proofClose: "Seattle se verá diferente. El principio sigue siendo el mismo.",
    proofAction: "Ver el archivo de campo de Indigo Azul →",
    partnerEyebrow: "Para aliados",
    partnerTitle: "Buscamos proyectos, mentores, espacios y aliados.",
    partnerBody:
      "New World Kids opera la capa de oportunidad: conecta participantes con proyectos, apoya a mentores, estructura la experiencia, documenta, mide y da seguimiento. Los aliados pueden aportar los entornos y oportunidades reales.",
    partnerQuestion:
      "¿Tienes un proyecto real, mentor, espacio u oportunidad a la que uno de nuestros Primeros 12 pueda contribuir?",
    partnerAction: "Tráenos una oportunidad →",
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
          <p className="border-l-4 border-[var(--color-nwk-blue)] pl-6 text-lg leading-8 text-[var(--color-text-muted)] md:pl-8 md:text-xl md:leading-9">{t.problemBody}</p>
        </div>
      </section>

      <section id="how" className="bg-[var(--color-nwk-blue)] px-6 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-white/70 uppercase">{t.howEyebrow}</p>
          <h2 className="mt-5 max-w-6xl text-4xl leading-[0.98] font-black tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">{t.howTitle}</h2>
          <div className="mt-14 border-t border-white/30">
            {t.steps.map(([number, title, body]) => (
              <div key={number} className="grid gap-4 border-b border-white/30 py-7 md:grid-cols-[96px_0.8fr_1.2fr] md:items-start md:py-9">
                <span className="text-5xl leading-none font-black tracking-[-0.06em] text-white/35 md:text-6xl">{number}</span>
                <h3 className="text-xl leading-tight font-bold tracking-[-0.02em] md:text-2xl">{title}</h3>
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
            <div aria-hidden="true" className="text-[6rem] leading-[0.72] font-black tracking-[-0.1em] text-[var(--color-nwk-blue)] select-none sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem]">12</div>
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
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase">{t.pathwaysEyebrow}</p>
          <h2 className="mt-5 max-w-5xl text-5xl leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl md:text-7xl">{t.pathwaysTitle}</h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">{t.pathwaysIntro}</p>
        </div>
        <div className="mt-14 border-y border-white/20">
          {t.pathways.map(([number, name, category, body]) => (
            <article key={number} className="border-b border-white/20 last:border-b-0">
              <div className="mx-auto grid max-w-7xl gap-5 px-6 py-10 md:grid-cols-[90px_0.9fr_0.8fr_1.3fr] md:items-center md:px-10 md:py-12">
                <span className="text-sm font-bold tracking-[0.2em] text-white/35">{number}</span>
                <h3 className="text-3xl leading-none font-black tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">{name}</h3>
                <p className="text-xs font-bold tracking-[0.14em] text-[var(--color-action-orange)] uppercase">{category}</p>
                <p className="max-w-2xl text-base leading-7 text-white/65">{body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-6 md:px-10">
          <Link href="/projects" locale={locale} className="inline-flex text-sm font-bold text-white underline decoration-white/40 underline-offset-8 hover:decoration-white">{t.pathwaysAction}</Link>
        </div>
      </section>

      <section id="support-path" className="bg-[var(--color-paper)] px-6 py-24 text-[var(--color-ink)] md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase">{t.mentorEyebrow}</p>
          <h2 className="mt-5 max-w-6xl text-5xl leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl md:text-7xl">{t.mentorTitle}</h2>
          <p className="mt-10 max-w-3xl border-l-4 border-[var(--color-action-orange)] pl-6 text-lg leading-8 text-black/70 md:pl-8 md:text-xl md:leading-9">{t.mentorBody}</p>
        </div>
      </section>

      <section id="results" className="bg-[var(--color-ink)] px-6 py-24 text-white md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase">{t.resultsEyebrow}</p>
          <h2 className="mt-6 max-w-6xl text-5xl leading-[0.94] font-black tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.8rem]">{t.resultsTitle}</h2>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">{t.resultsBody}</p>
          <div className="mt-12 grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
            {t.outcomes.map((outcome) => (
              <div key={outcome} className="bg-[var(--color-ink)] px-6 py-7 text-base font-bold">{outcome}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="indigo-proof" className="bg-[var(--color-nwk-blue)] px-6 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-white/65 uppercase">{t.proofEyebrow}</p>
            <h2 className="mt-5 text-4xl leading-[0.98] font-black tracking-[-0.045em] sm:text-5xl md:text-6xl">{t.proofTitle}</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-white/80 md:text-xl md:leading-9">{t.proofBody}</p>
            <p className="mt-6 text-2xl font-black tracking-[-0.025em]">{t.proofClose}</p>
            <Link href="/gallery" locale={locale} className="mt-8 inline-flex text-sm font-bold text-white underline decoration-white/40 underline-offset-8 hover:decoration-white">{t.proofAction}</Link>
          </div>
        </div>
      </section>

      <section id="partners" className="bg-white px-6 py-24 text-[var(--color-ink)] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase">{t.partnerEyebrow}</p>
            <h2 className="mt-5 max-w-5xl text-5xl leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl md:text-7xl">{t.partnerTitle}</h2>
            <p className="mt-7 max-w-3xl text-base leading-8 text-black/65 md:text-lg">{t.partnerBody}</p>
          </div>
          <div className="border-l-4 border-[var(--color-nwk-blue)] pl-6 md:pl-8">
            <p className="text-2xl leading-tight font-bold tracking-[-0.025em] md:text-3xl">{t.partnerQuestion}</p>
            <a href="mailto:info@nwkids.org" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-action-orange)] px-7 py-3 text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5">{t.partnerAction}</a>
          </div>
        </div>
      </section>
    </>
  )
}