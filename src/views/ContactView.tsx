import InnerPage from '@/components/site/InnerPage'
import ContactForm from '@/components/site/ContactForm'
import { CLIENT_AREA_URL } from '@/components/site/links'
import { pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Contact Us',
    description:
      'Contact RaishaHost for hosting support, VPS servers, domains, web design and quotes. Call, email or send a message; we usually reply within 2–4 hours.',
    kicker: 'Contact',
    h1: <>Talk to <em className='sky'>a real person.</em></>,
    lede: 'Questions, a quote for a new website or help with your hosting: call, email or send a message. We usually reply within 2–4 hours during business hours.',
    labels: ['Phone', 'Phone 2', 'Email', 'Facebook', 'Existing customers'],
    ticket: 'Open a support ticket',
    hoursH: 'Business hours (Bangladesh time, GMT+6)',
    hours: 'General: 10 am – 8 pm · Accounts and billing: 9 am – 4 pm',
    tickets: 'Support tickets are answered 24/7.',
  },
  bn: {
    title: 'যোগাযোগ',
    description:
      'হোস্টিং সাপোর্ট, VPS সার্ভার, ডোমেইন, ওয়েব ডিজাইন ও কোটেশনের জন্য RaishaHost-এর সাথে যোগাযোগ করুন। কল, ইমেইল বা মেসেজ পাঠান; আমরা সাধারণত ২–৪ ঘণ্টার মধ্যে উত্তর দিই।',
    kicker: 'যোগাযোগ',
    h1: <>সরাসরি <em className='sky'>মানুষের সাথে কথা বলুন।</em></>,
    lede: 'প্রশ্ন, নতুন ওয়েবসাইটের কোটেশন বা হোস্টিংয়ে সাহায্য: কল করুন, ইমেইল করুন বা মেসেজ পাঠান। অফিস সময়ে আমরা সাধারণত ২–৪ ঘণ্টার মধ্যে উত্তর দিই।',
    labels: ['ফোন', 'ফোন ২', 'ইমেইল', 'ফেসবুক', 'বর্তমান গ্রাহক'],
    ticket: 'সাপোর্ট টিকেট খুলুন',
    hoursH: 'অফিস সময় (বাংলাদেশ সময়, GMT+6)',
    hours: 'সাধারণ: সকাল ১০টা – রাত ৮টা · অ্যাকাউন্ট ও বিলিং: সকাল ৯টা – বিকেল ৪টা',
    tickets: 'সাপোর্ট টিকেটের উত্তর ২৪/৭ দেওয়া হয়।',
  },
}

export const contactMetadata = (lang: Lang) => pageMeta('/contact', lang, t[lang])

export default function ContactView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const ways = [
    { ic: '☎', value: '+880 1878-037803', href: 'tel:+8801878037803' },
    { ic: '☎', value: '+880 1711-380679', href: 'tel:+8801711380679' },
    { ic: '@', value: 'info@raishahost.com', href: 'mailto:info@raishahost.com' },
    { ic: 'f', value: 'facebook.com/RaishaHost', href: 'https://facebook.com/RaishaHost' },
    { ic: '#', value: c.ticket, href: CLIENT_AREA_URL },
  ]
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in split'>
          <div style={{ display: 'grid', gap: 20 }}>
            <div className='ways' data-stagger>
              {ways.map((w, i) => (
                <a
                  key={w.href}
                  className='way'
                  href={w.href}
                  {...(w.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className='ic' aria-hidden='true'>{w.ic}</span>
                  <span style={{ minWidth: 0 }}>
                    <small>{c.labels[i]}</small>
                    <b>{w.value}</b>
                  </span>
                </a>
              ))}
            </div>
            <div className='note rv'>
              <b style={{ color: '#fff' }}>{c.hoursH}</b>
              <br />
              {c.hours}
              <br />
              {c.tickets}
            </div>
          </div>
          <div className='rv'>
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
