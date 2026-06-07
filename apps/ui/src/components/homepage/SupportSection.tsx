import Link from "next/link"

import { siteLinks } from "@/components/site/siteData"

export function SupportSection() {
  return (
    <section className="bg-[#08110d] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              West African Proverb
            </p>
            <p className="mt-4 font-serif text-2xl leading-relaxed text-white/90">
              If you think you&apos;re too small to make a difference, try going
              to sleep with a mosquito in the room.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/60">
              A small reminder to keep showing up for the work.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-4xl text-white">Support the mission</h2>
            <p className="mt-4 text-white/70">Choose one clear next step.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href="/donate"
                className="rounded-xl bg-[#c9a84c] px-6 py-5 font-semibold text-[#080f0a]"
              >
                Give
              </Link>
              <Link
                href="/work-with-us"
                className="rounded-xl border border-white px-6 py-5 font-semibold text-white"
              >
                Volunteer
              </Link>
              <div className="rounded-xl border border-white/20 px-6 py-5 text-white/80">
                <p className="mb-2 font-semibold text-white">Follow</p>
                <div className="space-x-3 text-sm">
                  <a href={siteLinks.instagram}>Instagram</a>
                  <a href={siteLinks.facebook}>Facebook</a>
                  <a href={siteLinks.linkedin}>LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
