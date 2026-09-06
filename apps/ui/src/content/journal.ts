export type JournalLocale = "en" | "es"

export type JournalSection = {
  heading?: string
  paragraphs: readonly string[]
}

export type JournalPost = {
  slug: string
  date: string
  category: "Lesson" | "Field Note" | "Community"
  tags: readonly string[]
  sourceLabel: string
  en: {
    title: string
    dek: string
    sections: readonly JournalSection[]
  }
  es: {
    title: string
    dek: string
    sections: readonly JournalSection[]
  }
}

export const journalPosts: readonly JournalPost[] = [
  {
    slug: "interest-before-curriculum",
    date: "2026-09-06",
    category: "Lesson",
    tags: ["First 12", "mentorship", "learning"],
    sourceLabel: "New World Kids study notes",
    en: {
      title: "Start with interest, not curriculum.",
      dek: "Attention changes when the work begins with something a young person already cares about.",
      sections: [
        {
          paragraphs: [
            "A pathway works better when it starts with a real interest instead of asking a young person to care about a program first.",
            "The sequence is simple: interest → project → mentor → next step. The project makes the interest useful. The mentor adds support and accountability. The next step keeps the relationship from ending when the first task is finished.",
          ],
        },
        {
          heading: "What this changes",
          paragraphs: [
            "The goal is not to manufacture motivation. It is to notice what is already there and connect it to useful work, income where available, proof they can show, and a person who stays involved.",
          ],
        },
      ],
    },
    es: {
      title: "Empezar con el interés, no con el currículo.",
      dek: "La atención cambia cuando el trabajo comienza con algo que ya le importa a una persona joven.",
      sections: [
        {
          paragraphs: [
            "Un camino funciona mejor cuando comienza con un interés real, en lugar de pedirle a una persona joven que primero se interese por un programa.",
            "La secuencia es simple: interés → proyecto → mentor → siguiente paso. El proyecto vuelve útil el interés. El mentor aporta apoyo y responsabilidad. El siguiente paso evita que la relación termine cuando acaba la primera tarea.",
          ],
        },
        {
          heading: "Qué cambia",
          paragraphs: [
            "La meta no es fabricar motivación. Es reconocer la que ya existe y conectarla con trabajo útil, ingresos cuando sea posible, evidencia que puedan mostrar y una persona que siga involucrada.",
          ],
        },
      ],
    },
  },
  {
    slug: "show-the-work-before-asking-for-trust",
    date: "2026-09-06",
    category: "Lesson",
    tags: ["proof", "trust", "build in public"],
    sourceLabel: "Proyecto Indigo Azul + New World Kids field notes",
    en: {
      title: "Show the work before asking for trust.",
      dek: "Proof is stronger than a promise when people can see what actually happened.",
      sections: [
        {
          paragraphs: [
            "A polished claim is easy to make. A visible body of work is harder to fake.",
            "That is why New World Kids keeps the archive close to the story. Proyecto Indigo Azul, Seattle, the First 12, mentors, projects, progress, setbacks, and next steps should be documented as separate facts—not blended into one convenient history.",
          ],
        },
        {
          heading: "The rule",
          paragraphs: [
            "Use media for what it actually proves. Nature can show continuity and place. Youth and community footage can show participation or interest when that is what occurred. Seattle footage should only represent Seattle activity after it is verified.",
          ],
        },
      ],
    },
    es: {
      title: "Mostrar el trabajo antes de pedir confianza.",
      dek: "La evidencia es más fuerte que una promesa cuando las personas pueden ver lo que realmente ocurrió.",
      sections: [
        {
          paragraphs: [
            "Es fácil hacer una afirmación pulida. Es mucho más difícil fingir un cuerpo de trabajo visible.",
            "Por eso New World Kids mantiene el archivo cerca de la historia. Proyecto Indigo Azul, Seattle, los Primeros 12, mentores, proyectos, avances, tropiezos y próximos pasos deben documentarse como hechos separados, no mezclarse en una sola historia conveniente.",
          ],
        },
        {
          heading: "La regla",
          paragraphs: [
            "Usar cada material para lo que realmente demuestra. La naturaleza puede mostrar continuidad y lugar. El material de jóvenes y comunidad puede mostrar participación o interés cuando eso fue lo que ocurrió. El material de Seattle solo debe representar actividad de Seattle después de ser verificado.",
          ],
        },
      ],
    },
  },
  {
    slug: "food-water-energy-shelter",
    date: "2026-09-06",
    category: "Field Note",
    tags: ["Indigo Azul", "resilience", "place"],
    sourceLabel: "Proyecto Indigo Azul field framework",
    en: {
      title: "Food. Water. Energy. Shelter.",
      dek: "Four ordinary needs can become a practical way to teach capability, stewardship, and resilience.",
      sections: [
        {
          paragraphs: [
            "The core four are not an abstract sustainability slogan. They are a way to ask practical questions: Can you grow something useful? Can you understand where water comes from and how to conserve it? Can you work with simple energy systems? Can you help create and care for a safe place?",
            "Proyecto Indigo Azul has been a long-running place to observe these questions in the real world. The lesson for New World Kids is not that Seattle should copy the same environment. It is that useful learning becomes easier to understand when it is attached to real places, real constraints, and visible work.",
          ],
        },
      ],
    },
    es: {
      title: "Alimentos. Agua. Energía. Refugio.",
      dek: "Cuatro necesidades comunes pueden convertirse en una forma práctica de enseñar capacidad, cuidado y resiliencia.",
      sections: [
        {
          paragraphs: [
            "Los cuatro elementos básicos no son un eslogan abstracto de sostenibilidad. Son una forma de hacer preguntas prácticas: ¿Puedes cultivar algo útil? ¿Puedes entender de dónde viene el agua y cómo conservarla? ¿Puedes trabajar con sistemas sencillos de energía? ¿Puedes ayudar a crear y cuidar un lugar seguro?",
            "Proyecto Indigo Azul ha sido un lugar de largo plazo para observar estas preguntas en el mundo real. La lección para New World Kids no es que Seattle deba copiar el mismo entorno. Es que el aprendizaje útil se entiende mejor cuando está conectado con lugares reales, límites reales y trabajo visible.",
          ],
        },
      ],
    },
  },
  {
    slug: "beyond-the-game",
    date: "2026-09-06",
    category: "Lesson",
    tags: ["sports", "work", "mentorship"],
    sourceLabel: "New World Kids pathway study notes",
    en: {
      title: "The opportunity around the game matters too.",
      dek: "Sports can reveal an entire working economy, not only a path to becoming an athlete.",
      sections: [
        {
          paragraphs: [
            "A gym, team, court, tournament, or training program contains more work than what happens during the game. Coaching, media, photography, events, operations, wellness, statistics, sponsorship, design, and content all create real roles.",
            "For a young person who already cares about sports, that surrounding economy can become the bridge from interest to useful experience.",
          ],
        },
        {
          heading: "Beyond the Game",
          paragraphs: [
            "The point is not to create another league. It is to help people see the work that already exists around something they care about, then make a real introduction to it.",
          ],
        },
      ],
    },
    es: {
      title: "La oportunidad alrededor del juego también importa.",
      dek: "El deporte puede revelar toda una economía de trabajo, no solo un camino para convertirse en atleta.",
      sections: [
        {
          paragraphs: [
            "Un gimnasio, equipo, cancha, torneo o programa de entrenamiento contiene mucho más trabajo que lo que ocurre durante el juego. Entrenamiento, medios, fotografía, eventos, operaciones, bienestar, estadísticas, patrocinio, diseño y contenido crean roles reales.",
            "Para una persona joven que ya se interesa por el deporte, esa economía alrededor del juego puede convertirse en el puente entre interés y experiencia útil.",
          ],
        },
        {
          heading: "Más allá del juego",
          paragraphs: [
            "La idea no es crear otra liga. Es ayudar a las personas a ver el trabajo que ya existe alrededor de algo que les importa y después crear una introducción real a ese trabajo.",
          ],
        },
      ],
    },
  },
  {
    slug: "technology-should-build-capability",
    date: "2026-09-06",
    category: "Community",
    tags: ["technology", "AI literacy", "community"],
    sourceLabel: "New World Kids community technology study notes",
    en: {
      title: "Technology should make a community more capable.",
      dek: "The useful question is not whether a tool is impressive. It is whether more people can do meaningful work because it exists.",
      sections: [
        {
          paragraphs: [
            "AI, automation, websites, sensors, and digital tools are most valuable when they increase local capability instead of creating another layer of dependency.",
            "That can mean helping a community organization solve a real digital problem, giving a young person portfolio work, improving access to information, or making a local system easier to operate and understand.",
          ],
        },
        {
          heading: "A simple test",
          paragraphs: [
            "After the technology is introduced, can the people around it understand more, make better decisions, and do more useful work themselves? If the answer is no, the system may be sophisticated without being helpful.",
          ],
        },
      ],
    },
    es: {
      title: "La tecnología debe hacer que una comunidad sea más capaz.",
      dek: "La pregunta útil no es si una herramienta impresiona. Es si más personas pueden hacer trabajo con sentido gracias a ella.",
      sections: [
        {
          paragraphs: [
            "La IA, la automatización, los sitios web, los sensores y las herramientas digitales son más valiosos cuando aumentan la capacidad local en lugar de crear otra capa de dependencia.",
            "Eso puede significar ayudar a una organización comunitaria a resolver un problema digital real, darle a una persona joven trabajo de portafolio, mejorar el acceso a información o hacer que un sistema local sea más fácil de operar y entender.",
          ],
        },
        {
          heading: "Una prueba sencilla",
          paragraphs: [
            "Después de introducir la tecnología, ¿las personas a su alrededor entienden más, toman mejores decisiones y pueden hacer más trabajo útil por sí mismas? Si la respuesta es no, el sistema puede ser sofisticado sin ser realmente útil.",
          ],
        },
      ],
    },
  },
] as const

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug)
}

export function getJournalCopy(post: JournalPost, locale: string) {
  return locale === "es" ? post.es : post.en
}
