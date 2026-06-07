"use client"

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Link } from "@/lib/navigation"

import {
  heroFactStrip,
  heroFeatureCards,
  homepageStats,
  verificationLabels,
} from "../site/siteData"

// Animated counter hook
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return count
}

// Magnetic button component
function MagneticButton({
  children,
  href,
  className = "",
  primary = false,
}: {
  children: React.ReactNode
  href: string
  className?: string
  primary?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * 0.3
    const distanceY = (e.clientY - centerY) * 0.3

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-shadow ${
          primary
            ? "bg-[#c9a84c] text-[#091109] shadow-lg shadow-[#c9a84c]/30 hover:shadow-xl hover:shadow-[#c9a84c]/40"
            : "border border-white/10 bg-white/5 text-white/82 hover:bg-white/10"
        } ${className}`}
      >
        {children}
      </motion.div>
    </Link>
  )
}

export function CinematicHero() {
  const { scrollY } = useScroll()
  const containerRef = useRef<HTMLElement>(null)

  // Parallax values for background blobs
  const blob1Y = useTransform(scrollY, [0, 500], [0, -150])
  const blob2Y = useTransform(scrollY, [0, 500], [0, -100])
  const blob3Y = useTransform(scrollY, [0, 500], [0, -75])

  // Smooth parallax with springs
  const blob1Spring = useSpring(blob1Y, { stiffness: 100, damping: 30 })
  const blob2Spring = useSpring(blob2Y, { stiffness: 100, damping: 30 })
  const blob3Spring = useSpring(blob3Y, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-white/10 bg-[#091109]"
    >
      {/* Parallax Background Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: blob1Spring }}
          className="absolute inset-x-0 top-[-24rem] mx-auto h-[48rem] w-[48rem] rounded-full bg-[#c9a84c]/14 blur-3xl"
        />
        <motion.div
          style={{ y: blob2Spring }}
          className="absolute top-[14%] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          style={{ y: blob3Spring }}
          className="absolute bottom-[-12rem] left-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[#1d3f2b]/60 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(6,11,7,0.14),rgba(6,11,7,0.94))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(5,9,5,0.9))]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-81px)] max-w-7xl flex-col justify-end px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl pb-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/8 px-4 py-2 text-[11px] tracking-[0.24em] text-[#f7e7a7] uppercase"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-400"
              />
              Free regenerative education in Puerto Vallarta
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 max-w-5xl font-serif text-5xl font-semibold tracking-tight text-white md:text-7xl xl:text-[6.2rem] xl:leading-[0.92]"
            >
              We teach young people how to grow food, protect water, make
              energy, and build shelter.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-3xl text-lg leading-8 text-white/70 md:text-xl"
            >
              New World Kids is building a real learning site in Paso de
              Guayabo, Mexico where students practice the basics most systems
              leave out. The work is hands-on, tuition-free for accepted
              students, and designed to leave behind usable skills instead of
              empty inspiration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 rounded-[32px] border border-[#c9a84c]/25 bg-[#c9a84c]/8 p-6 md:p-7"
            >
              <p className="text-xs tracking-[0.22em] text-[#f7e7a7] uppercase">
                Our promise
              </p>
              <p className="mt-4 text-base leading-8 text-white/78 md:text-lg">
                If a young person shows up here, they should leave more capable,
                more employable, and more able to care for themselves and the
                people around them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton href="/donate" primary>
                Support the mission
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="/#timeline">
                See the timeline
              </MagneticButton>
              <MagneticButton href="/#hermes">Meet Hermes</MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 lg:pb-4"
          >
            {heroFeatureCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(201,168,76,0.12),rgba(20,41,28,0.82))] p-7"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_38%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs tracking-[0.24em] text-[#f7e7a7] uppercase">
                      {card.eyebrow}
                    </p>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] tracking-[0.18em] text-white/65 uppercase">
                      {verificationLabels["needs-review"]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    {card.body}
                  </p>
                  {"bullets" in card && card.bullets.length > 0 ? (
                    <ul className="mt-4 space-y-1.5">
                      {card.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[13px] leading-6 text-white/62"
                        >
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#c9a84c]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Animated Stats with Counters */}
        <div className="mt-14 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {homepageStats.map((stat, index) => (
              <AnimatedStatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="grid gap-3 rounded-[30px] border border-white/10 bg-white/[0.03] p-6"
          >
            {heroFactStrip.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-white/8 pb-3 last:border-b-0 last:pb-0 md:grid-cols-[150px_1fr]"
              >
                <p className="text-xs tracking-[0.22em] text-[#c9a84c] uppercase">
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-white/64">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Animated stat card with counter
function AnimatedStatCard({ stat, index }: { stat: any; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  // Extract number from stat value for animation
  const numericValue = Number.parseInt(stat.value.replaceAll(/\D/g, "")) || 0
  const count = useCountUp(isVisible ? numericValue : 0, 2000)
  const displayValue = stat.value.replace(/\d+/, String(count))

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="cursor-pointer rounded-[26px] border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <motion.p
          key={count}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
          className="font-serif text-4xl font-semibold text-[#c9a84c]"
        >
          {displayValue}
        </motion.p>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] tracking-[0.18em] text-white/56 uppercase">
          {verificationLabels[stat.status as keyof typeof verificationLabels]}
        </span>
      </div>
      <p className="mt-2 text-sm leading-7 text-white/60">{stat.label}</p>
      <p className="mt-3 text-xs leading-6 text-white/42">{stat.sourceNote}</p>
    </motion.article>
  )
}

export default CinematicHero
