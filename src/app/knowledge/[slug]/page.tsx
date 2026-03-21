import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { articles, getArticleBySlug, type ContentBlock } from '@/lib/articles'
import { ArrowLeft, Calendar, Clock, Tag, BookOpen } from 'lucide-react'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | RaishaHost Knowledge`,
    description: article.excerpt,
  }
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p key={i} className="text-gray-300 leading-relaxed mb-5">
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={i} className="space-y-2 mb-6 ml-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-300">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#05CCF7] shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={i} className="space-y-3 mb-6 ml-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-300">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                style={{ background: 'rgba(5,204,247,0.2)', color: '#05CCF7' }}
              >
                {j + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      )
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${article.color}, transparent)` }}
        />
        <ScrollReveal className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" y={60} start="top 90%">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            সকল আর্টিকেল
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: `${article.color}20`, color: article.color }}
            >
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400">
              {article.lang}
            </span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6${article.lang === 'বাংলা' ? ' font-bn' : ''}`}>
            {article.title}
          </h1>

          <p className={`text-gray-400 text-lg leading-relaxed mb-8${article.lang === 'বাংলা' ? ' font-bn' : ''}`}>
            {article.excerpt}
          </p>

          <div className="flex items-center gap-5 text-sm text-gray-500 pb-8 border-b border-white/7">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readTime} read
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* Article Body */}
      <section className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={30}>
          <div className={`prose-custom${article.lang === 'বাংলা' ? ' font-bn' : ''}`}>
            {article.content.map((block, i) => renderBlock(block, i))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="mt-14">
          <div
            className="rounded-2xl p-8 border text-center"
            style={{
              background: `linear-gradient(135deg, ${article.color}10, transparent)`,
              borderColor: `${article.color}25`,
            }}
          >
            <p className="text-gray-300 mb-5 text-base">
              আরো জানতে বা কোনো সার্ভিস নিতে আমাদের সাথে যোগাযোগ করুন
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${article.color}, ${article.color}99)` }}
            >
              যোগাযোগ করুন
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              আরও পড়ুন
            </div>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-5" stagger={0.15} start="top 85%">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/knowledge/${rel.slug}`}
                className="block rounded-2xl overflow-hidden border border-white/6 bg-white/2 hover:border-white/10 hover:-translate-y-1 transition-all group"
              >
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${rel.color}, ${rel.color}50)` }} />
                <div className="p-5">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block"
                    style={{ background: `${rel.color}15`, color: rel.color }}
                  >
                    {rel.category}
                  </span>
                  <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-[#05CCF7] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </section>
      )}

      <Footer />
    </main>
  )
}
