import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { getJournalCopy, journalPosts } from "@/content/journal"
import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Field journal",
    title: "Ideas worth carrying forward.",
    body: "Lessons from the work, field notes, and people shaping stronger communities.",
    read: "Read →",
    metaTitle: "Field Journal | New World Kids",
    metaDescription: "Lessons, field notes, and community ideas from New World Kids.",
  },
  es: {
    eyebrow: "Bitácora de campo",
    title: "Ideas que vale la pena llevar adelante.",
    body: "Aprendizajes del trabajo, notas de campo y personas que fortalecen sus comunidades.",
    read: "Leer →",
    metaTitle: "Bitácora de campo | New World Kids",
    metaDescription: "Aprendizajes, notas de campo e ideas comunitarias de New World Kids.",
  },
} as const

export async function generateMetadata({ params }: { readonly params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function BlogPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <section className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,10vw,7rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.title}</h1>
          <p className="mt-9 max-w-2xl border-t border-black/15 pt-7 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
        </div>
      </section>

      <section className="border-t border-black/15 px-5 pb-24 sm:px-8 md:px-10 md:pb-32">
        <div className="mx-auto max-w-7xl">
          {journalPosts.map((post, index) => {
            const article = getJournalCopy(post, locale)
            return (
              <article key={post.slug} className="grid gap-6 border-b border-black/15 py-10 md:grid-cols-[92px_1fr_auto] md:items-start md:gap-8 md:py-12">
                <div className="text-[10px] font-semibold tracking-[0.14em] text-black/38">0{index + 1}</div>
                <div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-semibold tracking-[0.14em] text-[var(--color-nwk-blue)] uppercase">
                    <span>{post.category}</span>
                    <span className="text-black/28">·</span>
                    <span className="text-black/42">{post.date}</span>
                  </div>
                  <h2 className="mt-3 max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[0.96] font-black tracking-[-0.045em] text-balance">{article.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{article.dek}</p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  locale={locale}
                  className="group inline-flex min-h-11 items-center justify-between border-y border-black/20 py-3 text-sm font-black md:min-w-28"
                >
                  <span>{t.read}</span>
                  <span aria-hidden="true" className="ml-6 transition-transform duration-200 group-hover:translate-x-1">↗</span>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
