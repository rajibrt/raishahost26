import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Logo & Graphic Design Services',
    description:
      'Custom logo and graphic design for businesses worldwide: brand identity, social media graphics, print, UI design, flyers and brand style guides.',
    kicker: 'Logo & graphic design',
    h1: <>Your brand, <em className='sky'>clearly designed.</em></>,
    lede: 'From a new logo to a full set of graphics, we create visuals that make your business easy to recognise, online and in print.',
    quote: 'Get a quote',
    graphic: 'Graphic design',
    logoK: 'Logo design',
    logoH: 'A logo that is yours.',
    logoP: 'We design around your business and your customers, then hand over everything you need to use the logo anywhere.',
    includes: [
      'A logo made for your brand, not a template',
      'Several first ideas to choose from',
      'Changes until you are happy with it',
      'Every file you need: PNG, SVG, PDF and EPS',
      'Versions for light and dark backgrounds',
      'Simple colour and font guide',
    ],
    gK: 'Graphic design',
    gH: 'Design for every need.',
    gP: 'Beyond the logo: everything your brand needs to look professional and consistent.',
    graphics: [
      ['Social media graphics', 'Facebook covers, Instagram posts and YouTube thumbnails that look sharp on every platform.'],
      ['Print & branding', 'Business cards, letterheads, brochures and banners, ready for the printer.'],
      ['UI design', 'Screens for websites and apps, with clickable prototypes you can try before anything is built.'],
      ['Flyers & posters', 'Promotions, events and product launches designed to catch the eye.'],
      ['Illustration & infographics', 'Custom drawings and charts that make complicated ideas easy to understand.'],
      ['Brand style guide', 'Your colours, fonts and logo rules in one place, so your brand looks the same everywhere.'],
    ],
    stepsK: 'How it works',
    stepsH: 'Four steps to a finished design.',
    steps: [
      ['Brief', 'You tell us about your business, your customers and styles you like.'],
      ['Concepts', 'We send first ideas and explain the thinking behind each one.'],
      ['Refine', 'We improve the chosen idea with your feedback until it is right.'],
      ['Deliver', 'You receive every file and a short guide on how to use them.'],
    ],
    indK: 'Industries we design for',
    industries: ['Food & beverage', 'Professional services', 'Retail & e-commerce', 'Health & wellness', 'Technology', 'Education', 'Real estate', 'Non-profit'],
    bandH: 'Ready for a new look?',
    bandP: 'Tell us about your brand and we will send ideas and a price.',
    all: 'All services',
  },
  bn: {
    title: 'লোগো ও গ্রাফিক ডিজাইন সার্ভিস',
    description:
      'বিশ্বজুড়ে ব্যবসার জন্য কাস্টম লোগো ও গ্রাফিক ডিজাইন: ব্র্যান্ড পরিচিতি, সোশ্যাল মিডিয়া গ্রাফিক্স, প্রিন্ট, UI ডিজাইন ও স্টাইল গাইড।',
    kicker: 'লোগো ও গ্রাফিক ডিজাইন',
    h1: <>আপনার ব্র্যান্ড, <em className='sky'>স্পষ্ট ডিজাইনে।</em></>,
    lede: 'নতুন লোগো থেকে পুরো গ্রাফিক্স সেট, আমরা এমন ভিজ্যুয়াল বানাই যাতে অনলাইনে ও প্রিন্টে আপনার ব্যবসাকে সহজে চেনা যায়।',
    quote: 'কোটেশন নিন',
    graphic: 'গ্রাফিক ডিজাইন',
    logoK: 'লোগো ডিজাইন',
    logoH: 'যে লোগো শুধু আপনার।',
    logoP: 'আপনার ব্যবসা ও গ্রাহকদের কথা ভেবে আমরা ডিজাইন করি, তারপর লোগো যেকোনো জায়গায় ব্যবহারের জন্য যা দরকার সব দিয়ে দিই।',
    includes: [
      'আপনার ব্র্যান্ডের জন্যই বানানো লোগো, টেমপ্লেট নয়',
      'বেছে নেওয়ার জন্য কয়েকটি প্রাথমিক আইডিয়া',
      'আপনি সন্তুষ্ট না হওয়া পর্যন্ত পরিবর্তন',
      'দরকারি সব ফাইল: PNG, SVG, PDF ও EPS',
      'হালকা ও গাঢ় ব্যাকগ্রাউন্ডের জন্য আলাদা ভার্সন',
      'রং ও ফন্টের সহজ গাইড',
    ],
    gK: 'গ্রাফিক ডিজাইন',
    gH: 'সব প্রয়োজনের জন্য ডিজাইন।',
    gP: 'লোগোর বাইরেও: আপনার ব্র্যান্ডকে পেশাদার ও এক রকম দেখাতে যা যা দরকার।',
    graphics: [
      ['সোশ্যাল মিডিয়া গ্রাফিক্স', 'ফেসবুক কভার, ইনস্টাগ্রাম পোস্ট ও ইউটিউব থাম্বনেইল, প্রতিটি প্ল্যাটফর্মে ঝকঝকে।'],
      ['প্রিন্ট ও ব্র্যান্ডিং', 'বিজনেস কার্ড, লেটারহেড, ব্রোশিওর ও ব্যানার, প্রিন্টের জন্য প্রস্তুত।'],
      ['UI ডিজাইন', 'ওয়েবসাইট ও অ্যাপের স্ক্রিন, সাথে ক্লিক করে দেখার মতো প্রোটোটাইপ, তৈরির আগেই চালিয়ে দেখতে পারবেন।'],
      ['ফ্লায়ার ও পোস্টার', 'অফার, ইভেন্ট ও নতুন পণ্যের জন্য চোখে পড়ার মতো ডিজাইন।'],
      ['ইলাস্ট্রেশন ও ইনফোগ্রাফিক', 'কাস্টম ছবি ও চার্ট, যা জটিল বিষয়কে সহজে বোঝায়।'],
      ['ব্র্যান্ড স্টাইল গাইড', 'আপনার রং, ফন্ট ও লোগোর নিয়ম এক জায়গায়, যাতে সব জায়গায় ব্র্যান্ড এক রকম দেখায়।'],
    ],
    stepsK: 'যেভাবে কাজ করে',
    stepsH: 'চার ধাপে তৈরি ডিজাইন।',
    steps: [
      ['ব্রিফ', 'আপনার ব্যবসা, গ্রাহক ও পছন্দের স্টাইলের কথা আমাদের জানান।'],
      ['কনসেপ্ট', 'আমরা প্রাথমিক আইডিয়া পাঠাই এবং প্রতিটির পেছনের ভাবনা বুঝিয়ে বলি।'],
      ['পরিমার্জন', 'বেছে নেওয়া আইডিয়াটি আপনার মতামত নিয়ে ঠিক না হওয়া পর্যন্ত উন্নত করি।'],
      ['হস্তান্তর', 'সব ফাইল আর সেগুলো ব্যবহারের ছোট একটি গাইড পেয়ে যাবেন।'],
    ],
    indK: 'যেসব খাতের জন্য ডিজাইন করি',
    industries: ['খাবার ও পানীয়', 'পেশাদার সেবা', 'রিটেইল ও ই-কমার্স', 'স্বাস্থ্য ও সুস্থতা', 'প্রযুক্তি', 'শিক্ষা', 'রিয়েল এস্টেট', 'অলাভজনক প্রতিষ্ঠান'],
    bandH: 'নতুন লুক চান?',
    bandP: 'আপনার ব্র্যান্ডের কথা জানান, আমরা আইডিয়া ও দাম পাঠাব।',
    all: 'সব সার্ভিস',
  },
}

