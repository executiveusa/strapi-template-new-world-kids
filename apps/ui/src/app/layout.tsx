import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | New World Kids',
    default: 'New World Kids - Learn Tech Skills',
  },
  description: 'Free coding and tech education for youth in Seattle. Change your future through tech.',
  keywords: ['coding', 'education', 'tech', 'youth', 'Seattle', 'STEM'],
  authors: [{ name: 'New World Kids' }],
  creator: 'New World Kids',
  publisher: 'New World Kids',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://newworldkids.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://newworldkids.org',
    title: 'New World Kids - Learn Tech Skills',
    description: 'Free coding and tech education for youth in Seattle',
    siteName: 'New World Kids',
    images: [
      {
        url: 'https://newworldkids.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'New World Kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New World Kids',
    description: 'Free coding education for youth in Seattle',
    images: ['https://newworldkids.org/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'New World Kids',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .then(reg => console.log('SW registered'))
                .catch(err => console.log('SW registration failed:', err))
            })
          }
        `}} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
