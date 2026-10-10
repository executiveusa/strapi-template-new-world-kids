import { routing } from "@/lib/navigation"

export const SITE_URL = (
  process.env.APP_PUBLIC_URL ?? "https://nwkids.org"
).replace(/\/$/, "")

type L = "en" | "es"

const localePath = (locale: L, path: string) => {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
  const full = `${prefix}${path === "/" ? "" : path}`

  return full || "/"
}

export const pageUrl = (locale: L, path: string) =>
  `${SITE_URL}${localePath(locale, path)}`

/** Canonical + hreflang block for a page, so en and es are not treated as duplicates. */
export function pageAlternates(localeInput: string, path: string) {
  const locale: L = localeInput === "es" ? "es" : "en"

  return {
    canonical: pageUrl(locale, path),
    languages: {
      en: pageUrl("en", path),
      es: pageUrl("es", path),
      "x-default": pageUrl("en", path),
    },
  }
}

/** Public, indexable routes (no locale prefix). Used by the sitemap. */
export const publicRoutes = [
  "/",
  "/first-12",
  "/projects",
  "/gallery",
  "/transparency",
  "/donate",
  "/safeguarding",
  "/safeguarding/policy",
  "/privacy",
  "/refer",
  "/mentor",
  "/opportunity",
] as const
