export function TrustSection() {
  return (
    <section
      id="proof"
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
            Public records
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            What the paperwork actually proves.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            Two records matter here: our Washington nonprofit incorporation and our fiscal sponsorship agreement. We show them separately so you can see exactly what each one proves.
          </p>
        </div>

        <div className="mt-14 border-y border-[var(--color-border-subtle)]">
          <div className="grid gap-6 border-b border-[var(--color-border-subtle)] py-8 md:grid-cols-[220px_1fr] md:py-10">
            <p className="text-xs tracking-[0.2em] text-[var(--color-eyebrow)] uppercase">
              Washington record
            </p>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
                THE NORTH WEST KIDS
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
                Washington nonprofit corporation. Effective May 16, 2022. UBI 604 917 764.
              </p>
              <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                Source: Washington Secretary of State Articles of Incorporation certificate.
              </p>
            </div>
          </div>

          <div className="grid gap-6 py-8 md:grid-cols-[220px_1fr] md:py-10">
            <p className="text-xs tracking-[0.2em] text-[var(--color-eyebrow)] uppercase">
              Fiscal sponsorship
            </p>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
                Humanitarian Social Innovations
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
                A fiscal sponsorship grant agreement dated April 13, 2023 identifies Humanitarian Social Innovations as Grantor and NW Kids as Grantee for the sponsored program.
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
                The agreement also states that funding sources approached and fundraising text are subject to the Grantor&apos;s prior written approval.
              </p>
              <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                Source: signed NW Kids Fiscal Sponsorship Grant Agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
