"use client"

import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    problemEyebrow: "The problem",
    problemTitle: "Knowing what you're interested in doesn't always tell you what to do with it.",
    problemBody: "Often, the challenge isn't a lack of talent or ambition. It's that many young people are navigating important life decisions without the guidance, support, and opportunities that help them turn their interests into positive futures. Every day we see talented youth who may love basketball, drawing, growing food, or something completely different, but have no idea how that interest connects to work, education, or a future opportunity. There are also underlying circumstances that lead them into poor decision-making, peer pressure, and environments that can create long-term consequences.",
    problemClose: "Sometimes the missing piece is simple: someone gives them a chance to participate, expects something from them, and stays with them through the process to help them find what comes next.",
    howEyebrow: "How it works",
    howTitle: "We start by understanding the interest, removing the blockers, and then matching it with paid opportunities and personal mentors.",
    steps: [
      ["1", "Lead with what they care about", "What are they already interested in? What would they actually like to try? What is getting in the way?"],
      ["2", "Give them something meaningful to do", "That might mean helping build a garden, documenting a community event, working on a mural, helping with a sports project, or taking on another useful role."],
      ["3", "Work alongside someone who knows the field", "A coach, artist, grower, organizer, or other experienced adult helps them learn through the work."],
      ["4", "Stay involved when barriers show up", "We help remove blockers like transportation, applications, challenges with court, school, scheduling, communication, and many other things that can keep them from moving forward."],
      ["5", "Leave with something to point to", "By the end, each of the 12 should be able to say, ‘I worked on that,’ and have a clearer idea of what they want to do next and the bridge to get there."],
    ],
    firstEyebrow: "The First 12",
    firstTitle: "We proved the potential of placed learning with our Puerto Vallarta project.",
    firstBody: "We want to bring that same concept home to empower youth in our community. We currently have mentors for sports, art, and urban gardening. We find or create projects where their work matters and they get to use their talents. Every student is assigned a mentor, a role they are responsible for, and a next step we can follow up on after the project or program is completed.",
    firstNote: "Starting with 12 gives us room to pay attention. We want to learn what actually helps keep a student moving and where they tend to get stuck.",
    frontsEyebrow: "Where they can start",
    frontsTitle: "Start with what they already care about.",
    frontsIntro: "We're beginning with sports, art, and urban gardening because they give young people different ways to participate. The activity isn't the point by itself. What matters is giving them responsibility, a way to earn an income, and making sure the experience leads somewhere they actually want to go.",
    fronts: [
      ["Sports", "Youth might help with a team, event, coaching activity, media project, health project, or simply work behind the scenes."],
      ["Art", "Seattle has a huge existing art culture. Community restoration murals, design projects, photography, storytelling, and public art events are all possible pathways to inspire a young artist to follow their dreams and earn a respectable wage with their talents."],
      ["Urban Gardening", "The Pacific Northwest is home to some of the most diverse agriculture opportunities on the west coast. We seek to work with existing garden programs, teach hydroponics, work on landscaping, improve a vacant community space, or learn stewardship skills."],
    ],
    supportEyebrow: "These projects and programs are only part of the work",
    supportTitle: "The underlying mentorship and life skills they learn are the core part of our philosophy.",
    supportBody: "We open our doors to youth who have had challenges with the juvenile system, foster care, homelessness, and a lack of positive role models. Our programs give the opportunities, and our mentors lead by example to show them why it matters.",
    supportClose: "After the programs are complete, we stay involved to make sure that the full experience leads somewhere positive.",
    proofEyebrow: "What we measure",
    proofTitle: "Did the student actually move forward?",
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
    problemBody: "A menudo, el reto no es falta de talento ni de ambición. Es que muchos jóvenes están tomando decisiones de vida importantes sin la guía, el apoyo y las oportunidades que les ayuden a convertir sus intereses en un futuro positivo. Todos los días vemos jóvenes talentosos a quienes puede encantarles el básquetbol, dibujar, cultivar alimentos u otra cosa totalmente distinta, pero que no saben cómo conectar ese interés con el trabajo, la educación o una oportunidad futura. También existen circunstancias de fondo que los llevan a tomar malas decisiones, ceder a la presión de sus pares y elegir entornos que pueden traer consecuencias a largo plazo.",
    problemClose: "A veces falta algo sencillo: que alguien le dé la oportunidad de participar, espere algo de su trabajo y se quede con él durante el proceso para ayudarle a descubrir qué sigue.",
    howEyebrow: "Cómo funciona",
    howTitle: "Empezamos por entender el interés, eliminar los obstáculos y luego lo relacionamos con oportunidades pagadas y mentores personales.",
    steps: [
      ["1", "Empezar con lo que le importa", "¿Qué le interesa? ¿Qué le gustaría probar de verdad? ¿Qué se está interponiendo?"],
      ["2", "Darle algo significativo que hacer", "Puede ser ayudar a construir un jardín, documentar un evento comunitario, trabajar en un mural, apoyar un proyecto deportivo o asumir otro papel útil."],
      ["3", "Trabajar junto a alguien con experiencia", "Un entrenador, artista, cultivador, organizador u otro adulto con experiencia le ayuda a aprender a través del trabajo."],
      ["4", "Seguir presentes cuando aparecen barreras", "Ayudamos a eliminar obstáculos como transporte, solicitudes, dificultades con la corte, la escuela, horarios, comunicación y muchas otras cosas que pueden impedirles avanzar."],
      ["5", "Terminar con algo que pueda mostrar", "Al final, cada uno de los 12 debería poder decir ‘yo trabajé en eso’ y tener una idea más clara de qué quiere hacer después y el puente para llegar ahí."],
    ],
    firstEyebrow: "Los Primeros 12",
    firstTitle: "Comprobamos el potencial del aprendizaje aplicado con nuestro proyecto en Puerto Vallarta.",
    firstBody: "Queremos traer ese mismo concepto a casa para impulsar a los jóvenes de nuestra comunidad. Actualmente tenemos mentores de deportes, arte y jardinería urbana. Encontramos o creamos proyectos donde su trabajo importa y pueden usar su talento. A cada estudiante se le asigna un mentor, un papel del que es responsable y un siguiente paso al que podemos dar seguimiento una vez que el proyecto o programa termina.",
    firstNote: "Empezar con 12 nos da espacio para prestar atención. Queremos aprender qué ayuda de verdad a que un estudiante siga avanzando y dónde suele quedarse atascado.",
    frontsEyebrow: "Dónde pueden empezar",
    frontsTitle: "Empezamos con algo que ya les importe.",
    frontsIntro: "Comenzamos con deportes, arte y jardinería urbana porque ofrecen distintas maneras de participar. La actividad por sí sola no es el punto. Lo importante es darles responsabilidad, una forma de generar ingresos y asegurarnos de que la experiencia los lleve a donde realmente quieren llegar.",
    fronts: [
      ["Deportes", "Los jóvenes pueden ayudar con un equipo, evento, actividad de entrenamiento, proyecto de medios, proyecto de salud o simplemente trabajar detrás de escena."],
      ["Arte", "Seattle tiene una enorme cultura artística ya existente. Murales de restauración comunitaria, proyectos de diseño, fotografía, narración, arte público y eventos son posibles caminos para inspirar a un joven artista a seguir sus sueños y ganar un salario digno con su talento."],
      ["Jardinería urbana", "El Pacífico Noroeste tiene algunas de las oportunidades agrícolas más diversas de la costa oeste. Buscamos trabajar con programas de jardines existentes, enseñar hidroponía, trabajar en paisajismo, mejorar un espacio comunitario vacante o aprender habilidades de cuidado del entorno."],
    ],
    supportEyebrow: "Estos proyectos y programas son solo una parte del trabajo",
    supportTitle: "La mentoría y las habilidades para la vida que aprenden son el núcleo de nuestra filosofía.",
    supportBody: "Abrimos nuestras puertas a jóvenes que han enfrentado dificultades con el sistema juvenil, hogares de acogida, falta de vivienda y falta de modelos positivos a seguir. Nuestros programas dan las oportunidades, y nuestros mentores predican con el ejemplo para mostrarles por qué importa.",
    supportClose: "Una vez que los programas terminan, seguimos involucrados para asegurarnos de que toda la experiencia los lleve a algo positivo.",
    proofEyebrow: "Lo que medimos",
    proofTitle: "¿El estudiante realmente avanzó?",
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
