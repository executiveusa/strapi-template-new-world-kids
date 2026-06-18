// This value anchors the root page path used by the public content surface.
export const ROOT_PAGE_PATH = "/"

/**
 * Join page path segments into a single normalized path (no duplicate slashes).
 * It always starts with ROOT_PAGE_PATH ("/"). Optionally, locale prefix can be added.
 *
 * Examples (input -> output):
 *   [""]                                   -> "/"
 *   [null, undefined]                      -> "/"
 *   ["/"]                                  -> "/"
 *   ["/", "//", "///"]                     -> "/"
 *   ["slug"]                               -> "/slug"
 *   ["/slug"]                              -> "/slug"
 *   ["/", "/slug"]                         -> "/slug"
 *   ["/parent", "slug"]                    -> "/parent/slug"
 *   ["/parent", "/slug"]                   -> "/parent/slug"
 *   ["/parent/", "/slug"]                  -> "/parent/slug"
 *   ["/parent/1", "/slug"]                 -> "/parent/1/slug"
 *   ["/parent/1", "slug"]                  -> "/parent/1/slug"
 *   ["parent/1", "slug"]                   -> "/parent/1/slug"
 *   ["/granparent/parent", "child/kid"]    -> "/granparent/parent/child/kid"
 *
 *   With locale:
 *   ["", ""], "en"                         -> "/en"
 *   ["/"], "en"                            -> "/en"
 *   ["", "slug"], "en"                     -> "/en/slug"
 *   ["/parent", "slug"], "en"              -> "/en/parent/slug"
 *   ["/en/parent", "slug"], "en"           -> "/en/parent/slug"
 */
export const normalizePageFullPath = (
  paths: (string | undefined | null)[],
  locale?: string | null
) => {
  const filteredPaths = paths.filter(Boolean) as string[]
  let fullPath = [ROOT_PAGE_PATH, ...filteredPaths].join("/")

  while (fullPath.includes("//")) {
    fullPath = fullPath.replaceAll("//", "/")
  }

  if (locale) {
    // make sure not to add same locale twice
    if (fullPath.startsWith(`/${locale}/`) || fullPath === `/${locale}`) {
      return fullPath
    }

    return `/${locale}${fullPath === "/" ? "" : fullPath}`
  }

  return fullPath
}

export * from "./site"
