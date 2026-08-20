import type { Metadata } from "next"

import { Homepage } from "@/components/homepage/Homepage"

const metadataByLocale = {
  en: {
    title: "New World Kids — Real work. Real mentors. Real next steps.",
    description:
      "New World Kids gives young people real project experience, mentors to learn from, and a path toward work, school, or training.",
    social: "See the Seattle pilot, Culture Shock, Proyecto Indigo Azul, field archive, gallery, and public records.",
  },
  es: {
    title: "New World Kids — Trabajo real. Mentores reales. Próximos pasos reales.",
    description:
      "New World Kids da a jóvenes experiencia en proyectos reales, mentores de quienes aprender y un camino hacia el trabajo, la escuela o la capacitación.",
    social: "Conoce el piloto de Seattle, Culture Shock, Proyecto Indigo Azul, el archivo de campo, la galería y los documentos públicos.",
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
