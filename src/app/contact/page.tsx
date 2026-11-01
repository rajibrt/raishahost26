import type { Metadata } from 'next'
import InnerPage from '@/components/site/InnerPage'
import { CLIENT_AREA_URL } from '@/components/site/links'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact RaishaHost for hosting support, VPS servers, domains, web design and quotes. Call, email or send a message; we usually reply within 2–4 hours.',
  alternates: { canonical: 'https://raishahost.com/contact' },
  openGraph: {
    title: 'Contact RaishaHost | Web Hosting & Design Services Worldwide',
    description: 'Reach our team for hosting support, custom quotes and web design. Phone, email and ticket support.',
    url: 'https://raishahost.com/contact',
  },
}

const ways = [
  { ic: '☎', label: 'Phone', value: '+880 1878-037803', href: 'tel:+8801878037803' },
  { ic: '☎', label: 'Phone 2', value: '+880 1711-380679', href: 'tel:+8801711380679' },
  { ic: '@', label: 'Email', value: 'info@raishahost.com', href: 'mailto:info@raishahost.com' },
  { ic: 'f', label: 'Facebook', value: 'facebook.com/RaishaHost', href: 'https://facebook.com/RaishaHost' },
  { ic: '#', label: 'Existing customers', value: 'Open a support ticket', href: CLIENT_AREA_URL },
]

export default function ContactPage() {
  return (
    <InnerPage
      kicker='Contact'
      title={<>Talk to <em className='sky'>a real person.</em></>}
      lede='Questions, a quote for a new website or help with your hosting: call, email or send a message. We usually reply within 2–4 hours during business hours.'
    >
      <section className='sec tight gut'>
        <div className='in split'>
          <div style={{ display: 'grid', gap: 20 }}>
            <div className='ways' data-stagger>
              {ways.map((w) => (
                <a
                  key={w.label}
                  className='way'
                  href={w.href}
                  {...(w.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className='ic' aria-hidden='true'>{w.ic}</span>
                  <span style={{ minWidth: 0 }}>
                    <small>{w.label}</small>
                    <b>{w.value}</b>
                  </span>
                </a>
              ))}
            </div>
            <div className='note rv'>
              <b style={{ color: '#fff' }}>Business hours (Bangladesh time, GMT+6)</b>
              <br />
              General: 10 am – 8 pm · Accounts and billing: 9 am – 4 pm
              <br />
              Support tickets are answered 24/7.
            </div>
          </div>
          <div className='rv'>
            <ContactForm />
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
