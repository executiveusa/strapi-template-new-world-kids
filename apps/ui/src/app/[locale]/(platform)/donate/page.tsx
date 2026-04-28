'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'

import { fiscalSponsor, supportRails } from '@/content/site'
import { Link } from '@/lib/navigation'

type DonationTier = {
  amount: number
  label: {
    en: string
    es: string
  }
  impact: {
    en: string
    es: string
  }
}

const TIERS: DonationTier[] = [
  {
    amount: 25,
    label: { en: 'Seeds', es: 'Semillas' },
    impact: {
      en: 'Helps cover seeds, soil amendments, and hands-on growing supplies.',
      es: 'Ayuda a cubrir semillas, mejoradores de suelo y materiales practicos de cultivo.',
    },
  },
  {
    amount: 50,
    label: { en: 'Water', es: 'Agua' },
    impact: {
      en: 'Supports irrigation materials and water-saving systems for one learning bed.',
      es: 'Apoya materiales de riego y sistemas de ahorro de agua para una cama de aprendizaje.',
    },
  },
  {
    amount: 100,
    label: { en: 'Power', es: 'Energia' },
    impact: {
      en: 'Helps keep connectivity, tools, and off-grid energy systems running.',
      es: 'Ayuda a mantener conectividad, herramientas y sistemas de energia fuera de la red.',
    },
  },
  {
    amount: 250,
    label: { en: 'Shelter', es: 'Refugio' },
    impact: {
      en: 'Supports natural building materials, repairs, and learning space improvements.',
      es: 'Apoya materiales de bioconstruccion, reparaciones y mejoras del espacio de aprendizaje.',
    },
  },
  {
    amount: 500,
    label: { en: 'Field Work', es: 'Trabajo de campo' },
    impact: {
      en: 'Funds a deeper month of boots-on-the-ground program work across the four pillars.',
      es: 'Financia un mes mas profundo de trabajo de campo a traves de los cuatro pilares.',
    },
  },
  {
    amount: 1000,
    label: { en: 'Season Builder', es: 'Constructor de temporada' },
    impact: {
      en: 'Helps move an entire season forward with tools, labor, reporting, and public proof.',
      es: 'Ayuda a mover una temporada completa con herramientas, trabajo, reportes y prueba publica.',
    },
  },
]

const MATCHING_COMPANIES = ['Microsoft', 'Google', 'Amazon', 'Boeing']

