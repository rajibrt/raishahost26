import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'

export const metadata: Metadata = {
  title: 'Our Promises — Uptime, Money-Back, SSL & Support',
  description:
    'What RaishaHost promises: a 99.9% uptime target, a 30-day money-back guarantee on hosting, free SSL on every plan and 24/7 support through tickets.',
  alternates: { canonical: 'https://raishahost.com/guarantees' },
  openGraph: {
    title: 'RaishaHost Promises — Uptime, Money-Back, SSL & Support',
    description: '99.9% uptime target, 30-day money-back on hosting, free SSL and 24/7 ticket support.',
    url: 'https://raishahost.com/guarantees',
  },
}

const promises = [
  {
    big: '99.9%',
    title: 'Uptime target',
    body: 'We aim to keep your website online 99.9% of the time, with servers we watch around the clock and fix fast when something goes wrong.',
  },
  {
    big: '30 days',
    title: 'Money-back on hosting',
    body: 'Not happy? Ask within 30 days of signing up and we refund the hosting fee. Some conditions apply.',
    href: '/money-back',
    link: 'Read the conditions →',
  },
  {
    big: 'Free',
    title: 'SSL on every plan',
    body: 'Every hosting plan includes an SSL certificate that installs and renews itself, so your site shows the padlock.',
  },
  {
    big: '24/7',
    title: 'Support from people',
    body: 'Our own team answers support tickets day and night. Business hours for phone and billing are on the contact page.',
    href: '/contact',
    link: 'Contact us →',
  },
  {
    big: 'Safe',
    title: 'Security updates',
    body: 'We keep servers updated and scan for malware, so your site and data stay protected.',
  },
  {
    big: 'Clear',
    title: 'Honest prices',
    body: 'Every price shows what it covers and how often you pay: hosting yearly, VPS monthly.',
    href: '/hosting',
    link: 'See hosting plans →',
  },
]

export default function GuaranteesPage() {
  return (
    <InnerPage
      kicker='Our promises'
      title={<>What you can <em className='sky'>count on.</em></>}
      lede='Simple promises we keep with every hosting plan, written in plain words.'
    >
      <section className='sec tight gut'>
        <div className='in'>
          <div className='cards' data-stagger>
            {promises.map((p) => (
              <div className='pr' key={p.title}>
                <span className='big'>{p.big}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                {p.href && <Link href={p.href}>{p.link}</Link>}
              </div>
            ))}
          </div>
          <p className='fine' style={{ marginTop: 20 }}>
            The uptime figure is a target, not a contract. Full rules are in our <Link href='/terms-conditions' style={{ color: 'var(--rh-sky)' }}>terms</Link>.
          </p>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='band rv'>
            <div>
              <h2>Any questions?</h2>
              <p>Our support team is happy to help before and after you buy.</p>
            </div>
            <div className='row'>
              <Link className='btn btn-pri' href='/contact'>Contact support</Link>
              <Link className='btn btn-ghost' href='/hosting'>See hosting plans</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
