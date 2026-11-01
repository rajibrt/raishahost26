import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { articles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Knowledge Base — Hosting Tips & Web Design Guides',
  description:
    'Hosting tips, web design guides, domain advice and online business articles in English and Bangla from the RaishaHost team.',
  alternates: { canonical: 'https://raishahost.com/knowledge' },
  openGraph: {
    title: 'Knowledge Base | RaishaHost — Hosting Tips & Web Design Guides',
    description: 'Helpful articles on web hosting, domains, web design and growing your business online.',
    url: 'https://raishahost.com/knowledge',
  },
}

export default function KnowledgePage() {
  return (
    <InnerPage
      kicker='Knowledge base'
      title={<>Learn before <em className='sky'>you launch.</em></>}
      lede='Short, practical guides on hosting, domains, websites and selling online. Some articles are in English, some in Bangla.'
    >
      <section className='sec tight gut'>
        <div className='in'>
          <div className='cards' data-stagger>
            {articles.map((a) => {
              const bn = a.lang !== 'English'
              return (
                <Link key={a.slug} href={`/knowledge/${a.slug}`} className='card post'>
                  <div className='meta'>
                    <b>{a.category}</b>
                    <span>{a.date}</span>
                    <span>{a.readTime} read</span>
                    <span>{bn ? 'Bangla' : 'English'}</span>
                  </div>
                  <h3 className={bn ? 'bn' : undefined} lang={bn ? 'bn' : 'en'}>{a.title}</h3>
                  <p className={bn ? 'bn' : undefined} lang={bn ? 'bn' : 'en'}>{a.excerpt}</p>
                  <span className='go'>Read article →</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
