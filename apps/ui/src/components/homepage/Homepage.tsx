import { CinematicHero } from "./CinematicHero"
import { ClaritySection } from "./ClaritySection"
import { MissionSection } from "./MissionSection"
import { ProgramsSection } from "./ProgramsSection"
import { ProofSection } from "./ProofSection"
import { StudioSection } from "./StudioSection"
import { SupportSection } from "./SupportSection"
import { TimelineSection } from "./TimelineSection"
import { TrustSection } from "./TrustSection"

export function Homepage() {
  return (
    <main>
      <CinematicHero />
      <ClaritySection />
      <TimelineSection />
      <MissionSection />
      <ProgramsSection />
      <ProofSection />
      <TrustSection />
      <SupportSection />
      <StudioSection />
    </main>
  )
}
