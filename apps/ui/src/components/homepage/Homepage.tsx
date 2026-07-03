import { AudienceTabs } from "./AudienceTabs"
import { NonprofitHero } from "./NonprofitHero"
import { ProgramsSection } from "./ProgramsSection"
import { StickyDonateMobile } from "./StickyDonateMobile"
import { StudioSection } from "./StudioSection"
import { SupportSection } from "./SupportSection"
import { TimelineSection } from "./TimelineSection"
import { TrustSection } from "./TrustSection"

// RENDER ORDER (V3 — per full audit):
// 1. AudienceTabs — sticky dual-audience nav (donor / AI client)
// 2. Hero  — problem-first headline + donate CTA + stats
// 3. Timeline — horizontal scroll, 6 seasons, click-to-expand
// 4. Programs — Culture Shock + Indigo Azul
// 5. Trust — fiscal sponsor, EIN, addresses
// 6. CTA — Give / Volunteer / Follow
// 7. Studio — separate B2N pitch section (teaser only here)

export function Homepage() {
  return (
    <>
      <AudienceTabs />
      <main>
        <NonprofitHero />
        <TimelineSection />
        <ProgramsSection />
        <TrustSection />
        <SupportSection />
        <StudioSection />
      </main>
      <StickyDonateMobile />
    </>
  )
}
