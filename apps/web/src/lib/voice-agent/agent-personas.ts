export type AgentPersona = {
  id: string
  name: string
  description: string
  voiceId: string
  personality: string
  avatar: string
}

export const AGENT_PERSONAS: AgentPersona[] = [
  {
    id: 'nova',
    name: 'Nova',
    description: 'Professional, empathetic guide',
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    personality: 'warm, professional, experienced',
    avatar: '/agents/nova.png',
  },
  {
    id: 'echo',
    name: 'Echo',
    description: 'Energetic, encouraging guide',
    voiceId: 'TX3LPaxmHKxFdv7VOQHJ',
    personality: 'energetic, optimistic, tech-savvy',
    avatar: '/agents/echo.png',
  },
  {
    id: 'flow',
    name: 'Flow',
    description: 'Calm, strategic advisor',
    voiceId: 'pNInz6obpgDQGcFmaJgB',
    personality: 'calm, thoughtful, strategic',
    avatar: '/agents/flow.png',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Motivational mission coach',
    voiceId: 'oWAxZDx7w5VEj9dCyTzz',
    personality: 'motivational, mission-driven, focused',
    avatar: '/agents/pulse.png',
  },
  {
    id: 'zen',
    name: 'Zen',
    description: 'Mindful facilitator',
    voiceId: 'z9fAnlkpzviPz146aGWa',
    personality: 'soothing, reflective, mindful',
    avatar: '/agents/zen.png',
  },
  {
    id: 'spark',
    name: 'Spark',
    description: 'Creative problem-solver',
    voiceId: 'vB1bcq4S9q3gN2g8f7ab',
    personality: 'creative, upbeat, curious',
    avatar: '/agents/spark.png',
  },
]
