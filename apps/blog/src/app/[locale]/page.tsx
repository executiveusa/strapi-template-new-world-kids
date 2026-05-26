import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PostList } from '@/components/post-list'
import { Link } from '@/i18n/navigation'
import { resolveLocale } from '@/i18n/utils'
import { DefaultLayout } from '@/layouts/default-layout'
import { getBuildTime } from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'metadata.home' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale: resolvedLocale,
  })
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  setRequestLocale(resolvedLocale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'site' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(resolvedLocale)
  const featuredPosts = metadata.posts.slice(0, 4)
  const pillarCards
    = resolvedLocale === 'es'
      ? [
          ['Alimentos', 'Cultivo, bosque comestible, propagacion y soberania alimentaria.'],
          ['Agua', 'Captacion, almacenamiento, riego y diseno hidrico para la vida diaria.'],
          ['Energia', 'Sistemas fuera de red, resiliencia y herramientas que siguen funcionando.'],
          ['Refugio', 'Construccion natural, espacios de aprendizaje y durabilidad comunitaria.'],
        ]
      : [
          ['Food', 'Growing systems, food forests, propagation, and neighborhood food resilience.'],
          ['Water', 'Capture, storage, irrigation, and water design for everyday stability.'],
          ['Energy', 'Off-grid systems, resilience, and tools that keep working when things get hard.'],
          ['Shelter', 'Natural building, learning spaces, and places people can actually care for.'],
        ]

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <section className="border-b px-6 py-16 lg:px-0">
        <div className="container mx-auto">
          <div className="mb-4 text-xs tracking-[0.22em] text-[#9e8251] uppercase">
            {resolvedLocale === 'es' ? 'Bitacora de campo' : 'Field journal'}
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">{t('title')}</h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-8">{t('description')}</p>
          <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-7">
            {resolvedLocale === 'es'
              ? 'Esta bitacora esta organizada para que puedas entender el trabajo rapido, revisar pruebas y luego ir mas profundo por tema. Cada historia debe poder sostener fotos reales, documentos de confianza y preguntas guiadas por IA.'
              : 'This journal is organized so people can understand the work quickly, check proof, and then peel back deeper layers by topic. Every story is designed to hold real photography, trust documents, and scoped AI follow-up.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/posts" className="hover:bg-accent rounded-sm border px-4 py-2">
              {resolvedLocale === 'es' ? 'Ver todas las historias' : 'Browse all stories'}
            </Link>
            <a href="https://newworldkids.org/trust" className="hover:bg-accent rounded-sm border px-4 py-2">
              {resolvedLocale === 'es' ? 'Ver confianza y documentos' : 'See trust and documents'}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b py-10">
        <div className="container mx-auto grid gap-4 px-6 lg:grid-cols-4 lg:px-0">
          {pillarCards.map(([title, body]) => (
            <article key={title} className="rounded-sm border p-4">
              <div className="text-xs tracking-[0.22em] text-[#9e8251] uppercase">{title}</div>
              <p className="text-muted-foreground mt-3 text-sm leading-7">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-0">
          <div className="text-muted-foreground mb-6 text-sm">
            {resolvedLocale === 'es'
              ? 'Cuatro pilares: alimentos, agua, energia y refugio.'
              : 'Four pillars: food, water, energy, and shelter.'}
          </div>
        </div>
        <PostList postsMeta={featuredPosts} selectedTag="All" />
      </section>
    </DefaultLayout>
  )
}
