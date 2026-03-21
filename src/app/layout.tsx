import type { Metadata } from 'next'
import { Inter, Hind_Siliguri } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/providers/LenisProvider'
import MessengerWidget from '@/components/MessengerWidget'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
})

const siteUrl = 'https://raishahost.com'
const ogImage = `${siteUrl}/opengraph-image`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RaishaHost — Affordable Web Hosting in Bangladesh | Since 2008',
    template: '%s | RaishaHost',
  },
  description:
    'RaishaHost offers affordable Linux SSD web hosting, domain registration, web design, logo & graphic design, and digital marketing services in Bangladesh. 99.9% uptime, free SSL, cPanel, 24/7 support. In business since 2008.',
  keywords: [
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
    title: 'RaishaHost — Affordable Web Hosting in Bangladesh | Since 2008',
    description:
      'Affordable Linux SSD web hosting, domain registration, web design & digital marketing in Bangladesh. 99.9% uptime, free SSL, cPanel, 24/7 support.',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'RaishaHost — Freedom of Host Since 2008',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@raishahost',
    creator: '@raishahost',
    title: 'RaishaHost — Affordable Web Hosting in Bangladesh',
    description:
      'Affordable Linux SSD web hosting, domain registration, web design & digital marketing in Bangladesh.',
    images: [ogImage],
  },
  verification: {
    google: 'add-your-google-search-console-verification-code-here',
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
    logo: `${siteUrl}/raisha-host-logo.svg`,
    foundingDate: '2008',
    description: 'Affordable Linux SSD web hosting and digital services company in Bangladesh',
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
      'https://youtube.com/c/RaishaHost',
    ],
  }

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030712] text-gray-100 overflow-x-hidden antialiased">
        <LenisProvider>{children}</LenisProvider>
        <MessengerWidget />
      </body>
    </html>
  )
}
