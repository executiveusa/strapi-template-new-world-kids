import { First12OperatingBoard } from "./First12OperatingBoard"
import { ProofOfWorkFeed } from "./ProofOfWorkFeed"

type Props = { locale: "en" | "es" }

const copy = {
  en: { eyebrow: "First 12 · Building in public", title: "Building in public." },
  es: { eyebrow: "Primeros 12 · Construyendo en público", title: "Construyendo en público." },
} as const

export function First12OperatingLayer({ locale }: Props) {
  const t = copy[locale]
  return (
    <section aria-labelledby="operating-heading" className="border-t border-black/15 bg-[var(--color-paper)] px-5 py-16 text-[var(--color-ink)] sm:px-8 sm:py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--color-text-muted)] uppercase">{t.eyebrow}</p>
        <h2 id="operating-heading" className="mt-4 max-w-4xl text-[clamp(2.7rem,7vw,5rem)] leading-[1.02] font-black tracking-[-0.045em] text-balance">{t.title}</h2>
        <div className="mt-10 border-t border-black/15 sm:mt-12">
          <First12OperatingBoard locale={locale} />
          <ProofOfWorkFeed locale={locale} />
        </div>
      </div>
    </section>
  )
}
