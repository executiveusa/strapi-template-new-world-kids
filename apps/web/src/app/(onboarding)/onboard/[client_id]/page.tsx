'use client'

import { useState } from 'react'
import { AgentSelector } from '@/components/voice-agent/AgentSelector'
import { DemoVideo } from '@/components/voice-agent/DemoVideo'
import { VoiceAgentUI } from '@/components/voice-agent/VoiceAgentUI'
import { DashboardPreview } from '@/components/voice-agent/DashboardPreview'
import { AgentPersona } from '@/lib/voice-agent/agent-personas'
import { DashboardConfig } from '@/lib/voice-agent/dashboard-builder'

type Step = 'video' | 'agent-select' | 'conversation' | 'preview'

type OnboardingPageProps = {
  params: { client_id: string }
}

export default function OnboardingPage({ params }: OnboardingPageProps) {
  const [step, setStep] = useState<Step>('video')
  const [selectedAgent, setSelectedAgent] = useState<AgentPersona | null>(null)
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig | null>(null)

  if (step === 'video') {
    return (
      <DemoVideo
        clientId={params.client_id}
        onComplete={() => setStep('agent-select')}
      />
    )
  }

  if (step === 'agent-select') {
    return (
      <AgentSelector
        onSelect={(agent) => {
          setSelectedAgent(agent)
          setStep('conversation')
        }}
      />
    )
  }

  if (step === 'conversation' && selectedAgent) {
    return (
      <VoiceAgentUI
        agent={selectedAgent}
        clientId={params.client_id}
        onComplete={(config) => {
          setDashboardConfig(config)
          setStep('preview')
        }}
      />
    )
  }

  if (step === 'preview' && dashboardConfig) {
    return <DashboardPreview config={dashboardConfig} />
  }

  return null
}
