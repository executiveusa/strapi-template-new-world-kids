"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

interface GalleryPhoto {
  src: string
  alt: string
}

interface ProgramGallery {
  id: string
  title: string
  location: string
  photos: GalleryPhoto[]
  status?: string
}

const indigoAzulPhotos: GalleryPhoto[] = [
  {
    src: "/images/hero-carousel/tropical_garden_with_red_tassels.webp",
    alt: "Tropical garden with red tassel flowers",
  },
  {
    src: "/images/hero-carousel/tropical_garden_with_guava_lime_mango.webp",
    alt: "Garden bed with guava, lime, and mango trees",
  },
  {
    src: "/images/hero-carousel/tropical_garden_with_banana_plant_and_flowers.webp",
    alt: "Banana plant surrounded by tropical flowers",
  },
  {
    src: "/images/hero-carousel/tropical_banana_grove_under_soft_skies.webp",
    alt: "Banana grove under soft evening skies",
  },
  {
    src: "/images/hero-carousel/seedling_comparison_on_textured_concrete.webp",
    alt: "Seedling growth comparison on a concrete potting bench",
  },
  {
    src: "/images/hero-carousel/mango_and_papaya_garden_scene.webp",
    alt: "Mango and papaya trees in the garden",
  },
  {
    src: "/images/hero-carousel/lush_bamboo_grove_in_tropical_greenery.webp",
    alt: "Lush bamboo grove in tropical greenery",
  },
  {
    src: "/images/hero-carousel/labeled_garden_plot_with_tropical_plants.webp",
    alt: "Labeled garden plot with tropical plants",
  },
  {
    src: "/images/hero-carousel/green_chili_plant_in_garden_setting.webp",
    alt: "Green chili plant growing in the garden",
  },
  {
    src: "/images/hero-carousel/bamboo_and_hibiscus_tropical_garden.webp",
    alt: "Bamboo and hibiscus in the tropical garden",
  },
]

const programs: ProgramGallery[] = [
  {
    id: "indigo-azul",
    title: "Indigo Azul Project",
    location: "Puerto Vallarta, Mexico",
    photos: indigoAzulPhotos,
  },
  {
    id: "culture-shock",
    title: "The Culture Shock Program",
    location: "Seattle, WA",
    photos: [],
    status: "Coming 2027",
  },
]

function ProgramCover({
  program,
  onOpen,
}: {
  program: ProgramGallery
  onOpen: () => void
}) {
  const cover = program.photos[0]

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] text-left transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full bg-[var(--color-surface-raised)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-5 md:p-7">
        <h2 className="font-serif text-lg leading-tight font-semibold text-white uppercase md:text-2xl">
          {program.title} &mdash; Location {program.location}
        </h2>
        {program.status && (
          <p className="mt-2 text-xs font-semibold text-red-500 italic">
            {program.status}
          </p>
        )}
        <span className="mt-3 inline-block text-xs tracking-[0.2em] text-white/70 uppercase">
          {program.photos.length > 0 ? "View gallery →" : "Preview →"}
        </span>
      </div>
    </button>
  )
}

function ProgramGalleryModal({
  program,
  onClose,
}: {
  program: ProgramGallery
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 md:p-10"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)] uppercase md:text-3xl">
              {program.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-eyebrow)] uppercase">
              Location {program.location}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="shrink-0 rounded-full border border-[var(--color-border-subtle)] p-2 text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
          >
            ✕
          </button>
        </div>

        {program.photos.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {program.photos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border-subtle)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] p-10 text-center">
            <p className="text-sm font-semibold text-red-500 italic">
              {program.status}
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              This program hasn&apos;t launched yet, so there&apos;s nothing to
              show here — we&apos;ll add real photos once it starts.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProgram = programs.find((p) => p.id === openId) ?? null

  return (
    <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
        Gallery
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-[var(--color-text-primary)] uppercase md:text-5xl">
        NW Kids Projects and Programs
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {programs.map((program) => (
          <ProgramCover
            key={program.id}
            program={program}
            onOpen={() => setOpenId(program.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openProgram && (
          <ProgramGalleryModal
            program={openProgram}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
