import Link from "next/link"

import { PageShell } from "../../../components/PageShell"

const products = [
  {
    name: "Hermes microSD",
    price: "$19",
    detail: "Pocket boot media for a local mission node.",
  },
  {
    name: "Hermes USB",
    price: "$49",
    detail: "Portable operator kit for field laptops and workshops.",
  },
  {
    name: "Hermes Pi Node",
    price: "$149",
    detail: "Small always-on node for a classroom, garden, or sponsor site.",
  },
]

export default function HermesUsbPage() {
  return (
    <PageShell
      eyebrow="Hermes hardware"
      title="A small operator node for real mission work"
      summary="Hermes USB turns the NWKids agent model into a portable kit: mission ledger, learning prompts, local checklists, and field-ready onboarding."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="rounded border border-border bg-panel p-5">
            <p className="font-mono text-sm text-muted">{product.name}</p>
            <p className="mt-3 text-4xl font-semibold text-accent">
              {product.price}
            </p>
            <p className="mt-4 leading-7 text-muted">{product.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="rounded border border-border bg-panel p-6">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-warm">
            Sponsor kit
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Fund a visible node.</h2>
          <p className="mt-4 leading-7 text-muted">
            Sponsors can fund microSD, USB, or Pi Node bundles for classrooms,
            garden teams, and youth workshops. Each kit can point back to a
            public mission ledger entry so the gift stays inspectable.
          </p>
        </article>

        <article className="rounded border border-border bg-panel p-6">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-water">
            Indigo Azul
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            Field use for food, water, energy, shelter.
          </h2>
          <p className="mt-4 leading-7 text-muted">
            Indigo Azul can use a Hermes node to track seedling counts, clay-pot
            irrigation lessons, solar demos, and shelter build checklists without
            requiring a full office setup.
          </p>
        </article>
      </section>

      <section className="mt-8 flex flex-wrap items-center gap-3 rounded border border-accent bg-accent/10 p-5">
        <Link
          href="/en/ops"
          className="rounded bg-accent px-5 py-3 font-semibold text-background"
        >
          Open operations portal
        </Link>
        <Link href="/en/mission" className="rounded border border-border px-5 py-3">
          View mission ledger
        </Link>
      </section>
    </PageShell>
  )
}
