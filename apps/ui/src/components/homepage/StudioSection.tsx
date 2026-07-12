import Link from "next/link"

const services = [
  "AI agents that understand your mission",
  "Automated social media and content creation",
  "Grant support automation",
  "Mission dashboards and transparency infrastructure",
  "Full-stack website design",
  "Compliance reporting systems",
]

export function StudioSection() {
  return (
    <section
      id="studio"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left — pitch */}
          <div>
            <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
              Mission-Funded Studio
            </p>
            <h2 className="mt-4 font-serif text-3xl text-[var(--color-text-primary)] md:text-4xl">
              We are not built to beg.{" "}
              <span className="text-[var(--color-accent-gold)]">
                We are built to produce.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-8 text-[var(--color-text-muted)] md:text-base">
              Starting a nonprofit is overwhelming. Compliance, grant writing,
              fundraising, website design, social media — it crushes great ideas
              before they do any good. We know. We&apos;ve been through all of
              it.
            </p>
            <p className="mt-4 text-sm leading-8 text-[var(--color-text-muted)] md:text-base">
              Over two years we built AI systems that drive our mission. We now
              offer them to other nonprofits at a discounted rate — because we
              understand your challenges. We live them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work-with-us"
                className="rounded-full bg-[var(--color-accent-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-bg)] transition hover:bg-[var(--color-accent-gold)]"
              >
                Work with the studio →
              </Link>
              <Link
                href="/work-with-us"
                className="rounded-full border border-[var(--color-border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--color-text-muted)] transition hover:border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]"
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* Right — services list */}
          <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-7">
            <p className="text-xs tracking-[0.22em] text-[var(--color-accent-gold)]/70 uppercase">
              What we offer
            </p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              Available to nonprofits and social purpose companies at a
              discounted rate.
            </p>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href="/work-with-us"
              className="mt-8 block rounded-2xl border border-[var(--color-accent-gold)]/20 bg-[var(--color-accent-gold)]/5 p-4 text-center text-sm font-semibold text-[var(--color-accent-gold)] transition hover:bg-[var(--color-accent-gold)]/12"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
