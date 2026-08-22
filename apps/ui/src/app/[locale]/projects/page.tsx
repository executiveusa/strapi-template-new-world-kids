import type { Metadata } from "next"
import type { Locale } from "next-intl"

const copy = {
  en: {
    eyebrow: "Our projects",
    title: "Two places. One idea.",
    body: "New World Kids runs two projects that put the same idea to work in two different communities.",
    metaTitle: "Projects | New World Kids",
    metaDescription:
      "New World Kids' two projects — Indigo Azul in Puerto Vallarta and the First 12 in Seattle.",
    left: {
      eyebrow: "Puerto Vallarta",
      title: "Indigo Azul",
      body: "Details for Proyecto Indigo Azul are coming soon to this page.",
      placeholder: "Project details coming soon.",
    },
    right: {
      eyebrow: "Seattle",
      title: "First 12",
      body: "Details for the First 12 pilot are coming soon to this page.",
      placeholder: "Project details coming soon.",
    },
  },
  es: {
    eyebrow: "Nuestros proyectos",
    title: "Dos lugares. Una misma idea.",
    body: "New World Kids lleva a cabo dos proyectos que ponen la misma idea a trabajar en dos comunidades distintas.",
    metaTitle: "Proyectos | New World Kids",
    metaDescription:
      "Los dos proyectos de New World Kids — Indigo Azul en Puerto Vallarta y los Primeros 12 en Seattle.",
    left: {
      eyebrow: "Puerto Vallarta",
      title: "Indigo Azul",
      body: "Los detalles de Proyecto Indigo Azul estarán disponibles pronto en esta página.",
      placeholder: "Detalles del proyecto próximamente.",
    },
    right: {
      eyebrow: "Seattle",
      title: "Primeros 12",
      body: "Los detalles del piloto de los Primeros 12 estarán disponibles pronto en esta página.",
      placeholder: "Detalles del proyecto próximamente.",
    },
  },
} as const

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function ProjectsPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <main className="bg-[var(--color-bg)]">
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.95] font-black tracking-[-0.05em] text-[var(--color-text-primary)] sm:text-6xl md:text-7xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] md:text-xl">
            {t.body}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 border-t border-[var(--color-border-subtle)] md:grid-cols-2">
        <article className="flex min-h-[420px] flex-col justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-ink)] px-6 py-16 text-white md:border-r md:border-b-0 md:px-10 md:py-24">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-white/60 uppercase">
              {t.left.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl leading-[0.95] font-black tracking-[-0.045em] sm:text-5xl md:text-6xl">
              {t.left.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/70 md:text-lg">
              {t.left.body}
            </p>
          </div>
          <div className="mt-12 flex min-h-[160px] items-center justify-center border border-dashed border-white/25 text-center text-sm font-semibold tracking-[0.05em] text-white/45 uppercase">
            {t.left.placeholder}
          </div>
        </article>

        <article className="flex min-h-[420px] flex-col justify-between bg-[var(--color-nwk-blue)] px-6 py-16 text-white md:px-10 md:py-24">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-white/65 uppercase">
              {t.right.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl leading-[0.95] font-black tracking-[-0.045em] sm:text-5xl md:text-6xl">
              {t.right.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80 md:text-lg">
              {t.right.body}
            </p>
          </div>
          <div className="mt-12 flex min-h-[160px] items-center justify-center border border-dashed border-white/30 text-center text-sm font-semibold tracking-[0.05em] text-white/60 uppercase">
            {t.right.placeholder}
          </div>
        </article>
      </section>
    </main>
  )
}
