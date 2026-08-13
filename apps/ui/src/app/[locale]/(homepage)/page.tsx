import type { Metadata } from "next"

import { Homepage } from "@/components/homepage/Homepage"

const metadataByLocale = {
  en: {
    title: "New World Kids — Practical Life Skills Through Real Projects",
    description: "New World Kids teaches practical food, water, energy, and shelter skills through hands-on projects and documents the work publicly.",
    social: "See the programs, field archive, gallery, public records, and services offered by New World Kids.",
  },
  es: {
    title: "New World Kids — Habilidades prácticas mediante proyectos reales",
    description: "New World Kids enseña habilidades prácticas de alimento, agua, energía y refugio mediante proyectos reales y documenta el trabajo públicamente.",
    social: "Conoce los programas, el archivo de campo, la galería, los documentos públicos y los servicios de New World Kids.",
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
