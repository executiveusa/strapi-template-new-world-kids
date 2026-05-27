import { BookOpen, Leaf, Rss } from "lucide-react"
import type { Metadata } from "next"
import type { Locale } from "next-intl"

import PageHero from "@/components/site/PageHero"
import { journalTeaser, copyForLocale } from "@/content/site"

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes, proof, and long-form stories from food, water, energy, and shelter work at New World Kids.",
}

const pillars = [
  {
    icon: Leaf,
    label: { en: "Food", es: "Alimentos" },
    teaser: {
      en: "Seasonal planting cycles, syntropic methods, and what 200+ varieties look like in practice.",
      es: "Ciclos de siembra estacionales, metodos sintropicos y como se ven mas de 200 variedades en la practica.",
    },
  },
  {
    icon: Rss,
    label: { en: "Water", es: "Agua" },
    teaser: {
      en: "Clay-pot irrigation, rain capture, and storage systems that keep the site running through dry season.",
      es: "Riego con ollas de barro, captacion de lluvia y almacenamiento para la temporada seca.",
    },
  },
  {
    icon: BookOpen,
    label: { en: "Energy", es: "Energia" },
    teaser: {
      en: "Solar, biogas, and Starlink connectivity notes from an off-grid teaching farm.",
      es: "Solar, biogas y notas de conectividad Starlink desde una granja pedagogica fuera de la red.",
    },
  },
  {
    icon: Leaf,
    label: { en: "Shelter", es: "Refugio" },
    teaser: {
      en: "Adobe restoration, dome builds, and natural building methods we teach on the 1.5-acre site.",
      es: "Restauracion de adobe, construccion de domos y metodos de bioconstruccion que ensenamos en el sitio.",
    },
  },
]

export default async function JournalPage({
  params,
}: PageProps<"/[locale]/journal">) {
  const { locale } = (await params) as { locale: Locale }

  return (
    <main className="bg-[#08110D]">
      <PageHero
        eyebrow={locale === "es" ? "Bitacora de campo" : "Field Journal"}
        title={
          locale === "es"
            ? "Notas de campo en camino."
            : "Field notes on the way."
        }
        description={copyForLocale(locale, journalTeaser)}
        aside={
          <div className="space-y-4">
            <div className="font-mono text-xs tracking-[0.18em] text-[#C9A84C] uppercase">
              {locale === "es" ? "Estado" : "Status"}
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-sm text-[#E8DEC7]/72">
                {locale === "es"
                  ? "Publicacion en preparacion"
                  : "Publishing in preparation"}
              </span>
            </div>
            <p className="text-sm leading-7 text-[#E8DEC7]/60">
              {locale === "es"
                ? "El equipo de campo documenta cada temporada. Las primeras entradas se publicaran una vez que el flujo de publicacion bilingue este activo."
                : "The field team documents every season. First entries will publish once the bilingual publishing pipeline is active."}
            </p>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-white/10 bg-white/[0.02] p-8 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <BookOpen className="h-6 w-6 text-[#C9A84C]" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-white">
            {locale === "es"
              ? "Proximas entregas del campo"
              : "Field dispatches coming soon"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#E8DEC7]/60">
            {locale === "es"
              ? "La bitacora documentara trabajo real: lo que se planto, lo que crecio, los errores honestos y las pruebas concretas de cinco temporadas en el terreno."
              : "The journal will document real work: what was planted, what grew, honest mistakes, and concrete proof from five seasons on the ground."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <div
                key={pillar.label.en}
                className="rounded-sm border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon className="h-4 w-4 text-[#C9A84C]" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.18em] text-[#C9A84C] uppercase">
                    {copyForLocale(locale, pillar.label)}
                  </span>
                </div>
                <p className="text-sm leading-7 text-[#E8DEC7]/60">
                  {copyForLocale(locale, pillar.teaser)}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
