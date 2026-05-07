import { ClaritySection } from "./ClaritySection"
import { HermesSection } from "./HermesSection"
import { MissionSection } from "./MissionSection"
import { NonprofitHero } from "./NonprofitHero"
import { ProgramsSection } from "./ProgramsSection"
import { ProofSection } from "./ProofSection"
import { ScrollRevealProverb } from "./ScrollRevealProverb"
import { StudioSection } from "./StudioSection"
import { SupportSection } from "./SupportSection"
import { TimelineSection } from "./TimelineSection"
import { TrustSection } from "./TrustSection"

export function Homepage() {
  return (
    <main>
      <NonprofitHero />
      <ScrollRevealProverb />
      <ClaritySection />
      <MissionSection />
      <ProgramsSection />
      <TimelineSection />
      <ProofSection />
      <TrustSection />
      <SupportSection />
      <StudioSection />
      <HermesSection />
    </main>
  )
}
