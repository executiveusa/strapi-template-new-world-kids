'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Copy principle: Lead with the problem, then the solution ─────────────
// Proven nonprofit best practice: donors and grant makers respond to
// SPECIFICITY OF NEED before they respond to description of programs.
// Source: Bloomerang, Nonprofit Hub, AFP best-practice research.
// ─────────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: '01',
    icon: '🌿',
    title: 'Food',
    headline: 'Growing food is not a hobby here.',
    body: 'Our 1.5-acre food forest in Paso de Guayabo teaches regenerative agriculture using syntropic methods, GeoAg, and seawater farming. 200+ varieties. Real soil. Real food. Consumed by the families who grew it.',
  },
  {
    number: '02',
    icon: '💧',
    title: 'Water',
    headline: 'When the mountain gives water, you learn to keep it.',
    body: 'Rainwater harvesting, ferro-cement cisterns, clay-pot irrigation, and vertical hydroponics. Students cut water use by 90% versus conventional agriculture — and understand why it matters.',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Energy',
    headline: 'Solar. Wind. Micro-hydro. Biogas. No excuses.',
    body: 'The school runs off-grid. Starlink for connectivity. 12V DC lighting. Biodigesters turning food waste into cooking gas. Students don\'t just learn about off-grid living — they live it.',
  },
  {
    number: '04',
    icon: '🏠',
    title: 'Shelter',
    headline: 'Adobe lasts a thousand years if you build it right.',
    body: 'Our learning center is a restored adobe structure. Students learn natural building, geodesic dome assembly, and the "Roofs First" method — portable, affordable, and climate-appropriate.',
  },
]

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-sm p-8 transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(201,168,76,0.06)'
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
      }}
    >
      {/* Number */}
      <div
        className="font-mono text-xs mb-6 flex items-center gap-3"
        style={{ color: 'rgba(201,168,76,0.5)', letterSpacing: '0.15em' }}
      >
        <span>{pillar.number}</span>
        <span className="text-lg">{pillar.icon}</span>
        <span
          className="uppercase tracking-widest"
          style={{ color: '#C9A84C', fontSize: '0.65rem' }}
        >
          {pillar.title}
        </span>
      </div>

      {/* Headline */}
      <h3
        className="font-serif font-bold leading-tight mb-4 text-white"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.02em' }}
      >
        {pillar.headline}
      </h3>

      {/* Body */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'rgba(245,239,224,0.55)', lineHeight: 1.75 }}
      >
        {pillar.body}
      </p>

      {/* Bottom accent line — appears on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: '#C9A84C' }}
      />
    </motion.div>
  )
}

export function MissionSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: '#0A1610' }}
    >
      {/* Subtle divider at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10" style={{ background: '#C9A84C' }} />
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: '#C9A84C' }}
            >
              The Four Pillars
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Every human being needs four things.
            <br />
            <em
              className="not-italic"
              style={{ color: '#C9A84C' }}
            >
              We teach all four.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: 'rgba(245,239,224,0.6)', maxWidth: '52ch' }}
          >
            Schools teach memory. We teach survival — and from survival, we teach
            freedom. When young people know how to feed, hydrate, power, and house
            themselves, they stop working{' '}
            <em className="not-italic font-medium text-white">to survive</em> and
            start working{' '}
            <em className="not-italic font-medium text-white">to matter.</em>
          </motion.p>
        </div>

        {/* ── Four pillars grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>

        {/* ── Bottom callout ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            className="text-base font-light leading-relaxed"
            style={{ color: 'rgba(245,239,224,0.5)', maxWidth: '50ch' }}
          >
            All programs are{' '}
            <strong className="text-white font-medium">free</strong> to accepted
            students. We fund them through earned revenue, grants, and donors
            like you. No gatekeeping. No debt. No strings.
          </p>
          <a
            href="#programs"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest transition-colors duration-300"
            style={{ color: '#C9A84C', letterSpacing: '0.12em' }}
          >
            See our programs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
