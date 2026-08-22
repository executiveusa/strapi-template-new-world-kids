"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    problemEyebrow: "The problem",
    problemTitle: "Knowing what you're interested in doesn't always tell you what to do with it.",
    problemBody: "Often, the challenge isn't a lack of talent or ambition. It's that many young people are navigating important life decisions without the guidance, support, and opportunities that help turn their interests into positive futures. Every day we see talented youth who may love basketball, drawing, growing food, or something completely different, but have no idea how that interest connects to work, education, or a future opportunity.",
    problemClose: "Sometimes the missing piece is simple: someone gives them a chance to participate, expects something from them, and stays with them through the process to help them find what comes next.",
    howEyebrow: "How it works",
    howTitle: "We start by understanding the interest, removing the blockers, and then matching it with paid opportunities and personal mentors.",
    steps: [
      ["1", "Lead with what they care about", "What are they already interested in? What would they actually like to try? What is getting in the way?"],
      ["2", "Give them something meaningful to do", "That might mean helping build a garden, documenting a community event, working on a mural, helping with a sports project, or taking on another useful role."],
      ["3", "Work alongside someone who knows the field", "A coach, artist, grower, organizer, or other experienced adult helps them learn through the work."],
      ["4", "Stay involved when barriers show up", "We help remove blockers like transportation, applications, challenges with court, school, scheduling, communication, and other potential challenges that can keep them from moving forward."],
      ["5", "Leave with something to point to", "When the program or project is completed, each of the 12 should be able to say, ‘I worked on that. I learned this,’ and have a clear idea of what's next and the bridge to get there."],
    ],
    firstEyebrow: "The First 12",
    firstTitle: "We saw the potential of place-based learning through our work in Puerto Vallarta.",
    firstBody: "We want to bring that same concept home to empower youth in our community. We currently have mentors for sports, art, and urban gardening. We are seeking and creating projects where their work and talents translate to impact in their own lives and in their communities. Every participant is assigned a mentor, a role they are responsible for, and a next step we can follow up on after the project or program is completed.",
    firstNote: "Starting with 12 gives us room to pay attention. We want to learn what actually helps keep a student moving and where they tend to get stuck.",
    frontsEyebrow: "Where they can start",
    frontsTitle: "Start with what they already care about.",
    frontsIntro: "We're beginning with sports, art, and urban gardening because they give young people different ways to participate. The activity isn't the point by itself. What matters is giving them responsibility, a way to earn an income, and making sure the experience leads somewhere they actually want to go.",
    fronts: [
      ["Sports", "Youth might help with a team, event, coaching activity, media project, health project, or simply work behind the scenes."],
      ["Art", "Seattle has a huge existing art culture. Community restoration murals, design projects, photography, storytelling, and public art events are all possible pathways to inspire a young artist to follow their dreams and find paid work using their talents."],
      ["Urban Gardening", "We seek to work with existing garden programs, teach hydroponics, work on landscaping, improve a vacant community space, or learn stewardship skills."],
    ],
    supportEyebrow: "These projects and programs are only part of the work",
    supportTitle: "The underlying mentorship and life skills they learn are the core part of our philosophy.",
    supportBody: "We open our doors to youth who have had challenges with the juvenile system, foster care, homelessness, and a lack of positive role models. Our programs give the opportunities, and our mentors lead by example to show them why it matters.",
    supportClose: "After the programs are complete, we stay involved to make sure that the full experience leads somewhere positive.",
    proofEyebrow: "What we measure",
    proofTitle: "Did they actually move forward?",
    proofBody: "We want to know whether they showed up, contributed to something, learned something useful, and had a next step afterward. If they didn't move forward, we want to understand why.",
    partnerEyebrow: "For partners",
    partnerTitle: "Help us create the First 12.",
    partnerBody: "We're looking for Seattle organizations, businesses, artists, coaches, growers, and community groups with useful work young people can take part in. That might mean a project site, someone willing to teach a skill, equipment, an internship, a job lead, or simply a problem we can help solve. New World Kids stays involved, provides the support, and makes sure the youth have the resources needed for the desired outcome.",
    partnerAction: "Bring us a project",
    mexicoEyebrow: "What we learned in Puerto Vallarta",
    mexicoTitle: "Proyecto Indigo Azul gave us an early look at learning through work that matters.",
    mexicoBody: "In Puerto Vallarta, the work has centered on food, land, and community. Kids from our community there showed up every day simply because they found it engaging, useful, and fun. Seattle will look different — the First 12 here starts with sports, art, and urban gardening. But the common idea is simple: students learn differently when they are trusted with responsibility and the result of what they did impacts their daily lives.",
    mexicoAction: "See Proyecto Indigo Azul",
  },
  es: {
    problemEyebrow: "El problema",
    problemTitle: "Saber qué te interesa no siempre te dice qué hacer con ello.",
    problemBody: "A menudo, el reto no es falta de talento ni de ambición. Es que muchos jóvenes están tomando decisiones de vida importantes sin la guía, el apoyo y las oportunidades que ayuden a convertir sus intereses en un futuro positivo. Todos los días vemos jóvenes talentosos a quienes puede encantarles el básquetbol, dibujar, cultivar alimentos u otra cosa totalmente distinta, pero que no saben cómo conectar ese interés con el trabajo, la educación o una oportunidad futura.",
    problemClose: "A veces falta algo sencillo: que alguien le dé la oportunidad de participar, espere algo de su trabajo y se quede con él durante el proceso para ayudarle a descubrir qué sigue.",
    howEyebrow: "Cómo funciona",
    howTitle: "Empezamos por entender el interés, eliminar los obstáculos y luego lo relacionamos con oportunidades pagadas y mentores personales.",
    steps: [
      ["1", "Empezar con lo que le importa", "¿Qué le interesa? ¿Qué le gustaría probar de verdad? ¿Qué se está interponiendo?"],
      ["2", "Darle algo significativo que hacer", "Puede ser ayudar a construir un jardín, documentar un evento comunitario, trabajar en un mural, apoyar un proyecto deportivo o asumir otro papel útil."],
      ["3", "Trabajar junto a alguien con experiencia", "Un entrenador, artista, cultivador, organizador u otro adulto con experiencia le ayuda a aprender a través del trabajo."],
      ["4", "Seguir presentes cuando aparecen barreras", "Ayudamos a eliminar obstáculos como transporte, solicitudes, dificultades con la corte, la escuela, horarios, comunicación y otros posibles desafíos que pueden impedirles avanzar."],
      ["5", "Terminar con algo que pueda mostrar", "Cuando el programa o proyecto termina, cada uno de los 12 debería poder decir ‘yo trabajé en eso, aprendí esto’ y tener una idea clara de qué sigue y el puente para llegar ahí."],
    ],
    firstEyebrow: "Los Primeros 12",
    firstTitle: "Vimos el potencial del aprendizaje basado en el lugar a través de nuestro trabajo en Puerto Vallarta.",
    firstBody: "Queremos traer ese mismo concepto a casa para impulsar a los jóvenes de nuestra comunidad. Actualmente tenemos mentores de deportes, arte y jardinería urbana. Buscamos y creamos proyectos donde su trabajo y su talento se traducen en impacto en sus propias vidas y en sus comunidades. A cada participante se le asigna un mentor, un papel del que es responsable y un siguiente paso al que podemos dar seguimiento una vez que el proyecto o programa termina.",
    firstNote: "Empezar con 12 nos da espacio para prestar atención. Queremos aprender qué ayuda de verdad a que un estudiante siga avanzando y dónde suele quedarse atascado.",
    frontsEyebrow: "Dónde pueden empezar",
    frontsTitle: "Empezamos con algo que ya les importe.",
    frontsIntro: "Comenzamos con deportes, arte y jardinería urbana porque ofrecen distintas maneras de participar. La actividad por sí sola no es el punto. Lo importante es darles responsabilidad, una forma de generar ingresos y asegurarnos de que la experiencia los lleve a donde realmente quieren llegar.",
    fronts: [
      ["Deportes", "Los jóvenes pueden ayudar con un equipo, evento, actividad de entrenamiento, proyecto de medios, proyecto de salud o simplemente trabajar detrás de escena."],
      ["Arte", "Seattle tiene una enorme cultura artística ya existente. Murales de restauración comunitaria, proyectos de diseño, fotografía, narración, arte público y eventos son posibles caminos para inspirar a un joven artista a seguir sus sueños y encontrar trabajo remunerado usando su talento."],
      ["Jardinería urbana", "Buscamos trabajar con programas de jardines existentes, enseñar hidroponía, trabajar en paisajismo, mejorar un espacio comunitario vacante o aprender habilidades de cuidado del entorno."],
    ],
    supportEyebrow: "Estos proyectos y programas son solo una parte del trabajo",
    supportTitle: "La mentoría y las habilidades para la vida que aprenden son el núcleo de nuestra filosofía.",
    supportBody: "Abrimos nuestras puertas a jóvenes que han enfrentado dificultades con el sistema juvenil, hogares de acogida, falta de vivienda y falta de modelos positivos a seguir. Nuestros programas dan las oportunidades, y nuestros mentores predican con el ejemplo para mostrarles por qué importa.",
    supportClose: "Una vez que los programas terminan, seguimos involucrados para asegurarnos de que toda la experiencia los lleve a algo positivo.",
    proofEyebrow: "Lo que medimos",
    proofTitle: "¿Realmente avanzó?",
    proofBody: "Queremos saber si asistió, contribuyó a algo, aprendió algo útil y tuvo un siguiente paso después. Si no avanzó, queremos entender por qué.",
    partnerEyebrow: "Para aliados",
    partnerTitle: "Ayúdanos a crear los Primeros 12.",
    partnerBody: "Buscamos organizaciones, negocios, artistas, entrenadores, cultivadores y grupos comunitarios de Seattle con trabajo útil en el que los jóvenes puedan participar. Puede ser un sitio para un proyecto, alguien dispuesto a enseñar una habilidad, equipo, una pasantía, una oportunidad de empleo o simplemente un problema que podamos ayudar a resolver. New World Kids sigue involucrado, brinda el apoyo y se asegura de que los jóvenes tengan los recursos necesarios para el resultado deseado.",
    partnerAction: "Tráenos un proyecto",
    mexicoEyebrow: "Lo que aprendimos en Puerto Vallarta",
    mexicoTitle: "Proyecto Indigo Azul nos dio una primera mirada al aprendizaje a través de trabajo que importa.",
    mexicoBody: "En Puerto Vallarta, el trabajo se ha centrado en alimentos, tierra y comunidad. Los niños de nuestra comunidad ahí se presentaban todos los días simplemente porque lo encontraban interesante, útil y divertido. Seattle se verá distinto: los Primeros 12 aquí empiezan con deportes, arte y jardinería urbana. Pero la idea común es sencilla: los estudiantes aprenden de otra manera cuando se les confía responsabilidad y el resultado de lo que hicieron impacta su vida diaria.",
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
            <div aria-hidden="true" className="select-none text-[6rem] leading-[0.72] font-black tracking-[-0.1em] text-[var(--color-nwk-blue)] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem]">12</div>
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
