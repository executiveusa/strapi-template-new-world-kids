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
          <article
            key={product.name}
            className="border-border bg-panel rounded border p-5"
          >
            <p className="text-muted font-mono text-sm">{product.name}</p>
            <p className="text-accent mt-3 text-4xl font-semibold">
              {product.price}
            </p>
            <p className="text-muted mt-4 leading-7">{product.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="border-border bg-panel rounded border p-6">
          <p className="text-warm font-mono text-sm tracking-[0.18em] uppercase">
            Sponsor kit
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Fund a visible node.</h2>
          <p className="text-muted mt-4 leading-7">
            Sponsors can fund microSD, USB, or Pi Node bundles for classrooms,
            garden teams, and youth workshops. Each kit can point back to a
            public mission ledger entry so the gift stays inspectable.
          </p>
        </article>

        <article className="border-border bg-panel rounded border p-6">
          <p className="text-water font-mono text-sm tracking-[0.18em] uppercase">
            Indigo Azul
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            Field use for food, water, energy, shelter.
          </h2>
          <p className="text-muted mt-4 leading-7">
            Indigo Azul can use a Hermes node to track seedling counts, clay-pot
            irrigation lessons, solar demos, and shelter build checklists
            without requiring a full office setup.
          </p>
        </article>
      </section>

      <section className="border-accent bg-accent/10 mt-8 flex flex-wrap items-center gap-3 rounded border p-5">
        <Link
          href="/en/ops"
          className="bg-accent text-background rounded px-5 py-3 font-semibold"
        >
          Open operations portal
        </Link>
        <Link
          href="/en/mission"
          className="border-border rounded border px-5 py-3"
        >
          View mission ledger
        </Link>
      </section>
    </PageShell>
  )
}
