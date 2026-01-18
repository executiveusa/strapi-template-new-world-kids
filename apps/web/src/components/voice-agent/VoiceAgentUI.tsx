'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'
import { AgentPersona } from '@/lib/voice-agent/agent-personas'
import { OnboardingConversation, ConversationMessage } from '@/lib/voice-agent/conversation-flow'

const createMessage = (speaker: 'agent' | 'client', text: string): ConversationMessage => ({
  id: `${speaker}-${Date.now()}-${Math.random()}`,
  speaker,
  text,
})

type VoiceAgentUIProps = {
  agent: AgentPersona
  clientId: string
  onComplete: (config: ReturnType<OnboardingConversation['generateDashboardConfig']>) => void
}

export function VoiceAgentUI({ agent, onComplete }: VoiceAgentUIProps) {
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [isListening, setIsListening] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState('')
  const conversation = useMemo(() => new OnboardingConversation(agent), [agent])

  useEffect(() => {
    const startConversation = async () => {
      const intro = await conversation.start()
      setMessages([createMessage('agent', intro)])
      setCurrentPrompt(conversation.getCurrentPrompt())
    }

    startConversation()
  }, [conversation])

  const handleResponse = async () => {
    if (!currentPrompt) return
    const simulatedResponse = 'We focus on youth education and mentorship.'
    setMessages((prev) => [...prev, createMessage('client', simulatedResponse)])

    const nextPrompt = await conversation.acceptResponse(simulatedResponse)
    if (nextPrompt) {
      setMessages((prev) => [...prev, createMessage('agent', nextPrompt)])
      setCurrentPrompt(nextPrompt)
    } else {
      onComplete(conversation.generateDashboardConfig())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-blue-950 text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
            {agent.name[0]}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{agent.name}</h2>
            <p className="text-slate-300 text-sm">{agent.description}</p>
          </div>
        </div>

        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  message.speaker === 'agent' ? 'bg-blue-500/20 text-white' : 'bg-emerald-500/20 text-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {message.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Voice capture preview</p>
            <p className="text-xs text-slate-500">Transcript simulation until audio pipeline is wired.</p>
          </div>
          <button
            className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold"
            onClick={() => {
              setIsListening((prev) => !prev)
              void handleResponse()
            }}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? 'Stop' : 'Reply'}
          </button>
        </div>
      </div>
    </div>
  )
}
