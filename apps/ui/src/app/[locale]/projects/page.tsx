import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Projects",
    title: "Four ways to turn interest into real work.",
    body: "Different interests. Same idea: useful work, a mentor, and a next step.",
    metaTitle: "Projects | New World Kids",
    metaDescription: "Four New World Kids project pathways connecting interests to real work, mentors, and next steps.",
    pathways: [
      {
        name: "Built for Good",
        category: "Technology",
        what: "Solve a real digital problem for a community organization.",
        examples: "Websites · tools · automations · content systems",
        leaves: "Portfolio work · paid experience where available · mentor reference",
        need: "A real problem · a mentor · room to contribute",
      },
      {
        name: "Beyond the Game",
        category: "Sports",
        what: "Use sports to open doors to the work around the game.",
        examples: "Coaching · media · events · wellness · stats · content",
        leaves: "Experience · industry exposure · mentor relationship · next opportunity",
        need: "Teams · coaches · events · sports businesses with real roles",
      },
      {
        name: "Ground Up",
        category: "Food + Place",
        what: "Build practical skills through food, sustainability, construction, and stewardship.",
        examples: "Growing systems · community builds · food projects · site improvement",
        leaves: "Hands-on work · documented skills · mentor relationship",
        need: "A host site · mentor · materials · a real community need",
      },
      {
        name: "Make Your Mark",
        category: "Art",
        what: "Restore a place, design with the community, then create something visible.",
        examples: "Cleanup · wall preparation · murals · installations",
        leaves: "Completed public work · portfolio proof · mentor reference",
        need: "A site · creative mentor · community input · permission to build",
      },
    ],
    labels: {
      examples: "Examples",
      leaves: "What they leave with",
      need: "What we need",
      action: "Provide a project →",
    },
    proofEyebrow: "Where it started",
    proofTitle: "Proyecto Indigo Azul",
    proofBody: "Real work created real interest. Seattle will be different. The principle stays the same.",
    proofAction: "See the story →",
  },
  es: {
    eyebrow: "Proyectos",
    title: "Cuatro formas de convertir interés en trabajo real.",
    body: "Intereses distintos. La misma idea: trabajo útil, un mentor y un siguiente paso.",
    metaTitle: "Proyectos | New World Kids",
    metaDescription: "Cuatro caminos de proyectos que conectan intereses con trabajo real, mentores y próximos pasos.",
    pathways: [
      {
        name: "Built for Good",
        category: "Tecnología",
        what: "Resolver un problema digital real para una organización comunitaria.",
        examples: "Sitios web · herramientas · automatizaciones · sistemas de contenido",
        leaves: "Portafolio · experiencia pagada cuando exista · referencia de mentor",
        need: "Un problema real · un mentor · espacio para contribuir",
      },
      {
        name: "Beyond the Game",
        category: "Deportes",
        what: "Usar el deporte para abrir puertas al trabajo que existe alrededor del juego.",
        examples: "Entrenamiento · medios · eventos · bienestar · estadísticas · contenido",
        leaves: "Experiencia · exposición a la industria · relación con mentor · próxima oportunidad",
        need: "Equipos · entrenadores · eventos · negocios deportivos con roles reales",
      },
      {
        name: "Ground Up",
        category: "Alimentos + Lugar",
        what: "Construir habilidades prácticas con alimentos, sostenibilidad, construcción y cuidado del lugar.",
        examples: "Sistemas de cultivo · proyectos comunitarios · alimentos · mejora de espacios",
        leaves: "Trabajo práctico · habilidades documentadas · relación con mentor",
        need: "Un sitio · mentor · materiales · una necesidad comunitaria real",
      },
      {
        name: "Make Your Mark",
        category: "Arte",
        what: "Restaurar un lugar, diseñar con la comunidad y crear algo visible.",
        examples: "Limpieza · preparación de muros · murales · instalaciones",
        leaves: "Trabajo público terminado · portafolio · referencia de mentor",
        need: "Un sitio · mentor creativo · participación comunitaria · permiso para crear",
      },
    ],
    labels: {
      examples: "Ejemplos",
      leaves: "Qué se lleva",
      need: "Qué necesitamos",
      action: "Aportar un proyecto →",
    },
    proofEyebrow: "Dónde empezó",
    proofTitle: "Proyecto Indigo Azul",
    proofBody: "El trabajo real generó interés real. Seattle será diferente. El principio sigue siendo el mismo.",
    proofAction: "Ver la historia →",
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
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,10vw,6.5rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance text-[var(--color-text-primary)]">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
        </div>
      </section>

      <section className="border-t border-black/15">
        {t.pathways.map((pathway, index) => (
          <article key={pathway.name} className="border-b border-black/15 px-5 py-12 sm:px-8 md:px-10 md:py-18">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">0{index + 1} · {pathway.category}</p>
                  <h2 className="mt-3 text-[clamp(2.4rem,7vw,4.8rem)] leading-[0.94] font-black tracking-[-0.05em] text-[var(--color-text-primary)]">{pathway.name}</h2>
                </div>
                <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{pathway.what}</p>
              </div>

              <dl className="mt-8 border-t border-black/15">
                {[
                  [t.labels.examples, pathway.examples],
                  [t.labels.leaves, pathway.leaves],
                  [t.labels.need, pathway.need],
                ].map(([label, body]) => (
                  <div key={label} className="grid gap-2 border-b border-black/10 py-4 md:grid-cols-[180px_1fr] md:gap-8">
                    <dt className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{label}</dt>
                    <dd className="text-[15px] leading-6 text-[var(--color-text-muted)] sm:text-base">{body}</dd>
                  </div>
                ))}
              </dl>

              <a href="mailto:info@nwkids.org" className={`mt-7 inline-flex min-h-11 items-center border-y border-black/20 py-3 text-sm font-black text-[var(--color-text-primary)] transition-colors hover:border-black/55 ${focusRing}`}>{t.labels.action}</a>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-[#1e1a17] px-5 py-16 text-white sm:px-8 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.24em] text-white/52 uppercase sm:text-xs">{t.proofEyebrow}</p>
            <h2 className="mt-4 text-[clamp(2.6rem,8vw,5rem)] leading-[0.94] font-black tracking-[-0.05em]">{t.proofTitle}</h2>
          </div>
          <div className="border-t border-white/18 pt-5 lg:border-t-0 lg:pt-0">
            <p className="max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">{t.proofBody}</p>
            <Link href="/gallery" locale={locale} className="mt-6 inline-flex min-h-11 items-center border-y border-white/28 py-3 text-sm font-black text-white hover:border-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#1e1a17]">{t.proofAction}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
