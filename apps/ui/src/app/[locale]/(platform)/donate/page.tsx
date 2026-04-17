'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── Nonprofit donation best practice ────────────────────────────────────
// 1. Lead with impact, not org description
// 2. Named tiers with specific outcomes (not just dollar amounts)
// 3. Monthly giving prominently featured (LTV > one-time)
// 4. Corporate matching surfaced immediately (Microsoft/Amazon/Google)
// 5. Tax info visible, not buried
// 6. EIN displayed — builds trust with grant-savvy donors
// Source: Blackbaud Institute, Network for Good, AFP research
// ─────────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    amount: 25,
    label: 'Seed',
    impact: 'Plants seeds and planting materials for one bed in the food forest.',
    emoji: '🌱',
  },
  {
    amount: 50,
    label: 'Root',
    impact: 'Sponsors one local child\'s participation in our programs for a full month.',
    emoji: '🌿',
  },
  {
    amount: 100,
    label: 'Branch',
    impact: 'Funds language acquisition materials for 5 students for one month.',
    emoji: '🌳',
    popular: true,
  },
  {
    amount: 250,
    label: 'Forest',
    impact: 'Builds one clay-pot irrigation system — cutting water use by 90% for a grow bed.',
    emoji: '💧',
  },
  {
    amount: 500,
    label: 'Season',
    impact: 'Covers one month of Earn While You Learn stipends — so a student can learn instead of just survive.',
    emoji: '✨',
  },
  {
    amount: 1000,
    label: 'Foundation',
    impact: 'Funds construction materials for one learning center element — a classroom, greenhouse, or cistern.',
    emoji: '🏗️',
  },
]

