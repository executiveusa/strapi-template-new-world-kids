import Link from 'next/link';

import { StarField3D } from '@/components/cockpit/GameUI/StarField3D';

export default function CultureShockPage() {
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
              Active • Life Skills
            </span>
          </div>

          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
              Education & Self-Sufficiency
            </p>
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              Culture Shock Program
            </h1>
            <p className="text-lg text-slate-300">
              A hands-on program for young adults (18-25) to master food, water, energy, and shelter
              systems while building inclusive communities rooted in shared responsibility.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Skill Pods',
                detail: 'Rotating cohorts for gardening, energy systems, carpentry, and media.',
              },
              {
                title: 'Mentor Network',
                detail: 'Guidance from craftspeople, builders, educators, and wellness leaders.',
              },
              {
                title: 'Service Projects',
                detail: 'Participants apply skills by supporting local nonprofits and families.',
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

          <section className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80 p-8">
            <h2 className="text-2xl font-semibold text-white">Program Outcomes</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                '127 graduates launched into community leadership roles.',
                '45 active students enrolled in 2024 cohorts.',
                'Weekly food-sharing events serving 200+ neighbors.',
                'New partnerships with local farms and trade schools.',
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

          <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Volunteer or Sponsor</h2>
              <p className="mt-2 text-sm text-slate-300">
                Help cover training materials, mentorship stipends, and community meals.
              </p>
            </div>
            <Link
              href="/donate"
              className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-cyan-500 hover:to-blue-500"
            >
              Support Culture Shock
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
