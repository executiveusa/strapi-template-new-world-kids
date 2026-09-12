// apps/ui/src/components/seo/OrganizationJsonLd.tsx
// Static Organization structured data for New World Kids.
// Facts verified 2026-09-12 against WA SoS CCFS + nwkids.org footer.
// Deliberately EXCLUDED: EIN (own EIN 85-1516064 has no IRS record),
// tax-deductibility claims (fiscally sponsored, not an independent 501(c)(3)),
// street address (registered-agent residence stays private).

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "New World Kids",
  legalName: "NEW WORLD KIDS",
  url: "https://nwkids.org",
  email: "info@nwkids.org",
  description:
    "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity (46-4779591).",
  areaServed: "Seattle, WA",
  foundingDate: "2022-05-16",
  funder: {
    "@type": "NGO",
    name: "Humanitarian Social Innovations",
    url: "https://www.hsifiscalsponsor.org",
  },
  sameAs: [
    "https://www.facebook.com/nwkidsorg",
    "https://www.instagram.com/proyectoindigoazul/",
    "https://www.youtube.com/@proyectoindigoazul",
  ],
}

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
    />
  )
}
