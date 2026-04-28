import "@/styles/globals.css"

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import type { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator"
import { ClientProviders } from "@/components/providers/ClientProviders"
import { ServerProviders } from "@/components/providers/ServerProviders"
import TrackingScripts from "@/components/providers/TrackingScripts"
import SiteFooter from "@/components/site/SiteFooter"
import SiteHeader from "@/components/site/SiteHeader"
import { Toaster } from "@/components/ui/sonner"
import { debugStaticParams } from "@/lib/build"
import { inter, jetbrainsMono, playfairDisplay } from "@/lib/fonts"
import { routing } from "@/lib/navigation"
import { cn } from "@/lib/styles"

export function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  debugStaticParams(locales, "[locale]")

  return locales
}

export const metadata: Metadata = {
  title: {
    template: "%s | New World Kids",
    default: "New World Kids - Food, Water, Energy, Shelter",
  },
  description:
    "Food, water, energy, and shelter for the next generation. New World Kids builds regenerative education, public trust, and mission-funded media systems in rural Mexico.",
  keywords: [
    "youth empowerment",
    "food forest",
    "water systems",
    "off-grid energy",
    "natural building",
    "nonprofit",
    "grant writing",
    "public trust",
    "Puerto Vallarta",
    "Humanitarian Social Innovations",
  ],
  openGraph: {
    siteName: "New World Kids",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nwkids",
  },
  other: {
    "charity-ein": "46-4779591",
    "fiscal-sponsor": "Humanitarian Social Innovations",
  },
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = (await params) as { locale: Locale }

  setRequestLocale(locale)

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const csrEnvs = ["NODE_ENV", "SHOW_NON_BLOCKING_ERRORS", "APP_PUBLIC_URL"]

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script id="csr-config" strategy="beforeInteractive">
          {`
         window.CSR_CONFIG = window.CSR_CONFIG || {};
         window.CSR_CONFIG = ${JSON.stringify({
           ...csrEnvs.reduce(
             (acc, curr) => {
               acc[curr] = process.env?.[curr]

               return acc
             },
             {} as Record<string, string | undefined>
           ),
         })};
       `}
        </Script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-[#080F0A] font-sans antialiased",
          playfairDisplay.variable,
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <TrackingScripts />
        <ServerProviders>
          <ClientProviders>
            <div className="relative flex min-h-screen flex-col">
              <ErrorBoundary showErrorMessage>
                <SiteHeader locale={locale} />
              </ErrorBoundary>

              <div className="flex-1">{children}</div>

              <TailwindIndicator />
              <Toaster />

              <ErrorBoundary hideFallback>
                <SiteFooter locale={locale} />
              </ErrorBoundary>
            </div>
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  )
}
