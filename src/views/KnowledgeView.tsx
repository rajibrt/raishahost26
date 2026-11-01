import Link from 'next/link'
import { notFound } from 'next/navigation'
import InnerPage from '@/components/site/InnerPage'
import DocMotion from '@/components/site/DocMotion'
import { articles, type Article, type ContentBlock } from '@/lib/articles'
import { articlesBn } from '@/lib/articles.bn'
import { localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Knowledge Base — Hosting Tips & Web Design Guides',
    description: 'Hosting tips, web design guides, domain advice and online business articles from the RaishaHost team.',
    kicker: 'Knowledge base',
    h1: <>Learn before <em className='sky'>you launch.</em></>,
    lede: 'Short, practical guides on hosting, domains, websites and selling online.',
    read: 'read',
    readArticle: 'Read article →',
    inEnglish: 'In English',
    back: '← Knowledge base',
    aboutK: 'About this article',
    topic: 'Topic',
    published: 'Published',
    readingTime: 'Reading time',
    helpH: 'Need help with your website?',
    helpP: 'Hosting, domains or a new site: our team can set it up for you.',
    talk: 'Talk to us',
    plans: 'See hosting plans',
    moreK: 'Keep reading',
    moreH: 'More from the knowledge base.',
    knowledge: 'Knowledge',
  },
  bn: {
    title: 'নলেজ বেস — হোস্টিং টিপস ও ওয়েব ডিজাইন গাইড',
    description: 'RaishaHost টিমের লেখা হোস্টিং টিপস, ওয়েব ডিজাইন গাইড, ডোমেইন পরামর্শ ও অনলাইন ব্যবসা নিয়ে আর্টিকেল।',
    kicker: 'নলেজ বেস',
    h1: <>লঞ্চের আগে <em className='sky'>জেনে নিন।</em></>,
    lede: 'হোস্টিং, ডোমেইন, ওয়েবসাইট ও অনলাইনে বিক্রি নিয়ে ছোট, কাজের গাইড।',
    read: 'পড়ার সময়',
    readArticle: 'আর্টিকেলটি পড়ুন →',
    inEnglish: 'ইংরেজিতে',
    back: '← নলেজ বেস',
    aboutK: 'এই আর্টিকেল সম্পর্কে',
    topic: 'বিষয়',
    published: 'প্রকাশিত',
    readingTime: 'পড়ার সময়',
    helpH: 'ওয়েবসাইট নিয়ে সাহায্য দরকার?',
    helpP: 'হোস্টিং, ডোমেইন বা নতুন সাইট: আমাদের টিম সব সেটআপ করে দিতে পারে।',
    talk: 'কথা বলুন',
    plans: 'হোস্টিং প্ল্যান দেখুন',
    moreK: 'আরও পড়ুন',
    moreH: 'নলেজ বেস থেকে আরও।',
    knowledge: 'নলেজ বেস',
  },
}

const list = (lang: Lang) => (lang === 'bn' ? articlesBn : articles)
export const findArticle = (slug: string, lang: Lang) => list(lang).find((a) => a.slug === slug)
export const articleSlugs = () => articles.map((a) => ({ slug: a.slug }))

/** An article written in a language other than the page's is marked and tagged with its own lang. */
const articleLang = (a: Article): Lang => (a.lang === 'English' ? 'en' : 'bn')
const readTime = (a: Article, lang: Lang) => (lang === 'bn' ? a.readTime.replace('min', 'মিনিট') : `${a.readTime} ${t.en.read}`)

export const knowledgeMetadata = (lang: Lang) => pageMeta('/knowledge', lang, t[lang])

export function articleMetadata(slug: string, lang: Lang) {
  const a = findArticle(slug, lang)
  if (!a) return {}
  return pageMeta(`/knowledge/${slug}`, lang, { title: `${a.title} | ${t[lang].knowledge}`, description: a.excerpt })
}

function PostCard({ a, lang, full = true }: { a: Article; lang: Lang; full?: boolean }) {
  const c = t[lang]
  const al = articleLang(a)
  return (
    <Link href={localPath(`/knowledge/${a.slug}`, lang)} className='card post'>
      <div className='meta'>
        <b>{a.category}</b>
        {full && <span>{a.date}</span>}
        <span>{readTime(a, lang)}</span>
        {al !== lang && <span>{c.inEnglish}</span>}
      </div>
      <h3 lang={al}>{a.title}</h3>
      {full && <p lang={al}>{a.excerpt}</p>}
      <span className='go'>{c.readArticle}</span>
    </Link>
  )
}

export default function KnowledgeView({ lang }: { lang: Lang }) {
  const c = t[lang]
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in'>
          <div className='cards' data-stagger>
            {list(lang).map((a) => <PostCard key={a.slug} a={a} lang={lang} />)}
          </div>
        </div>
      </section>
    </InnerPage>
  )
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

export function ArticleView({ slug, lang }: { slug: string; lang: Lang }) {
  const c = t[lang]
  const L = (h: string) => localPath(h, lang)
  const article = findArticle(slug, lang)
  if (!article) notFound()
  const al = articleLang(article)
  const related = list(lang).filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <InnerPage
      lang={lang}
      kicker={<Link href={L('/knowledge')} style={{ textDecoration: 'none' }}>{c.back} · {article.category}</Link>}
      title={<span lang={al}>{article.title}</span>}
      lede={<span lang={al}>{article.excerpt}</span>}
      headClass='ahead'
      actions={
        <div className='post'>
          <div className='meta'>
            <span>{article.date}</span>
            <span>{readTime(article, lang)}</span>
            {al !== lang && <span>{c.inEnglish}</span>}
          </div>
        </div>
      }
    >
      <DocMotion target='.article' />
      <section className='sec tight gut'>
        <div className='in read'>
          <article className='article' lang={al}>
            {article.content.map((block, i) => renderBlock(block, i))}
          </article>
          <aside className='rv'>
            <div className='card'>
              <span className='k'>{c.aboutK}</span>
              <ul className='specs'>
                <li><span>{c.topic}</span><b>{article.category}</b></li>
                <li><span>{c.published}</span><b>{article.date}</b></li>
                <li><span>{c.readingTime}</span><b>{lang === 'bn' ? article.readTime.replace('min', 'মিনিট') : article.readTime}</b></li>
              </ul>
            </div>
            <div className='card'>
              <h3>{c.helpH}</h3>
              <p>{c.helpP}</p>
              <Link className='btn btn-pri' href={L('/contact')}>{c.talk}</Link>
              <Link className='btn btn-ghost' href={L('/hosting')}>{c.plans}</Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className='sec gut'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>{c.moreK}</span>
                <h2>{c.moreH}</h2>
              </div>
            </div>
            <div className='cards' data-stagger>
              {related.map((a) => <PostCard key={a.slug} a={a} lang={lang} />)}
            </div>
          </div>
        </section>
      )}
    </InnerPage>
  )
}
