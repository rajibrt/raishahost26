import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { FeaturedWork, WorkGallery } from '@/components/site/WorkCards'
import { work } from '@/data/work'
import { localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Our Work',
    description: 'Websites RaishaHost designed and built for businesses in e-commerce, real estate, garments, ISPs, finance, travel, healthcare and more.',
    kicker: 'Our work',
    h1: <>Websites we <em className='sky'>designed and built.</em></>,
    lede: 'A selection of the websites we have designed and built for businesses at home and abroad, from online stores and developers to internet providers and an aviation academy.',
    featK: 'Selected work',
    featH: 'A closer look.',
    featP: 'Hover over a screenshot to scroll through the page. Every card opens the live site.',
    moreK: 'All work shown here',
    moreH: 'By industry.',
    moreP: `${work.length} of the many sites we have built. Not every client is listed: some sites are private or internal, and others are shown only with permission.`,
    bandH: 'Want a site like these?',
    bandP: 'Tell us about your business and we will send a plan and a fixed price.',
    quote: 'Get a free quote',
    services: 'Our services',
  },
  bn: {
    title: 'আমাদের কাজ',
    description: 'ই-কমার্স, রিয়েল এস্টেট, গার্মেন্টস, ইন্টারনেট প্রোভাইডার, ফাইন্যান্স, পর্যটন, স্বাস্থ্যসেবাসহ নানা খাতের জন্য RaishaHost-এর বানানো ওয়েবসাইট।',
    kicker: 'আমাদের কাজ',
    h1: <>যে ওয়েবসাইট আমরা <em className='sky'>ডিজাইন ও তৈরি করেছি।</em></>,
    lede: 'দেশ-বিদেশের ব্যবসার জন্য আমাদের ডিজাইন ও তৈরি করা ওয়েবসাইটের কিছু বাছাই করা নমুনা: অনলাইন শপ ও ডেভেলপার থেকে ইন্টারনেট প্রোভাইডার ও এভিয়েশন একাডেমি পর্যন্ত।',
    featK: 'বাছাই করা কাজ',
    featH: 'কাছ থেকে দেখুন।',
    featP: 'স্ক্রিনশটের ওপর মাউস রাখলে পুরো পেজ স্ক্রল হবে। প্রতিটি কার্ডে চাপলে আসল সাইট খুলবে।',
    moreK: 'এখানে দেখানো সব কাজ',
    moreH: 'খাত অনুযায়ী।',
    moreP: `আমাদের তৈরি অসংখ্য সাইটের মধ্যে ${work.length.toLocaleString('bn-BD')}টি। সব ক্লায়েন্টের নাম এখানে নেই: কিছু সাইট ব্যক্তিগত বা অভ্যন্তরীণ, আর বাকিগুলো শুধু অনুমতি নিয়েই দেখানো হয়।`,
    bandH: 'এমন একটি সাইট চান?',
    bandP: 'আপনার ব্যবসার কথা জানান, আমরা পরিকল্পনা ও নির্দিষ্ট দাম পাঠাব।',
    quote: 'ফ্রি কোটেশন নিন',
    services: 'আমাদের সার্ভিস',
  },
}

export const workMetadata = (lang: Lang) => pageMeta('/work', lang, t[lang])

export default function WorkView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const L = (h: string) => localPath(h, lang)
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.featK}</span>
              <h2>{c.featH}</h2>
              <p>{c.featP}</p>
            </div>
          </div>
          <FeaturedWork lang={lang} />
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.moreK}</span>
              <h2>{c.moreH}</h2>
              <p>{c.moreP}</p>
            </div>
          </div>
          <WorkGallery lang={lang} />
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='band rv'>
            <div>
              <h2>{c.bandH}</h2>
              <p>{c.bandP}</p>
            </div>
            <div className='row'>
              <Link className='btn btn-pri' href={L('/contact')}>{c.quote}</Link>
              <Link className='btn btn-ghost' href={L('/services')}>{c.services}</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
