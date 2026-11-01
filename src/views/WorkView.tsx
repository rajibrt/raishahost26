import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Our Work',
    description: 'Websites RaishaHost designed, built and hosts for clients around the world.',
    kicker: 'Our work',
    h1: <>Websites we built <em className='sky'>and host.</em></>,
    lede: 'Case studies from clients around the world. Each one is published with the client’s permission.',
    metas: ['Web design + hosting', 'E-commerce + VPS', 'Logo + website'],
    shot: 'Client screenshot',
    soon: 'Case study coming soon',
    soonP: 'Added after client approval.',
    want: 'Want a site like these?',
    tell: 'Tell us about your project →',
  },
  bn: {
    title: 'আমাদের কাজ',
    description: 'বিশ্বের বিভিন্ন ক্লায়েন্টের জন্য RaishaHost-এর ডিজাইন করা, তৈরি করা ও হোস্ট করা ওয়েবসাইট।',
    kicker: 'আমাদের কাজ',
    h1: <>যে ওয়েবসাইট আমরা বানাই <em className='sky'>ও হোস্ট করি।</em></>,
    lede: 'বিশ্বের বিভিন্ন ক্লায়েন্টের কেস স্টাডি। প্রতিটি ক্লায়েন্টের অনুমতি নিয়ে প্রকাশ করা হয়।',
    metas: ['ওয়েব ডিজাইন + হোস্টিং', 'ই-কমার্স + VPS', 'লোগো + ওয়েবসাইট'],
    shot: 'ক্লায়েন্টের স্ক্রিনশট',
    soon: 'কেস স্টাডি শিগগির আসছে',
    soonP: 'ক্লায়েন্টের অনুমতির পর যোগ করা হবে।',
    want: 'এমন একটি সাইট চান?',
    tell: 'আপনার প্রজেক্টের কথা বলুন →',
  },
}

export const workMetadata = (lang: Lang) => pageMeta('/work', lang, t[lang])

export default function WorkView({ lang }: { lang: Lang }) {
  const c = t[lang]
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in'>
          <div className='work' data-stagger>
            {c.metas.map((meta) => (
              <article className='case' key={meta}>
                <div className='shot'>{c.shot}</div>
                <div className='body'>
                  <span className='meta'>{meta}</span>
                  <h3>{c.soon}</h3>
                  <p>{c.soonP}</p>
                </div>
              </article>
            ))}
          </div>
          <p className='fine' style={{ marginTop: 24 }}>
            {c.want} <Link href={localPath('/contact', lang)} style={{ color: 'var(--rh-sky)' }}>{c.tell}</Link>
          </p>
        </div>
      </section>
    </InnerPage>
  )
}
