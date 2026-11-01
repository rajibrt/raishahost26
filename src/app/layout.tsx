import type { Metadata } from 'next'
import { Inter, Noto_Sans_Bengali, Manrope, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/providers/LenisProvider'
import MessengerWidget from '@/components/MessengerWidget'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Bangla text (Bangla articles now, the /bn site later). Variable weights 100–900, so bold headings
// render properly. Not preloaded: English pages never download it.
const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bn',
  preload: false,
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-plex-mono',
})

const siteUrl = 'https://raishahost.com'
// Default share image (pages set their own from public/og/, made by scripts/make-og.mjs).
const ogImage = `${siteUrl}/og/en/home.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RaishaHost — Web Hosting, VPS & Web Design Worldwide | Since 2008',
    template: '%s | RaishaHost',
  },
  description:
    'RaishaHost offers affordable Linux SSD web hosting, domain registration, web design, logo & graphic design, and digital marketing for clients worldwide, from a team based in Bangladesh. 99.9% uptime, free SSL, cPanel, 24/7 support. In business since 2008.',
  keywords: [
    'web hosting',
    'VPS hosting',
    'web hosting Bangladesh',
    'domain registration Bangladesh',
    'SSD hosting',
    'cPanel hosting',
    'free SSL hosting',
    'cheap web hosting',
    'web design Bangladesh',
    'logo design Bangladesh',
    'graphic design Bangladesh',
    'digital marketing Bangladesh',
    'RaishaHost',
    'raishahost.com',
    'hosting company Bangladesh',
    'Linux hosting',
    'shared hosting Bangladesh',
  ],
  authors: [{ name: 'RaishaHost', url: siteUrl }],
  creator: 'RaishaHost',
  publisher: 'RaishaHost',
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'RaishaHost',
    title: 'RaishaHost — Web Hosting, VPS & Web Design Worldwide | Since 2008',
    description:
      'Affordable Linux SSD web hosting, VPS, domains, web design & digital marketing for clients worldwide. 99.9% uptime, free SSL, cPanel, 24/7 support.',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'RaishaHost — Web Hosting, VPS & Web Design since 2008',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@raishahost',
    creator: '@raishahost',
    title: 'RaishaHost — Web Hosting, VPS & Web Design Worldwide',
    description:
      'Affordable Linux SSD web hosting, VPS, domains, web design & digital marketing for clients worldwide.',
    images: [ogImage],
  },
  verification: {
    google: 'yKZ59WI2rXd3PXTSYUdft1AtyR2K1aMnZUijRdmjozI',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RaishaHost',
    url: siteUrl,
    logo: `${siteUrl}/brand/raishahost-mark.svg`,
    foundingDate: '2008',
    description:
      'Web hosting and digital services company based in Bangladesh, serving clients worldwide',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+880-1711-380679',
        contactType: 'customer service',
        availableLanguage: ['English', 'Bengali'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+880-1878037803',
        contactType: 'customer service',
        availableLanguage: ['English', 'Bengali'],
      },
    ],
    sameAs: [
      'https://facebook.com/RaishaHost',
      'https://twitter.com/raishahost',
    ],
  }

  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      className={`${inter.variable} ${notoBengali.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className='bg-[#030712] text-gray-100 overflow-x-hidden antialiased'>
        <LenisProvider>{children}</LenisProvider>
        <MessengerWidget />
      </body>
    </html>
  )
}
