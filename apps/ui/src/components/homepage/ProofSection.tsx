import { ArrowUpRight, CheckCircle2 } from "lucide-react"

import { Link } from "@/lib/navigation"

import { actionCards, testimonialCards, trustSignals } from "../site/siteData"

export function ProofSection() {
  return (
    <section id="proof" className="bg-[#060c07] py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase">
              Why this feels credible
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Trust comes from promises kept in public.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/64">
              Seth Godin&apos;s framework is useful here: make a real promise,
              help people become someone more capable, and keep that promise
              when it is hard. The site now reflects that instead of burying it
              in nonprofit filler.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {trustSignals.map((signal) => (
              <article
                key={signal.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              >
                <CheckCircle2 className="h-5 w-5 text-[#c9a84c]" />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-white">
                  {signal.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {signal.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonialCards.map((card) => (
            <article
              key={card.person}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="font-serif text-xl leading-8 text-white">
                <span aria-hidden="true">&ldquo;</span>
                {card.quote}
                <span aria-hidden="true">&rdquo;</span>
              </p>
              <p className="mt-5 text-xs tracking-[0.22em] text-[#c9a84c] uppercase">
                {card.person}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {actionCards.map((card) => {
            const body = (
              <article className="flex h-full flex-col justify-between rounded-[30px] border border-white/10 bg-[#0c1710] p-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {card.body}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#f7e7a7]">
                  Go there
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </article>
            )

            if (card.variant === "internal") {
              return (
                <Link key={card.title} href={card.href}>
                  {body}
                </Link>
              )
            }

            return (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noreferrer"
              >
                {body}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
