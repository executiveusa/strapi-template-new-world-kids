import { NonprofitHero } from "./NonprofitHero"
import { PathwaySection } from "./PathwaySection"
import { StickyDonateMobile } from "./StickyDonateMobile"
import { SupportSection } from "./SupportSection"

export function Homepage() {
  return (
    <>
      <main>
        <NonprofitHero />
        <PathwaySection />
        <SupportSection />
      </main>
      <StickyDonateMobile />
    </>
  )
}
