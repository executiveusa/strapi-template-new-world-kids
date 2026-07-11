import { clarityCards } from "@/components/site/siteData"

export function ClaritySection() {
  return (
    <section id="mission" className="bg-[var(--color-surface)] py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10">
          <div className="grid gap-4 md:grid-cols-3">
            {clarityCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[28px] border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] p-6"
              >
                <h3 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                  {card.body}
                </p>
                <ul className="mt-5 space-y-2">
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-6 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-gold)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
