import { ClaritySection } from "./ClaritySection"
import { HermesSection } from "./HermesSection"
import { MissionSection } from "./MissionSection"
import { NonprofitHero } from "./NonprofitHero"
import { ProgramsSection } from "./ProgramsSection"
import { ProofSection } from "./ProofSection"
import { TimelineSection } from "./TimelineSection"

export function Homepage() {
  return (
    <main>
      <NonprofitHero />
      <ClaritySection />
      <MissionSection />
      <ProgramsSection />
      <TimelineSection />
      <ProofSection />
      <HermesSection />
    </main>
  )
}
