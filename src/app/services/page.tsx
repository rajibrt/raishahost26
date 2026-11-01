import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { websitePackages } from '@/data/plans'

export const metadata: Metadata = {
  title: 'Web Design, Development & Digital Services',
  description:
    'Websites, web apps, custom software, online stores, digital marketing and graphic design for businesses worldwide, from a team that also hosts them.',
  alternates: { canonical: 'https://raishahost.com/services' },
  openGraph: {
    title: 'Web Design, Development & Digital Services | RaishaHost',
    description: 'Websites, web apps, software, online stores, marketing and design for businesses worldwide.',
    url: 'https://raishahost.com/services',
  },
}

const services = [
  {
    title: 'Web design & development',
    body: 'Fast websites that look right on every phone and computer, built with WordPress, React or Next.js and set up for search engines.',
    tags: ['WordPress', 'Next.js', 'SEO'],
  },
  {
    title: 'Web applications',
    body: 'Dashboards, customer portals, booking systems: custom software that runs in the browser and fits how your business works.',
    tags: ['Portals', 'Dashboards', 'APIs'],
  },
  {
    title: 'Software development',
    body: 'Business tools built for you, from inventory and billing (ERP) to customer records (CRM) and automation.',
    tags: ['ERP', 'CRM', 'Automation'],
  },
  {
    title: 'Online stores',
    body: 'A shop with your products, online payments, stock tracking and order management, ready to sell from day one.',
    tags: ['WooCommerce', 'Payments', 'Orders'],
  },
  {
    title: 'Digital marketing',
    body: 'Help people find you: search engine optimisation (SEO), Google Ads, social media and content planning.',
    tags: ['SEO', 'Google Ads', 'Social'],
  },
  {
    title: 'Logo & graphic design',
    body: 'A logo and visual identity that people remember, plus social posts, banners and print material.',
    tags: ['Logo', 'Branding', 'Print'],
    href: '/logo-design',
  },
]

const steps = [
  { title: 'Tell us what you need', body: 'A short call or message about your business, your audience and your budget.' },
  { title: 'Plan and quote', body: 'We send a clear plan and a fixed price before any work starts.' },
  { title: 'Design and build', body: 'You see the design first, then the working site. You can ask for changes at each step.' },
  { title: 'Launch and support', body: 'We put it live on fast hosting and stay on hand for updates and questions.' },
]

const bdt = (n: number) => '৳' + n.toLocaleString('en-US')

export default function ServicesPage() {
  return (
    <InnerPage
      kicker='Services'
      title={<>One team for your <em className='sky'>whole web presence.</em></>}
      lede='We design, build and host websites, apps and online stores for businesses around the world, so you deal with one team from first idea to launch.'
      actions={
        <>
          <Link className='btn btn-pri' href='/contact'>Get a free quote</Link>
          <a className='btn btn-ghost' href='#packages'>See website packages</a>
        </>
      }
    >
      <section className='sec tight gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>What we do</span>
              <h2>Six ways we can help.</h2>
            </div>
          </div>
          <div className='cards' data-stagger>
            {services.map((s, i) => (
              <Link key={s.title} className='card' href={s.href ?? '/contact'}>
                <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className='tags'>{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <span className='go'>{s.href ? 'See logo & design →' : 'Ask for a quote →'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut' id='packages'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>Website packages · one-time price</span>
              <h2>Ready-made packages.</h2>
              <p>Pick a starting point. Hosting and domain are separate, and we can add anything a package does not cover.</p>
            </div>
          </div>
          <div className='cards' data-stagger>
            {websitePackages.map((p) => (
              <article key={p.id} className={p.featured ? 'plan pop' : 'plan'}>
                <div className='top'>
                  <h3>{p.name}</h3>
                  <span className='pill'>{p.featured ? 'Recommended' : p.kind}</span>
                </div>
                <div className='price'>
                  <b>{bdt(p.price.bdt)}</b>
                  <span>one-time</span>
                </div>
                <ul className='checks'>
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link className={p.featured ? 'btn btn-pri' : 'btn btn-ghost'} href='/contact'>
                  Start this package
                </Link>
              </article>
            ))}
          </div>
          <p className='fine'>Prices are in Bangladeshi taka (BDT). Ask us for a quote in US dollars.</p>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>How it works</span>
              <h2>From idea to launch in four steps.</h2>
            </div>
          </div>
          <div className='steps' id='steps'>
            <div className='rail'><i data-draw='x' /></div>
            {steps.map((s, i) => (
              <div className='st rv' key={s.title}>
                <span className='dot'>{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='band rv'>
            <div>
              <h2>Have a project in mind?</h2>
              <p>Tell us what you want to build. We reply with a plan and a fixed price.</p>
            </div>
            <div className='row'>
              <Link className='btn btn-pri' href='/contact'>Get a free quote</Link>
              <Link className='btn btn-ghost' href='/hosting'>See hosting plans</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
