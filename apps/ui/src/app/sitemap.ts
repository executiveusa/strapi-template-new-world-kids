import type { MetadataRoute } from "next"

import { pageUrl, publicRoutes } from "@/lib/seo"
import { getSiteMode } from "@/lib/site-mode"

export const dynamic = "force-dynamic"

export default function sitemap(): MetadataRoute.Sitemap {
  if (getSiteMode() === "coming-soon") return []

  const lastModified = new Date()

  return publicRoutes.flatMap((path) =>
    (["en", "es"] as const).map((locale) => ({
      url: pageUrl(locale, path),
      lastModified,
      changeFrequency:
        path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/first-12" ? 0.9 : 0.6,
      alternates: {
        languages: {
          en: pageUrl("en", path),
          es: pageUrl("es", path),
        },
      },
    }))
  )
}
