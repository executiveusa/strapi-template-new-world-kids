import type { MetadataRoute } from "next"

import { getEnvVar } from "@/lib/env-vars"
import { routing } from "@/lib/navigation"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getEnvVar("APP_PUBLIC_URL")

  if (!baseUrl) {
    return []
  }

  const now = new Date()
  const paths = ["/", "/donate"]

  return routing.locales.flatMap((locale) =>
    paths.map((path) => {
      const localizedPath =
        locale === routing.defaultLocale
          ? path
          : `/${locale}${path === "/" ? "" : path}`

      return {
        url: new URL(localizedPath, baseUrl).toString(),
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "monthly",
      }
    })
  )
}
