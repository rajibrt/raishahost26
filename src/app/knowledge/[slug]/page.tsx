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
    title: `${article.title} | Knowledge`,
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
  const related = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <InnerPage
      kicker={<Link href='/knowledge' style={{ textDecoration: 'none' }}>← Knowledge base · {article.category}</Link>}
      title={article.title}
      lede={article.excerpt}
      headClass='ahead'
      actions={
        <div className='post'>
          <div className='meta'>
            <span>{article.date}</span>
            <span>{article.readTime} read</span>
          </div>
        </div>
      }
    >
      <DocMotion target='.article' />
      <section className='sec tight gut'>
        <div className='in read'>
          <article className='article'>
            {article.content.map((block, i) => renderBlock(block, i))}
          </article>
          <aside className='rv'>
            <div className='card'>
              <span className='k'>About this article</span>
              <ul className='specs'>
                <li><span>Topic</span><b>{article.category}</b></li>
                <li><span>Published</span><b>{article.date}</b></li>
                <li><span>Reading time</span><b>{article.readTime}</b></li>
              </ul>
            </div>
            <div className='card'>
              <h3>Need help with your website?</h3>
              <p>Hosting, domains or a new site: our team can set it up for you.</p>
              <Link className='btn btn-pri' href='/contact'>Talk to us</Link>
              <Link className='btn btn-ghost' href='/hosting'>See hosting plans</Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className='sec gut'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>Keep reading</span>
                <h2>More from the knowledge base.</h2>
              </div>
            </div>
            <div className='cards' data-stagger>
              {related.map((a) => (
                <Link key={a.slug} href={`/knowledge/${a.slug}`} className='card post'>
                  <div className='meta'>
                    <b>{a.category}</b>
                    <span>{a.readTime} read</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <span className='go'>Read article →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </InnerPage>
  )
}
