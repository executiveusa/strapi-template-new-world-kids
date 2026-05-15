'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TrustSignalsProps {
  locale?: string
}

export function TrustSignals({ locale = 'en' }: TrustSignalsProps) {
  const isSpanish = locale === 'es'
  const [donorCount, setDonorCount] = useState(0)
  const [totalRaised, setTotalRaised] = useState(0)

  // Animated counter effect
  useEffect(() => {
    // Fetch real numbers from API or use static values
    const targetDonors = 127
    const targetRaised = 18450

    const duration = 2000
    const steps = 60
    const donorIncrement = targetDonors / steps
    const raisedIncrement = targetRaised / steps

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps) {
        setDonorCount(Math.min(Math.floor(donorIncrement * currentStep), targetDonors))
        setTotalRaised(Math.min(Math.floor(raisedIncrement * currentStep), targetRaised))
        currentStep++
      } else {
        clearInterval(interval)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Social Proof Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="rounded-sm border border-emerald-500/20 bg-emerald-950/30 p-4">
          <div className="text-3xl font-bold text-emerald-400">{donorCount}+</div>
          <div className="mt-1 text-sm text-gray-400">
            {isSpanish ? 'Donantes' : 'Donors'}
          </div>
        </div>
        <div className="rounded-sm border border-blue-500/20 bg-blue-950/30 p-4">
          <div className="text-3xl font-bold text-blue-400">
            ${totalRaised.toLocaleString()}
          </div>
          <div className="mt-1 text-sm text-gray-400">
            {isSpanish ? 'Recaudado' : 'Raised'}
          </div>
        </div>
      </motion.div>

      {/* Security Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-sm border border-white/10 bg-white/[0.02] p-5"
      >
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {isSpanish ? 'Seguridad de pago' : 'Payment Security'}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-300">SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-300">PCI Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
            </svg>
            <span className="text-sm text-gray-300">Stripe Secure</span>
          </div>
        </div>
      </motion.div>

      {/* Recent Donor Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-sm border border-white/10 bg-white/[0.02] p-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <div>
            <div className="text-sm font-semibold text-white">Sarah M.</div>
            <div className="text-xs text-gray-400">
              {isSpanish ? 'Donante mensual' : 'Monthly Donor'}
            </div>
          </div>
        </div>
        <p className="text-sm italic leading-relaxed text-gray-300">
          {isSpanish
            ? '"Ver el progreso real en fotos y actualizaciones hace que cada donación se sienta significativa. Sé exactamente a dónde va mi dinero."'
            : '"Seeing the real progress in photos and updates makes every donation feel meaningful. I know exactly where my money goes."'}
        </p>
        <div className="mt-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </motion.div>

      {/* Transparency Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-sm border border-emerald-500/20 bg-emerald-950/20 p-5"
      >
        <div className="mb-2 flex items-center gap-2">
          <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm font-semibold text-emerald-300">
            {isSpanish ? 'Garantía de transparencia' : 'Transparency Guarantee'}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-gray-300">
          {isSpanish
            ? 'Cada donación se rastrea públicamente. Ves reportes trimestrales, fotos del campo y documentos financieros verificados. Sin sorpresas.'
            : 'Every donation is tracked publicly. You see quarterly reports, field photos, and verified financial documents. No surprises.'}
        </p>
      </motion.div>

      {/* Money Impact Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-sm border border-white/10 bg-white/[0.02] p-5"
      >
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {isSpanish ? 'Desglose de impacto' : 'Impact Breakdown'}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">
              {isSpanish ? 'Trabajo de campo directo' : 'Direct Field Work'}
            </span>
            <span className="font-semibold text-white">85%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">
              {isSpanish ? 'Documentación y transparencia' : 'Documentation & Transparency'}
            </span>
            <span className="font-semibold text-white">10%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '10%' }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">
              {isSpanish ? 'Operaciones (procesamiento de pagos)' : 'Operations (payment processing)'}
            </span>
            <span className="font-semibold text-white">5%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '5%' }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-full bg-gradient-to-r from-gray-500 to-gray-600"
            />
          </div>
        </div>
      </motion.div>

      {/* 501(c)(3) Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center justify-center gap-3 rounded-sm border border-white/10 bg-white/[0.02] p-4"
      >
        <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <div className="text-sm font-semibold text-white">501(c)(3) {isSpanish ? 'Verificado' : 'Verified'}</div>
          <div className="text-xs text-gray-400">
            {isSpanish ? 'Deducible de impuestos' : 'Tax-deductible'}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TrustSignals
