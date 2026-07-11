"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

const heroImages = [
  {
    src: "/images/hero-clouds.jpg",
    alt: "Sunset clouds over Puerto Vallarta",
    duration: 5000, // 5 seconds for first image
  },
  { src: "/images/hero-bananas.jpg", alt: "Banana plants" },
  { src: "/images/hero-garden.jpg", alt: "Garden with various plants" },
  { src: "/images/hero-baby-mangos.jpg", alt: "Baby mangos on tree" },
  { src: "/images/hero-hibiscus.jpg", alt: "Hibiscus flowers" },
  { src: "/images/hero-mango-tree.jpg", alt: "Mango tree with fruit" },
  { src: "/images/hero-papaya.jpg", alt: "Papaya tree" },
  { src: "/images/hero-bamboo.jpg", alt: "Bamboo forest" },
  { src: "/images/hero-red-bananas.jpg", alt: "Red bananas" },
  { src: "/images/hero-prickly-pear.jpg", alt: "Prickly pear cactus" },
  { src: "/images/hero-seeds.jpg", alt: "Seeds and botanical specimen" },
  { src: "/images/hero-flower.jpg", alt: "Yellow flower" },
]

const ROTATION_INTERVAL = 3500 // 3.5 seconds
const FIRST_IMAGE_DURATION = 5000 // 5 seconds

const stats = [
  { value: "200+", label: "plant varieties growing" },
  { value: "1.5", label: "acres in Puerto Vallarta" },
  { value: "5+", label: "years of operation" },
  { value: "$0", label: "cost to every student" },
]

export function NonprofitHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFirstImage, setIsFirstImage] = useState(true)

  useEffect(() => {
    const timer = isFirstImage
      ? setTimeout(() => {
          setIsFirstImage(false)
          setCurrentImageIndex(1)
        }, FIRST_IMAGE_DURATION)
      : setTimeout(() => {
          setCurrentImageIndex(
            (prev) => (prev + 1) % (heroImages.length - 1) // Skip first image after initial display
          )
        }, ROTATION_INTERVAL)

    return () => clearTimeout(timer)
  }, [currentImageIndex, isFirstImage])

  const displayIndex = isFirstImage ? 0 : currentImageIndex + 1

  return (
    <section
      data-hero
      className="relative min-h-screen overflow-hidden bg-[#060e08]"
    >
      {/* Background image carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={displayIndex}
            src={heroImages[displayIndex]?.src || heroImages[0].src}
            alt={heroImages[displayIndex]?.alt || heroImages[0].alt}
            className="h-full w-full object-cover opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e08]/60 via-[#060e08]/30 to-[#060e08]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center md:px-10">
        {/* Proverb */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-base leading-relaxed text-[#c9a84c] italic md:text-xl"
        >
          &ldquo;If you ever think you&apos;re too small to make a difference,
          try going to sleep with a mosquito in the room.&rdquo;
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-2 text-xs tracking-[0.28em] text-[#c9a84c]/70 uppercase"
        >
          West African Proverb
        </motion.p>

        {/* Headline — problem-first rewrite */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-10 font-serif text-4xl leading-tight font-semibold text-white md:text-6xl lg:text-7xl"
        >
          Most kids graduate
          <br className="hidden md:block" /> without ever learning
          <br className="hidden md:block" /> the most important life skills.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 font-serif text-xl text-[#c9a84c] md:text-2xl"
        >
          We fix that. Free. No exceptions.
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl text-base leading-8 text-white/70 md:text-lg"
        >
          New World Kids is a Seattle-based nonprofit. We create projects and
          programs that teach inner-city and rural youth life skills. No matter
          the situation, we meet them where they are — then inspire them with
          the possibilities and skills to go beyond.
        </motion.p>

        {/* Core four callout */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 font-serif text-sm tracking-wide text-[#c9a84c]/80"
        >
          Our framework: Food · Water · Energy · Shelter. Every program teaches all four.
        </motion.p>

        {/* CTAs — donate is dominant primary; timeline is a quiet text link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Link
            href="/donate"
            className="rounded-full bg-[#c8400e] px-12 py-4 text-base font-semibold text-white shadow-xl shadow-[#c8400e]/25 transition hover:bg-[#d9500f] hover:shadow-[#c8400e]/40"
          >
            Plant a seed — give $25 →
          </Link>
          <Link
            href="/#timeline"
            className="text-sm text-[#c9a84c]/55 transition hover:text-[#c9a84c]"
          >
            or see 5 years of work →
          </Link>
        </motion.div>

        {/* Stats strip — moved up to above fold */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 text-center sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-semibold text-[#c9a84c] md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/55">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="mx-auto h-6 w-px bg-[#c9a84c]/40" />
        <div className="mx-auto mt-1 h-1.5 w-1.5 rounded-full bg-[#c9a84c]/60" />
      </div>
    </section>
  )
}
