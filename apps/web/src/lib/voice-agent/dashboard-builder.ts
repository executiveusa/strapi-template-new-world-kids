import { OnboardingAnswers } from './onboarding-state'

export type DashboardTheme = 'impact' | 'community' | 'donor' | 'volunteer'

export type DashboardWidget = {
  id: string
  type: string
  title: string
}

export type DashboardConfig = {
  theme: DashboardTheme
  modules: string[]
  widgets: DashboardWidget[]
  goals: string[]
  branding: {
    logo?: string
    colors?: string[]
    mission?: string
  }
  sampleData: Record<string, unknown>
}

const DEFAULT_WIDGETS: DashboardWidget[] = [
  { id: 'kpi-donations', type: 'kpi', title: 'Donations this month' },
  { id: 'kpi-volunteers', type: 'kpi', title: 'Active volunteers' },
  { id: 'chart-impact', type: 'chart', title: 'Impact growth' },
]

export function buildDashboardConfig(answers: OnboardingAnswers): DashboardConfig {
  const modules = ['donations', 'volunteers', 'grants', 'impact']
  const theme: DashboardTheme = answers.features?.includes('volunteer')
    ? 'volunteer'
    : answers.features?.includes('donation')
      ? 'donor'
      : 'impact'

  return {
    theme,
    modules,
    widgets: DEFAULT_WIDGETS,
    goals: ['Increase monthly donors', 'Grow volunteer signups', 'Track impact milestones'],
    branding: {
      mission: answers.mission,
    },
    sampleData: {
      mission: answers.mission,
      impact: answers.impact,
      donors: answers.donors,
    },
  }
}
