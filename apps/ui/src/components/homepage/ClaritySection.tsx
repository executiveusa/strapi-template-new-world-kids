import { clarityCards } from "@/components/site/siteData"

export function ClaritySection() {
  return (
    <section id="mission" className="bg-[#091109] py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase">
              Do not make people guess
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
              The homepage now answers the three questions most people ask in
              the first ten seconds.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              What is this? Who is it for? What should I do next? Everything
              below is structured to answer those questions before anyone has to
              hunt for context.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {clarityCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="font-serif text-2xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/64">
                  {card.body}
                </p>
                <ul className="mt-5 space-y-2">
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-6 text-white/58"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
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
