import type { Metadata } from 'next'
import Link from 'next/link'
import '@/styles/site.css'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import DomainSearch from '@/components/site/DomainSearch'
import HomeMotion from '@/components/home/HomeMotion'
import HomeBody from '@/components/home/HomeBody'
import ScrollFrames, { type FrameCaption } from '@/components/home/ScrollFrames'

export const metadata: Metadata = {
  title: 'RaishaHost: Web Hosting, VPS & Web Design Since 2008',
  description:
    'cPanel hosting, VPS servers, domains and custom websites for businesses worldwide, from a team in Bangladesh. Free SSL, 99.9% uptime target, 30-day money-back guarantee.',
  alternates: { canonical: 'https://raishahost.com' },
  openGraph: {
    title: 'RaishaHost: Web Hosting, VPS & Web Design Since 2008',
    description:
      'cPanel hosting, VPS servers, domains and custom websites. Free SSL, 30-day money-back guarantee, support 24/7.',
    url: 'https://raishahost.com',
  },
}

// v6: the server opens up layer by layer as you scroll (video frames from Higgsfield).
const serverCaptions: FrameCaption[] = [
  {
    from: 0,
    to: 0.2,
    label: 'Hosting',
    content: (
      <div>
        <span className='k'>Web hosting since 2008</span>
        <h1>
          Your website, <em className='sky'>always on.</em>
        </h1>
        <p>cPanel hosting, VPS servers, domains and custom websites for businesses anywhere in the world.</p>
        <DomainSearch />
        <div className='tlds'>
          <span><b>.com</b></span>
          <span><b>.com.bd</b></span>
          <span><b>.net</b></span>
          <span><b>.org</b></span>
          <span><b>.xyz</b></span>
        </div>
      </div>
    ),
  },
  {
    from: 0.24,
    label: 'Hardware',
    to: 0.5,
    content: (
      <div>
        <span className='k'>Look inside</span>
        <h2>Real hardware. Fast parts.</h2>
        <div className='spec-list'>
          <span className='spec-tag'><small>CPU</small><b>2–4 vCPU</b></span>
          <span className='spec-tag'><small>Memory</small><b>4–8 GB RAM</b></span>
          <span className='spec-tag'><small>Storage</small><b>40–80 GB NVMe SSD</b></span>
        </div>
      </div>
    ),
  },
  {
    from: 0.53,
    label: 'Included',
    to: 0.77,
    content: (
      <div>
        <span className='k'>Included</span>
        <h2>Everything you need, nothing you don&apos;t.</h2>
        <div className='spec-list'>
          <span className='spec-tag'><small>Bandwidth</small><b>20 TB every month</b></span>
          <span className='spec-tag'><small>Access</small><b>Full root, your choice of Linux</b></span>
          <span className='spec-tag'><small>Protection</small><b>DDoS filtering + free SSL</b></span>
        </div>
      </div>
    ),
  },
  {
    from: 0.8,
    label: 'VPS',
    to: 1,
    content: (
      <div>
        <span className='k'>VPS servers</span>
        <h2>
          Your own server from <em className='sky'>৳3,599</em>/month.
        </h2>
        <p>Or $29.99 a month. Prefer simple hosting? cPanel plans start at ৳3,800 a year.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className='btn btn-pri' href='/vps'>See VPS plans</Link>
          <Link className='btn btn-ghost' href='/hosting'>cPanel hosting</Link>
        </div>
      </div>
    ),
  },
]

// v7: light lines spread from Dhaka across the night side of the Earth (replaces the three.js globe).
// The last caption ends before the tunnel starts fading in over this scene (0.75 of its 240vh scroll).
const reachCaptions: FrameCaption[] = [
  {
    from: 0,
    to: 0.42,
    label: 'Reach',
    content: (
      <div>
        <span className='k'>Reach</span>
        <h2>
          From Dhaka <em className='sky'>to the world.</em>
        </h2>
        <p>We host and build websites for clients in many countries. Your site loads fast for your customers, wherever they are.</p>
      </div>
    ),
  },
  {
    from: 0.46,
    to: 0.72,
    label: 'Support',
    content: (
      <div>
        <span className='k'>Any time zone</span>
        <h2>Wherever you are, we&apos;re here.</h2>
        <p>Support 24/7 through tickets, from a team that has run hosting since 2008.</p>
      </div>
    ),
  },
]

// Captions sit between the 60vh crossfade in (first 0.23 of its 260vh scroll) and the services
// panel sliding up over it (last 0.23), so they never overlap another scene.
const tunnelCaptions: FrameCaption[] = [
  {
    from: 0.25,
    to: 0.48,
    label: 'Speed',
    align: 'center',
    content: (
      <div>
        <span className='k'>Speed</span>
        <h2>Every click reaches your server in milliseconds.</h2>
      </div>
    ),
  },
  {
    from: 0.52,
    to: 0.76,
    label: 'Security',
    align: 'center',
    content: (
      <div>
        <span className='k'>Security</span>
        <h2>
          Locked with <em className='sky'>free SSL</em> on the way.
        </h2>
        <p>Every hosting plan gets a certificate that installs and renews itself.</p>
      </div>
    ),
  },
]

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RaishaHost',
    url: 'https://raishahost.com',
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
    <div className='rh'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeMotion />
      <SiteNav />

      <main className='page'>
        <ScrollFrames name='server-explode' captions={serverCaptions} length={340} focusX={0.68} />

        <section className='sec tight gut' style={{ background: 'var(--rh-bg)' }}>
          <div className='in'>
            <div className='stats' style={{ marginTop: 0, maxWidth: 'none' }}>
              <div><b data-count='2008' data-from='1990'>2008</b><span>Online since</span></div>
              <div><b data-count='99.9' data-dec='1' data-suf='%'>99.9%</b><span>Uptime target</span></div>
              <div><b data-count='30' data-suf=' days'>30 days</b><span>Money-back guarantee</span></div>
              <div><b>24/7</b><span>Support from people</span></div>
            </div>
          </div>
        </section>

        <ScrollFrames name='earth-reach' captions={reachCaptions} length={340} focusX={0.72} />

        {/* frameEnd stops before the video's last frames flash to white */}
        <ScrollFrames name='light-tunnel' captions={tunnelCaptions} length={360} crossfade frameEnd={0.86} />

        <HomeBody />
      </main>

      <SiteFooter />
    </div>
  )
}
