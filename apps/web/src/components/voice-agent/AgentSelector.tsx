'use client'

import { motion } from 'framer-motion'
import { AGENT_PERSONAS, AgentPersona } from '@/lib/voice-agent/agent-personas'

type AgentSelectorProps = {
  onSelect: (agent: AgentPersona) => void
}

export function AgentSelector({ onSelect }: AgentSelectorProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">Choose your onboarding guide</h1>
      <p className="text-slate-300 mb-10 max-w-2xl text-center">
        Pick the voice persona that feels right for your organization. You can always change later.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {AGENT_PERSONAS.map((agent) => (
          <motion.button
            key={agent.id}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left shadow-lg transition hover:border-purple-500/60"
            whileHover={{ y: -4 }}
            onClick={() => onSelect(agent)}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-lg">{agent.name[0]}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{agent.name}</h2>
                <p className="text-sm text-slate-400">{agent.description}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">{agent.personality}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
