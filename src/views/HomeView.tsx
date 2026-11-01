import type { Metadata } from 'next'
import Link from 'next/link'
import '@/styles/site.css'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import DomainSearch from '@/components/site/DomainSearch'
import HomeMotion from '@/components/home/HomeMotion'
import HomeBody from '@/components/home/HomeBody'
import ScrollFrames, { type FrameCaption } from '@/components/home/ScrollFrames'
import { sharedHostingPlans, vpsPlans } from '@/data/plans'
import { alternates, bdt, localPath, share, usd, type Lang } from '@/i18n'

const meta = {
  en: {
    title: 'RaishaHost: Web Hosting, VPS & Web Design Since 2008',
    description:
      'cPanel hosting, VPS servers, domains and custom websites for businesses worldwide. Free SSL, 99.9% uptime target and a 30-day money-back guarantee.',
    og: 'cPanel hosting, VPS servers, domains and custom websites. Free SSL, 30-day money-back guarantee, support 24/7.',
  },
  bn: {
    title: 'RaishaHost: ওয়েব হোস্টিং, VPS ও ওয়েব ডিজাইন, ২০০৮ থেকে',
    description:
      'বিশ্বের যেকোনো জায়গার ব্যবসার জন্য cPanel হোস্টিং, VPS সার্ভার, ডোমেইন ও কাস্টম ওয়েবসাইট। ফ্রি SSL, ৯৯.৯% আপটাইম লক্ষ্য, ৩০ দিনের মানি-ব্যাক গ্যারান্টি।',
    og: 'cPanel হোস্টিং, VPS সার্ভার, ডোমেইন ও কাস্টম ওয়েবসাইট। ফ্রি SSL, ৩০ দিনের মানি-ব্যাক, ২৪/৭ সাপোর্ট।',
  },
}

export function homeMetadata(lang: Lang): Metadata {
  const m = meta[lang]
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: alternates('/', lang),
    ...share(m.title, m.og, alternates('/', lang).canonical, lang, 'home'),
  }
}

const tlds = ['.com', '.com.bd', '.net', '.org', '.xyz']

