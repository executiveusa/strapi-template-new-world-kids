import Link from 'next/link';

import { StarField3D } from '@/components/cockpit/GameUI/StarField3D';

export default function RealMinorityReportPage() {
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
            <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-purple-300">
              Launching Soon • Media
            </span>
          </div>

          <header className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
              Community Journalism
            </p>
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              The Real Minority Report
            </h1>
            <p className="text-lg text-slate-300">
              A decentralized community newspaper amplifying stories, resources, and connections for
              people of color across the Pacific Northwest. The collector&apos;s edition launches New
              Year 2026.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Storytelling Hub',
                detail: 'Feature reporting from neighborhood journalists and youth correspondents.',
              },
              {
                title: 'Resource Directory',
                detail: 'Curated connections to housing, food, legal aid, and wellness services.',
              },
              {
                title: 'Creative Economy',
                detail: 'Spotlight local artists with NFT cards and community-owned media assets.',
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

          <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80 p-8">
            <h2 className="text-2xl font-semibold text-white">Launch Roadmap</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                '42 feature articles and interviews ready for launch.',
                '15 community contributors onboarded and trained.',
                'Artist collaborations for the collector&apos;s edition underway.',
                'Tokenized membership experience in development.',
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

          <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-pink-500/30 bg-pink-500/10 p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Join the Newsroom</h2>
              <p className="mt-2 text-sm text-slate-300">
                Submit story ideas, sponsor coverage, or amplify voices in your neighborhood.
              </p>
            </div>
            <Link
              href="/donate"
              className="rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-pink-500 hover:to-purple-500"
            >
              Support the Paper
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
