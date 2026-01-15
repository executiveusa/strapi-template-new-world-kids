import type { StaticImport } from "next/dist/shared/lib/get-img-props"

/**
 * Function to format Strapi media URLs. There are 2 types of upload:
 * - S3 bucket - in this case, the URL is already correct and starts with https
 * - local upload - in this case, the URL starts with /uploads and we need to add API url prefix
 * (this happens in route handler for Strapi assets)
 *
 */
type StrapiMediaInput = string | StaticImport | undefined | null
type StrapiMediaOutput<T> = T extends string ? string : T

export const formatStrapiMediaUrl = <T extends StrapiMediaInput>(
  imageUrl: T
): StrapiMediaOutput<T> => {
  if (imageUrl == null) {
    return imageUrl as StrapiMediaOutput<T>
  }

  if (typeof imageUrl === "string") {
    if (!imageUrl.startsWith("http")) {
      if (imageUrl.startsWith("/uploads")) {
        return `/api/asset${imageUrl}` as StrapiMediaOutput<T>
      }
    }
  }

  return imageUrl as StrapiMediaOutput<T>
}
