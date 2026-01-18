import { VoiceEngine } from './voice-engine'
import { AgentPersona } from './agent-personas'
import { DEFAULT_ONBOARDING_FLOW, OnboardingAnswers } from './onboarding-state'
import { buildDashboardConfig, DashboardConfig } from './dashboard-builder'

export type ConversationMessage = {
  id: string
  speaker: 'agent' | 'client'
  text: string
}

export class OnboardingConversation {
  private readonly persona: AgentPersona
  private readonly voiceEngine: VoiceEngine
  private readonly answers: OnboardingAnswers = {}
  private currentStepIndex = 0

  constructor(persona: AgentPersona, voiceEngine = new VoiceEngine()) {
    this.persona = persona
    this.voiceEngine = voiceEngine
  }

  getCurrentPrompt(): string {
    return DEFAULT_ONBOARDING_FLOW[this.currentStepIndex]?.prompt ?? ''
  }

  getAnswers(): OnboardingAnswers {
    return this.answers
  }

  async start(): Promise<string> {
    const intro = `Hi! I'm ${this.persona.name}. Let's build your dashboard together. ${this.getCurrentPrompt()}`
    await this.voiceEngine.speak(intro, this.persona.voiceId)
    return intro
  }

  async acceptResponse(response: string): Promise<string> {
    const step = DEFAULT_ONBOARDING_FLOW[this.currentStepIndex]
    if (step) {
      this.answers[step.step] = response
      this.currentStepIndex += 1
    }

    const nextPrompt = this.getCurrentPrompt()
    if (nextPrompt) {
      await this.voiceEngine.speak(nextPrompt, this.persona.voiceId)
    }
    return nextPrompt
  }

  generateDashboardConfig(): DashboardConfig {
    return buildDashboardConfig(this.answers)
  }
}
