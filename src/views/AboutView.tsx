import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'About Us — RaishaHost Since 2008',
    description:
      'RaishaHost is a Bangladesh-based web hosting and digital services company serving clients worldwide since 2008: hosting, VPS, domains and websites.',
    kicker: 'About us · since 2008',
    h1: <>Hosting with <em className='sky'>people behind it.</em></>,
    lede: 'RaishaHost is a web hosting and digital services company based in Bangladesh. Since 2008 we have hosted, built and looked after websites for businesses around the world.',
    stats: ['Online since', 'Uptime target', 'Money-back guarantee', 'Support from people'],
    days: ' days',
    storyK: 'Our story',
    storyH: 'How we got here.',
    storyP: 'We believe every business, small or large, should have a fast and dependable place on the web, and someone to call when something goes wrong.',
    story: [
      ['2008', 'We start hosting websites', 'RaishaHost begins with one goal: reliable, affordable web hosting with real people behind it.'],
      ['Growing', 'From hosting to the whole website', 'Clients asked us to build their sites too, so we added web design, logo and graphic design, and later web apps and online stores.'],
      ['Worldwide', 'Clients in many countries', 'Businesses at home and abroad host and build with us. Our team works from Bangladesh and supports clients in every time zone.'],
      ['Today', 'Hosting, VPS servers, domains and design', 'cPanel hosting billed yearly, VPS servers billed monthly, domain registration, and websites built and hosted by the same team.'],
    ],
    valuesK: 'How we work',
    valuesH: 'What you can count on.',
    values: [
      ['Clear prices', 'Every price shows what it covers and how often you pay. No surprises at checkout.'],
      ['People, not scripts', 'Support comes from our own team through tickets, 24/7, not from a call centre reading a script.'],
      ['Safe by default', 'Free SSL on every hosting plan, so your site and your visitors are protected from day one.'],
      ['Fair refunds', 'Hosting comes with a 30-day money-back guarantee, with the conditions written in plain words.'],
    ],
    bandH: 'Let’s work together.',
    bandP: 'Need hosting, a new website or both? Tell us about your project.',
    contact: 'Contact us',
    services: 'Our services',
  },
  bn: {
    title: 'আমাদের সম্পর্কে — RaishaHost, ২০০৮ থেকে',
    description:
      'RaishaHost বাংলাদেশভিত্তিক ওয়েব হোস্টিং ও ডিজিটাল সার্ভিস প্রতিষ্ঠান, ২০০৮ থেকে বিশ্বজুড়ে: হোস্টিং, VPS, ডোমেইন ও ওয়েবসাইট।',
    kicker: 'আমাদের সম্পর্কে · ২০০৮ থেকে',
    h1: <>যে হোস্টিংয়ের পেছনে <em className='sky'>মানুষ আছে।</em></>,
    lede: 'RaishaHost বাংলাদেশভিত্তিক একটি ওয়েব হোস্টিং ও ডিজিটাল সার্ভিস প্রতিষ্ঠান। ২০০৮ সাল থেকে আমরা বিশ্বের বিভিন্ন ব্যবসার ওয়েবসাইট হোস্ট করি, তৈরি করি ও দেখাশোনা করি।',
    stats: ['অনলাইনে আছি', 'আপটাইম লক্ষ্য', 'মানি-ব্যাক গ্যারান্টি', 'মানুষের সাপোর্ট'],
    days: ' দিন',
    storyK: 'আমাদের গল্প',
    storyH: 'যেভাবে আমরা এখানে।',
    storyP: 'আমরা বিশ্বাস করি ছোট হোক বা বড়, প্রতিটি ব্যবসার ওয়েবে একটি দ্রুত ও নির্ভরযোগ্য জায়গা থাকা উচিত, আর কিছু ভুল হলে ফোন করার মতো কেউ থাকা উচিত।',
    story: [
      ['২০০৮', 'ওয়েবসাইট হোস্টিং দিয়ে শুরু', 'একটি লক্ষ্য নিয়ে RaishaHost-এর শুরু: নির্ভরযোগ্য, সাশ্রয়ী ওয়েব হোস্টিং, যার পেছনে আসল মানুষ আছে।'],
      ['বেড়ে ওঠা', 'হোস্টিং থেকে পুরো ওয়েবসাইট', 'ক্লায়েন্টরা তাদের সাইটও বানিয়ে দিতে বললেন, তাই আমরা ওয়েব ডিজাইন, লোগো ও গ্রাফিক ডিজাইন যোগ করি, পরে ওয়েব অ্যাপ ও অনলাইন শপ।'],
      ['বিশ্বজুড়ে', 'বহু দেশের ক্লায়েন্ট', 'দেশ ও বিদেশের ব্যবসা আমাদের সাথে হোস্ট করে ও সাইট বানায়। আমাদের টিম বাংলাদেশ থেকে কাজ করে, আর সব টাইম জোনের ক্লায়েন্টকে সাপোর্ট দেয়।'],
      ['আজ', 'হোস্টিং, VPS সার্ভার, ডোমেইন ও ডিজাইন', 'বছরে বিলের cPanel হোস্টিং, মাসে বিলের VPS সার্ভার, ডোমেইন রেজিস্ট্রেশন, আর একই টিমের বানানো ও হোস্ট করা ওয়েবসাইট।'],
    ],
    valuesK: 'যেভাবে কাজ করি',
    valuesH: 'যার ওপর ভরসা রাখতে পারেন।',
    values: [
      ['পরিষ্কার দাম', 'প্রতিটি দামে কী থাকছে আর কত দিন পরপর দিতে হবে, তা লেখা থাকে। চেকআউটে কোনো চমক নেই।'],
      ['মানুষ, স্ক্রিপ্ট নয়', 'সাপোর্ট দেয় আমাদের নিজস্ব টিম, টিকেটের মাধ্যমে ২৪/৭, স্ক্রিপ্ট পড়া কোনো কল সেন্টার নয়।'],
      ['শুরু থেকেই নিরাপদ', 'প্রতিটি হোস্টিং প্ল্যানে ফ্রি SSL, তাই প্রথম দিন থেকেই আপনার সাইট ও ভিজিটর সুরক্ষিত।'],
      ['ন্যায্য রিফান্ড', 'হোস্টিংয়ে ৩০ দিনের মানি-ব্যাক গ্যারান্টি, শর্তগুলো সহজ ভাষায় লেখা।'],
    ],
    bandH: 'চলুন একসাথে কাজ করি।',
    bandP: 'হোস্টিং, নতুন ওয়েবসাইট, নাকি দুটোই দরকার? আপনার প্রজেক্টের কথা জানান।',
    contact: 'যোগাযোগ করুন',
    services: 'আমাদের সার্ভিস',
  },
}

