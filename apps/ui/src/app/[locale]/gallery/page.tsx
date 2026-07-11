import Image from "next/image"
import type { Locale } from "next-intl"

const photos = [
  {
    src: "/images/hero-garden.jpg",
    alt: "Garden bed with bougainvillea, papaya, moringa, banana, ginger, and guava",
  },
  { src: "/images/hero-bananas.jpg", alt: "Banana plants" },
  { src: "/images/hero-mango-baby.jpg", alt: "Baby mango sapling" },
  { src: "/images/hero-mango-tree.jpg", alt: "Mature mango tree with fruit" },
  { src: "/images/hero-papaya.jpg", alt: "Papaya and banana trees" },
  { src: "/images/hero-hibiscus.jpg", alt: "Hibiscus and bamboo" },
  { src: "/images/hero-bamboo.jpg", alt: "Bamboo grove" },
  { src: "/images/hero-red-bananas.jpg", alt: "Red bananas" },
  { src: "/images/hero-nopales.jpg", alt: "Prickly pear cactus (nopales)" },
  { src: "/images/hero-seed.jpg", alt: "Tree seed, close up" },
  { src: "/images/hero-flower.jpg", alt: "Hand-pollinating a squash flower" },
  { src: "/images/hero-clouds.jpg", alt: "Sunset over the garden hillside" },
]

const copy = {
  en: {
    eyebrow: "From the field",
    title: "What's actually growing in Paso de Guayabo.",
    body: "Unedited photos from the food forest — no stock imagery, no staged shoots. More seasons, more angles, and higher-resolution captures are being added as we document the site.",
  },
  es: {
    eyebrow: "Desde el campo",
    title: "Lo que realmente está creciendo en Paso de Guayabo.",
    body: "Fotos reales del bosque comestible — sin imágenes de stock, sin sesiones montadas. Iremos agregando más temporadas, más ángulos y capturas de mayor resolución conforme documentamos el sitio.",
  },
}

export default async function GalleryPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold text-[var(--color-text-primary)] md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-text-muted)]">
        {t.body}
      </p>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
