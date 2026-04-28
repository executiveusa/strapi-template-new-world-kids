import type { CSSProperties } from 'react'
import type { BuildTime } from '@/types'
import { useLocale, useTranslations } from 'next-intl'
import { FormattedDate } from '@/components/formatted-date'
import { siteConfig } from '@/lib/site'
import { socialLinks } from '@/lib/social'
import { cn } from '@/lib/utils'

interface Props {
  buildTime: BuildTime
}

export function SiteFooter({ buildTime }: Props) {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-8 lg:px-0">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {Object.entries(socialLinks).map(([name, social]) => (
            <a
              key={name}
              href={social.url.replace('{locale}', locale)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'dark:hover:text-primary text-muted-foreground transition-colors hover:text-(--social-color)',
                'inline-flex items-center justify-center',
              )}
              style={{
                ['--social-color' as keyof CSSProperties]: social.color,
              }}
              aria-label={social.name}
            >
              <social.icon className="size-5" />
            </a>
          ))}
        </div>
        <div className="rounded-sm border px-4 py-3 text-center text-sm text-muted-foreground">
          Fiscal sponsor: Humanitarian Social Innovations | EIN 46-4779591 |{' '}
          <a
            href="https://newworldkids.org/trust"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {locale === 'es' ? 'documentos de verificacion' : 'verification documents'}
          </a>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
          <div className="text-muted-foreground text-sm">
            {t('copyright')}
            {' © '}
            {new Date().getFullYear()}
            {' '}
            <span className="font-medium text-foreground">{siteConfig.author}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            {t('lastBuilt')}
            {' '}
            <FormattedDate date={buildTime} />
          </span>
        </div>
      </div>
    </footer>
  )
}
