import type { MetadataRoute } from "next"

const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.APP_PUBLIC_URL ??
  "https://nwkids.org"
).replace(/\/$/, "")

// Public content routes inside the [locale] segment.
// localePrefix is "as-needed": English URLs have no prefix, Spanish lives under /es.
// Verified live 200 on 2026-09-12. Excluded on purpose:
// /mission (page exists in code but 404s live - likely missing CMS content),
// /donate (307s off-site to FundRazr), /ops (internal console, disallowed in robots.ts).
const publicRoutes = [
  "",
  "/opportunity",
  "/projects",
  "/mentor",
  "/blog",
  "/gallery",
  "/hermes-usb",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const path of publicRoutes) {
    entries.push({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })
    entries.push({
      url: `${siteUrl}/es${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 0.9 : 0.7,
    })
  }

  return entries
}
