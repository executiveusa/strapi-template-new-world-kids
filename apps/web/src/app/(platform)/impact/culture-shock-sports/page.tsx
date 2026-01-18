import Link from 'next/link';

import { StarField3D } from '@/components/cockpit/GameUI/StarField3D';

export default function CultureShockSportsPage() {
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
            <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-300">
              Building • Mentorship
            </span>
          </div>

          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
              Sports & Family Support
            </p>
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              Culture Shock Sports
            </h1>
            <p className="text-lg text-slate-300">
              A decentralized mentorship network for young athletes and families in the Pacific
              Northwest, focused on documentation, mental wellness, and long-term opportunity.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Athlete Mentors',
                detail: 'Pairing youth with former collegiate and professional athletes.',
              },
              {
                title: 'Family Advocacy',
                detail: 'Documentation support, eligibility guidance, and travel planning.',
              },
              {
                title: 'Wellness Circle',
                detail: 'Mental health check-ins, recovery resources, and nutrition coaching.',
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

          <section className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80 p-8">
            <h2 className="text-2xl font-semibold text-white">Momentum Tracker</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                '23 athletes supported with individualized training plans.',
                '18 families received documentation and travel coordination help.',
                'Partnerships forming with regional athletic departments.',
                'Upcoming showcase event in the Pacific Northwest.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Become a Mentor</h2>
              <p className="mt-2 text-sm text-slate-300">
                Share your athletic journey and open doors for the next generation.
              </p>
            </div>
            <Link
              href="/donate"
              className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-yellow-400 hover:to-orange-400"
            >
              Support the Team
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
