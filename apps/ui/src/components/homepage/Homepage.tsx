import { First12OperatingLayer } from "./First12OperatingLayer"
import { NonprofitHero } from "./NonprofitHero"
import { PathwaySection } from "./PathwaySection"

type HomepageProps = {
  locale: "en" | "es"
}

export function Homepage({ locale }: HomepageProps) {
  return (
    <main>
      <NonprofitHero />
      <PathwaySection />
      <First12OperatingLayer locale={locale} />
    </main>
  )
}