const MATCHING_COMPANIES = [
  { name: 'Microsoft', ratio: '2:1', note: 'doubles your gift' },
  { name: 'Amazon', ratio: '1:1', note: 'matches dollar for dollar' },
  { name: 'Google', ratio: '1:1', note: 'matches dollar for dollar' },
  { name: 'Boeing', ratio: '1:1', note: 'matches dollar for dollar' },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly')
  const [isCustom, setIsCustom] = useState(false)

  const effectiveAmount = isCustom
    ? parseFloat(customAmount) || 0
    : selectedAmount

  const selectedTier = TIERS.find((t) => t.amount === selectedAmount)

  return (
    <div
      className="min-h-screen"
      style={{ background: '#080F0A' }}
    >
      {/* ── Header ── */}
      <div
        className="border-b px-8 md:px-14 py-5 flex items-center justify-between"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-sm"
          style={{ color: 'rgba(245,239,224,0.5)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to site
        </Link>
        <div
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: 'rgba(201,168,76,0.6)', letterSpacing: '0.12em' }}
        >
          Secure Donation · EIN 46-4779591
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-14 py-16 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">

        {/* ── Left: Context ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10" style={{ background: '#C9A84C' }} />
              <span
                className="font-mono text-xs tracking-[0.2em] uppercase"
                style={{ color: '#C9A84C' }}
              >
                Make a Difference
              </span>
            </div>

            <h1
              className="font-serif font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em' }}
            >
              Your gift opens
              <br />
              <em className="not-italic" style={{ color: '#C9A84C' }}>
                school doors.
              </em>
            </h1>

            <p
              className="text-lg leading-relaxed mb-12"
              style={{ color: 'rgba(245,239,224,0.6)', maxWidth: '44ch' }}
            >
              We need $25,000 to complete Season 3 — the infrastructure,
              staff, and safety work that lets us open the Proyecto Indigo
              Azul learning center to our first student cohort. Every dollar
              is tracked publicly.
            </p>

            {/* Progress bar */}
            <div className="mb-12">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm font-medium text-white">Season 3 Goal</span>
                <span
                  className="font-serif font-bold text-2xl"
                  style={{ color: '#C9A84C' }}
                >
                  $25,000
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full origin-left"
                  style={{
                    background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
                    width: '32%', // Update with real progress
                  }}
                />
              </div>
              <div
                className="flex justify-between mt-2 font-mono text-xs"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <span>$8,000 raised</span>
                <span>32% of goal</span>
              </div>
            </div>

            {/* Where it goes */}
            <div
              className="rounded-sm p-6 mb-8"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h3
                className="font-mono text-xs uppercase tracking-widest mb-5"
                style={{ color: 'rgba(201,168,76,0.7)' }}
              >
                Season 3 Budget
              </h3>
              {[
                { label: 'Construction & infrastructure', amount: '$12,000' },
                { label: 'Staff: gardener, teachers, dev', amount: '$8,000' },
                { label: 'Food systems & tools', amount: '$2,000' },
                { label: 'Property rental (2025)', amount: '$4,800' },
                { label: 'Utilities & Starlink', amount: '$1,500' },
                { label: 'Emergency reserve', amount: '$1,700' },
              ].map((line) => (
                <div
                  key={line.label}
                  className="flex justify-between items-center py-2.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="text-sm" style={{ color: 'rgba(245,239,224,0.55)' }}>
                    {line.label}
                  </span>
                  <span className="text-sm font-medium text-white">{line.amount}</span>
                </div>
              ))}
            </div>

            {/* Corporate matching */}
            <div
              className="rounded-sm p-5"
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: '#C9A84C' }}>💼</span>
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: '#C9A84C' }}
                >
                  Corporate Matching — Double Your Impact
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MATCHING_COMPANIES.map((co) => (
                  <div key={co.name} className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs px-1.5 py-0.5 rounded-sm font-bold"
                      style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
                    >
                      {co.ratio}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(245,239,224,0.5)' }}>
                      {co.name} — {co.note}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="mt-4 text-xs leading-relaxed"
                style={{ color: 'rgba(245,239,224,0.4)' }}
              >
                Check with your HR/benefits portal to submit a matching request
                after donating.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Right: Donation form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-24"
        >
          <div
            className="rounded-sm p-8"
            style={{
              background: '#0E1E14',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Frequency toggle */}
            <div
              className="flex rounded-sm overflow-hidden mb-8"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              {(['monthly', 'once'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className="flex-1 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200"
                  style={{
                    letterSpacing: '0.1em',
                    background: frequency === f ? '#C9A84C' : 'transparent',
                    color: frequency === f ? '#0E1E14' : 'rgba(245,239,224,0.4)',
                    fontSize: '0.72rem',
                  }}
                >
                  {f === 'monthly' ? '★ Monthly' : 'One-time'}
                </button>
              ))}
            </div>

            {frequency === 'monthly' && (
              <p
                className="text-xs text-center mb-6 -mt-4"
                style={{ color: 'rgba(201,168,76,0.7)' }}
              >
                Monthly donors are our most powerful supporters. Cancel anytime.
              </p>
            )}

            {/* Amount grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {TIERS.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => { setSelectedAmount(tier.amount); setIsCustom(false) }}
                  className="relative rounded-sm py-3 text-center transition-all duration-200"
                  style={{
                    background: !isCustom && selectedAmount === tier.amount
                      ? 'rgba(201,168,76,0.15)'
                      : 'rgba(255,255,255,0.04)',
                    border: !isCustom && selectedAmount === tier.amount
                      ? '1px solid rgba(201,168,76,0.5)'
                      : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {tier.popular && (
                    <span
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm"
                      style={{ background: '#C9A84C', color: '#0E1E14', whiteSpace: 'nowrap' }}
                    >
                      Most popular
                    </span>
                  )}
                  <div
                    className="font-serif font-bold"
                    style={{
                      color: !isCustom && selectedAmount === tier.amount ? '#C9A84C' : 'rgba(255,255,255,0.7)',
                      fontSize: '1.1rem',
                    }}
                  >
                    ${tier.amount}
                  </div>
                  <div
                    className="text-[9px] font-mono uppercase tracking-wider mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {tier.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <button
                onClick={() => setIsCustom(true)}
                className="w-full rounded-sm py-3 text-sm transition-all duration-200 text-center"
                style={{
                  background: isCustom ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)',
                  border: isCustom ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  color: isCustom ? '#C9A84C' : 'rgba(255,255,255,0.4)',
                }}
              >
                {isCustom ? (
                  <input
                    autoFocus
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-transparent text-center outline-none placeholder:text-white/20"
                    style={{ color: '#C9A84C' }}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  'Custom amount'
                )}
              </button>
            </div>

            {/* Impact line */}
            {!isCustom && selectedTier && (
              <motion.div
                key={selectedTier.amount}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 rounded-sm text-sm leading-relaxed"
                style={{
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: 'rgba(245,239,224,0.65)',
                }}
              >
                <span style={{ color: '#C9A84C' }}>{selectedTier.emoji} </span>
                <strong style={{ color: 'rgba(245,239,224,0.85)' }}>${selectedTier.amount}</strong>{' '}
                {selectedTier.impact}
              </motion.div>
            )}

            {/* Donate CTA */}
            <a
              href={`https://www.humanitariansocialinnovations.org/donate?project=nwkids&amount=${effectiveAmount}&frequency=${frequency}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full rounded-sm py-4 text-center text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden"
              style={{
                background: '#C9A84C',
                color: '#0E1E14',
                letterSpacing: '0.12em',
              }}
            >
              <span className="relative z-10">
                {frequency === 'monthly' ? 'Give Monthly' : 'Donate'} — ${effectiveAmount || '—'}
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: '#E8C97A' }}
              />
            </a>

            {/* Trust footer */}
            <div className="mt-5 space-y-2">
              <p
                className="text-center font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}
              >
                Secure · Tax-deductible · EIN 46-4779591
              </p>
              <p
                className="text-center text-[10px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                Fiscally sponsored by Humanitarian Social Innovations,
                a 501(c)(3) nonprofit. All donations are tax-deductible
                to the extent allowed by law.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
