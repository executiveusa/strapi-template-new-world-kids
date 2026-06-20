import { NonprofitHero } from "./NonprofitHero"
import { ProgramsSection } from "./ProgramsSection"
import { TrustSection } from "./TrustSection"
import { SupportSection } from "./SupportSection"
import { StudioSection } from "./StudioSection"

// RENDER ORDER (per V2 layout spec):
// 1. Full-page hero with photo slot + stats
// 2. Programs — Culture Shock + Indigo Azul (your rewritten copy)
// 3. Trust layer — fiscal sponsor, EIN, addresses
// 4. CTA — Donate / Volunteer / Follow
// 5. Studio — standalone section for AI services
//
// REMOVED FROM PUBLIC PAGE: ClaritySection, TimelineSection,
// MissionSection, ProofSection, HermesSection
// (Timeline and Mission still available at /ops or as standalone pages)

export function Homepage() {
  return (
    <main>
      <NonprofitHero />
      <ProgramsSection />
      <TrustSection />
      <SupportSection />
      <StudioSection />
    </main>
  )
}
