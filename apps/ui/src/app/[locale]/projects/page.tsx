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

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg)]"

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
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,12vw,7rem)] leading-[0.9] font-black tracking-[-0.055em] text-balance text-[var(--color-text-primary)] sm:mt-5 sm:leading-[0.93]">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
        </div>
      </section>

      <section className="border-t border-black/15">
        {t.pathways.map((pathway, index) => (
          <article key={pathway.name} className="border-b border-black/15 px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-action-orange)] uppercase sm:text-xs">0{index + 1} · {pathway.category}</p>
                  <h2 className="mt-4 text-[clamp(2.5rem,9vw,5.4rem)] leading-[0.92] font-black tracking-[-0.05em] text-balance text-[var(--color-text-primary)] sm:mt-5">{pathway.name}</h2>
                </div>
                <p className="max-w-3xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 md:text-xl">{pathway.what}</p>
              </div>

              <dl className="mt-10 grid border-y border-black/15 md:mt-12 md:grid-cols-3">
                {[
                  [t.labels.examples, pathway.examples],
                  [t.labels.leaves, pathway.leaves],
                  [t.labels.need, pathway.need],
                ].map(([label, body], detailIndex) => (
                  <div key={label} className={`py-6 md:min-h-56 md:px-7 md:py-8 ${detailIndex > 0 ? "border-t border-black/15 md:border-t-0 md:border-l" : ""}`}>
                    <dt className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{label}</dt>
                    <dd className="mt-3 max-w-md text-[15px] leading-7 text-[var(--color-text-muted)] sm:text-base">{body}</dd>
                  </div>
                ))}
              </dl>

              <a href="mailto:info@nwkids.org" className={`mt-8 inline-flex min-h-11 items-center rounded-full border border-black/20 px-5 text-sm font-bold text-[var(--color-text-primary)] transition-colors duration-200 hover:border-black/50 hover:bg-black/[0.03] ${focusRing}`}>{t.labels.action}</a>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-[var(--color-nwk-blue)] px-5 py-20 text-white sm:px-8 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.24em] text-white/60 uppercase sm:text-xs">{t.proofEyebrow}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,9vw,5.4rem)] leading-[0.93] font-black tracking-[-0.05em] text-balance sm:mt-5">{t.proofTitle}</h2>
          </div>
          <div className="border-t border-white/25 pt-6 lg:border-t-0 lg:pt-0">
            <p className="text-base leading-7 text-white/78 sm:text-lg sm:leading-8 md:text-xl md:leading-9">{t.proofBody}</p>
            <p className="mt-5 text-xl font-black tracking-[-0.025em] sm:text-2xl">{t.proofClose}</p>
            <Link href="/gallery" locale={locale} className="mt-7 inline-flex min-h-11 items-center rounded-full border border-white/35 px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-nwk-blue)]">{t.proofAction}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}