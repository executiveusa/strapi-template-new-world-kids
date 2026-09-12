// apps/ui/src/lib/seo.ts
// Canonical + hreflang helpers. Fits the per-page generateMetadata pattern
// already used in apps/ui (see [locale]/(homepage)/page.tsx).

const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.APP_PUBLIC_URL ??
  "https://nwkids.org"
).replace(/\/$/, "")

/**
 * Canonical + hreflang alternates for a localized page.
 * localePrefix is "as-needed": English is unprefixed, Spanish is /es.
 * `path` is the locale-free route path ("" for home, "/blog", ...).
 */
export function localeAlternates(locale: string, path: string) {
  const enUrl = `${siteUrl}${path}`
  const esUrl = `${siteUrl}/es${path}`
  return {
    canonical: locale === "es" ? esUrl : enUrl,
    languages: {
      en: enUrl,
      es: esUrl,
      "x-default": enUrl,
    },
  } as const
}
