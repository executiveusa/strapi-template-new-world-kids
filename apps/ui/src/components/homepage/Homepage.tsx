import { NonprofitHero } from "./NonprofitHero"
import { ProgramsSection } from "./ProgramsSection"
import { StickyDonateMobile } from "./StickyDonateMobile"
import { StudioSection } from "./StudioSection"
import { SupportSection } from "./SupportSection"
import { TimelineSection } from "./TimelineSection"
import { TrustSection } from "./TrustSection"

// Public homepage flow:
// 1. Hero — mission clarity + field-archive action
// 2. Proof strip — field archive, gallery, and public records
// 3. Programs — Culture Shock + Proyecto Indigo Azul
// 4. Timeline — dated field documentation + clearly separated future plans
// 5. Trust — Washington incorporation + fiscal sponsorship records
// 6. Support — proverb + $25 / $50 / $100 choices without invented impact claims
// 7. Studio — separate earned-revenue services story

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