export const logoDesignMetadata = (lang: Lang) => pageMeta('/logo-design', lang, t[lang])

export default function LogoDesignView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const L = (h: string) => localPath(h, lang)
  return (
    <InnerPage
      lang={lang}
      kicker={c.kicker}
      title={c.h1}
      lede={c.lede}
      actions={
        <>
          <Link className='btn btn-pri' href={L('/contact')}>{c.quote}</Link>
          <a className='btn btn-ghost' href='#graphic-design'>{c.graphic}</a>
        </>
      }
    >
      <section className='sec tight gut'>
        <div className='in split'>
          <div className='rv'>
            <span className='k'>{c.logoK}</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginTop: 10 }}>{c.logoH}</h2>
            <p className='lead' style={{ marginTop: 16 }}>{c.logoP}</p>
          </div>
          <ul className='checks card' data-stagger>
            {c.includes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </section>

      <section className='sec gut' id='graphic-design'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.gK}</span>
              <h2>{c.gH}</h2>
              <p>{c.gP}</p>
            </div>
          </div>
          <div className='cards' data-stagger>
            {c.graphics.map(([h, p], i) => (
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
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.stepsK}</span>
              <h2>{c.stepsH}</h2>
            </div>
          </div>
          <div className='steps'>
            <div className='rail'><i data-draw='x' /></div>
            {c.steps.map(([h, p], i) => (
              <div className='st rv' key={h}>
                <span className='dot'>{i + 1}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='sec tight gut'>
        <div className='in'>
          <span className='k rv'>{c.indK}</span>
          <div className='chips' style={{ marginTop: 16 }} data-stagger>
            {c.industries.map((x) => <span key={x}>{x}</span>)}
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
              <Link className='btn btn-pri' href={L('/contact')}>{c.quote}</Link>
              <Link className='btn btn-ghost' href={L('/services')}>{c.all}</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
