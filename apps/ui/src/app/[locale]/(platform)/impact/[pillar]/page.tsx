import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Locale } from "next-intl"

import PageHero from "@/components/site/PageHero"
import { Button } from "@/components/ui/button"
import {
  copyForLocale,
  impactPillars,
  supportRails,
  type PillarSlug,
} from "@/content/site"

type PillarPageParams = {
  locale: Locale
  pillar: PillarSlug
}

export function generateStaticParams() {
  return impactPillars.flatMap((pillar) => [
    { locale: "en", pillar: pillar.slug },
    { locale: "es", pillar: pillar.slug },
  ])
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/impact/[pillar]">): Promise<Metadata> {
  const { locale, pillar } = (await params) as PillarPageParams
  const entry = impactPillars.find((item) => item.slug === pillar)

  if (!entry) {
    return {}
  }

  return {
    title: `${copyForLocale(locale, entry.title)} Impact`,
    description: copyForLocale(locale, entry.build),
  }
}

export default async function ImpactPillarPage({
  params,
}: PageProps<"/[locale]/impact/[pillar]">) {
  const { locale, pillar } = (await params) as PillarPageParams
  const entry = impactPillars.find((item) => item.slug === pillar)

  if (!entry) {
    notFound()
  }

  return (
    <main className="bg-[#08110D]">
      <PageHero
        eyebrow={copyForLocale(locale, entry.eyebrow)}
        title={copyForLocale(locale, entry.title)}
        description={`${copyForLocale(locale, entry.need)} ${copyForLocale(locale, entry.build)}`}
        aside={
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {locale === "es" ? "Forma de apoyo" : "Support path"}
            </div>
            <div className="text-sm leading-7 text-[#E8DEC7]/66">
              {locale === "es"
                ? "Las donaciones ayudan a mover este pilar de la teoria a la practica, con materiales, sistemas reales y publicacion abierta."
                : "Donations move this pillar from theory into practice with real materials, real systems, and open reporting."}
            </div>
            <a href={supportRails.donorbox}>
              <Button className="rounded-sm bg-[#C9A84C] text-[#08100B] hover:bg-[#D7B867]">
                {locale === "es" ? "Apoyar este trabajo" : "Support this work"}
              </Button>
            </a>
          </div>
        }
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
            {locale === "es" ? "Lo que construimos" : "What we build"}
          </div>
          <p className="mt-4 text-sm leading-7 text-[#E8DEC7]/62">
            {copyForLocale(locale, entry.build)}
          </p>
        </div>

        <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
            {locale === "es" ? "Prueba en el terreno" : "Proof on the ground"}
          </div>
          <ul className="mt-5 space-y-4">
            {entry.proof.map((item) => (
              <li
                key={item}
                className="border-b border-white/6 pb-4 text-sm leading-7 text-[#E8DEC7]/64 last:border-b-0 last:pb-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