export default function DonatePage() {
  const locale = useLocale()
  const isSpanish = locale === 'es'
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly')
  const [isCustom, setIsCustom] = useState(false)

  const effectiveAmount = isCustom ? Number.parseFloat(customAmount) || 0 : selectedAmount
  const selectedTier = TIERS.find((tier) => tier.amount === selectedAmount)

  const donorboxUrl = useMemo(() => {
    const baseUrl =
      supportRails.donorbox === '/donate'
        ? 'https://www.humanitariansocialinnovations.org/donate'
        : supportRails.donorbox

    const url = new URL(baseUrl, 'https://newworldkids.org')
    url.searchParams.set('project', 'nwkids')
    url.searchParams.set('amount', String(effectiveAmount || selectedAmount))
    url.searchParams.set('frequency', frequency)
    return url.toString()
  }, [effectiveAmount, frequency, selectedAmount])

  return (
    <div className="bg-[#080F0A]">
      <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-14">
        <div className="space-y-8 lg:pr-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {isSpanish ? 'Apoya los cuatro pilares' : 'Support the four pillars'}
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {isSpanish
                ? 'Dona una vez. Sostiene alimento, agua, energia y refugio.'
                : 'Give once. Strengthen food, water, energy, and shelter.'}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#E8DEC7]/68">
              {isSpanish
                ? 'New World Kids financia trabajo real de campo, educacion regenerativa y publicacion transparente. Queremos que la mision se entienda rapido, que la verificacion este visible y que donar sea facil.'
                : 'New World Kids funds real field work, regenerative education, and transparent publishing. The mission should be easy to grasp, the proof should be visible, and giving should feel frictionless.'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: isSpanish ? 'Patrocinio fiscal verificado' : 'Verified fiscal sponsorship',
                body: `${fiscalSponsor.name} | EIN ${fiscalSponsor.ein}`,
              },
              {
                title: isSpanish ? 'Donaciones deducibles' : 'Tax-deductible giving',
                body: isSpanish
                  ? 'La donacion principal pasa por la via benefica.'
                  : 'Primary donations run through the nonprofit rail.',
              },
              {
                title: isSpanish ? 'Prueba publica' : 'Public proof',
                body: isSpanish
                  ? 'Documentos, bitacora y actualizaciones visibles.'
                  : 'Documents, journal entries, and updates stay visible.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-[#E8DEC7]/58">{item.body}</div>
              </div>
            ))}
          </div>

          <div className="rounded-sm border border-[#C9A84C]/20 bg-[#0B1510] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
                  {isSpanish ? 'Lo que financias' : 'What You Fund'}
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  {isSpanish ? 'Trabajo real, no humo' : 'Real work, not vague promises'}
                </div>
              </div>
              <div className="rounded-sm border border-white/10 px-3 py-2 text-right">
                <div className="text-xs uppercase tracking-[0.18em] text-[#E8DEC7]/45">
                  {isSpanish ? 'Meta actual' : 'Current Goal'}
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-[#C9A84C]">$25,000</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: isSpanish ? 'Alimentos' : 'Food',
                  value: isSpanish ? 'Bosque comestible, semillas y aprendizaje practico' : 'Food forest, seeds, and hands-on learning',
                },
                {
                  label: isSpanish ? 'Agua' : 'Water',
                  value: isSpanish ? 'Captacion, almacenamiento y sistemas de riego inteligente' : 'Capture, storage, and smart irrigation systems',
                },
                {
                  label: isSpanish ? 'Energia' : 'Energy',
                  value: isSpanish ? 'Conectividad, energia fuera de red y herramientas activas' : 'Connectivity, off-grid power, and active tools',
                },
                {
                  label: isSpanish ? 'Refugio' : 'Shelter',
                  value: isSpanish ? 'Bioconstruccion, reparacion y espacio seguro de aprendizaje' : 'Natural building, repair, and safe learning space',
                },
              ].map((line) => (
                <div
                  key={line.label}
                  className="flex flex-col justify-between gap-2 border-b border-white/6 pb-3 text-sm sm:flex-row sm:items-center"
                >
                  <span className="font-medium text-white">{line.label}</span>
                  <span className="text-[#E8DEC7]/58">{line.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-white/10 bg-white/[0.025] p-6">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {isSpanish ? 'Doble impacto' : 'Double Your Impact'}
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#E8DEC7]/62">
              {isSpanish
                ? 'Si trabajas en una empresa con match benefico, tu donacion puede duplicarse. Empieza con Microsoft, Google, Amazon o Boeing y revisa el portal de beneficios de tu empresa.'
                : 'If your employer matches charitable gifts, your donation can go further. Start with Microsoft, Google, Amazon, or Boeing and check your company benefits portal after giving.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {MATCHING_COMPANIES.map((company) => (
                <span
                  key={company}
                  className="rounded-sm border border-[#C9A84C]/20 bg-[#C9A84C]/8 px-3 py-1.5 text-xs font-medium text-[#E3C573]"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-28"
        >
          <div className="rounded-sm border border-white/10 bg-[#0E1A13] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
                  {isSpanish ? 'Donacion principal' : 'Primary Donation'}
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  {isSpanish ? 'Apoya el trabajo de campo' : 'Back the field work'}
                </div>
              </div>
              <Link href="/trust" locale={locale} className="text-sm text-[#C9A84C] hover:text-[#E3C573]">
                {isSpanish ? 'Verificacion' : 'Verification'}
              </Link>
            </div>

            <div className="mb-6 grid grid-cols-2 overflow-hidden rounded-sm bg-white/[0.04]">
              {(['monthly', 'once'] as const).map((option) => {
                const active = frequency === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFrequency(option)}
                    className="h-11 text-sm font-semibold uppercase tracking-[0.16em] transition-colors"
                    style={{
                      background: active ? '#C9A84C' : 'transparent',
                      color: active ? '#08100B' : 'rgba(232,222,199,0.62)',
                    }}
                  >
                    {option === 'monthly'
                      ? isSpanish
                        ? 'Mensual'
                        : 'Monthly'
                      : isSpanish
                        ? 'Una vez'
                        : 'One time'}
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIERS.map((tier) => {
                const active = !isCustom && selectedAmount === tier.amount
                return (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(tier.amount)
                      setIsCustom(false)
                    }}
                    className="rounded-sm border px-3 py-3 text-left transition-colors"
                    style={{
                      borderColor: active ? 'rgba(201,168,76,0.45)' : 'rgba(255,255,255,0.08)',
                      background: active ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <div className="font-serif text-2xl font-bold text-white">${tier.amount}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#C9A84C]">
                      {isSpanish ? tier.label.es : tier.label.en}
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-sm border border-white/10 bg-white/[0.03] px-4 text-sm text-[#E8DEC7]/70"
            >
              {isCustom ? (
                <input
                  autoFocus
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  placeholder={isSpanish ? 'Ingresa monto' : 'Enter amount'}
                  className="w-full bg-transparent text-center text-[#C9A84C] outline-none placeholder:text-[#E8DEC7]/25"
                />
              ) : (
                <span>{isSpanish ? 'Monto personalizado' : 'Custom amount'}</span>
              )}
            </button>

            {selectedTier && !isCustom && (
              <div className="mt-4 rounded-sm border border-[#C9A84C]/15 bg-[#C9A84C]/6 p-4 text-sm leading-7 text-[#E8DEC7]/68">
                <span className="font-semibold text-white">
                  ${selectedTier.amount}{' '}
                </span>
                {isSpanish ? selectedTier.impact.es : selectedTier.impact.en}
              </div>
            )}

            <a
              href={donorboxUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex h-13 w-full items-center justify-center rounded-sm bg-[#C9A84C] px-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#08100B] transition-colors hover:bg-[#D7B867]"
            >
              {frequency === 'monthly'
                ? isSpanish
                  ? `Dar mensual - $${effectiveAmount || selectedAmount}`
                  : `Give monthly - $${effectiveAmount || selectedAmount}`
                : isSpanish
                  ? `Donar ahora - $${effectiveAmount || selectedAmount}`
                  : `Donate now - $${effectiveAmount || selectedAmount}`}
            </a>

            <div className="mt-4 text-center text-xs leading-6 text-[#E8DEC7]/45">
              {isSpanish
                ? `Donacion principal bajo patrocinio fiscal de ${fiscalSponsor.name}. EIN ${fiscalSponsor.ein}.`
                : `Primary donation rail under the fiscal sponsorship of ${fiscalSponsor.name}. EIN ${fiscalSponsor.ein}.`}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
                {isSpanish ? 'Otras formas de apoyar' : 'Other Ways to Support'}
              </div>

              <div className="mt-4 grid gap-3">
                <a
                  href={supportRails.buyMeACoffee}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="text-sm font-semibold text-white">Buy Me a Coffee</div>
                  <div className="mt-1 text-sm leading-6 text-[#E8DEC7]/58">
                    {isSpanish
                      ? 'Apoyo rapido para nuestro trabajo editorial y creativo.'
                      : 'Quick support for the editorial and creative side of the work.'}
                  </div>
                </a>
                <a
                  href={supportRails.creem}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="text-sm font-semibold text-white">
                    {isSpanish ? 'Contrata nuestros servicios' : 'Hire our services'}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-[#E8DEC7]/58">
                    {isSpanish
                      ? 'AI, medios y sistemas de confianza para equipos con mision.'
                      : 'AI, media, and trust systems for mission-driven teams.'}
                  </div>
                </a>
                <a
                  href={supportRails.blog}
                  className="rounded-sm border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="text-sm font-semibold text-white">
                    {isSpanish ? 'Lee la bitacora' : 'Read the journal'}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-[#E8DEC7]/58">
                    {isSpanish
                      ? 'Historias de campo, prueba y contexto para personas que quieren mirar mas de cerca.'
                      : 'Field stories, proof, and context for people who want to look closer.'}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
