import type { MetadataRoute } from "next"

const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.APP_PUBLIC_URL ??
  "https://nwkids.org"
).replace(/\/$/, "")

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep the internal ops console out of search indexes.
        disallow: ["/ops", "/es/ops"],
      },
    ],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
