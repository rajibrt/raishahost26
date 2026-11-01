import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PolicyDoc from '@/components/site/PolicyDoc'
import { CLIENT_AREA_URL } from '@/components/site/links'
import { localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: '30-Day Money-Back Guarantee',
    description:
      'Not happy with your RaishaHost shared, VPS or reseller hosting? Ask within 30 days of sign-up for a hosting fee refund. What is covered and the conditions.',
    kicker: 'Refund policy',
    h1: <>30-day <em className='sky'>money-back.</em></>,
    lede: 'Try our hosting without risk. If you are not happy, ask within 30 days of signing up and we refund the hosting fee.',
    refunded: 'Refunded',
    notRefunded: 'Not refunded',
    covered: ['Shared (cPanel) hosting fee', 'VPS hosting fee', 'Reseller hosting fee'],
    notCovered: [
      'Domain registration, renewal or transfer fees',
      'Setup fees',
      'Payment gateway fees',
      'Add-on services (for example SiteLock or SpamExperts)',
      'Web design and development work',
      'SEO, maintenance or security services',
    ],
    howT: 'How it works',
    how: [
      'Every new shared, reseller and VPS hosting client can ask for a refund of the hosting fee within the first 30 days after signing up. If our hosting is not right for you, cancel the service and we return the hosting fee.',
      'Only the hosting fee is refunded. Domains, setup fees, payment fees, add-ons and design or development work are not.',
    ],
    condT: 'Conditions',
    conditions: [
      'Ask within the first 30 days after you sign up.',
      'One refund per client, and only for your first service with us.',
      'If you have had a money-back refund before, you cannot get another.',
      'Your account must be verified: your real name and any documents we ask for.',
      'A free domain or SSL that came with the plan is suspended when the refund is made.',
    ],
    askT: 'How to ask for a refund',
    ask: (L: (h: string) => string) => (
      <>
        <p>
          Open a support ticket from the <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>Client Area</a> or{' '}
          <Link href={L('/contact')}>contact us</Link>, and tell us which service you want to cancel. We confirm the amount and process it as
          quickly as we can.
        </p>
        <p className='note'>Accounts closed for breaking our <Link href={L('/terms-conditions')}>terms</Link> are not refunded.</p>
      </>
    ),
  },
  bn: {
    title: '৩০ দিনের মানি-ব্যাক গ্যারান্টি',
    description:
      'RaishaHost-এর শেয়ার্ড, VPS বা রিসেলার হোস্টিংয়ে সন্তুষ্ট নন? সাইন-আপের ৩০ দিনের মধ্যে হোস্টিং ফি ফেরত চাইতে পারেন। কী ফেরত পাবেন আর শর্তগুলো দেখুন।',
    kicker: 'রিফান্ড নীতি',
    h1: <>৩০ দিনের <em className='sky'>মানি-ব্যাক।</em></>,
    lede: 'কোনো ঝুঁকি ছাড়াই আমাদের হোস্টিং ব্যবহার করে দেখুন। সন্তুষ্ট না হলে সাইন-আপের ৩০ দিনের মধ্যে জানান, আমরা হোস্টিং ফি ফেরত দেব।',
    refunded: 'ফেরত পাবেন',
    notRefunded: 'ফেরত পাবেন না',
    covered: ['শেয়ার্ড (cPanel) হোস্টিং ফি', 'VPS হোস্টিং ফি', 'রিসেলার হোস্টিং ফি'],
    notCovered: [
      'ডোমেইন রেজিস্ট্রেশন, রিনিউ বা ট্রান্সফার ফি',
      'সেটআপ ফি',
      'পেমেন্ট গেটওয়ে ফি',
      'অ্যাড-অন সার্ভিস (যেমন SiteLock বা SpamExperts)',
      'ওয়েব ডিজাইন ও ডেভেলপমেন্টের কাজ',
      'SEO, মেইনটেন্যান্স বা সিকিউরিটি সার্ভিস',
    ],
    howT: 'যেভাবে কাজ করে',
    how: [
      'প্রত্যেক নতুন শেয়ার্ড, রিসেলার ও VPS হোস্টিং ক্লায়েন্ট সাইন-আপের প্রথম ৩০ দিনের মধ্যে হোস্টিং ফি ফেরত চাইতে পারেন। আমাদের হোস্টিং আপনার জন্য ঠিক না হলে সার্ভিসটি বাতিল করুন, আমরা হোস্টিং ফি ফেরত দেব।',
      'শুধু হোস্টিং ফি ফেরত দেওয়া হয়। ডোমেইন, সেটআপ ফি, পেমেন্ট ফি, অ্যাড-অন এবং ডিজাইন বা ডেভেলপমেন্টের কাজ ফেরতযোগ্য নয়।',
    ],
    condT: 'শর্তাবলী',
    conditions: [
      'সাইন-আপের পর প্রথম ৩০ দিনের মধ্যে অনুরোধ করতে হবে।',
      'প্রতি ক্লায়েন্ট একবার, এবং শুধু আমাদের সাথে আপনার প্রথম সার্ভিসের জন্য।',
      'আগে একবার মানি-ব্যাক রিফান্ড নিয়ে থাকলে আর পাবেন না।',
      'অ্যাকাউন্ট অবশ্যই ভেরিফাইড হতে হবে: আপনার আসল নাম ও আমরা যে ডকুমেন্ট চাই।',
      'প্ল্যানের সাথে পাওয়া ফ্রি ডোমেইন বা SSL রিফান্ডের সময় স্থগিত করা হয়।',
    ],
    askT: 'রিফান্ড যেভাবে চাইবেন',
    ask: (L: (h: string) => string) => (
      <>
        <p>
          <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>ক্লায়েন্ট এরিয়া</a> থেকে একটি সাপোর্ট টিকেট খুলুন অথবা{' '}
          <Link href={L('/contact')}>আমাদের সাথে যোগাযোগ করুন</Link>, এবং কোন সার্ভিস বাতিল করতে চান জানান। আমরা পরিমাণ নিশ্চিত করে যত দ্রুত
          সম্ভব রিফান্ড প্রক্রিয়া করব।
        </p>
        <p className='note'>আমাদের <Link href={L('/terms-conditions')}>শর্তাবলী</Link> ভাঙার কারণে বন্ধ হওয়া অ্যাকাউন্টে রিফান্ড দেওয়া হয় না।</p>
      </>
    ),
  },
}

export const moneyBackMetadata = (lang: Lang) => pageMeta('/money-back', lang, t[lang])

export default function MoneyBackView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const L = (h: string) => localPath(h, lang)
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in split'>
          <div className='card rv'>
            <span className='k'>{c.refunded}</span>
            <ul className='checks' style={{ marginTop: 8 }}>{c.covered.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className='card rv'>
            <span className='k' style={{ color: '#f08a8a' }}>{c.notRefunded}</span>
            <ul className='crosses' style={{ marginTop: 8 }}>{c.notCovered.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      </section>

      <PolicyDoc
        lang={lang}
        sections={[
          { id: 'how', title: c.howT, content: <>{c.how.map((p) => <p key={p}>{p}</p>)}</> },
          { id: 'conditions', title: c.condT, content: <ol>{c.conditions.map((x) => <li key={x}>{x}</li>)}</ol> },
          { id: 'ask', title: c.askT, content: c.ask(L) },
        ]}
      />
    </InnerPage>
  )
}
