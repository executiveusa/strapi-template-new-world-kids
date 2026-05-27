import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import type { Locale } from "next-intl"

import PageHero from "@/components/site/PageHero"
import { copyForLocale, impactPillars } from "@/content/site"
import { Link } from "@/lib/navigation"

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Four pillars of hands-on education: food, water, energy, and shelter for youth in Puerto Vallarta and beyond.",
}

export default async function ImpactPage({
  params,
}: PageProps<"/[locale]/impact">) {
  const { locale } = (await params) as { locale: Locale }

  return (
    <main className="bg-[#08110D]">
      <PageHero
        eyebrow={locale === "es" ? "Cuatro pilares" : "Four pillars"}
        title={
          locale === "es"
            ? "Lo que realmente sostiene una vida."
            : "What actually sustains a life."
        }
        description={
          locale === "es"
            ? "Ensenamos las cuatro cosas que ninguna escuela convencional garantiza: como crecer comida, proteger agua, generar energia y construir refugio. No en teoria. En el terreno."
            : "We teach the four things no conventional school guarantees: how to grow food, protect water, generate energy, and build shelter. Not in theory. On the ground."
        }
        aside={
          <div className="space-y-4">
            <div className="font-mono text-xs tracking-[0.18em] text-[#C9A84C] uppercase">
              {locale === "es"
                ? "El sitio de aprendizaje"
                : "The learning site"}
            </div>
            <div className="text-sm leading-7 text-[#E8DEC7]/66">
              <div className="font-medium text-white">Proyecto Indigo Azul</div>
              <div>1.5 acres · Paso de Guayabo, Puerto Vallarta</div>
              <div className="mt-2">
                {locale === "es"
                  ? "200+ variedades de plantas · 15-20 ninos locales cada semana · Siempre gratuito"
                  : "200+ plant varieties · 15–20 local children weekly · Always free"}
              </div>
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {impactPillars.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/impact/${pillar.slug}`}
              locale={locale}
              className="group rounded-sm border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-[#C9A84C]/35 hover:bg-white/[0.04]"
            >
              <div className="mb-3 font-mono text-xs tracking-[0.18em] text-[#C9A84C] uppercase">
                {copyForLocale(locale, pillar.eyebrow)}
              </div>
              <h2 className="font-serif text-3xl font-semibold text-white">
                {copyForLocale(locale, pillar.title)}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#E8DEC7]/60">
                {copyForLocale(locale, pillar.need)}
              </p>
              <ul className="mt-6 space-y-2">
                {pillar.proof.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[#E8DEC7]/55"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="transition-gap mt-8 flex items-center gap-2 text-sm font-medium text-[#C9A84C] group-hover:gap-3">
                <span>
                  {locale === "es"
                    ? `Ver pilar de ${copyForLocale(locale, pillar.title).toLowerCase()}`
                    : `Explore ${copyForLocale(locale, pillar.title).toLowerCase()}`}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
