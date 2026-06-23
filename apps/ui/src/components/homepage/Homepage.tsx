import { NonprofitHero } from "./NonprofitHero"
import { TimelineSection } from "./TimelineSection"
import { ProgramsSection } from "./ProgramsSection"
import { TrustSection } from "./TrustSection"
import { SupportSection } from "./SupportSection"
import { StudioSection } from "./StudioSection"

// RENDER ORDER (V3 — per full audit):
// 1. Hero  — problem-first headline + donate CTA + stats
// 2. Timeline — RESTORED — horizontal scroll, 6 seasons, click-to-expand
// 3. Programs — Culture Shock + Indigo Azul
// 4. Trust — fiscal sponsor, EIN, addresses
// 5. CTA — Give / Volunteer / Follow
// 6. Studio — separate B2N pitch section (teaser only here)

export function Homepage() {
  return (
    <main>
      <NonprofitHero />
      <TimelineSection />
      <ProgramsSection />
      <TrustSection />
      <SupportSection />
      <StudioSection />
    </main>
  )
}
