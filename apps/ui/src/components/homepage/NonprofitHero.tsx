'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── Design Decisions (UDEC 8.9/10) ────────────────────────────────────────
// Tone: Organic-editorial. Earth deep + gold accent. Not charity-blue.
// Unforgettable element: The African proverb as a typographic anchor —
//   massive, cropped, bleeds off-screen. You feel it before you read it.
// Motion: Parallax layers (bg/mid/fg) + staggered text reveal on load.
//   One cinematic moment. Nothing decorative.
// Hierarchy: Proverb → Who We Are (1 sentence) → What We Do → CTAs → Proof strip
// Copy: Nonprofit best practice — lead with human stakes, not org description.
// ────────────────────────────────────────────────────────────────────────────

const PROVERB = "If you think you're too small to make a difference, try sleeping with a mosquito in the room."
const PROVERB_ATTRIBUTION = "— African Proverb"

const STATS = [
  { value: '200+', label: 'plant varieties growing' },
  { value: '5+', label: 'years boots on the ground' },
  { value: '4', label: 'countries, one mission' },
  { value: '$0', label: 'cost to every student' },
]

// Staggered text reveal — word by word
function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function NonprofitHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax layers at different speeds
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-8%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#0E1E14' }} // Deep forest — not generic black
    >
      {/* ── Layer 1: Grain texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Layer 2: Radial gradient atmosphere ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 60% 40%, rgba(201,168,76,0.09) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 5% 80%, rgba(46,91,60,0.35) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* ── Layer 3: Massive background proverb text ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden"
        style={{ y: bgY, opacity: 0.028 }}
        aria-hidden="true"
      >
        <p
          className="w-full text-center font-serif font-black leading-none text-white select-none"
          style={{ fontSize: 'clamp(6rem, 18vw, 22rem)', letterSpacing: '-0.04em' }}
        >
          MOSQUITO
        </p>
      </motion.div>

      {/* ── Layer 4: Top trust bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5 md:px-14"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-sm flex items-center justify-center"
            style={{ background: '#C9A84C' }}
          >
            <span className="text-xs font-black text-[#0E1E14]">NW</span>
          </div>
          <span
            className="font-serif font-bold text-white text-lg tracking-tight hidden sm:block"
            style={{ letterSpacing: '-0.02em' }}
          >
            New World Kids
          </span>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-3">
          <div
            className="hidden md:flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(245,239,224,0.65)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: '#4CAF50' }}
            />
            501(c)(3) · EIN 46-4779591
          </div>
          <div
            className="hidden sm:flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(245,239,224,0.65)',
            }}
          >
            Fiscal Sponsor: Humanitarian Social Innovations
          </div>
        </div>
      </motion.div>

      {/* ── Layer 5: Main content ── */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-20 flex flex-col justify-center min-h-screen px-8 md:px-14 lg:px-20 pt-24 pb-16"
      >
        <div className="max-w-6xl">

          {/* Eyebrow label */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-3 mb-10"
            >
              <div
                className="h-px w-10"
                style={{ background: '#C9A84C' }}
              />
              <span
                className="font-mono text-xs tracking-[0.2em] uppercase"
                style={{ color: '#C9A84C' }}
              >
                Boots on the Ground · Building in Public · Since 2020
              </span>
            </motion.div>
          )}

          {/* ── THE PROVERB — This is the moment ── */}
          {mounted && (
            <div className="mb-10 overflow-hidden">
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p
                  className="font-serif font-bold text-white leading-[1.05]"
                  style={{
                    fontSize: 'clamp(2rem, 5.5vw, 5rem)',
                    letterSpacing: '-0.03em',
                    maxWidth: '18ch',
                  }}
                >
                  <RevealText text={PROVERB} delay={0.5} />
                </p>
                <motion.cite
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="not-italic mt-4 block font-mono text-sm"
                  style={{ color: '#C9A84C', letterSpacing: '0.06em' }}
                >
                  {PROVERB_ATTRIBUTION}
                </motion.cite>
              </motion.blockquote>
            </div>
          )}

          {/* Separator line */}
          {mounted && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '1px',
                background: 'rgba(201,168,76,0.25)',
                marginBottom: '2.5rem',
                maxWidth: '48rem',
                transformOrigin: 'left',
              }}
            />
          )}

          {/* One-sentence mission */}
          {mounted && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl font-light leading-relaxed mb-10"
              style={{
                color: 'rgba(245,239,224,0.78)',
                maxWidth: '48rem',
                letterSpacing: '-0.01em',
              }}
            >
              We run food forests, life skills programs, and AI-powered media
              services in real communities — funding youth education with earned
              revenue, and tracking{' '}
              <em className="not-italic font-medium text-white">
                every result in public.
              </em>
            </motion.p>
          )}

          {/* CTAs */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-20"
            >
              <Link
                href="/donate"
                className="group relative inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300"
                style={{
                  background: '#C9A84C',
                  color: '#0E1E14',
                  letterSpacing: '0.12em',
                }}
              >
                <span className="relative z-10">Support the Mission</span>
                <motion.svg
                  className="relative z-10 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
                {/* Hover shimmer */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
                  style={{ background: '#E8C97A' }}
                />
              </Link>

              <Link
                href="#timeline"
                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
                style={{ color: 'rgba(245,239,224,0.55)', letterSpacing: '0.04em' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(245,239,224,0.95)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(245,239,224,0.55)'
                }}
              >
                <span>See what we&apos;ve built</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </motion.div>
          )}

          {/* ── Proof strip ── */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.8 }}
              className="flex flex-wrap gap-x-10 gap-y-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 + i * 0.08, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <span
                    className="font-serif font-bold leading-none"
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#C9A84C' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-mono text-xs mt-1.5 uppercase tracking-widest"
                    style={{ color: 'rgba(245,239,224,0.4)', letterSpacing: '0.12em' }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 right-10 z-30 hidden md:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Scroll
            </span>
            <div
              className="w-px h-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
