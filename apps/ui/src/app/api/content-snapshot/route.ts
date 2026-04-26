export const dynamic = "force-dynamic"

import {
  actionCards,
  clarityCards,
  dataPriorities,
  heroFactStrip,
  heroFeatureCards,
  heroMedia,
  homepageStats,
  primaryNavigation,
  programCards,
  siteLinks,
  socialLinks,
  testimonialCards,
  timelineEntries,
  trustSignals,
} from "@/components/site/siteData"

export async function GET() {
  return Response.json(
    {
      ok: true,
      generatedAt: new Date().toISOString(),
      content: {
        navigation: primaryNavigation,
        links: siteLinks,
        socialLinks,
        hero: {
          media: heroMedia,
          featureCards: heroFeatureCards,
          factStrip: heroFactStrip,
          stats: homepageStats,
        },
        clarityCards,
        programCards,
        trustSignals,
        testimonialCards,
        timelineEntries,
        actionCards,
        dataPriorities,
      },
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  )
}
