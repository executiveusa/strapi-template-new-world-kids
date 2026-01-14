import type { ComponentType } from "react"

import { UID } from "@repo/strapi"

/**
 * Mapping of Strapi component UID to component import metadata.
 *
 * Why: We want a stable UID -> module path map so that bundlers can create
 * smaller chunks for the page builder. Next.js 15 can be sensitive to dynamic
 * imports inside `pages/`, so we keep the mapping here (no `next/dynamic`) and
 * let app-router/server code decide how to load components.
 */
type PageContentComponentModule = {
  readonly path: string
  readonly load: () => Promise<{ default: ComponentType<any> }>
}

const pageContentComponentRegistry = {
  // elements, seo-utilities, utilities
  // They are usually rendered or used deep inside other components or handlers
  // Add them here if they can be used on Page content level
  "utilities.ck-editor-content": {
    path: "@/components/page-builder/components/utilities/StrapiCkEditorContent",
    load: () =>
      import(
        "@/components/page-builder/components/utilities/StrapiCkEditorContent"
      ),
  },

  // Sections
  "sections.animated-logo-row": {
    path: "@/components/page-builder/components/sections/StrapiAnimatedLogoRow",
    load: () =>
      import(
        "@/components/page-builder/components/sections/StrapiAnimatedLogoRow"
      ),
  },
  "sections.faq": {
    path: "@/components/page-builder/components/sections/StrapiFaq",
    load: () =>
      import("@/components/page-builder/components/sections/StrapiFaq"),
  },
  "sections.carousel": {
    path: "@/components/page-builder/components/sections/StrapiCarousel",
    load: () =>
      import("@/components/page-builder/components/sections/StrapiCarousel"),
  },
  "sections.heading-with-cta-button": {
    path:
      "@/components/page-builder/components/sections/StrapiHeadingWithCTAButton",
    load: () =>
      import(
        "@/components/page-builder/components/sections/StrapiHeadingWithCTAButton"
      ),
  },
  "sections.hero": {
    path: "@/components/page-builder/components/sections/StrapiHero",
    load: () => import("@/components/page-builder/components/sections/StrapiHero"),
  },
  "sections.horizontal-images": {
    path: "@/components/page-builder/components/sections/StrapiHorizontalImages",
    load: () =>
      import(
        "@/components/page-builder/components/sections/StrapiHorizontalImages"
      ),
  },
  "sections.image-with-cta-button": {
    path:
      "@/components/page-builder/components/sections/StrapiImageWithCTAButton",
    load: () =>
      import(
        "@/components/page-builder/components/sections/StrapiImageWithCTAButton"
      ),
  },

  // Forms
  "forms.contact-form": {
    path: "@/components/page-builder/components/forms/StrapiContactForm",
    load: () =>
      import("@/components/page-builder/components/forms/StrapiContactForm"),
  },
  "forms.newsletter-form": {
    path: "@/components/page-builder/components/forms/StrapiNewsletterForm",
    load: () =>
      import("@/components/page-builder/components/forms/StrapiNewsletterForm"),
  },

  // Add more components here
} as const satisfies Partial<Record<UID.Component, PageContentComponentModule>>

export const PageContentComponentPaths = Object.fromEntries(
  Object.entries(pageContentComponentRegistry).map(([uid, entry]) => [
    uid,
    entry.path,
  ])
) as {
  [K in keyof typeof pageContentComponentRegistry]: (typeof pageContentComponentRegistry)[K]["path"]
}

export const PageContentComponentLoaders = Object.fromEntries(
  Object.entries(pageContentComponentRegistry).map(([uid, entry]) => [
    uid,
    entry.load,
  ])
) as {
  [K in keyof typeof pageContentComponentRegistry]: (typeof pageContentComponentRegistry)[K]["load"]
}
