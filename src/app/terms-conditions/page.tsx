import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PolicyDoc from '@/components/site/PolicyDoc'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'RaishaHost terms and conditions: acceptable use, network security, server resources, spam, support, domains, backups, refunds and liability. Please read before using our services.',
  alternates: { canonical: 'https://raishahost.com/terms-conditions' },
  openGraph: {
    title: 'Terms & Conditions | RaishaHost',
    description: 'The rules for using RaishaHost services: acceptable use, security, spam, domains, backups, refunds and more.',
    url: 'https://raishahost.com/terms-conditions',
  },
}

export default function TermsPage() {
  return (
    <InnerPage
      kicker='Legal'
      title={<>Terms &amp; <em className='sky'>conditions.</em></>}
      lede='The rules for using RaishaHost services. By ordering or using a service you agree to these terms.'
    >
      <PolicyDoc
        sections={[
          {
            id: 'content',
            title: 'Your content',
            content: (
              <>
                <p>
                  Use our services for lawful purposes only. Do not publish content that is defamatory, abusive, obscene, threatening,
                  infringes someone else&apos;s rights or breaks any law. You are responsible for everything you make available through our
                  network.
                </p>
                <p>
                  We do not have to monitor the network, but if we learn about content that breaks these rules we may edit, remove or block
                  it. We may share content or records when the law, a regulator or a court requires it.
                </p>
                <p>These are never allowed:</p>
                <ul>
                  <li>Pirated software (warez): copyrighted software that is not free to distribute.</li>
                  <li>Copyright violations, which can lead to civil and criminal liability.</li>
                  <li>Sites that promote hacking, viruses or deliberate harm to other websites.</li>
                </ul>
              </>
            ),
          },
          {
            id: 'security',
            title: 'Network security',
            content: (
              <>
                <p>
                  Do not try to get around the security of any host, network or account. This includes accessing data that is not yours,
                  logging in to servers without permission, cracking passwords or probing other networks for weaknesses.
                </p>
                <p>We cooperate fully with law enforcement. Breaking system or network security can lead to criminal or civil liability.</p>
              </>
            ),
          },
          {
            id: 'resources',
            title: 'Server resources',
            content: (
              <p>
                If an account uses an unfair share of server resources (CPU, memory or network), we will ask you to either upgrade your plan
                or reduce the usage.
              </p>
            ),
          },
          {
            id: 'spam',
            title: 'Spam',
            content: (
              <p>
                Do not use our network to send spam, mail bombs or similar unwanted email. If you spam, we may disable your domain or close
                your account without warning, and we may charge a penalty for each violation.
              </p>
            ),
          },
          {
            id: 'support',
            title: 'Technical support',
            content: (
              <p>
                We provide technical support for our services to every client. We do not support programming, HTML code, custom code or
                third-party software that we did not install.
              </p>
            ),
          },
          {
            id: 'domains',
            title: 'Domain names',
            content: (
              <p>
                Discounts or free domain registrations and renewals apply only while your hosting is active. If your hosting is cancelled or
                expires and you move the domain to another registrar or host, you must first pay the difference between what you paid and
                the full price of the domain.
              </p>
            ),
          },
          {
            id: 'refusal',
            title: 'Refusing service',
            content: (
              <p>
                We may refuse or cancel service at our own discretion. Breaking these rules can lead to a warning, suspension or account
                closure. Accounts closed for breaking the rules are not refunded.
              </p>
            ),
          },
          {
            id: 'backups',
            title: 'Backups',
            content: (
              <p>
                Backups are not part of any service. Keeping your own backups, stored away from our servers, is your responsibility. We do
                not guarantee that server backups exist and are not responsible for lost data.
              </p>
            ),
          },
          {
            id: 'refunds',
            title: 'Refunds',
            content: (
              <p>
                Shared, VPS and reseller hosting come with a 30-day money-back guarantee on the hosting fee. Domains, setup fees, payment
                fees, add-ons and design or development work are not refunded. See the full{' '}
                <Link href='/money-back'>money-back policy</Link>.
              </p>
            ),
          },
          {
            id: 'abuse',
            title: 'Respectful behaviour',
            content: (
              <p>
                We do not accept abusive language or behaviour towards our company or our staff. Accounts we judge to be abusive may be closed
                immediately, without a refund.
              </p>
            ),
          },
          {
            id: 'liability',
            title: 'Limitation of liability',
            content: (
              <p>
                RaishaHost is not responsible for lost profit or for indirect, incidental, special or consequential damages from using the
                service. Our total liability is limited to the amount you paid for 30 days of the service.
              </p>
            ),
          },
          {
            id: 'privacy',
            title: 'Privacy',
            content: (
              <p>
                We keep the personal information you give us confidential and use it only to provide our services. We do not share it with
                third parties without your consent, unless the law requires it. Read our <Link href='/privacy'>privacy policy</Link>.
              </p>
            ),
          },
        ]}
      />
    </InnerPage>
  )
}
