export function TrustSection() {
  return (
    <section
      id="proof"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-4xl">
        {/* Trust pill badges */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent-gold)]">
            501(c)(3) Nonprofit
          </span>
          <span className="rounded-full border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent-gold)]">
            EIN 46-4779591
          </span>
        </div>

        {/* Header */}
        <div className="text-center">
          <p className="text-xs tracking-[0.24em] text-[var(--color-accent-gold)] uppercase">
            Verified & transparent
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[var(--color-text-primary)] md:text-4xl">
            We build in public.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
            Your donations help keep all our resources, solutions, and programs
            100% free for every student who finds them.
          </p>
        </div>

        {/* Trust badges grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              label: "Fiscal sponsor",
              value: "Humanitarian Social Innovations",
              note: "Established 501(c)(3) partner",
            },
            {
              label: "Legal structure",
              value: "501(c)(3) fiscally sponsored program",
              note: "Tax-deductible contributions",
            },
            {
              label: "Tax ID (EIN)",
              value: "46-4779591",
              note: "Verify at IRS Tax Exempt Search",
            },
            {
              label: "Indigo Azul site",
              value: "Azucena 1112, Paso de Guayabo",
              note: "Puerto Vallarta, MX 48373",
            },
            {
              label: "Seattle office",
              value: "6725 S 116th Pl",
              note: "Seattle, WA 98178",
            },
            {
              label: "Contact",
              value: "info@nwkids.org",
              note: "Response within 48 hours",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] p-5"
            >
              <p className="text-xs tracking-[0.18em] text-[var(--color-accent-gold)]/70 uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
