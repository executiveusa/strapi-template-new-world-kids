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
export declare const fiscalSponsor: {
  name: string
  ein: string
}
export declare const socialLinks: SocialLink[]
export declare const trustDocuments: TrustDocument[]
export declare const impactPillars: ImpactPillar[]
export declare const workWithUsOffers: {
  title: {
    en: string
    es: string
  }
  body: {
    en: string
    es: string
  }
}[]
export declare const journalTeaser: {
  en: string
  es: string
}
export type SupportRails = {
  donorbox: string
  creem: string
  buyMeACoffee: string
  blog: string
}
export declare function getSupportRails(
  env: Record<string, string | undefined>
): SupportRails
export declare function copyForLocale<T>(
  locale: string,
  value: {
    en: T
    es: T
  }
): T
