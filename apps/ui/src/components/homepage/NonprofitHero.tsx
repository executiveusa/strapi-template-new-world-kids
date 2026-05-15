"use client"

import { Link } from "@/lib/navigation"

const galleryImages = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400",
  "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?w=400",
  "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?w=400",
  "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?w=400",
  "https://images.unsplash.com/photo-1524799526615-766a9833dec0?w=400",
]

export function NonprofitHero() {
  const scrollingImages = [...galleryImages, ...galleryImages]

  return (
    <section className="min-h-screen border-b border-white/10 bg-[#080f0a] px-6 py-10 md:px-10">
      <div className="mx-auto flex min-h-[calc(100svh-80px)] max-w-6xl flex-col justify-between gap-8">
        <div className="space-y-10 pt-10 text-center md:pt-16">
          <p className="font-serif text-2xl leading-relaxed text-[#c9a84c] italic md:text-4xl">
            “If you ever think you&apos;re too small to make a difference, try
            going to sleep with a mosquito in the room.”
          </p>
          <p className="font-serif text-sm tracking-[0.25em] text-[#c9a84c] uppercase">
            African Proverb
          </p>

          <h1 className="mx-auto max-w-5xl font-serif text-4xl leading-tight text-white md:text-6xl">
            We build systems to address the Core 4: Food, Water, Energy,
            Shelter.
          </h1>
          <p className="mx-auto max-w-3xl text-base text-white/80 md:text-xl">
            Seattle, WA / Puerto Vallarta, Mexico. Zero tuition. Real skills. 5
            years running.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/#timeline"
              className="rounded-full bg-[#c9a84c] px-7 py-4 text-sm font-semibold text-[#080f0a]"
            >
              See our timeline →
            </Link>
            <Link
              href="/donate"
              className="rounded-full border border-white px-7 py-4 text-sm font-semibold text-white"
            >
              Support the mission →
            </Link>
          </div>
        </div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[scroll-right_20s_linear_infinite] gap-4 py-2">
            {scrollingImages.map((src, idx) => (
              <img
                key={`${src}-${idx}`}
                src={src}
                alt="New World Kids field placeholder"
                className="h-20 w-auto rounded-xl object-cover md:h-[120px]"
              />
            ))}
          </div>
        </div>

        <div className="border-t border-[#c9a84c]/40 pt-4 text-center text-xs tracking-[0.25em] text-[#c9a84c] uppercase">
          A program of Humanitarian Social Innovations · 501(c)(3) · EIN:
          46-4779591
        </div>
      </div>
    </section>
  )
}
