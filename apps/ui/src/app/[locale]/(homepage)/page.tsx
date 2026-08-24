import type { Metadata } from "next"

import { Homepage } from "@/components/homepage/Homepage"

const metadataByLocale = {
  en: {
    title: "New World Kids — We turn interests into opportunities.",
    description:
      "New World Kids connects young people's interests to real projects, paid experiences, experienced mentors, and a next step forward.",
    social:
      "Meet the First 12 and explore four pathways into real projects, mentorship, paid experience, and a next step.",
  },
  es: {
    title: "New World Kids — Convertimos intereses en oportunidades.",
    description:
      "New World Kids conecta los intereses de los jóvenes con proyectos reales, experiencias pagadas, mentores con experiencia y un siguiente paso.",
    social:
      "Conoce a los Primeros 12 y explora cuatro caminos hacia proyectos reales, mentoría, experiencia pagada y un siguiente paso.",
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? metadataByLocale.es : metadataByLocale.en
  return {
    title: t.title,
    description: t.description,
    openGraph: { title: t.title, description: t.social, type: "website" },
    twitter: { card: "summary", title: t.title, description: t.social },
  }
}

export default function Page() {
  return <Homepage />
}
