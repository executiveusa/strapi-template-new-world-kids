import type { Metadata } from "next"
import type { Locale } from "next-intl"

import PageHero from "@/components/site/PageHero"

export const metadata: Metadata = {
  title: "About",
  description:
    "About New World Kids, the four-pillar mission, and the boots-on-the-ground operating model.",
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = (await params) as { locale: Locale }

  return (
    <main className="bg-[#08110D]">
      <PageHero
        eyebrow={locale === "es" ? "Nosotros" : "About"}
        title={
          locale === "es"
            ? "Una escuela viva construida alrededor de la realidad."
            : "A living school built around reality."
        }
        description={
          locale === "es"
            ? "New World Kids existe para que los jovenes aprendan lo que realmente sostiene una vida: comida, agua, energia y refugio. Lo hacemos en el terreno, en publico y con una capa de medios y sistemas de IA que mantiene la organizacion ligera y transparente."
            : "New World Kids exists so young people can learn what actually sustains a life: food, water, energy, and shelter. We do it on the ground, in public, with a media and AI systems layer that keeps the organization lean and transparent."
        }
      />

      <section className="mx-auto max-w-5xl space-y-8 px-4 py-16 text-sm leading-8 text-[#E8DEC7]/64 sm:px-6 lg:px-8">
        <p>
          {locale === "es"
            ? "La escuela no se construye alrededor de teoria abstracta. Se construye alrededor de la vida diaria: cultivar, almacenar, reparar, publicar, organizar y compartir valor real."
            : "The school is not built around abstract theory. It is built around daily life: grow, store, repair, publish, organize, and share real value."}
        </p>
        <p>
          {locale === "es"
            ? "Tambien tratamos a la transparencia como parte del producto. Si pedimos apoyo, mostramos el respaldo legal, el patrocinio fiscal, los documentos y el progreso publico."
            : "We also treat transparency as part of the product. If we ask for support, we show the legal backing, fiscal sponsorship, documents, and public progress."}
        </p>
      </section>
    </main>
  )
}
