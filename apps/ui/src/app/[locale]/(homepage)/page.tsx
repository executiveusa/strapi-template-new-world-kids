import type { Metadata } from "next"

import { Homepage } from "@/components/homepage/Homepage"

const metadataByLocale = {
  en: {
    title: "New World Kids — Help turn interest into opportunity.",
    description:
      "New World Kids is building the First 12 in Seattle: real projects, experienced mentors, proof of work, and a next step.",
    social:
      "The First 12 starts in Seattle in 2027 across Technology, Sports, Food Systems, and Art.",
  },
  es: {
    title: "New World Kids — Ayuda a convertir interés en oportunidad.",
    description:
      "New World Kids está construyendo los Primeros 12 en Seattle: proyectos reales, mentores con experiencia, evidencia del trabajo y un siguiente paso.",
    social:
      "Los Primeros 12 comienzan en Seattle en 2027 con Tecnología, Deportes, Sistemas Alimentarios y Arte.",
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
