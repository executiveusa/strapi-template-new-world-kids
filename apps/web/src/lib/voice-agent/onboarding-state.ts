export type OnboardingAnswers = {
  mission?: string
  impact?: string
  scale?: string
  funding?: string
  donors?: string
  painPoints?: string
  features?: string
  timeline?: string
}

export type OnboardingStep = keyof OnboardingAnswers

export const DEFAULT_ONBOARDING_FLOW: { step: OnboardingStep; prompt: string }[] = [
  { step: 'mission', prompt: "Tell me about your organization's mission in one sentence." },
  { step: 'impact', prompt: 'Who do you serve, and what change do you create for them?' },
  { step: 'scale', prompt: 'How many people does your organization reach each year?' },
  { step: 'funding', prompt: "What's your annual budget or funding goal?" },
  { step: 'donors', prompt: 'How many donors do you currently have?' },
  { step: 'painPoints', prompt: 'What is the biggest challenge in managing your nonprofit?' },
  {
    step: 'features',
    prompt: 'What would make your day-to-day work easier? Donations, volunteers, grants, or impact tracking?',
  },
  { step: 'timeline', prompt: 'When do you want to launch your dashboard? This week, this month, or just exploring?' },
]
