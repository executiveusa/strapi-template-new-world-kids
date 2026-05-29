import { CinematicHero } from "./CinematicHero"
import { CinematicEntry } from "./CinematicEntry"
import { ClaritySection } from "./ClaritySection"
import { HermesSection } from "./HermesSection"
import { MissionSection } from "./MissionSection"
import { ProgramsSection } from "./ProgramsSection"
import { SocialMediaSection } from "./SocialMediaSection"
import { ProofSection } from "./ProofSection"
import { ScrollRevealProverb } from "./ScrollRevealProverb"
import { StudioSection } from "./StudioSection"
import { SupportSection } from "./SupportSection"
import { TimelineSection } from "./TimelineSection"
import { TrustSection } from "./TrustSection"

export function Homepage() {
  return (
    <main>
      <CinematicEntry />
      <CinematicHero id="journey-start" />
      <ScrollRevealProverb />
      <ClaritySection />
      <TimelineSection />
      <MissionSection />
      <ProgramsSection />
      <SocialMediaSection />
      <ProofSection />
      <TrustSection />
      <SupportSection />
      <StudioSection />
      <HermesSection />
    </main>
  )
}
