'use client'

import { motion } from 'framer-motion'

type DemoVideoProps = {
  clientId: string
  onComplete: () => void
}

export function DemoVideo({ clientId, onComplete }: DemoVideoProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        className="max-w-3xl w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Welcome to your personalized dashboard</h1>
        <p className="text-slate-300 mb-6">
          We prepared a 60-second preview for your organization (ID: {clientId}). When you are ready,
          continue to select your onboarding guide.
        </p>
        <div className="aspect-video rounded-2xl bg-slate-900/80 flex items-center justify-center text-slate-400">
          Demo video placeholder
        </div>
        <button
          className="mt-6 w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 py-3 text-sm font-semibold"
          onClick={onComplete}
        >
          Continue to onboarding
        </button>
      </motion.div>
    </div>
  )
}
