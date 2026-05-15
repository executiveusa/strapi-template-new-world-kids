import Link from "next/link"

import { siteLinks } from "@/components/site/siteData"

export function SupportSection() {
  return (
    <section className="bg-[#08110d] py-20">
      <div className="mx-auto max-w-6xl px-6">
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
    </section>
  )
}
