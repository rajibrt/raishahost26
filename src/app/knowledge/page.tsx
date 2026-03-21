import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
      <Navbar />
      <div className="pt-20">
        <BlogSection />
      </div>
      <Footer />
    </main>
  )
}
