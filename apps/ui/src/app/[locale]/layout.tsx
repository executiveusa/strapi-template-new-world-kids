import "@/styles/globals.css"

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import type { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { ClientProviders } from "@/components/providers/ClientProviders"
import { ServerProviders } from "@/components/providers/ServerProviders"
import TrackingScripts from "@/components/providers/TrackingScripts"
import PublicFooter from "@/components/site/PublicFooter"
import { PublicNavbar } from "@/components/site/PublicNavbar"
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
    default: "New World Kids | Food, Water, Energy, and Shelter for Youth",
  },
  description:
    "Free regenerative education in Puerto Vallarta. We teach young people how to grow food, protect water, make energy, and build shelter through real community work.",
  keywords: [
    "youth empowerment",
    "food forest",
    "regenerative education",
    "regenerative agriculture",
    "nonprofit",
    "culture shock program",
    "Proyecto Indigo Azul",
    "Puerto Vallarta",
    "Seattle",
    "AI nonprofit",
    "Humanitarian Social Innovations",
  ],
  openGraph: {
    siteName: "New World Kids",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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

  const CSR_ENVs = [
    "NODE_ENV",
    "DEBUG_STRAPI_CLIENT_API_CALLS",
    "SHOW_NON_BLOCKING_ERRORS",
    "APP_PUBLIC_URL",
  ]

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script id="csr-config" strategy="beforeInteractive">
          {`
         window.CSR_CONFIG = window.CSR_CONFIG || {};
         window.CSR_CONFIG = ${JSON.stringify({
           ...CSR_ENVs.reduce(
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
          "min-h-screen bg-[#050905] font-sans antialiased",
          playfairDisplay.variable,
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <TrackingScripts />
        <ServerProviders>
          <ClientProviders>
            <div className="relative flex min-h-screen flex-col bg-[#050905] text-[#f4edd9]">
              <PublicNavbar />
              <div className="flex-1">{children}</div>
              <Toaster />
              <PublicFooter />
            </div>
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  )
}
