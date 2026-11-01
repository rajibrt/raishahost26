import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Websites RaishaHost designed, built and hosts for clients around the world.',
  alternates: { canonical: 'https://raishahost.com/work' },
}

export default function WorkPage() {
  return (
    <InnerPage
      kicker='Our work'
      title={<>Websites we built <em className='sky'>and host.</em></>}
      lede='Case studies from clients around the world. Each one is published with the client’s permission.'
    >
      <section className='sec tight gut'>
        <div className='in'>
          <div className='work'>
            {['USA · Web design + hosting', 'Bangladesh · E-commerce + VPS', 'Bangladesh · Logo + website'].map((meta) => (
              <article className='case' key={meta}>
                <div className='shot'>Client screenshot</div>
                <div className='body'>
                  <span className='meta'>{meta}</span>
                  <h3>Case study coming soon</h3>
                  <p>Added after client approval.</p>
                </div>
              </article>
            ))}
          </div>
          <p className='fine' style={{ marginTop: 24 }}>
            Want a site like these? <Link href='/contact' style={{ color: 'var(--rh-sky)' }}>Tell us about your project →</Link>
          </p>
        </div>
      </section>
    </InnerPage>
  )
}
