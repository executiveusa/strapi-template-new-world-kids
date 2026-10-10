import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/seo"
import { getSiteMode } from "@/lib/site-mode"

export const dynamic = "force-dynamic"

export default function robots(): MetadataRoute.Robots {
  // While the site is hidden, ask crawlers to stay out entirely.
  if (getSiteMode() === "coming-soon")
    return { rules: [{ userAgent: "*", disallow: "/" }] }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/ops", "/es/ops", "/preview"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
