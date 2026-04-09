import { NonprofitHero } from './NonprofitHero'
import { MissionSection } from './MissionSection'
import { TimelineSection } from './TimelineSection'

export function Homepage() {
  return (
    <main>
      <NonprofitHero />
      <MissionSection />
      <TimelineSection />
    </main>
  )
}
