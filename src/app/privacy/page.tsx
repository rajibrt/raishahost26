import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PolicyDoc from '@/components/site/PolicyDoc'
import { CLIENT_AREA_URL } from '@/components/site/links'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How RaishaHost collects, uses and protects your personal information when you visit our website, contact us or use our hosting services.',
  alternates: { canonical: 'https://raishahost.com/privacy' },
  openGraph: {
    title: 'Privacy Policy | RaishaHost',
    description: 'What personal information RaishaHost collects, why, and how we protect it.',
    url: 'https://raishahost.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <InnerPage
      kicker='Legal'
      title={<>Privacy <em className='sky'>policy.</em></>}
      lede='What personal information we collect, why we collect it and how we keep it safe. Written in plain words.'
    >
      <PolicyDoc
        updated='November 2026'
        sections={[
          {
            id: 'who',
            title: 'Who we are',
            content: (
              <p>
                RaishaHost is a web hosting and digital services company based in Bangladesh. This policy covers this website
                (raishahost.com) and the client area at hosting.raishahost.com. Questions about privacy: <Link href='/contact'>contact us</Link>.
              </p>
            ),
          },
          {
            id: 'collect',
            title: 'What we collect',
            content: (
              <>
                <p>We only collect what we need to answer you and provide our services:</p>
                <ul>
                  <li>
                    <b>Contact form:</b> your name, email address, subject and message. To stop spam we also record the IP address, browser
                    details and an approximate location worked out from the IP address.
                  </li>
                  <li>
                    <b>Customers:</b> when you order, our billing system in the <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>Client Area</a>{' '}
                    keeps your name, contact and billing details, your services and your support tickets. Domain registrations need the
                    owner details that registries require.
                  </li>
                  <li>
                    <b>Server logs:</b> like every website, our servers keep standard logs (IP address, pages visited, time) for security and
                    to fix problems.
                  </li>
                </ul>
              </>
            ),
          },
          {
            id: 'use',
            title: 'How we use it',
            content: (
              <ul>
                <li>To reply to your questions and give support.</li>
                <li>To set up, bill and run the services you order.</li>
                <li>To keep our website and servers secure and stop spam and abuse.</li>
                <li>To meet legal obligations.</li>
              </ul>
            ),
          },
          {
            id: 'share',
            title: 'Who we share it with',
            content: (
              <>
                <p>We do not sell your information. We share it only when needed to provide a service or when the law requires it:</p>
                <ul>
                  <li>Cloudflare Turnstile checks that the contact form is used by a person, not a bot.</li>
                  <li>Domain registries and registrars receive the owner details needed to register a domain.</li>
                  <li>Payment providers process your payments; we do not store full card numbers.</li>
                  <li>Authorities, when a law, regulator or court requires it.</li>
                </ul>
              </>
            ),
          },
          {
            id: 'cookies',
            title: 'Cookies',
            content: (
              <p>
                This website does not use advertising or tracking cookies. The client area and the contact form&apos;s security check use
                cookies that are needed for them to work. The Messenger button only opens Facebook Messenger when you click it.
              </p>
            ),
          },
          {
            id: 'keep',
            title: 'How long we keep it',
            content: (
              <p>
                We keep contact messages as long as needed to answer and follow up. Customer and billing records are kept while you are a
                customer and afterwards as long as the law requires.
              </p>
            ),
          },
          {
            id: 'rights',
            title: 'Your choices',
            content: (
              <p>
                You can ask to see, correct or delete the personal information we hold about you, unless we must keep it by law. Contact us
                and we will reply as soon as we can.
              </p>
            ),
          },
          {
            id: 'changes',
            title: 'Changes to this policy',
            content: <p>If we change this policy we will update this page and the date at the top.</p>,
          },
        ]}
      />
    </InnerPage>
  )
}
