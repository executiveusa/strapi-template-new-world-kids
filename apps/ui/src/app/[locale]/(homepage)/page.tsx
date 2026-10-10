import type { Metadata } from "next"

import { Homepage } from "@/components/homepage/Homepage"
import { pageAlternates } from "@/lib/seo"

export const revalidate = 60

const metadataByLocale = {
  en: {
    title: "New World Kids — Interest into opportunity.",
    description:
      "The First 12: paid, real work, mentors, and a clear next step for 12 young people ages 16 to 19 in the Seattle area, starting in 2027.",
  },
  es: {
    title: "New World Kids — Del interés a la oportunidad.",
    description:
      "Los Primeros 12: trabajo real con sueldo, mentores y un siguiente paso claro para 12 jóvenes de 16 a 19 años del área de Seattle, desde 2027.",
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
    alternates: pageAlternates(locale, "/"),
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      images: [{ url: "/images/og-nwkids.png", width: 1200, height: 630 }],
    },
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