function copy(lang: Lang) {
  const vps = vpsPlans[0].price
  const shared = sharedHostingPlans[0].price
  const L = (h: string) => localPath(h, lang)
  if (lang === 'bn') {
    return {
      stats: ['অনলাইনে আছি', 'আপটাইম লক্ষ্য', 'মানি-ব্যাক গ্যারান্টি', 'মানুষের সাপোর্ট'],
      days: ' দিন',
      server: [
        { label: 'হোস্টিং', k: '২০০৮ থেকে ওয়েব হোস্টিং', h1: <>আপনার ওয়েবসাইট, <em className='sky'>সবসময় অনলাইনে।</em></>, p: 'বিশ্বের যেকোনো জায়গার ব্যবসার জন্য cPanel হোস্টিং, VPS সার্ভার, ডোমেইন ও কাস্টম ওয়েবসাইট।' },
        { label: 'হার্ডওয়্যার', k: 'ভেতরটা দেখুন', h2: 'আসল হার্ডওয়্যার। দ্রুত যন্ত্রাংশ।', specs: [['CPU', '২–৪ vCPU'], ['মেমরি', '৪–৮ GB RAM'], ['স্টোরেজ', '৪০–৮০ GB NVMe SSD']] },
        { label: 'যা থাকছে', k: 'সাথে যা পাবেন', h2: 'যা দরকার সবই আছে, বাড়তি কিছু নেই।', specs: [['ব্যান্ডউইথ', 'প্রতি মাসে ২০ টিবি'], ['অ্যাক্সেস', 'পূর্ণ রুট, পছন্দের Linux'], ['সুরক্ষা', 'DDoS ফিল্টারিং + ফ্রি SSL']] },
        { label: 'VPS', k: 'VPS সার্ভার', h2: <>নিজের সার্ভার, মাসে <em className='sky'>{bdt(vps.bdt)}</em> থেকে।</>, p: `অথবা মাসে ${usd(vps.usd!)}। সহজ হোস্টিং চান? cPanel প্ল্যান শুরু বছরে ${bdt(shared.bdt)} থেকে।`, cta: [['VPS প্ল্যান দেখুন', L('/vps')], ['cPanel হোস্টিং', L('/hosting')]] },
      ],
      reach: [
        { label: 'বিশ্বজুড়ে', k: 'বিশ্বজুড়ে', h2: <>ঢাকা থেকে <em className='sky'>সারা বিশ্বে।</em></>, p: 'আমরা বহু দেশের ক্লায়েন্টের ওয়েবসাইট হোস্ট ও তৈরি করি। আপনার গ্রাহক যেখানেই থাকুক, সাইট দ্রুত খুলবে।' },
        { label: 'সাপোর্ট', k: 'যেকোনো টাইম জোনে', h2: 'আপনি যেখানেই থাকুন, আমরা আছি।', p: '২০০৮ সাল থেকে হোস্টিং চালানো একটি টিমের কাছ থেকে টিকেটের মাধ্যমে ২৪/৭ সাপোর্ট।' },
      ],
      tunnel: [
        { label: 'গতি', k: 'গতি', h2: 'প্রতিটি ক্লিক কয়েক মিলিসেকেন্ডে আপনার সার্ভারে পৌঁছায়।' },
        { label: 'নিরাপত্তা', k: 'নিরাপত্তা', h2: <>পথেই <em className='sky'>ফ্রি SSL</em> দিয়ে সুরক্ষিত।</>, p: 'প্রতিটি হোস্টিং প্ল্যানে এমন সার্টিফিকেট থাকে যা নিজে থেকেই ইনস্টল ও রিনিউ হয়।' },
      ],
    }
  }
  return {
    stats: ['Online since', 'Uptime target', 'Money-back guarantee', 'Support from people'],
    days: ' days',
    server: [
      { label: 'Hosting', k: 'Web hosting since 2008', h1: <>Your website, <em className='sky'>always on.</em></>, p: 'cPanel hosting, VPS servers, domains and custom websites for businesses anywhere in the world.' },
      { label: 'Hardware', k: 'Look inside', h2: 'Real hardware. Fast parts.', specs: [['CPU', '2–4 vCPU'], ['Memory', '4–8 GB RAM'], ['Storage', '40–80 GB NVMe SSD']] },
      { label: 'Included', k: 'Included', h2: 'Everything you need, nothing you don’t.', specs: [['Bandwidth', '20 TB every month'], ['Access', 'Full root, your choice of Linux'], ['Protection', 'DDoS filtering + free SSL']] },
      { label: 'VPS', k: 'VPS servers', h2: <>Your own server from <em className='sky'>{bdt(vps.bdt)}</em>/month.</>, p: `Or ${usd(vps.usd!)} a month. Prefer simple hosting? cPanel plans start at ${bdt(shared.bdt)} a year.`, cta: [['See VPS plans', L('/vps')], ['cPanel hosting', L('/hosting')]] },
    ],
    reach: [
      { label: 'Reach', k: 'Reach', h2: <>From Dhaka <em className='sky'>to the world.</em></>, p: 'We host and build websites for clients in many countries. Your site loads fast for your customers, wherever they are.' },
      { label: 'Support', k: 'Any time zone', h2: 'Wherever you are, we’re here.', p: 'Support 24/7 through tickets, from a team that has run hosting since 2008.' },
    ],
    tunnel: [
      { label: 'Speed', k: 'Speed', h2: 'Every click reaches your server in milliseconds.' },
      { label: 'Security', k: 'Security', h2: <>Locked with <em className='sky'>free SSL</em> on the way.</>, p: 'Every hosting plan gets a certificate that installs and renews itself.' },
    ],
  }
}

