// Homepage hero timelapse. Leave `heroTimelapse` null until the real footage exists: the hero then shows the
// still poster. To turn it on, build the video with scripts/build-timelapse.sh from dated photos of Proyecto
// Indigo Azul, put the files in apps/ui/public/videos/, and fill this in. See docs/NWK_HERO_TIMELAPSE_PLAN.md.
// The caption must say what the footage is and the years it covers; it is never shown as Seattle activity.

export type HeroTimelapse = {
  readonly mp4: string
  readonly webm?: string
  readonly poster: string
  readonly caption: { readonly en: string; readonly es: string }
}

export const heroTimelapse: HeroTimelapse | null = null
