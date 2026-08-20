import { NonprofitHero } from "./NonprofitHero"
import { ProgramsSection } from "./ProgramsSection"
import { StickyDonateMobile } from "./StickyDonateMobile"
import { SupportSection } from "./SupportSection"
import { TimelineSection } from "./TimelineSection"
import { TrustSection } from "./TrustSection"

// Public homepage flow:
// 1. Hero — Seattle pilot + clear youth outcome
// 2. Proof strip — field archive, gallery, and public records
// 3. Programs — Culture Shock + Proyecto Indigo Azul
// 4. Timeline — dated field documentation + clearly separated future plans
// 5. Trust — Washington incorporation + fiscal sponsorship records
// 6. Support — direct funding ask for the Seattle pilot

export function Homepage() {
  return (
    <>
      <main>
        <NonprofitHero />
        <ProgramsSection />
        <TimelineSection />
        <TrustSection />
        <SupportSection />
      </main>
      <StickyDonateMobile />
    </>
  )
}
