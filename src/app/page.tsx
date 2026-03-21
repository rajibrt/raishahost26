import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PricingSection from '@/components/sections/PricingSection'
import WebDesignSection from '@/components/sections/WebDesignSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BlogSection from '@/components/sections/BlogSection'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'RaishaHost — Affordable Web Hosting in Bangladesh | Since 2008',
  description:
    'RaishaHost offers affordable Linux SSD web hosting with 99.9% uptime, free SSL, cPanel, domain registration, web design, logo & graphic design, and digital marketing in Bangladesh. Trusted since 2008.',
  alternates: { canonical: 'https://raishahost.com' },
  openGraph: {
    title: 'RaishaHost — Affordable Web Hosting in Bangladesh | Since 2008',
    description:
      'Linux SSD hosting with 99.9% uptime, free SSL & cPanel. Domain registration, web design & digital marketing. Trusted in Bangladesh since 2008.',
    url: 'https://raishahost.com',
  },
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RaishaHost',
    url: 'https://raishahost.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://hosting.raishahost.com/cart.php?a=add&domain=register&query={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <PricingSection />
      <WebDesignSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  )
}
