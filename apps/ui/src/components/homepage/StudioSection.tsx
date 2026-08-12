import Link from "next/link"

const outcomes = [
  {
    title: "Find better-fit grants faster",
    body: "Automate grant research and organize opportunities before your team loses hours searching databases by hand.",
  },
  {
    title: "Turn field work into donor-ready proof",
    body: "Reuse approved photos, notes, and updates across reports, pages, and campaigns instead of rewriting the same story from scratch.",
  },
  {
    title: "Keep recurring admin moving",
    body: "Automate handoffs, reminders, reporting, and publishing so fewer tasks depend on someone remembering to push them forward.",
  },
  {
    title: "Make your website do the explaining",
    body: "Build a clear public site that answers donor and partner questions before they become another email or meeting.",
  },
] as const

export function StudioSection() {
  return (
    <section
      id="studio"
      className="border-t border-[var(--color-border-subtle)] bg-[#14120f] px-6 py-24 text-[#f7f2e8] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              Services for mission-driven teams
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
              Stop losing your week to admin.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#c9c1b5]">
              We build practical systems around the work that steals time from
              the mission: grant research, reporting, donor updates, content
              publishing, and website upkeep.
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#c9c1b5]">
              The outcome is simple: less hunting, copying, chasing, and
              re-entering information. More time running programs, raising
              money, and doing the work people came to you for.
            </p>
            <Link
              href="/work-with-us"
              className="mt-8 inline-flex rounded-full bg-[var(--color-accent-coral)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-coral-hover)]"
            >
              See what we can take off your plate →
            </Link>
          </div>

          <div className="border-t border-white/15 lg:border-t-0 lg:border-l lg:pl-12">
            <p className="pt-8 text-xs tracking-[0.22em] text-[#c9a84c] uppercase lg:pt-0">
              Problems we solve
            </p>
            <div className="mt-2 divide-y divide-white/15">
              {outcomes.map((outcome) => (
                <div key={outcome.title} className="py-6 first:pt-4">
                  <h3 className="text-base font-semibold text-[#f7f2e8]">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b8b0a4]">
                    {outcome.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
