import { notFound } from "next/navigation"
import { type Locale, hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

import { SiteFooter } from "@/components/site/SiteFooter"
import { SiteHeader } from "@/components/site/SiteHeader"
import { routing } from "@/lib/navigation"

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale as Locale} messages={messages}>
      <div data-locale={locale} className="flex min-h-screen flex-col">
        <SiteHeader locale={locale as Locale} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale as Locale} />
      </div>
    </NextIntlClientProvider>
  )
}
