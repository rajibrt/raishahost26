import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PolicyDoc from '@/components/site/PolicyDoc'
import { CLIENT_AREA_URL } from '@/components/site/links'

export const metadata: Metadata = {
  title: '30-Day Money-Back Guarantee',
  description:
    'Not happy with your RaishaHost shared, VPS or reseller hosting? Ask for a refund of the hosting fee within 30 days of sign-up. See what is covered and the conditions.',
  alternates: { canonical: 'https://raishahost.com/money-back' },
  openGraph: {
    title: '30-Day Money-Back Guarantee | RaishaHost',
    description: 'Refund of the hosting fee within 30 days of sign-up. What is covered, what is not, and how to ask.',
    url: 'https://raishahost.com/money-back',
  },
}

const covered = ['Shared (cPanel) hosting fee', 'VPS hosting fee', 'Reseller hosting fee']

const notCovered = [
  'Domain registration, renewal or transfer fees',
  'Setup fees',
  'Payment gateway fees',
  'Add-on services (for example SiteLock or SpamExperts)',
  'Web design and development work',
  'SEO, maintenance or security services',
]

const conditions = [
  'Ask within the first 30 days after you sign up.',
  'One refund per client, and only for your first service with us.',
  'If you have had a money-back refund before, you cannot get another.',
  'Your account must be verified: your real name and any documents we ask for.',
  'A free domain or SSL that came with the plan is suspended when the refund is made.',
]

export default function MoneyBackPage() {
  return (
    <InnerPage
      kicker='Refund policy'
      title={<>30-day <em className='sky'>money-back.</em></>}
      lede='Try our hosting without risk. If you are not happy, ask within 30 days of signing up and we refund the hosting fee.'
    >
      <section className='sec tight gut'>
        <div className='in split'>
          <div className='card rv'>
            <span className='k'>Refunded</span>
            <ul className='checks' style={{ marginTop: 8 }}>
              {covered.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className='card rv'>
            <span className='k' style={{ color: '#f08a8a' }}>Not refunded</span>
            <ul className='crosses' style={{ marginTop: 8 }}>
              {notCovered.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <PolicyDoc
        sections={[
          {
            id: 'how',
            title: 'How it works',
            content: (
              <>
                <p>
                  Every new shared, reseller and VPS hosting client can ask for a refund of the hosting fee within the first 30 days after
                  signing up. If our hosting is not right for you, cancel the service and we return the hosting fee.
                </p>
                <p>Only the hosting fee is refunded. Domains, setup fees, payment fees, add-ons and design or development work are not.</p>
              </>
            ),
          },
          {
            id: 'conditions',
            title: 'Conditions',
            content: (
              <ol>
                {conditions.map((c) => <li key={c}>{c}</li>)}
              </ol>
            ),
          },
          {
            id: 'ask',
            title: 'How to ask for a refund',
            content: (
              <>
                <p>
                  Open a support ticket from the <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>Client Area</a> or{' '}
                  <Link href='/contact'>contact us</Link>, and tell us which service you want to cancel. We confirm the amount and process it
                  as quickly as we can.
                </p>
                <p className='note'>Accounts closed for breaking our <Link href='/terms-conditions'>terms</Link> are not refunded.</p>
              </>
            ),
          },
        ]}
      />
    </InnerPage>
  )
}
