import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { gallerySlots, indigoPlants, type GallerySlot } from "@/content/gallery"
import { pageAlternates } from "@/lib/seo"

const INDIGO_YOUTUBE = "https://www.youtube.com/@proyectoindigoazul"
const INDIGO_INSTAGRAM = "https://www.instagram.com/proyectoindigoazul/"
const NWK_FACEBOOK = "https://www.facebook.com/nwkidsorg"

const copy = {
  en: {
    eyebrow: "Living archive",
    title: "Two places. One story still being written.",
    body: "Proyecto Indigo Azul and Seattle are different communities with different challenges. We keep their footage separate and connect the lessons over time.",
    indigoEyebrow: "01 · Origin",
    indigoTitle: "NEW WORLD KIDS X INDIGO AZUL PROJECT",
    indigoBody: "Follow the Indigo Azul Project",
    instagramAction: "Instagram",
    youtubeAction: "YouTube",
    facebookAction: "Facebook",
    seattleEyebrow: "02 · Seattle",
    seattleTitle: "NEW WORLD KIDS X FIRST 12",
    seattleBody: "First 12 Building in public",
    publicEyebrow: "03 · Build in public",
    publicTitle: "Keep the story open.",
    publicBody:
      "Shorts, interviews, progress, setbacks, and next steps—as the work develops.",
    reserved: "Will show",
    soon: "Images coming soon",
    indigoFact:
      "A demonstration food forest that New World Kids built in rural Puerto Vallarta, Mexico, starting in 2020. It is designed to become a learning center and a cultural exchange program.",
    plantsSummary: "See the plant list",
    plantsSoon: "The plant list is coming soon.",
    indigoSlots: [
      "Youth + community footage",
      "Nature + place footage",
      "Work in progress footage",
      "Long-form archive footage",
    ],
    seattleSlots: [
      "Seattle + neighborhood footage",
      "Boxing footage",
      "Basketball footage",
      "Mentors + projects footage",
    ],
    publicSlots: [
      "Short clips",
      "Interviews",
      "Progress updates",
      "Next-step updates",
    ],
    metaTitle: "Story Archive | New World Kids",
    metaDescription:
      "A living visual archive connecting Proyecto Indigo Azul and the next New World Kids chapter in Seattle.",
  },
  es: {
    eyebrow: "Archivo vivo",
    title: "Dos lugares. Una historia que sigue escribiéndose.",
    body: "Proyecto Indigo Azul y Seattle son comunidades distintas con retos diferentes. Mantenemos las imágenes separadas y conectamos los aprendizajes con el tiempo.",
    indigoEyebrow: "01 · Origen",
    indigoTitle: "NEW WORLD KIDS × PROYECTO INDIGO AZUL",
    indigoBody: "Siga el Proyecto Indigo Azul",
    instagramAction: "Instagram",
    youtubeAction: "YouTube",
    facebookAction: "Facebook",
    seattleEyebrow: "02 · Seattle",
    seattleTitle: "NEW WORLD KIDS × LOS PRIMEROS 12",
    seattleBody: "Los Primeros 12, construyendo en público",
    publicEyebrow: "03 · Construir en público",
    publicTitle: "Mantener la historia abierta.",
    publicBody:
      "Videos cortos, entrevistas, avances, tropiezos y próximos pasos, mientras el trabajo avanza.",
    reserved: "Mostrará",
    soon: "Imágenes próximamente",
    indigoFact:
      "Un bosque comestible de demostración que New World Kids construyó en el campo de Puerto Vallarta, México, desde 2020. Está diseñado para convertirse en un centro de aprendizaje y un programa de intercambio cultural.",
    plantsSummary: "Vea la lista de plantas",
    plantsSoon: "La lista de plantas viene pronto.",
    indigoSlots: [
      "imágenes de jóvenes y comunidad",
      "imágenes de naturaleza y del lugar",
      "imágenes del trabajo en proceso",
      "videos de larga duración",
    ],
    seattleSlots: [
      "imágenes de Seattle y su vecindario",
      "imágenes de boxeo",
      "imágenes de básquetbol",
      "imágenes de mentores y proyectos",
    ],
    publicSlots: [
      "videos cortos",
      "entrevistas",
      "actualizaciones de progreso",
      "actualizaciones de próximos pasos",
    ],
    metaTitle: "Archivo de historias | New World Kids",
    metaDescription:
      "Un archivo visual vivo que conecta Proyecto Indigo Azul con el próximo capítulo de New World Kids en Seattle.",
  },
} as const

const frameClasses = [
  "aspect-[16/10] md:col-span-7",
  "aspect-[4/5] md:col-span-4 md:col-start-9 md:mt-20",
  "aspect-[4/5] md:col-span-4 md:col-start-2 md:mt-8",
  "aspect-[16/10] md:col-span-7 md:col-start-6",
] as const

function formatDate(value: string, locale: string) {
  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1, 12))

  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    ...(day ? { day: "numeric" } : {}),
    timeZone: "UTC",
  }).format(date)
}

