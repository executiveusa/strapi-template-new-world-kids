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
    <section id="studio" className="bg-[#060e08] border-t border-white/5 px-6 py-20 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">

          {/* Left — pitch */}
          <div>
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              Mission-Funded Studio
            </p>
            <h2 className="mt-4 font-serif text-3xl text-white md:text-4xl">
              We are not built to beg.{" "}
              <span className="text-[#c9a84c]">We are built to produce.</span>
            </h2>
            <p className="mt-5 text-sm leading-8 text-white/60 md:text-base">
              Starting a nonprofit is overwhelming. Compliance, grant writing,
              fundraising, website design, social media — it crushes great
              ideas before they do any good. We know. We&apos;ve been through
              all of it.
            </p>
            <p className="mt-4 text-sm leading-8 text-white/60 md:text-base">
              Over two years we built AI systems that drive our mission.
              We now offer them to other nonprofits at a discounted rate —
              because we understand your challenges. We live them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work-with-us"
                className="rounded-full bg-[#c9a84c] px-6 py-3 text-sm font-semibold text-[#060e08] transition hover:bg-[#e0bc6a]"
              >
                Work with the studio →
              </Link>
              <Link
                href="/work-with-us"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* Right — services list */}
          <div className="rounded-3xl border border-white/8 bg-[#0d1610] p-7">
            <p className="text-xs tracking-[0.22em] text-[#c9a84c]/70 uppercase">
              What we offer
            </p>
            <p className="mt-2 text-xs text-white/35">
              Available to nonprofits and social purpose companies at a discounted rate.
            </p>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#c9a84c]" />
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href="/work-with-us"
              className="mt-8 block rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-4 text-center text-sm font-semibold text-[#c9a84c] transition hover:bg-[#c9a84c]/12"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
