import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Pathways & Projects",
    title: "Four pathways. One goal.",
    body: "We start with what a young person already cares about and connect it to real work, an experienced mentor, and a next step.",
    metaTitle: "Pathways & Projects | New World Kids",
    metaDescription:
      "Explore the four New World Kids pathways: Built for Good, Beyond the Game, Ground Up, and Make Your Mark.",
    pathways: [
      {
        name: "Built for Good",
        category: "Technology",
        what: "Participants solve a real digital problem for a nonprofit, community group, or social-purpose business.",
        examples: "Websites, simple digital tools, automations, event systems, content systems, and community resources.",
        leaves: "Paid experience, portfolio work, a mentor reference, and real client/project experience.",
        need: "A real digital problem, a mentor, and a partner willing to let a participant contribute to useful work.",
      },
      {
        name: "Beyond the Game",
        category: "Sports",
        what: "We use existing sports environments rather than creating another league, exposing participants to the work and economy around the game.",
        examples: "Coaching support, media, photography, events, operations, wellness, stats, sponsorship, and content.",
        leaves: "A paid role where applicable, a mentor, industry exposure, documented experience, and a next opportunity.",
        need: "Teams, coaches, events, media groups, sports businesses, or organizations with real roles participants can support.",
      },
      {
        name: "Ground Up",
        category: "Urban Gardening + Food Systems",
        what: "Participants build practical experience through food systems, sustainability, construction, technology, and stewardship.",
        examples: "A first flagship concept is a compact Hydroponic Community Grow Station hosted by a school, community center, church, housing complex, food bank, garden, or nonprofit.",
        leaves: "Hands-on project experience, documented skills, a mentor relationship, and a pathway into food systems, sustainability, or related work.",
        need: "A host site, project mentor, space, materials, and a real community need the project can serve.",
      },
      {
        name: "Make Your Mark",
        category: "Art",
        what: "This is not an art class. The model is Restore → Design → Create.",
        examples: "Graffiti removal, site cleanup, wall preparation, community design, murals or installations, and documentation.",
        leaves: "Paid work where applicable, a completed public-facing project, portfolio proof, a mentor reference, and a next opportunity.",
        need: "A site that needs restoration, a creative mentor, community input, and permission to complete visible work.",
      },
    ],
    labels: {
      what: "What it is",
      examples: "Example projects",
      leaves: "What the participant leaves with",
      need: "What we need from a partner",
      action: "Bring us an opportunity →",
    },
    proofEyebrow: "Where the idea became real",
    proofTitle: "Proyecto Indigo Azul · Puerto Vallarta, Mexico",
    proofBody:
      "Indigo Azul gave us a place to observe what happens when learning is tied to responsibility, environment, and community. Young people showed up because the work was real, visible, and connected to daily life.",
    proofClose: "Seattle will look different. The principle stays the same.",
    proofAction: "See the Indigo Azul field archive →",
  },
  es: {
    eyebrow: "Caminos y proyectos",
    title: "Cuatro caminos. Una meta.",
    body: "Empezamos con algo que ya le importa a un joven y lo conectamos con trabajo real, un mentor con experiencia y un siguiente paso.",
    metaTitle: "Caminos y proyectos | New World Kids",
    metaDescription:
      "Conoce los cuatro caminos de New World Kids: Built for Good, Beyond the Game, Ground Up y Make Your Mark.",
    pathways: [
      {
        name: "Built for Good",
        category: "Tecnología",
        what: "Los participantes resuelven un problema digital real para una organización comunitaria, sin fines de lucro o de propósito social.",
        examples: "Sitios web, herramientas digitales simples, automatizaciones, sistemas para eventos, contenido y recursos comunitarios.",
        leaves: "Experiencia pagada, trabajo de portafolio, referencia de mentor y experiencia real con clientes o proyectos.",
        need: "Un problema digital real, un mentor y un aliado dispuesto a integrar al participante en trabajo útil.",
      },
      {
        name: "Beyond the Game",
        category: "Deportes",
        what: "Usamos entornos deportivos existentes en lugar de crear otra liga, mostrando el trabajo y la economía alrededor del juego.",
        examples: "Apoyo de entrenamiento, medios, fotografía, eventos, operaciones, bienestar, estadísticas, patrocinio y contenido.",
        leaves: "Un rol pagado cuando corresponda, mentoría, exposición a la industria, experiencia documentada y una siguiente oportunidad.",
        need: "Equipos, entrenadores, eventos, grupos de medios, negocios deportivos u organizaciones con roles reales que puedan apoyar.",
      },
      {
        name: "Ground Up",
        category: "Jardinería urbana + sistemas alimentarios",
        what: "Los participantes adquieren experiencia práctica en alimentos, sostenibilidad, construcción, tecnología y cuidado comunitario.",
        examples: "Un primer concepto insignia es una estación hidropónica comunitaria compacta en una escuela, centro comunitario, iglesia, complejo de vivienda, banco de alimentos, jardín u organización sin fines de lucro.",
        leaves: "Experiencia práctica, habilidades documentadas, relación con un mentor y un camino hacia sistemas alimentarios, sostenibilidad o trabajo relacionado.",
        need: "Un sitio anfitrión, mentor de proyecto, espacio, materiales y una necesidad comunitaria real.",
      },
      {
        name: "Make Your Mark",
        category: "Arte",
        what: "No es una clase de arte. El modelo es Restaurar → Diseñar → Crear.",
        examples: "Remoción de grafiti, limpieza, preparación de muros, diseño comunitario, murales o instalaciones y documentación.",
        leaves: "Trabajo pagado cuando corresponda, un proyecto público terminado, evidencia de portafolio, referencia de mentor y una siguiente oportunidad.",
        need: "Un sitio que necesite restauración, mentor creativo, participación comunitaria y permiso para completar trabajo visible.",
      },
    ],
    labels: {
      what: "Qué es",
      examples: "Proyectos de ejemplo",
      leaves: "Qué se lleva el participante",
      need: "Qué necesitamos de un aliado",
      action: "Tráenos una oportunidad →",
    },
    proofEyebrow: "Dónde la idea se volvió real",
    proofTitle: "Proyecto Indigo Azul · Puerto Vallarta, México",
    proofBody:
      "Indigo Azul nos dio un lugar para observar qué ocurre cuando el aprendizaje se conecta con responsabilidad, entorno y comunidad. Los jóvenes participaron porque el trabajo era real, visible y conectado con la vida diaria.",
    proofClose: "Seattle se verá diferente. El principio sigue siendo el mismo.",
    proofAction: "Ver el archivo de campo de Indigo Azul →",
  },
} as const

