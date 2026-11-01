import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Our Promises — Uptime, Money-Back, SSL & Support',
    description:
      'What RaishaHost promises: a 99.9% uptime target, a 30-day money-back guarantee on hosting, free SSL on every plan and 24/7 support through tickets.',
    kicker: 'Our promises',
    h1: <>What you can <em className='sky'>count on.</em></>,
    lede: 'Simple promises we keep with every hosting plan, written in plain words.',
    promises: [
      { big: '99.9%', title: 'Uptime target', body: 'We aim to keep your website online 99.9% of the time, with servers we watch around the clock and fix fast when something goes wrong.' },
      { big: '30 days', title: 'Money-back on hosting', body: 'Not happy? Ask within 30 days of signing up and we refund the hosting fee. Some conditions apply.', href: '/money-back', link: 'Read the conditions →' },
      { big: 'Free', title: 'SSL on every plan', body: 'Every hosting plan includes an SSL certificate that installs and renews itself, so your site shows the padlock.' },
      { big: '24/7', title: 'Support from people', body: 'Our own team answers support tickets day and night. Business hours for phone and billing are on the contact page.', href: '/contact', link: 'Contact us →' },
      { big: 'Safe', title: 'Security updates', body: 'We keep servers updated and scan for malware, so your site and data stay protected.' },
      { big: 'Clear', title: 'Honest prices', body: 'Every price shows what it covers and how often you pay: hosting yearly, VPS monthly.', href: '/hosting', link: 'See hosting plans →' },
    ],
    fine: 'The uptime figure is a target, not a contract. Full rules are in our',
    terms: 'terms',
    bandH: 'Any questions?',
    bandP: 'Our support team is happy to help before and after you buy.',
    support: 'Contact support',
    plans: 'See hosting plans',
  },
  bn: {
    title: 'আমাদের প্রতিশ্রুতি: আপটাইম, মানি-ব্যাক ও সাপোর্ট',
    description:
      'RaishaHost-এর প্রতিশ্রুতি: ৯৯.৯% আপটাইম লক্ষ্য, হোস্টিংয়ে ৩০ দিনের মানি-ব্যাক গ্যারান্টি, প্রতিটি প্ল্যানে ফ্রি SSL এবং টিকেটের মাধ্যমে ২৪/৭ সাপোর্ট।',
    kicker: 'আমাদের প্রতিশ্রুতি',
    h1: <>যার ওপর <em className='sky'>ভরসা রাখতে পারেন।</em></>,
    lede: 'প্রতিটি হোস্টিং প্ল্যানে আমরা যে সহজ প্রতিশ্রুতিগুলো রাখি, সহজ ভাষায় লেখা।',
    promises: [
      { big: '৯৯.৯%', title: 'আপটাইম লক্ষ্য', body: 'আপনার ওয়েবসাইট ৯৯.৯% সময় অনলাইনে রাখাই আমাদের লক্ষ্য। সার্ভারগুলো আমরা চব্বিশ ঘণ্টা নজরে রাখি, কিছু ভুল হলে দ্রুত ঠিক করি।' },
      { big: '৩০ দিন', title: 'হোস্টিংয়ে মানি-ব্যাক', body: 'সন্তুষ্ট নন? সাইন-আপের ৩০ দিনের মধ্যে জানালে হোস্টিং ফি ফেরত দিই। কিছু শর্ত প্রযোজ্য।', href: '/money-back', link: 'শর্তগুলো পড়ুন →' },
      { big: 'ফ্রি', title: 'প্রতিটি প্ল্যানে SSL', body: 'প্রতিটি হোস্টিং প্ল্যানে এমন SSL সার্টিফিকেট থাকে যা নিজে থেকেই ইনস্টল ও রিনিউ হয়, তাই আপনার সাইটে তালার চিহ্ন দেখায়।' },
      { big: '২৪/৭', title: 'মানুষের সাপোর্ট', body: 'আমাদের নিজস্ব টিম দিনরাত সাপোর্ট টিকেটের উত্তর দেয়। ফোন ও বিলিংয়ের অফিস সময় যোগাযোগ পেজে দেওয়া আছে।', href: '/contact', link: 'যোগাযোগ করুন →' },
      { big: 'নিরাপদ', title: 'নিরাপত্তা আপডেট', body: 'আমরা সার্ভার আপডেট রাখি ও ম্যালওয়্যার স্ক্যান করি, যাতে আপনার সাইট ও ডেটা সুরক্ষিত থাকে।' },
      { big: 'স্পষ্ট', title: 'সৎ দাম', body: 'প্রতিটি দামে কী থাকছে আর কত দিন পরপর দিতে হবে তা লেখা থাকে: হোস্টিং বছরে, VPS মাসে।', href: '/hosting', link: 'হোস্টিং প্ল্যান দেখুন →' },
    ],
    fine: 'আপটাইমের সংখ্যাটি একটি লক্ষ্য, চুক্তি নয়। পূর্ণ নিয়ম পাবেন আমাদের',
    terms: 'শর্তাবলীতে',
    bandH: 'কোনো প্রশ্ন আছে?',
    bandP: 'কেনার আগে ও পরে আমাদের সাপোর্ট টিম সাহায্য করতে প্রস্তুত।',
    support: 'সাপোর্টে যোগাযোগ',
    plans: 'হোস্টিং প্ল্যান দেখুন',
  },
}

export const guaranteesMetadata = (lang: Lang) => pageMeta('/guarantees', lang, t[lang])

export default function GuaranteesView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const L = (h: string) => localPath(h, lang)
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in'>
          <div className='cards' data-stagger>
            {c.promises.map((p) => (
              <div className='pr' key={p.title}>
                <span className='big'>{p.big}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                {p.href && <Link href={L(p.href)}>{p.link}</Link>}
              </div>
            ))}
          </div>
          <p className='fine' style={{ marginTop: 20 }}>
            {c.fine} <Link href={L('/terms-conditions')} style={{ color: 'var(--rh-sky)' }}>{c.terms}</Link>.
          </p>
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
              <Link className='btn btn-pri' href={L('/contact')}>{c.support}</Link>
              <Link className='btn btn-ghost' href={L('/hosting')}>{c.plans}</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
