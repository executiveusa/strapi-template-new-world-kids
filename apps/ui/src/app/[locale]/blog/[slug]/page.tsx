import type { Metadata } from "next"
import type { Locale } from "next-intl"
import { notFound } from "next/navigation"

import { getJournalCopy, getJournalPost, journalPosts } from "@/content/journal"
import { Link } from "@/lib/navigation"

export function generateStaticParams() {
  return journalPosts.flatMap((post) => [
    { locale: "en", slug: post.slug },
    { locale: "es", slug: post.slug },
  ])
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getJournalPost(slug)
  if (!post) return {}
  const article = getJournalCopy(post, locale)
  return {
    title: `${article.title} | New World Kids`,
    description: article.dek,
  }
}

export default async function JournalPostPage({
  params,
}: {
  readonly params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string }
  const post = getJournalPost(slug)
  if (!post) notFound()
  const article = getJournalCopy(post, locale)
  const back = locale === "es" ? "Volver a la bitácora" : "Back to journal"
  const source = locale === "es" ? "Base de esta nota" : "Source trail"

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <article>
        <header className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold tracking-[0.16em] uppercase">
              <span className="text-[var(--color-nwk-blue)]">{post.category}</span>
              <span className="text-black/28">·</span>
              <span className="text-black/42">{post.date}</span>
            </div>
            <h1 className="mt-5 max-w-6xl text-[clamp(3.2rem,10vw,7rem)] leading-[0.91] font-black tracking-[-0.06em] text-balance">{article.title}</h1>
            <p className="mt-9 max-w-3xl border-t border-black/15 pt-7 text-lg leading-8 text-[var(--color-text-muted)] md:text-2xl md:leading-9">{article.dek}</p>
          </div>
        </header>

        <div className="border-t border-black/15 px-5 pb-24 sm:px-8 md:px-10 md:pb-32">
          <div className="mx-auto grid max-w-7xl gap-10 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-black/40 uppercase">{source}</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">{post.sourceLabel}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="border-y border-black/15 py-2 text-[10px] font-semibold tracking-[0.08em] text-black/50 uppercase">{tag}</span>
                ))}
              </div>
            </aside>

            <div className="max-w-3xl">
              {article.sections.map((section, index) => (
                <section key={`${post.slug}-${index}`} className={index > 0 ? "mt-12 border-t border-black/15 pt-10" : ""}>
                  {section.heading ? (
                    <h2 className="mb-5 text-[clamp(2rem,5vw,3.5rem)] leading-[0.96] font-black tracking-[-0.045em]">{section.heading}</h2>
                  ) : null}
                  <div className="space-y-6">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[1.08rem] leading-8 text-[var(--color-ink-soft)] sm:text-xl sm:leading-9">{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-14 border-t border-black/18 pt-7">
                <Link href="/blog" locale={locale} className="group inline-flex min-h-11 items-center border-y border-black/20 py-3 text-sm font-black">
                  <span>← {back}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
