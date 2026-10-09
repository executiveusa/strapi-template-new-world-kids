// Gallery content. Each slot shows "Images coming soon" until it has real media.
// To add a photo: set `media` on the slot with its file path (put the file in apps/ui/public/gallery/),
// a plain-language alt text, the date taken, and the place. Only add images you hold rights to, and for
// any image of a young person only with written consent (see /safeguarding). Proyecto Indigo Azul
// images stay in the "indigo" lane and are never shown as Seattle participants.

export type GalleryMedia = {
  readonly src: string
  readonly alt: { readonly en: string; readonly es: string }
  readonly date: string // "2024-03" or "2024-03-15"
  readonly place: { readonly en: string; readonly es: string }
  readonly credit?: string
}

export type GallerySlot = {
  readonly media?: GalleryMedia
}

export const gallerySlots: Record<
  "indigo" | "seattle" | "public",
  readonly GallerySlot[]
> = {
  indigo: [{}, {}, {}, {}],
  seattle: [{}, {}, {}, {}],
  public: [{}, {}, {}, {}],
}

// Plant list for Proyecto Indigo Azul. Shown behind a "See the plant list" disclosure once it has items.
export const indigoPlants: readonly string[] = []