function MediaLane({
  items,
  slots,
  reserved,
  soon,
  locale,
  tone = "light",
}: {
  items: readonly string[]
  slots: readonly GallerySlot[]
  reserved: string
  soon: string
  locale: string
  tone?: "light" | "dark"
}) {
  const dark = tone === "dark"
  const loc = locale === "es" ? "es" : "en"

  return (
    <div className="mt-10 grid gap-x-6 gap-y-8 border-t border-current/14 pt-8 sm:mt-14 sm:gap-y-12 sm:pt-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16 md:pt-12">
      {items.map((item, index) => {
        const media = slots[index]?.media

        return (
          <figure
            key={item}
            className={frameClasses[index % frameClasses.length]}
          >
            {media ? (
              <>
                <div className="relative h-full w-full overflow-hidden bg-black/5">
                  <img
                    src={media.src}
                    alt={media.alt[loc]}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm leading-6 opacity-80">
                  {media.place[loc]} · {formatDate(media.date, locale)}
                </figcaption>
              </>
            ) : (
              <div
                className={`relative flex h-full w-full items-end overflow-hidden p-5 sm:p-6 ${
                  dark ? "bg-white/[0.06]" : "bg-[var(--color-paper-deep)]"
                }`}
              >
                <span className="absolute top-5 right-5 text-xs font-semibold tracking-[0.16em] opacity-60 sm:top-6 sm:right-6">
                  0{index + 1}
                </span>
                <div>
                  <div className="text-base font-bold tracking-[-0.01em] sm:text-lg">
                    {soon}
                  </div>
                  <div className="mt-1 max-w-[18rem] text-sm leading-5 opacity-75">
                    {reserved}: {item}
                  </div>
                </div>
              </div>
            )}
          </figure>
        )
      })}
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: pageAlternates(locale, "/gallery"),
  }
}

export default async function GalleryPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <section className="px-5 py-16 sm:px-8 sm:py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
            {t.eyebrow}
          </p>
          <h1 className="t-h1 mt-4 max-w-6xl text-balance sm:mt-5">
            {t.title}
          </h1>
          <p className="mt-7 max-w-3xl border-t border-black/14 pt-6 text-[15px] leading-7 text-[var(--color-text-muted)] sm:mt-9 sm:pt-7 sm:text-lg sm:leading-8 md:text-xl">
            {t.body}
          </p>
        </div>
      </section>

      <section
        id="indigo"
        className="scroll-mt-20 border-t border-black/14 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
                {t.indigoEyebrow}
              </p>
              <h2 className="t-h2 mt-4 max-w-4xl text-balance sm:mt-5">
                {t.indigoTitle}
              </h2>
            </div>
            <div className="border-t border-black/14 pt-5 sm:pt-6 lg:mb-1">
              <p className="max-w-xl text-[15px] leading-7 font-semibold text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
                {t.indigoBody}
              </p>
              <div className="mt-6 grid border-t border-black/14 sm:mt-7 sm:grid-cols-3">
                <a
                  href={INDIGO_INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-12 items-center justify-between border-b border-black/14 py-3 text-sm font-bold sm:border-r sm:px-5"
                >
                  <span>{t.instagramAction}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
                <a
                  href={INDIGO_YOUTUBE}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-12 items-center justify-between border-b border-black/14 py-3 text-sm font-bold sm:border-r sm:px-5"
                >
                  <span>{t.youtubeAction}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
                <a
                  href={NWK_FACEBOOK}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-12 items-center justify-between border-b border-black/14 py-3 text-sm font-bold sm:px-5"
                >
                  <span>{t.facebookAction}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 max-w-3xl">
            <p className="text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
              {t.indigoFact}
            </p>
            <details className="group mt-5 border-y border-black/15">
              <summary className="press flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 font-bold [&::-webkit-details-marker]:hidden">
                <span>{t.plantsSummary}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              {indigoPlants.length > 0 ? (
                <ul className="grid gap-x-8 gap-y-1 pb-4 text-base leading-7 text-[var(--color-text-muted)] sm:grid-cols-2">
                  {indigoPlants.map((plant) => (
                    <li key={plant}>{plant}</li>
                  ))}
                </ul>
              ) : (
                <p className="pb-4 text-base leading-7 text-[var(--color-text-muted)]">
                  {t.plantsSoon}
                </p>
              )}
            </details>
          </div>
          <MediaLane
            items={t.indigoSlots}
            slots={gallerySlots.indigo}
            reserved={t.reserved}
            soon={t.soon}
            locale={locale}
          />
        </div>
      </section>

      <section
        id="seattle"
        className="scroll-mt-20 bg-[#1e1a17] px-5 py-16 text-white sm:px-8 sm:py-20 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-white/46 uppercase sm:text-xs">
                {t.seattleEyebrow}
              </p>
              <h2 className="t-h2 mt-4 max-w-4xl text-balance sm:mt-5">
                {t.seattleTitle}
              </h2>
            </div>
            <p className="max-w-xl border-t border-white/16 pt-5 text-[15px] leading-7 font-semibold text-white/72 sm:pt-6 sm:text-lg sm:leading-8">
              {t.seattleBody}
            </p>
          </div>
          <MediaLane
            items={t.seattleSlots}
            slots={gallerySlots.seattle}
            reserved={t.reserved}
            soon={t.soon}
            locale={locale}
            tone="dark"
          />
        </div>
      </section>

      <section
        id="build-in-public"
        className="scroll-mt-20 border-t border-black/14 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
                {t.publicEyebrow}
              </p>
              <h2 className="t-h2 mt-4 max-w-4xl text-balance sm:mt-5">
                {t.publicTitle}
              </h2>
            </div>
            <p className="max-w-xl border-t border-black/14 pt-5 text-[15px] leading-7 text-[var(--color-text-muted)] sm:pt-6 sm:text-lg sm:leading-8">
              {t.publicBody}
            </p>
          </div>
          <MediaLane
            items={t.publicSlots}
            slots={gallerySlots.public}
            reserved={t.reserved}
            soon={t.soon}
            locale={locale}
          />
        </div>
      </section>
    </div>
  )
}
