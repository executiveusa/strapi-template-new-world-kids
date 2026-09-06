import { First12OperatingBoard } from "./First12OperatingBoard"
import { NonprofitHero } from "./NonprofitHero"
import { PathwaySection } from "./PathwaySection"
import { ProofOfWorkFeed } from "./ProofOfWorkFeed"

type HomepageProps = {
  locale: "en" | "es"
}

export function Homepage({ locale }: HomepageProps) {
  return (
    <main>
      <NonprofitHero />
      <PathwaySection />
      <First12OperatingBoard locale={locale} />
      <ProofOfWorkFeed locale={locale} />
    </main>
  )
}