export async function generateMetadata({ params }: { readonly params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function ProjectsPage({ params }: { readonly params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <main className="bg-[var(--color-bg)]">
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-5xl leading-[0.95] font-black tracking-[-0.05em] text-[var(--color-text-primary)] sm:text-6xl md:text-7xl">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)] md:text-xl">{t.body}</p>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        {t.pathways.map((pathway, index) => (
          <article key={pathway.name} className="border-b border-[var(--color-border-subtle)] px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-[var(--color-action-orange)] uppercase">0{index + 1} · {pathway.category}</p>
                  <h2 className="mt-5 text-4xl leading-[0.95] font-black tracking-[-0.045em] text-[var(--color-text-primary)] sm:text-5xl md:text-6xl">{pathway.name}</h2>
                </div>
                <p className="max-w-3xl text-lg leading-8 text-[var(--color-text-muted)] md:text-xl">{pathway.what}</p>
              </div>

              <div className="mt-12 grid gap-px bg-[var(--color-border-subtle)] md:grid-cols-3">
                <div className="bg-[var(--color-bg)] p-6 md:p-8">
                  <p className="text-xs font-bold tracking-[0.15em] text-[var(--color-nwk-blue)] uppercase">{t.labels.examples}</p>
                  <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{pathway.examples}</p>
                </div>
                <div className="bg-[var(--color-bg)] p-6 md:p-8">
                  <p className="text-xs font-bold tracking-[0.15em] text-[var(--color-nwk-blue)] uppercase">{t.labels.leaves}</p>
                  <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{pathway.leaves}</p>
                </div>
                <div className="bg-[var(--color-bg)] p-6 md:p-8">
                  <p className="text-xs font-bold tracking-[0.15em] text-[var(--color-nwk-blue)] uppercase">{t.labels.need}</p>
                  <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{pathway.need}</p>
                </div>
              </div>

              <a href="mailto:info@nwkids.org" className="mt-8 inline-flex text-sm font-bold text-[var(--color-text-primary)] underline decoration-black/30 underline-offset-8 hover:decoration-black">{t.labels.action}</a>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-[var(--color-nwk-blue)] px-6 py-24 text-white md:px-10 md:py-32">
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
    </main>
  )
}