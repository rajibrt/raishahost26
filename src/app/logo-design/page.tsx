import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'

export const metadata: Metadata = {
  title: 'Logo & Graphic Design Services',
  description:
    'Custom logo design and graphic design for businesses worldwide: brand identity, social media graphics, print material, UI design, flyers, illustrations and brand style guides.',
  alternates: { canonical: 'https://raishahost.com/logo-design' },
  openGraph: {
    title: 'Logo & Graphic Design Services | RaishaHost',
    description: 'Custom logos, brand identity, social media graphics, print material and UI design.',
    url: 'https://raishahost.com/logo-design',
  },
}

const logoIncludes = [
  'A logo made for your brand, not a template',
  'Several first ideas to choose from',
  'Changes until you are happy with it',
  'Every file you need: PNG, SVG, PDF and EPS',
  'Versions for light and dark backgrounds',
  'Simple colour and font guide',
]

const graphics = [
  { title: 'Social media graphics', body: 'Facebook covers, Instagram posts and YouTube thumbnails that look sharp on every platform.' },
  { title: 'Print & branding', body: 'Business cards, letterheads, brochures and banners, ready for the printer.' },
  { title: 'UI design', body: 'Screens for websites and apps, with clickable prototypes you can try before anything is built.' },
  { title: 'Flyers & posters', body: 'Promotions, events and product launches designed to catch the eye.' },
  { title: 'Illustration & infographics', body: 'Custom drawings and charts that make complicated ideas easy to understand.' },
  { title: 'Brand style guide', body: 'Your colours, fonts and logo rules in one place, so your brand looks the same everywhere.' },
]

const steps = [
  { title: 'Brief', body: 'You tell us about your business, your customers and styles you like.' },
  { title: 'Concepts', body: 'We send first ideas and explain the thinking behind each one.' },
  { title: 'Refine', body: 'We improve the chosen idea with your feedback until it is right.' },
  { title: 'Deliver', body: 'You receive every file and a short guide on how to use them.' },
]

const industries = ['Food & beverage', 'Professional services', 'Retail & e-commerce', 'Health & wellness', 'Technology', 'Education', 'Real estate', 'Non-profit']

export default function LogoDesignPage() {
  return (
    <InnerPage
      kicker='Logo & graphic design'
      title={<>Your brand, <em className='sky'>clearly designed.</em></>}
      lede='From a new logo to a full set of graphics, we create visuals that make your business easy to recognise, online and in print.'
      actions={
        <>
          <Link className='btn btn-pri' href='/contact'>Get a quote</Link>
          <a className='btn btn-ghost' href='#graphic-design'>Graphic design</a>
        </>
      }
    >
      <section className='sec tight gut'>
        <div className='in split'>
          <div className='rv'>
            <span className='k'>Logo design</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, marginTop: 10 }}>A logo that is yours.</h2>
            <p className='lead' style={{ marginTop: 16 }}>
              We design around your business and your customers, then hand over everything you need to use the logo anywhere.
            </p>
          </div>
          <ul className='checks card' data-stagger>
            {logoIncludes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </section>

      <section className='sec gut' id='graphic-design'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>Graphic design</span>
              <h2>Design for every need.</h2>
              <p>Beyond the logo: everything your brand needs to look professional and consistent.</p>
            </div>
          </div>
          <div className='cards' data-stagger>
            {graphics.map((g, i) => (
              <div className='card' key={g.title}>
                <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>How it works</span>
              <h2>Four steps to a finished design.</h2>
            </div>
          </div>
          <div className='steps'>
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

      <section className='sec tight gut'>
        <div className='in'>
          <span className='k rv'>Industries we design for</span>
          <div className='chips' style={{ marginTop: 16 }} data-stagger>
            {industries.map((x) => <span key={x}>{x}</span>)}
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='band rv'>
            <div>
              <h2>Ready for a new look?</h2>
              <p>Tell us about your brand and we will send ideas and a price.</p>
            </div>
            <div className='row'>
              <Link className='btn btn-pri' href='/contact'>Get a quote</Link>
              <Link className='btn btn-ghost' href='/services'>All services</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
