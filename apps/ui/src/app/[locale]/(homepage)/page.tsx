import type { Metadata } from "next"

import { Homepage } from "@/components/homepage/Homepage"

export const dynamic = "force-dynamic"

const metadataByLocale = {
  en: {
    title: "New World Kids — Interest into opportunity.",
    description: "The First 12: real work, mentors, and a clear next step in Seattle.",
  },
  es: {
    title: "New World Kids — Del interés a la oportunidad.",
    description: "Los Primeros 12: trabajo real, mentores y un siguiente paso claro en Seattle.",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? metadataByLocale.es : metadataByLocale.en
  return {
    title: t.title,
    description: t.description,
    openGraph: { title: t.title, description: t.description, type: "website" },
    twitter: { card: "summary", title: t.title, description: t.description },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === "es" ? "es" : "en"
  return <Homepage locale={locale} />
}
