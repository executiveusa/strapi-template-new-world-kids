'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'

// ─── Photo Pipeline Notes ────────────────────────────────────────────────
// Each entry has a `photo` field. The value can be:
//   1. A local path: '/images/timeline/season-1.jpg'
//   2. A Google Drive direct link: 'https://drive.google.com/uc?id=FILE_ID'
//   3. A OneDrive direct link: 'https://onedrive.live.com/download?...'
//   4. Any public image URL
//
// HOW TO ADD PHOTOS FROM GOOGLE DRIVE:
//   Share the file → "Anyone with link can view"
//   Get the file ID from the URL: drive.google.com/file/d/FILE_ID/view
//   Use: https://drive.google.com/uc?export=view&id=FILE_ID
//
// HOW TO ADD PHOTOS FROM ONEDRIVE:
//   Right-click file → Share → Copy link
//   Replace "redir" with "download" in the URL
//
// For a full media pipeline (auto-sync from Drive/OneDrive → Supabase Storage),
// see the companion file: services/media-pipeline/README.md
// ─────────────────────────────────────────────────────────────────────────

export interface TimelineEntry {
  season: string
  year: string
  status: 'past' | 'current' | 'future'
  title: string
  tagline: string
  body: string
  highlights: string[]
  // Photo: local path, Google Drive URL, OneDrive URL, or any public URL
  // Leave as empty string to show placeholder gradient
  photo: string
  photoAlt?: string
  photoCredit?: string
}

// ── Real NWKids timeline — accurate to actual project history ─────────────
const TIMELINE: TimelineEntry[] = [
  {
    season: 'Season 1',
    year: '2020',
    status: 'past',
    title: 'The Land. The Idea. The Leap.',
    tagline: 'Completely degraded soil. Pure vision.',
    body: 'Volunteers from Seattle\'s Culture Shock program traveled to Paso de Guayabo, Puerto Vallarta. They rented 1.5 acres — land that couldn\'t support life. They started anyway. Soil regeneration techniques began. The network formed.',
    highlights: ['1.5 acres secured', 'Soil restoration begun', 'Volunteer network formed across 3 countries'],
    photo: '', // Add: https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
    photoAlt: 'Season 1 — Land preparation in Paso de Guayabo',
  },
  {
    season: 'Season 2',
    year: '2021–2022',
    status: 'past',
    title: 'Community. Proof. Momentum.',
    tagline: 'The neighborhood showed up. We listened.',
    body: 'Founder lived full-time in the community. Local children started arriving — to plant trees, learn, and just be there. The community gave food and water and trust. Early plants grew. Proof of concept: established.',
    highlights: ['Community relationships built', '15–20 local children engaged weekly', 'First plants thriving', 'Second language acquisition classes launched'],
    photo: '',
    photoAlt: 'Season 2 — Community engagement and early garden growth',
  },
  {
    season: 'Season 3',
    year: '2023–2025',
    status: 'current',
    title: '200 Plants. AI Layer. Hinge Moment.',
    tagline: 'The food forest is alive. Now we build the school.',
    body: 'Over 200 varieties of plants, trees, herbs, and flowers. Syntropic agriculture thriving. Hermes AI Agent under development. $25K fundraising campaign live. Applications to Microsoft AI for Good, Allen Foundation, and Google.org in progress. This is where the story turns.',
    highlights: ['200+ plant varieties growing', '$25K Season 3 fundraise live', 'Hermes AI Agent in development', 'Grant applications: Microsoft · Allen · Google.org'],
    photo: '',
    photoAlt: 'Season 3 — Food forest in full bloom',
  },
  {
    season: 'Season 4',
    year: '2025–2026',
    status: 'future',
    title: 'School Doors Open.',
    tagline: 'Five students. Real curriculum. Real change.',
    body: 'The learning center opens. Five Culture Shock students arrive from Seattle. Local neighborhood children join full programs. Hermes Agent goes live — posting, grant-hunting, logging all actions publicly. First B-Corp revenue flows to programs.',
    highlights: ['Learning center operational', '5 Culture Shock students onboarded', 'Hermes Agent live', 'Earn While You Learn stipends activated'],
    photo: '',
    photoAlt: 'Season 4 — Opening day (planned)',
  },
  {
    season: 'Season 5',
    year: '2026–2027',
    status: 'future',
    title: 'Scale. Replicate. Train the Trainers.',
    tagline: '45–50% food self-sufficient. Model documented.',
    body: 'Year-1 graduates take skills home. The food forest feeds the school. Seeds, plants, essential oils, and eco-tours generate revenue. The model is documented and ready to replicate anywhere in the world.',
    highlights: ['50% food self-sufficiency on site', 'Revenue streams diversified', 'Replication playbook ready', 'Afromations art auctions quarterly'],
    photo: '',
    photoAlt: 'Season 5 — Scale phase (planned)',
  },
  {
    season: 'Season 6',
    year: '2027–2030',
    status: 'future',
    title: 'Own the Land. Expand the Network.',
    tagline: '85% self-sufficient. Property acquisition. Global model.',
    body: 'If the owner will sell, we buy the land. If not, we build the next site. 85% food self-sufficient. Real estate investments fund new demonstration centers. NWKids becomes the model — open source, replicable, funded by the communities it serves.',
    highlights: ['85% food self-sufficient', 'Property acquisition decision', 'Global replication network', 'B-Corp social ventures profitable'],
    photo: '',
    photoAlt: 'Season 6 — Full vision (planned)',
  },
]

