import { NonprofitHero } from "./NonprofitHero"
import { ProgramsSection } from "./ProgramsSection"
import { StickyDonateMobile } from "./StickyDonateMobile"
import { StudioSection } from "./StudioSection"
import { SupportSection } from "./SupportSection"
import { TimelineSection } from "./TimelineSection"
import { TrustSection } from "./TrustSection"

// Front-door flow (hero slice):
// 1. Hero — video + immediate mission clarity + one dominant "see the work" action
// 2. Proof strip — static evidence, no animated counters
// 3. Programs — Culture Shock + Indigo Azul
// 4. Timeline — documented seasons
// 5. Trust — fiscal sponsor, EIN, addresses
// 6. Support — donation choices; proverb moves here in a later bounded slice
// 7. Studio — separate earned-revenue story

export function Homepage() {
  return (
    <>
      <main>
        <NonprofitHero />
        <ProgramsSection />
        <TimelineSection />
        <TrustSection />
        <SupportSection />
        <StudioSection />
      </main>
      <StickyDonateMobile />
    </>
  )
}
