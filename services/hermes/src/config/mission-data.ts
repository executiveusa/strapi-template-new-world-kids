export type SupportedLocale = 'en' | 'es'

export type PillarSlug = 'food' | 'water' | 'energy' | 'shelter'

export type ImpactPillar = {
  slug: PillarSlug
  title: {
    en: string
    es: string
  }
}

export const fiscalSponsor = {
  name: 'Humanitarian Social Innovations',
  ein: '46-4779591',
}

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/newworldkids/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@newworldkids' },
  { label: 'Facebook', href: 'https://www.facebook.com/newworldkids' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/new-world-kids/',
  },
]

export const trustDocuments = [
  {
    slug: 'fiscal-sponsorship-letter',
    title: {
      en: 'Fiscal Sponsorship Letter',
      es: 'Carta de patrocinio fiscal',
    },
    summary: {
      en: 'Proof that New World Kids operates under the fiscal sponsorship of Humanitarian Social Innovations.',
      es: 'Prueba de que New World Kids opera bajo el patrocinio fiscal de Humanitarian Social Innovations.',
    },
    category: {
      en: 'Verification',
      es: 'Verificacion',
    },
    href: '/trust/fiscal-sponsorship-letter.pdf',
  },
  {
    slug: 'hsi-determination-letter',
    title: {
      en: 'HSI Determination Letter',
      es: 'Carta de determinacion de HSI',
    },
    summary: {
      en: 'Federal determination letter for the sponsoring organization behind New World Kids.',
      es: 'Carta federal de determinacion para la organizacion patrocinadora de New World Kids.',
    },
    category: {
      en: 'Tax Status',
      es: 'Estatus fiscal',
    },
    href: '/trust/hsi-determination-letter.pdf',
  },
]

export const impactPillars: ImpactPillar[] = [
  { slug: 'food', title: { en: 'Food', es: 'Alimentos' } },
  { slug: 'water', title: { en: 'Water', es: 'Agua' } },
  { slug: 'energy', title: { en: 'Energy', es: 'Energia' } },
  { slug: 'shelter', title: { en: 'Shelter', es: 'Refugio' } },
]

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
    donorbox: env.NEXT_PUBLIC_DONORBOX_URL || env.DONORBOX_URL || '/donate',
    creem: env.NEXT_PUBLIC_CREEM_URL || env.CREEM_URL || '/work-with-us',
    buyMeACoffee:
      env.NEXT_PUBLIC_BUY_ME_A_COFFEE_URL ||
      env.BUY_ME_A_COFFEE_URL ||
      'https://buymeacoffee.com/newworldkids',
    blog: env.NEXT_PUBLIC_BLOG_PUBLIC_URL || env.BLOG_PUBLIC_URL || '/blog',
  }
}

export function copyForLocale<T>(locale: string, value: { en: T; es: T }): T {
  return locale === 'es' ? value.es : value.en
}