export const aboutMetadata = (lang: Lang) => pageMeta('/about', lang, t[lang])

export default function AboutView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const L = (h: string) => localPath(h, lang)
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in'>
          <div className='stats' style={{ marginTop: 0, maxWidth: 'none' }}>
            <div><b data-count='2008' data-from='1990'>2008</b><span>{c.stats[0]}</span></div>
            <div><b data-count='99.9' data-dec='1' data-suf='%'>99.9%</b><span>{c.stats[1]}</span></div>
            <div><b data-count='30' data-suf={c.days}>30{c.days}</b><span>{c.stats[2]}</span></div>
            <div><b>24/7</b><span>{c.stats[3]}</span></div>
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in split'>
          <div className='rv'>
            <span className='k'>{c.storyK}</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginTop: 10 }}>{c.storyH}</h2>
            <p className='lead' style={{ marginTop: 16 }}>{c.storyP}</p>
          </div>
          <div className='timeline'>
            <div className='line'><i data-draw='y' /></div>
            {c.story.map(([when, h, p]) => (
              <div className='ev rv' key={h}>
                <span className='when'>{when}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.valuesK}</span>
              <h2>{c.valuesH}</h2>
            </div>
          </div>
          <div className='cards' data-stagger>
            {c.values.map(([h, p], i) => (
              <div className='card' key={h}>
                <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
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
              <Link className='btn btn-pri' href={L('/contact')}>{c.contact}</Link>
              <Link className='btn btn-ghost' href={L('/services')}>{c.services}</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
