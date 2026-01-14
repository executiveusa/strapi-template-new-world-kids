import Link from 'next/link';

import { StarField3D } from '@/components/cockpit/GameUI/StarField3D';

export default function ProyectoIndigoAzulPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <StarField3D />

      <div className="relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-8 py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/impact"
              className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              ← Back to Impact Dashboard
            </Link>
            <span className="rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
              Active • Season 4
            </span>
          </div>

          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
              Food Forest & Sustainability
            </p>
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              Proyecto Indigo Azul
            </h1>
            <p className="text-lg text-slate-300">
              A thriving food forest in Puerto Vallarta, Mexico focused on regenerative agriculture,
              water stewardship, and community-led training for the next generation of growers.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Regenerative Systems',
                detail: 'Soil-first practices, composting hubs, and native plant restoration.',
              },
              {
                title: 'Community Training',
                detail: 'Hands-on workshops for youth and families to learn food sovereignty.',
              },
              {
                title: 'Local Partnerships',
                detail: 'Collaboration with farmers, educators, and regional sustainability leaders.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80 p-8">
            <h2 className="text-2xl font-semibold text-white">Impact Highlights</h2>
            <ul className="mt-4 grid gap-3 text-slate-300 md:grid-cols-2">
              <li className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-4">
                500+ trees planted to expand the food forest canopy.
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-4">
                Two tons of fresh produce delivered annually to local families.
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-4">
                12 community-led workshops on permaculture and water capture.
              </li>
              <li className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-4">
                Youth leadership circle growing to 40+ student stewards.
              </li>
            </ul>
          </section>

          <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Get Involved</h2>
              <p className="mt-2 text-sm text-slate-300">
                Support seeds, tools, and mentorship for the next planting season.
              </p>
            </div>
            <Link
              href="/donate"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-purple-500 hover:to-pink-500"
            >
              Donate to Indigo Azul
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
