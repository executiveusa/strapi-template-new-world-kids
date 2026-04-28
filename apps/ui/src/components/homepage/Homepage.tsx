import { NonprofitHero } from './NonprofitHero'
import { MissionSection } from './MissionSection'
import { StudioSection } from './StudioSection'
import { SupportSection } from './SupportSection'
import { TimelineSection } from './TimelineSection'
import { TrustSection } from './TrustSection'

export function Homepage() {
  return (
    <main>
      <NonprofitHero />
      <MissionSection />
      <TimelineSection />
      <TrustSection />
      <SupportSection />
      <StudioSection />
    </main>
  )
}
