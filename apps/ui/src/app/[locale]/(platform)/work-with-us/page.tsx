import type { Metadata } from "next"
import type { Locale } from "next-intl"

import PageHero from "@/components/site/PageHero"
import { Button } from "@/components/ui/button"
import {
  copyForLocale,
  supportRails,
  workWithUsOffers,
} from "@/content/site"

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "AI systems, grant support, transparency infrastructure, and mission storytelling from New World Kids.",
}

export default async function WorkWithUsPage({
  params,
}: PageProps<"/[locale]/work-with-us">) {
  const { locale } = (await params) as { locale: Locale }

  return (
    <main className="bg-[#08110D]">
      <PageHero
        eyebrow={locale === "es" ? "Estudio de mision" : "Mission Studio"}
        title={
          locale === "es"
            ? "Nuestros servicios financian la escuela."
            : "Our services help fund the school."
        }
        description={
          locale === "es"
            ? "Construimos operaciones de IA, sistemas de transparencia y narrativa para organizaciones con mision. El trabajo comercial fortalece la capa de ingresos que mantiene gratis nuestros programas para estudiantes."
            : "We build AI operations, transparency systems, and storytelling for mission-driven organizations. The services side strengthens the revenue layer that keeps our student programs free."
        }
        aside={
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {locale === "es" ? "Checkout comercial" : "Commercial checkout"}
            </div>
            <div className="text-sm leading-7 text-[#E8DEC7]/66">
              {locale === "es"
                ? "Usamos una via comercial separada de las donaciones caritativas para no mezclar apoyo deducible con servicios pagados."
                : "We keep paid service checkout separate from charitable donations so tax-deductible support and commercial work never get blurred."}
            </div>
            <a href={supportRails.creem}>
              <Button className="rounded-sm bg-[#C9A84C] text-[#08100B] hover:bg-[#D7B867]">
                {locale === "es" ? "Ver oferta" : "View offer rail"}
              </Button>
            </a>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {workWithUsOffers.map((offer) => (
            <div
              key={offer.title.en}
              className="rounded-sm border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="text-xl font-medium text-white">
                {copyForLocale(locale, offer.title)}
              </div>
              <div className="mt-4 text-sm leading-7 text-[#E8DEC7]/60">
                {copyForLocale(locale, offer.body)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
