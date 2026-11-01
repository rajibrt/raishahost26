import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import DocMotion from '@/components/site/DocMotion'
import { articles, getArticleBySlug, type ContentBlock } from '@/lib/articles'

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
    alternates: { canonical: `https://raishahost.com/knowledge/${slug}` },
  }
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>
    case 'h3':
      return <h3 key={i}>{block.text}</h3>
    case 'p':
      return <p key={i}>{block.text}</p>
    case 'ul':
      return <ul key={i}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
    case 'ol':
      return <ol key={i}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ol>
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()
  const bn = article.lang !== 'English'
  const related = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <InnerPage
      kicker={<Link href='/knowledge' style={{ textDecoration: 'none' }}>← Knowledge base · {article.category}</Link>}
      title={<span lang={bn ? 'bn' : 'en'}>{article.title}</span>}
      lede={<span lang={bn ? 'bn' : 'en'}>{article.excerpt}</span>}
      headClass={bn ? 'bn' : undefined}
      actions={
        <div className='post'>
          <div className='meta'>
            <span>{article.date}</span>
            <span>{article.readTime} read</span>
            <span>{bn ? 'Bangla' : 'English'}</span>
          </div>
        </div>
      }
    >
      <DocMotion target='.article' />
      <section className='sec tight gut'>
        <div className='in'>
          <article className={bn ? 'article bn' : 'article'} lang={bn ? 'bn' : 'en'}>
            {article.content.map((block, i) => renderBlock(block, i))}
          </article>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='band rv'>
            <div>
              <h2>Need help with your website?</h2>
              <p>Hosting, domains or a new site: our team can set it up for you.</p>
            </div>
            <div className='row'>
              <Link className='btn btn-pri' href='/contact'>Contact us</Link>
              <Link className='btn btn-ghost' href='/hosting'>See hosting plans</Link>
            </div>
          </div>
          {related.length > 0 && (
            <>
              <span className='k' style={{ display: 'block', marginTop: 56 }}>More articles</span>
              <div className='cards' style={{ marginTop: 16 }} data-stagger>
                {related.map((a) => {
                  const rbn = a.lang !== 'English'
                  return (
                    <Link key={a.slug} href={`/knowledge/${a.slug}`} className='card post'>
                      <div className='meta'>
                        <b>{a.category}</b>
                        <span>{a.readTime} read</span>
                      </div>
                      <h3 className={rbn ? 'bn' : undefined} lang={rbn ? 'bn' : 'en'}>{a.title}</h3>
                      <span className='go'>Read article →</span>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </InnerPage>
  )
}