const STATUS_STYLES = {
  past: {
    dot: '#6B7280',
    label: 'Completed',
    labelBg: 'rgba(107,114,128,0.15)',
    labelColor: '#9CA3AF',
  },
  current: {
    dot: '#C9A84C',
    label: '★ Now',
    labelBg: 'rgba(201,168,76,0.15)',
    labelColor: '#C9A84C',
  },
  future: {
    dot: '#2E5B3C',
    label: 'Planned',
    labelBg: 'rgba(46,91,60,0.2)',
    labelColor: '#4CAF50',
  },
}

// Gradient placeholders when no photo is provided
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #1A3A2A 0%, #2E5B3C 100%)',
  'linear-gradient(135deg, #1C3C5A 0%, #2980b9 100%)',
  'linear-gradient(135deg, #0E1E14 0%, #C9A84C 100%)',
  'linear-gradient(135deg, #3D2B1F 0%, #8B4513 100%)',
  'linear-gradient(135deg, #1A3A2A 0%, #4CAF50 100%)',
  'linear-gradient(135deg, #0E1E14 0%, #1A3A2A 100%)',
]

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0
  const style = STATUS_STYLES[entry.status]
  const [imgError, setImgError] = useState(false)

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start gap-0 md:gap-16 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* ── Content side ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 md:py-8"
      >
        <div
          className="rounded-sm p-8 transition-all duration-300"
          style={{
            background: entry.status === 'current'
              ? 'rgba(201,168,76,0.06)'
              : 'rgba(255,255,255,0.025)',
            border: entry.status === 'current'
              ? '1px solid rgba(201,168,76,0.25)'
              : '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Status + Season row */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-sm uppercase tracking-widest"
              style={{
                background: style.labelBg,
                color: style.labelColor,
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
              }}
            >
              {style.label}
            </span>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}
            >
              {entry.season} · {entry.year}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-serif font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', letterSpacing: '-0.02em' }}
          >
            {entry.title}
          </h3>

          {/* Tagline */}
          <p
            className="font-medium mb-4 text-sm"
            style={{ color: '#C9A84C', letterSpacing: '0.02em' }}
          >
            {entry.tagline}
          </p>

          {/* Body */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: 'rgba(245,239,224,0.55)', lineHeight: 1.8 }}
          >
            {entry.body}
          </p>

          {/* Highlights */}
          <ul className="space-y-2">
            {entry.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: style.dot }}
                />
                <span
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(245,239,224,0.55)' }}
                >
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Center dot + line (desktop only) ── */}
      <div className="hidden md:flex flex-col items-center pt-8 shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div
            className="h-5 w-5 rounded-full z-10"
            style={{
              background: style.dot,
              boxShadow: entry.status === 'current' ? `0 0 0 6px rgba(201,168,76,0.2), 0 0 0 12px rgba(201,168,76,0.08)` : 'none',
            }}
          />
        </motion.div>
      </div>

      {/* ── Photo side ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 md:py-8"
      >
        <div
          className="relative rounded-sm overflow-hidden"
          style={{ aspectRatio: '16/9' }}
        >
          {entry.photo && !imgError ? (
            <Image
              src={entry.photo}
              alt={entry.photoAlt || entry.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            // Placeholder — swap with photo when ready
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length] }}
            >
              <span
                className="font-mono text-xs uppercase tracking-[0.2em] mb-2"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {entry.season}
              </span>
              <span
                className="font-serif font-bold text-4xl"
                style={{ color: 'rgba(255,255,255,0.1)' }}
              >
                {entry.year}
              </span>
              {/* Upload hint */}
              <div
                className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-sm px-2.5 py-1"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              >
                <svg className="w-3 h-3" fill="none" stroke="white" strokeOpacity={0.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">
                  Add photo via Drive
                </span>
              </div>
            </div>
          )}

          {/* Photo credit overlay */}
          {entry.photoCredit && (
            <div
              className="absolute bottom-2 left-3 text-[9px] font-mono"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              © {entry.photoCredit}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      style={{ background: '#080F0A' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10" style={{ background: '#C9A84C' }} />
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: '#C9A84C' }}
            >
              Building in Public
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            This is not a pitch deck.
            <br />
            <em className="not-italic" style={{ color: '#C9A84C' }}>
              This is what actually happened.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: 'rgba(245,239,224,0.55)', maxWidth: '52ch' }}
          >
            Every season documented. Every milestone real. We started in 2020 on
            completely degraded soil with volunteers and a proverb. Here&apos;s what
            five years of showing up looks like.
          </motion.p>
        </div>

        {/* ── Timeline entries ── */}
        <div className="relative">
          {/* Vertical progress line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            {/* Background track */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />
            {/* Animated progress */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                scaleY: lineScaleY,
                background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.2))',
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {TIMELINE.map((entry, i) => (
              <TimelineCard key={entry.season} entry={entry} index={i} />
            ))}
          </div>
        </div>

        {/* ── Photo pipeline callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mt-20 p-6 rounded-sm"
          style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.12)',
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <div
                className="h-8 w-8 rounded-sm flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.15)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="#C9A84C" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: '#C9A84C' }}
              >
                Photo Pipeline
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,239,224,0.45)' }}>
              <strong className="text-white/70">To add photos:</strong> Share from Google Drive or OneDrive →
              paste the direct link into the <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)' }}>photo</code> field
              in <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)' }}>TimelineSection.tsx</code>.
              Google Drive: share as "Anyone with link" → use{' '}
              <code className="font-mono text-xs" style={{ color: '#C9A84C' }}>
                drive.google.com/uc?export=view&amp;id=FILE_ID
              </code>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Export the TimelineEntry type for use in CMS/admin
export type { TimelineEntry }
