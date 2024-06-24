import type { Metadata, Viewport } from 'next'

import SiteFooter from '@/components/core/site-footer'
import { ThemeProvider } from '@/components/core/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import '@ui/styles/globals.css'
import { Comfortaa, Inter } from 'next/font/google'
import { cn } from 'ui/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
})

export const viewport: Viewport = {
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: 'cover',
  width: 'device-width',
}

export const metadata: Metadata = {
  description: 'Next-gen color palette generator',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  openGraph: {
    images: ['/og-default.jpg'],
  },
  robots: {
    follow: true,
    googleBot: {
      follow: false,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      noimageindex: true,
    },
    index: false,
    nocache: true,
  },
  title: {
    default: 'Fluid Colors',
    template: '%s | Fluid Colors',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, comfortaa.variable, 'transition-bg')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div id="skip-nav" />
          {children}
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
