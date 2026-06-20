"use client"

import Link from "next/link"

// HERO PHOTO SLOT: Replace the src below with your real photo path once uploaded.
// Drop your photo into apps/ui/public/images/hero.jpg and update the src to "/images/hero.jpg"
// Stock placeholder is used until then.
const HERO_PHOTO_SRC =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
const HERO_PHOTO_ALT =
  "Food forest at Proyecto Indigo Azul — replace with real field photo"

export function NonprofitHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060e08]">
      {/* Background photo with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_PHOTO_SRC}
          alt={HERO_PHOTO_ALT}
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e08]/60 via-[#060e08]/40 to-[#060e08]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center md:px-10">
        {/* Proverb */}
        <p className="font-serif text-base italic leading-relaxed text-[#c9a84c] md:text-xl">
          &ldquo;If you ever think you&apos;re too small to make a difference,
          try going to sleep with a mosquito in the room.&rdquo;
        </p>
        <p className="mt-2 text-xs tracking-[0.28em] text-[#c9a84c]/70 uppercase">
          West African Proverb
        </p>

        {/* Headline */}
        <h1 className="mt-10 font-serif text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
          Food. Water. Energy. Shelter.
        </h1>
        <p className="mt-4 font-serif text-2xl text-[#c9a84c] md:text-3xl">
          The core four.
        </p>

        {/* Body */}
        <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
          New World Kids is a Seattle-based nonprofit that addresses the core
          challenges youth face when they transition out of public school and
          into the real world. Our volunteers and mentors have created inclusive,
          practical initiatives for both inner-city and rural youth.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#programs"
            className="rounded-full bg-[#c9a84c] px-8 py-4 text-sm font-semibold text-[#060e08] transition hover:bg-[#e0bc6a]"
          >
            See our programs →
          </Link>
          <Link
            href="/donate"
            className="rounded-full border border-white/60 px-8 py-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Support the mission →
          </Link>
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 text-center sm:grid-cols-4">
          {[
            { value: "200+", label: "plant varieties on site" },
            { value: "1.5", label: "acres in Puerto Vallarta" },
            { value: "5+", label: "years in operation" },
            { value: "$0", label: "cost to every student" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-semibold text-[#c9a84c] md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-6 w-px bg-[#c9a84c]/40 mx-auto" />
        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#c9a84c]/60 mx-auto" />
      </div>
    </section>
  )
}
