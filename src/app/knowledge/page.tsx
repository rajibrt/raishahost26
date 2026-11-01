import type { Metadata } from 'next'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooterShell from '@/components/site/SiteFooterShell'
import BlogSection from '@/components/sections/BlogSection'

export const metadata: Metadata = {
  title: 'Knowledge Base — Hosting Tips & Web Design Guides',
  description:
    'Hosting tips, web design guides, domain tutorials, and digital marketing advice in English and Bangla. Learn from the RaishaHost team.',
  alternates: { canonical: 'https://raishahost.com/knowledge' },
  openGraph: {
    title: 'Knowledge Base | RaishaHost — Hosting Tips & Web Design Guides',
    description:
      'Helpful articles on web hosting, domain registration, web design, and digital marketing. Available in English and Bangla.',
    url: 'https://raishahost.com/knowledge',
  },
}

export default function KnowledgePage() {
  return (
    <main>
      <SiteHeader />
      <div className="pt-20">
        <BlogSection />
      </div>
      <SiteFooterShell />
    </main>
  )
}