export default function HomeView({ lang }: { lang: Lang }) {
  const c = copy(lang)
  const [hero, hardware, included, vpsCap] = c.server

  // v6–v7 scroll story; caption ranges are tuned to each video (see AGENTS.md section 7).
  const serverCaptions: FrameCaption[] = [
    {
      from: 0,
      to: 0.2,
      label: hero.label,
      content: (
        <div>
          <span className='k'>{hero.k}</span>
          <h1>{hero.h1}</h1>
          <p>{hero.p}</p>
          <DomainSearch lang={lang} />
          <div className='tlds'>{tlds.map((t) => <span key={t}><b>{t}</b></span>)}</div>
        </div>
      ),
    },
    ...[hardware, included].map((s, i) => ({
      from: i === 0 ? 0.24 : 0.53,
      to: i === 0 ? 0.5 : 0.77,
      label: s.label,
      content: (
        <div>
          <span className='k'>{s.k}</span>
          <h2>{s.h2}</h2>
          <div className='spec-list'>
            {s.specs!.map(([k, v]) => (
              <span className='spec-tag' key={k}><small>{k}</small><b>{v}</b></span>
            ))}
          </div>
        </div>
      ),
    })),
    {
      from: 0.8,
      to: 1,
      label: vpsCap.label,
      content: (
        <div>
          <span className='k'>{vpsCap.k}</span>
          <h2>{vpsCap.h2}</h2>
          <p>{vpsCap.p}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className='btn btn-pri' href={vpsCap.cta![0][1]}>{vpsCap.cta![0][0]}</Link>
            <Link className='btn btn-ghost' href={vpsCap.cta![1][1]}>{vpsCap.cta![1][0]}</Link>
          </div>
        </div>
      ),
    },
  ]

  // The last caption ends before the tunnel starts fading in over this scene (0.75 of its 240vh scroll).
  const reachCaptions: FrameCaption[] = c.reach.map((s, i) => ({
    from: i === 0 ? 0 : 0.46,
    to: i === 0 ? 0.42 : 0.72,
    label: s.label,
    content: (
      <div>
        <span className='k'>{s.k}</span>
        <h2>{s.h2}</h2>
        <p>{s.p}</p>
      </div>
    ),
  }))

  // Captions sit between the 60vh crossfade in (first 0.23 of its 260vh scroll) and the services
  // panel sliding up over it (last 0.23), so they never overlap another scene.
  const tunnelCaptions: FrameCaption[] = c.tunnel.map((s, i) => ({
    from: i === 0 ? 0.25 : 0.52,
    to: i === 0 ? 0.48 : 0.76,
    align: 'center' as const,
    label: s.label,
    content: (
      <div>
        <span className='k'>{s.k}</span>
        <h2>{s.h2}</h2>
        {'p' in s && s.p && <p>{s.p}</p>}
      </div>
    ),
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RaishaHost',
    url: 'https://raishahost.com',
    inLanguage: lang === 'bn' ? 'bn' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://hosting.raishahost.com/cart.php?a=add&domain=register&query={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div className='rh' lang={lang}>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeMotion />
      <SiteNav />

      <main className='page'>
        <ScrollFrames name='server-explode' captions={serverCaptions} length={340} focusX={0.68} />

        <section className='sec tight gut' style={{ background: 'var(--rh-bg)' }}>
          <div className='in'>
            <div className='stats' style={{ marginTop: 0, maxWidth: 'none' }}>
              <div><b data-count='2008' data-from='1990'>2008</b><span>{c.stats[0]}</span></div>
              <div><b data-count='99.9' data-dec='1' data-suf='%'>99.9%</b><span>{c.stats[1]}</span></div>
              <div><b data-count='30' data-suf={c.days}>30{c.days}</b><span>{c.stats[2]}</span></div>
              <div><b>24/7</b><span>{c.stats[3]}</span></div>
            </div>
          </div>
        </section>

        <ScrollFrames name='earth-reach' captions={reachCaptions} length={340} focusX={0.72} />

        {/* frameEnd stops before the video's last frames flash to white */}
        <ScrollFrames name='light-tunnel' captions={tunnelCaptions} length={360} crossfade frameEnd={0.86} />

        <HomeBody lang={lang} />
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
