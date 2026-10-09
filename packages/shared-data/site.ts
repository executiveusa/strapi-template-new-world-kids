export type SupportedLocale = "en" | "es"

export type PillarSlug = "food" | "water" | "energy" | "shelter"

export type SocialLink = {
  label: string
  href: string
}

export type TrustDocument = {
  slug: string
  title: {
    en: string
    es: string
  }
  summary: {
    en: string
    es: string
  }
  category: {
    en: string
    es: string
  }
  href: string
}

export type ImpactPillar = {
  slug: PillarSlug
  title: {
    en: string
    es: string
  }
  shortLabel: {
    en: string
    es: string
  }
  eyebrow: {
    en: string
    es: string
  }
  need: {
    en: string
    es: string
  }
  build: {
    en: string
    es: string
  }
  proof: string[]
}

export const fiscalSponsor = {
  name: "Humanitarian Social Innovations",
  ein: "46-4779591",
}

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/newworldkids/" },
  { label: "YouTube", href: "https://www.youtube.com/@newworldkids" },
  { label: "Facebook", href: "https://www.facebook.com/newworldkids" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/new-world-kids/",
  },
]

const hsiUploads = "https://hsifiscalsponsor.org/wp-content/uploads"

// Public documents hosted by HSI (fiscal sponsor). Linked, not copied, so readers
// always see HSI's current originals. The signed sponsorship agreement is
// intentionally "on request" until HSI approves public posting.
export const trustDocuments: TrustDocument[] = [
  {
    slug: "irs-letter-2023",
    title: {
      en: "IRS letter, November 2023",
      es: "Carta del IRS, noviembre de 2023",
    },
    summary: {
      en: "Confirms Humanitarian Social Innovations' 501(c)(3) status and public charity classification.",
      es: "Confirma el estatus 501(c)(3) de Humanitarian Social Innovations y su clasificacion como organizacion benefica publica.",
    },
    category: { en: "Tax Status", es: "Estatus fiscal" },
    href: `${hsiUploads}/2024/04/HSI-2023-Determination-Letter-3.pdf`,
  },
  {
    slug: "irs-determination-2014",
    title: {
      en: "IRS determination letter, December 2014",
      es: "Carta de determinacion del IRS, diciembre de 2014",
    },
    summary: {
      en: "Original 501(c)(3) determination for HSI, effective February 18, 2014.",
      es: "Determinacion original 501(c)(3) de HSI, vigente desde el 18 de febrero de 2014.",
    },
    category: { en: "Tax Status", es: "Estatus fiscal" },
    href: `${hsiUploads}/2021/02/6-Federal-Tax-Exemption.pdf`,
  },
  {
    slug: "hsi-form-990-2024",
    title: { en: "HSI Form 990, 2024", es: "Formulario 990 de HSI, 2024" },
    summary: {
      en: "HSI's annual return (redacted).",
      es: "Declaracion anual de HSI (con datos tachados).",
    },
    category: { en: "Governance", es: "Gobernanza" },
    href: `${hsiUploads}/2025/11/2024-990-HSI-Redacted-B.pdf`,
  },
  {
    slug: "hsi-audited-financials-2024",
    title: {
      en: "HSI audited financial statements, 2024",
      es: "Estados financieros auditados de HSI, 2024",
    },
    summary: {
      en: "Independent audit of HSI.",
      es: "Auditoria independiente de HSI.",
    },
    category: { en: "Governance", es: "Gobernanza" },
    href: `${hsiUploads}/2025/11/HSI-2024-Audited-Financials.pdf`,
  },
]

