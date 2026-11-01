import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'

export const metadata: Metadata = {
  title: 'About Us — RaishaHost Since 2008',
  description:
    'RaishaHost is a web hosting and digital services company based in Bangladesh, serving clients worldwide since 2008: hosting, VPS servers, domains, websites and design.',
  alternates: { canonical: 'https://raishahost.com/about' },
  openGraph: {
    title: 'About RaishaHost — Web Hosting Since 2008',
    description: 'A Bangladesh-based team hosting and building websites for clients worldwide since 2008.',
    url: 'https://raishahost.com/about',
  },
}

const story = [
  {
    when: '2008',
    title: 'We start hosting websites',
    body: 'RaishaHost begins with one goal: reliable, affordable web hosting with real people behind it.',
  },
  {
    when: 'Growing',
    title: 'From hosting to the whole website',
    body: 'Clients asked us to build their sites too, so we added web design, logo and graphic design, and later web apps and online stores.',
  },
  {
    when: 'Worldwide',
    title: 'Clients in many countries',
    body: 'Businesses at home and abroad host and build with us. Our team works from Bangladesh and supports clients in every time zone.',
  },
  {
    when: 'Today',
    title: 'Hosting, VPS servers, domains and design',
    body: 'cPanel hosting billed yearly, VPS servers billed monthly, domain registration, and websites built and hosted by the same team.',
  },
]

const values = [
  { title: 'Clear prices', body: 'Every price shows what it covers and how often you pay. No surprises at checkout.' },
  { title: 'People, not scripts', body: 'Support comes from our own team through tickets, 24/7, not from a call centre reading a script.' },
  { title: 'Safe by default', body: 'Free SSL on every hosting plan, so your site and your visitors are protected from day one.' },
  { title: 'Fair refunds', body: 'Hosting comes with a 30-day money-back guarantee, with the conditions written in plain words.' },
]

export default function AboutPage() {
  return (
    <InnerPage
      kicker='About us · since 2008'
      title={<>Hosting with <em className='sky'>people behind it.</em></>}
      lede='RaishaHost is a web hosting and digital services company based in Bangladesh. Since 2008 we have hosted, built and looked after websites for businesses around the world.'
    >
      <section className='sec tight gut'>
        <div className='in'>
          <div className='stats' style={{ marginTop: 0, maxWidth: 'none' }}>
            <div><b data-count='2008' data-from='1990'>2008</b><span>Online since</span></div>
            <div><b data-count='99.9' data-dec='1' data-suf='%'>99.9%</b><span>Uptime target</span></div>
            <div><b data-count='30' data-suf=' days'>30 days</b><span>Money-back guarantee</span></div>
            <div><b>24/7</b><span>Support from people</span></div>
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in split'>
          <div className='rv'>
            <span className='k'>Our story</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginTop: 10 }}>How we got here.</h2>
            <p className='lead' style={{ marginTop: 16 }}>
              We believe every business, small or large, should have a fast and dependable place on the web, and someone to call when
              something goes wrong.
            </p>
          </div>
          <div className='timeline'>
            <div className='line'><i data-draw='y' /></div>
            {story.map((e) => (
              <div className='ev rv' key={e.title}>
                <span className='when'>{e.when}</span>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>How we work</span>
              <h2>What you can count on.</h2>
            </div>
          </div>
          <div className='cards' data-stagger>
            {values.map((v, i) => (
              <div className='card' key={v.title}>
                <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='band rv'>
            <div>
              <h2>Let&apos;s work together.</h2>
              <p>Need hosting, a new website or both? Tell us about your project.</p>
            </div>
            <div className='row'>
              <Link className='btn btn-pri' href='/contact'>Contact us</Link>
              <Link className='btn btn-ghost' href='/services'>Our services</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
