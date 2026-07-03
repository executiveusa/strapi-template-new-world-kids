import Link from "next/link"

const donateOptions = [
  { amount: "$25", label: "Plant a tree", detail: "at Proyecto Indigo Azul" },
  {
    amount: "$50",
    label: "Sponsor a child",
    detail: "for one month of programs",
    featured: true,
  },
  {
    amount: "$100",
    label: "Fund language classes",
    detail: "for 4 weeks of instruction",
  },
]

export function SupportSection() {
  return (
    <section
      id="support"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
            Support the mission
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
            Choose one clear next step.
          </h2>
        </div>

        {/* Amount-anchored donation options */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {donateOptions.map((opt) => (
            <Link
              key={opt.amount}
              href="/donate"
              className={[
                "group relative rounded-2xl border p-6 text-center transition-all duration-200",
                opt.featured
                  ? "border-[#c8400e] bg-[#c8400e]/10 hover:bg-[#c8400e]/20"
                  : "border-white/10 bg-[#0d1610] hover:border-white/25",
              ].join(" ")}
            >
              {opt.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c8400e] px-3 py-0.5 text-xs font-semibold text-white">
                  Most impactful
                </span>
              )}
              <p className="font-serif text-4xl font-semibold text-[#c9a84c]">
                {opt.amount}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {opt.label}
              </p>
              <p className="mt-1 text-xs text-white/50">{opt.detail}</p>
              <div
                className={[
                  "mt-4 rounded-full py-2 text-xs font-semibold transition",
                  opt.featured
                    ? "bg-[#c8400e] text-white group-hover:bg-[#d9500f]"
                    : "bg-white/8 text-white/70 group-hover:bg-white/15",
                ].join(" ")}
              >
                Give {opt.amount} →
              </div>
            </Link>
          ))}
        </div>

        {/* Recurring toggle note */}
        <p className="mt-6 text-center text-xs text-white/40">
          On the donate page, toggle &ldquo;Make this monthly&rdquo; to become a
          sustaining supporter.
        </p>

        {/* Secondary CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/work-with-us"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Volunteer
          </Link>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <a
              href="https://www.instagram.com/proyectoindigoazul/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white/70"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/nwkidsorg"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white/70"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/nwkids/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white/70"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