export const impactPillars: ImpactPillar[] = [
  {
    slug: "food",
    title: { en: "Food", es: "Alimentos" },
    shortLabel: { en: "Food forests", es: "Bosques comestibles" },
    eyebrow: {
      en: "Food is dignity",
      es: "La comida es dignidad",
    },
    need: {
      en: "Communities cannot think long-term when daily calories are unstable.",
      es: "Las comunidades no pueden pensar a largo plazo cuando las calorias diarias son inestables.",
    },
    build: {
      en: "We teach regenerative growing, syntropic agriculture, seed saving, and neighborhood-scale food resilience.",
      es: "Ensenamos cultivo regenerativo, agricultura sintropica, resguardo de semillas y resiliencia alimentaria de barrio.",
    },
    proof: [
      "200+ plant varieties in the food forest",
      "Hands-on teaching in real soil, not simulations",
      "Families eat from the systems they help build",
    ],
  },
  {
    slug: "water",
    title: { en: "Water", es: "Agua" },
    shortLabel: { en: "Water systems", es: "Sistemas de agua" },
    eyebrow: {
      en: "Water is survival",
      es: "El agua es supervivencia",
    },
    need: {
      en: "Water insecurity turns every season into a crisis and every harvest into a gamble.",
      es: "La inseguridad del agua convierte cada temporada en una crisis y cada cosecha en una apuesta.",
    },
    build: {
      en: "We teach rain capture, clay-pot irrigation, storage, and practical water stewardship for rural life.",
      es: "Ensenamos captacion de lluvia, riego con ollas de barro, almacenamiento y manejo practico del agua para la vida rural.",
    },
    proof: [
      "Clay-pot irrigation can cut water use by up to 90%",
      "Ferro-cement cisterns and gravity-fed systems are part of the curriculum",
      "Students learn how to keep water, not just consume it",
    ],
  },
  {
    slug: "energy",
    title: { en: "Energy", es: "Energia" },
    shortLabel: { en: "Off-grid energy", es: "Energia fuera de la red" },
    eyebrow: {
      en: "Energy is freedom",
      es: "La energia es libertad",
    },
    need: {
      en: "Without reliable power, connectivity, education, refrigeration, and communication all break down.",
      es: "Sin energia confiable, la conectividad, la educacion, la refrigeracion y la comunicacion se caen.",
    },
    build: {
      en: "We teach solar, biogas, storage, and lightweight off-grid systems that fit the realities of rural communities.",
      es: "Ensenamos solar, biogas, almacenamiento y sistemas ligeros fuera de la red que se ajustan a las realidades de comunidades rurales.",
    },
    proof: [
      "Solar, biodigester, and low-voltage power systems are part of the operating model",
      "Starlink connectivity supports modern education without requiring urban infrastructure",
      "Energy is taught as a living system, not a textbook chapter",
    ],
  },
  {
    slug: "shelter",
    title: { en: "Shelter", es: "Refugio" },
    shortLabel: { en: "Natural building", es: "Bioconstruccion" },
    eyebrow: {
      en: "Shelter is stability",
      es: "El refugio es estabilidad",
    },
    need: {
      en: "If housing is fragile, everything else stays fragile too.",
      es: "Si la vivienda es fragil, todo lo demas tambien lo sigue siendo.",
    },
    build: {
      en: "We teach adobe restoration, dome assembly, and durable shelter methods built for place, weather, and budget.",
      es: "Ensenamos restauracion de adobe, armado de domos y metodos de refugio duraderos hechos para el lugar, el clima y el presupuesto.",
    },
    proof: [
      "The learning center grows from a restored adobe footprint",
      "Portable and climate-appropriate build methods are part of the school model",
      "Students learn to make shelter systems that can travel back home with them",
    ],
  },
]

export const workWithUsOffers = [
  {
    title: {
      en: "AI operations for nonprofits",
      es: "Operaciones de IA para organizaciones sociales",
    },
    body: {
      en: "Grant support, automation, reporting, and public accountability systems for mission-driven teams.",
      es: "Apoyo en grants, automatizacion, reportes y sistemas de rendicion de cuentas para equipos con mision.",
    },
  },
  {
    title: {
      en: "Field storytelling and media systems",
      es: "Narrativa de campo y sistemas de medios",
    },
    body: {
      en: "Campaign storytelling, bilingual publishing, and content systems that turn real work into trust.",
      es: "Narrativa de campana, publicacion bilingue y sistemas de contenido que convierten el trabajo real en confianza.",
    },
  },
  {
    title: {
      en: "Transparency infrastructure",
      es: "Infraestructura de transparencia",
    },
    body: {
      en: "Trust centers, public ledgers, document portals, and lightweight mission dashboards.",
      es: "Centros de confianza, libros publicos, portales de documentos y paneles ligeros para la mision.",
    },
  },
]

export const journalTeaser = {
  en: "Field notes, proof, and long-form stories from food, water, energy, and shelter work.",
  es: "Notas de campo, pruebas e historias largas sobre nuestro trabajo en alimentos, agua, energia y refugio.",
}

export type SupportRails = {
  donorbox: string
  creem: string
  buyMeACoffee: string
  blog: string
}

export function getSupportRails(
  env: Record<string, string | undefined>
): SupportRails {
  return {
    donorbox: env.NEXT_PUBLIC_DONORBOX_URL || env.DONORBOX_URL || "/donate",
    creem: env.NEXT_PUBLIC_CREEM_URL || env.CREEM_URL || "/work-with-us",
    buyMeACoffee:
      env.NEXT_PUBLIC_BUY_ME_A_COFFEE_URL ||
      env.BUY_ME_A_COFFEE_URL ||
      "https://buymeacoffee.com/newworldkids",
    blog: env.NEXT_PUBLIC_BLOG_PUBLIC_URL || env.BLOG_PUBLIC_URL || "/blog",
  }
}

export function copyForLocale<T>(locale: string, value: { en: T; es: T }): T {
  return locale === "es" ? value.es : value.en
}
