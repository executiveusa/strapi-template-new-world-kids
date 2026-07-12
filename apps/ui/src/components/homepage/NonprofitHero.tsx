"use client"

import { AnimatePresence, animate, motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "200+", label: "plant varieties growing" },
  { value: "1.5", label: "acres in Puerto Vallarta" },
  { value: "5+", label: "years of operation" },
  { value: "$0", label: "cost to every student" },
]

const carouselImages = [
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

const SLIDE_DURATION_MS = 3500

function StatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const zeroed = (() => {
    const m = /^(\$?)(\d+(?:\.\d+)?)(\+?)$/.exec(value)
    if (!m) return value
    const [, prefix, numStr, suffix] = m

    return `${prefix}${numStr.includes(".") ? "0.0" : "0"}${suffix}`
  })()
  const [display, setDisplay] = useState(zeroed)

  useEffect(() => {
    if (!isInView) return
    const match = /^(\$?)(\d+(?:\.\d+)?)(\+?)$/.exec(value)
    if (!match) return
    const [, prefix, numStr, suffix] = match
    const target = Number.parseFloat(numStr)
    const decimals = numStr.includes(".") ? 1 : 0
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const controls = animate(0, target, {
      duration: prefersReducedMotion ? 0 : 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    })

    return () => controls.stop()
  }, [isInView, value])

  return <span ref={ref}>{display}</span>
}

function HeroImageCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length)
    }, SLIDE_DURATION_MS)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[45vh] min-h-[280px] w-full overflow-hidden sm:h-[55vh] md:h-[70vh]">
      <AnimatePresence>
        <motion.div
          key={carouselImages[index].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={carouselImages[index].src}
            alt={carouselImages[index].alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-1.5">
        {carouselImages.map((image, i) => (
          <span
            key={image.src}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function NonprofitHero() {
  return (
    <section data-hero className="bg-[var(--color-bg)]">
      {/* Video — quote centered on top, everything else below */}
      <div className="relative h-[62vh] min-h-[380px] w-full overflow-hidden sm:h-[75vh] md:h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-garden-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-garden.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center"
          >
            <p className="font-serif text-[1.2rem] leading-relaxed text-[var(--color-accent-gold)] italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-[1.5rem]">
              &ldquo;If you ever think you&apos;re too small to make a
              difference, try going to sleep with a mosquito in the room.&rdquo;
            </p>
            <p className="mt-2 text-xs tracking-[0.28em] text-white/70 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              West African Proverb
            </p>
          </motion.div>
        </div>
      </div>

      {/* Photo slideshow — plays after the video, one image every 3.5s, looping */}
      <HeroImageCarousel />

      {/* Content — below the video */}
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center md:px-10 md:py-28">
        {/* Headline — problem-first rewrite */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-4xl leading-tight font-semibold text-[var(--color-text-primary)] md:text-6xl lg:text-7xl"
        >
          Most kids graduate
          <br className="hidden md:block" /> without ever learning
          <br className="hidden md:block" /> the most important life skills.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 font-serif text-xl text-[var(--color-accent-gold)] md:text-2xl"
        >
          We fix that. Free. No exceptions.
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg"
        >
          New World Kids is a Seattle-based nonprofit. We create projects and
          programs that teach inner-city and rural youth life skills. No matter
          the situation, we meet them where they are — then inspire them with
          the possibilities and skills to go beyond.
        </motion.p>

        {/* Core four callout */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 font-serif text-sm tracking-wide text-[var(--color-accent-gold)]/80"
        >
          Our framework: Food · Water · Energy · Shelter. Every program teaches
          all four.
        </motion.p>

        {/* CTAs — donate is dominant primary; timeline is a quiet text link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Link href="/donate">
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block rounded-full bg-[var(--color-accent-coral)] px-12 py-4 text-base font-semibold text-white shadow-[var(--color-accent-coral)]/25 shadow-xl transition-colors hover:bg-[var(--color-accent-coral-hover)] hover:shadow-[var(--color-accent-coral)]/40"
            >
              Plant a seed — give $25 →
            </motion.span>
          </Link>
          <Link
            href="/#timeline"
            className="text-sm text-[var(--color-accent-gold)]/55 transition hover:text-[var(--color-accent-gold)]"
          >
            or see 5 years of work →
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-[var(--color-border-subtle)] pt-10 text-center sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-semibold text-[var(--color-accent-gold)] md:text-4xl">
                <StatNumber value={stat.value} />
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
