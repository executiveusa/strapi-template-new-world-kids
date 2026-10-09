// One switch decides whether the public sees the real site or the coming-soon page.
//
//   SITE_MODE=live          show the whole site
//   SITE_MODE=coming-soon   show only /coming-soon (and /privacy) to the public
//
// Unset means: coming-soon in production (safe by default), live in local development.
// Team members can still view the whole site: open /preview?key=<PREVIEW_KEY> once and a
// cookie lets that browser through. Changing SITE_MODE takes effect on the next deploy.

export type SiteMode = "live" | "coming-soon"

export const PREVIEW_COOKIE = "nwk_preview"

export function getSiteMode(
  env: Record<string, string | undefined> = process.env
): SiteMode {
  const value = env.SITE_MODE?.trim().toLowerCase()
  if (value === "live") return "live"
  if (value === "coming-soon" || value === "hidden") return "coming-soon"

  return env.NODE_ENV === "production" ? "coming-soon" : "live"
}

const alwaysOpen = [/^\/(?:es\/)?coming-soon\/?$/, /^\/(?:es\/)?privacy\/?$/]

export function isOpenWhileHidden(pathname: string): boolean {
  return alwaysOpen.some((pattern) => pattern.test(pathname))
}
