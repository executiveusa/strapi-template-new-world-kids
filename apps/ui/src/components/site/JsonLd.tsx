import { pageUrl, SITE_URL } from "@/lib/seo"

import { siteLinks } from "./siteData"

// Organization facts for search engines. Only things stated elsewhere on the site and in public records.
export function OrganizationJsonLd({ locale }: { locale: "en" | "es" }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NonprofitOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "New World Kids",
    url: pageUrl(locale, "/"),
    logo: `${SITE_URL}/images/nwkids-logo.png`,
    email: siteLinks.infoEmail,
    description:
      locale === "es"
        ? "Los Primeros 12: trabajo real remunerado, mentores y un siguiente paso claro para 12 jóvenes de 16 a 19 años en el área de Seattle, con inicio previsto en 2027."
        : "The First 12: paid, real work, mentors, and a clear next step for 12 young people ages 16 to 19 in the Seattle area, planned to start in 2027.",
    areaServed: ["King", "Snohomish", "Pierce", "Skagit"].map((name) => ({
      "@type": "AdministrativeArea",
      name: `${name} County, Washington`,
    })),
    identifier: [
      {
        "@type": "PropertyValue",
        name: "Washington UBI",
        value: "604 917 764",
      },
      { "@type": "PropertyValue", name: "EIN", value: "85-1516064" },
    ],
    parentOrganization: {
      "@type": "NonprofitOrganization",
      name: "Humanitarian Social Innovations",
      description: "Fiscal sponsor. 501(c)(3) public charity, EIN 46-4779591.",
      url: "https://hsifiscalsponsor.org",
    },
    sameAs: [siteLinks.facebook, siteLinks.instagram, siteLinks.youtube],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", String.raw`\u003c`),
      }}
    />
  )
}
