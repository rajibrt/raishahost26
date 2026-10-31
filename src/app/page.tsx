import type { Metadata } from 'next'
import Link from 'next/link'
import '@/styles/site.css'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import PlanTabs from '@/components/site/PlanTabs'
import DomainSearch from '@/components/site/DomainSearch'
import HomeSceneLoader from '@/components/home/HomeSceneLoader'
import HomeMotion from '@/components/home/HomeMotion'
import { CLIENT_AREA_URL } from '@/components/site/links'

export const metadata: Metadata = {
  title: 'RaishaHost: Web Hosting, VPS & Web Design Since 2008',
  description:
    'cPanel hosting, VPS servers, domains and custom websites for businesses in Bangladesh and the United States. Free SSL, 99.9% uptime target, 30-day money-back guarantee.',
  alternates: { canonical: 'https://raishahost.com' },
  openGraph: {
    title: 'RaishaHost: Web Hosting, VPS & Web Design Since 2008',
    description:
      'cPanel hosting, VPS servers, domains and custom websites. Free SSL, 30-day money-back guarantee, support 24/7.',
    url: 'https://raishahost.com',
  },
}

const services = [
  { n: '/hosting', title: 'cPanel Hosting', body: 'Email, SSL and one-click WordPress on SSD storage. Billed yearly, from ৳3,800.', go: 'See hosting plans', href: '/hosting' },
  { n: '/vps', title: 'VPS Servers', body: 'Your own server with root access and NVMe storage. Billed monthly, from ৳3,599 or $29.99.', go: 'See VPS plans', href: '/vps' },
  { n: '/domains', title: 'Domains', body: '.com, .com.bd, .net and more, connected to your hosting in one step.', go: 'Search a domain', href: '/domains' },
  { n: '/web-design', title: 'Web Design', body: 'Fast, custom websites for companies in Bangladesh and the US, hosted by the team that built them.', go: 'See web design', href: '/web-design' },
  { n: '/logo-design', title: 'Logo & Graphics', body: 'Logos, brand colors and social graphics that match your new website.', go: 'See logo design', href: '/logo-design' },
]

const faqs = [
  { q: 'How does the money-back guarantee work?', a: 'Ask within 30 days of sign-up and we refund the hosting fee for your first service. Domain fees, setup fees and design work are not refundable.' },
  { q: 'Are prices monthly or yearly?', a: 'cPanel hosting is billed yearly. VPS servers are billed monthly. Every price on this site shows its billing period.' },
  { q: 'Can I move my site from another host?', a: 'Yes. Open a ticket after you order and our team will help you move your files, databases and email.' },
  { q: 'Can I upgrade from cPanel hosting to a VPS later?', a: 'Yes. When your site outgrows shared hosting, we move you to a VPS without changing providers.' },
]

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RaishaHost',
    url: 'https://raishahost.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://hosting.raishahost.com/cart.php?a=add&domain=register&query={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div className='rh'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeSceneLoader />
      <HomeMotion />
      <SiteNav />

      <main className='page'>
        {/* Act 1: 3D logo */}
        <section className='hero gut' data-act='hero'>
          <div className='in'>
            <span className='k'>Web hosting since 2008</span>
            <h1>
              <span className='ln'>
                <span>Your website,</span>
              </span>
              <span className='ln'>
                <span>
                  <em className='sky'>always on.</em>
                </span>
              </span>
            </h1>
            <p className='lede rv'>
              cPanel hosting, VPS servers, domains and custom websites for businesses in Bangladesh and the United States.
            </p>
            <DomainSearch className='rv' />
            <div className='tlds rv'>
              <span><b>.com</b></span>
              <span><b>.com.bd</b></span>
              <span><b>.net</b></span>
              <span><b>.org</b></span>
              <span><b>.xyz</b></span>
            </div>
            <div className='stats rv'>
              <div><b data-count='2008' data-from='1990'>2008</b><span>Online since</span></div>
              <div><b data-count='99.9' data-dec='1' data-suf='%'>99.9%</b><span>Uptime target</span></div>
              <div><b data-count='30' data-suf=' days'>30 days</b><span>Money-back</span></div>
              <div><b>24/7</b><span>Human support</span></div>
            </div>
          </div>
          <div className='cue'><i />SCROLL</div>
        </section>

        {/* Act 2: globe */}
        <section className='act gut' data-act='globe'>
          <div className='in'>
            <div className='copy right glass rv'>
              <span className='k'>01 · Reach</span>
              <h2>From Dhaka to Dallas.</h2>
              <p>We host and build for clients on both sides of the world. Your site loads fast for your customers, wherever they are.</p>
              <div className='chips'>
                {['Dhaka', 'Chattogram', 'New York', 'Dallas', 'London', 'Singapore'].map((c) => <span key={c}>{c}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* Act 3: server aisle */}
        <section className='act gut' data-act='infra'>
          <div className='in'>
            <div className='copy glass rv'>
              <span className='k'>02 · Infrastructure</span>
              <h2>Fast hardware, ready to grow.</h2>
              <p>Every plan runs on SSD or NVMe storage with a firewall in front. Need more? Move up to your own VPS with root access.</p>
              <ul className='feat'>
                <li><b>NVMe SSD</b><span>On every VPS</span></li>
                <li><b>DDoS protection</b><span>Included with VPS</span></li>
                <li><b>Full root access</b><span>Ubuntu, Debian, AlmaLinux</span></li>
                <li><b>20 TB bandwidth</b><span>Per VPS, every month</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Act 4: SSL lock */}
        <section className='act gut' data-act='secure'>
          <div className='in'>
            <div className='copy right glass rv'>
              <span className='k'>03 · Security</span>
              <h2>Locked by default.</h2>
              <p>A free SSL certificate comes with every hosting plan. It installs itself, renews itself and keeps the padlock in your visitors&apos; browsers.</p>
            </div>
          </div>
        </section>

        {/* Services, horizontal on desktop */}
        <section className='hs' id='services'>
          <div className='hs-pin'>
            <div className='in gut'>
              <span className='k'>What we do</span>
              <h2 style={{ fontSize: 'clamp(32px,4.4vw,54px)', fontWeight: 800, marginTop: 10 }}>One team for your whole web presence.</h2>
            </div>
            <div className='hs-track' id='hsTrack'>
              {services.map((s, i) => (
                <Link className='svc' href={s.href} key={s.href}>
                  <span className='n'>{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <span className='go'>{s.go} →</span>
                  <span className='big' aria-hidden='true'>{String(i + 1).padStart(2, '0')}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className='sec gut' id='plans'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>Plans</span>
                <h2>Clear prices. No surprises at renewal.</h2>
                <p>cPanel hosting is billed yearly. VPS is billed monthly. Upgrade any time without changing providers.</p>
              </div>
              <Link className='btn btn-ghost' href='/hosting'>Compare all plans</Link>
            </div>
            <PlanTabs />
          </div>
        </section>

        {/* Business policies */}
        <section className='sec tight gut' id='promises'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>Our promises</span>
                <h2>The policies we stand behind.</h2>
                <p>Written down, linked to the full terms, and the same for every customer.</p>
              </div>
            </div>
            <div className='prom'>
              <article className='pr wide rv'>
                <span className='big' data-count='30'>30</span>
                <h3>30-day money-back guarantee</h3>
                <p>Not happy in your first 30 days? We refund your hosting fee for shared, VPS and reseller plans.</p>
                <ul>
                  <li>Request within 30 days of sign-up</li>
                  <li>Once per client, first service only</li>
                  <li>Account must be verified</li>
                  <li>Domains, setup fees and design work are not refundable</li>
                </ul>
                <Link href='/money-back'>Read the refund policy →</Link>
              </article>
              <article className='pr rv'>
                <span className='big' data-count='99.9' data-dec='1' data-suf='%'>99.9%</span>
                <h3>Uptime guarantee</h3>
                <p>Our target for every server, backed by our service terms.</p>
                <Link href='/guarantees'>See our guarantees →</Link>
              </article>
              <article className='pr rv'>
                <span className='big'>SSL</span>
                <h3>Free SSL on every plan</h3>
                <p>Installed and renewed automatically, at no extra cost.</p>
                <Link href='/guarantees'>What&apos;s included →</Link>
              </article>
              <article className='pr rv'>
                <span className='big'>24/7</span>
                <h3>Support from people</h3>
                <p>Open a ticket from your client area any time. Urgent issues are answered first.</p>
                <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>Open the client area →</a>
              </article>
              <article className='pr rv'>
                <span className='big'>৳ · $</span>
                <h3>Clear billing</h3>
                <p>cPanel hosting yearly, VPS monthly. Pay in taka or dollars. Renewal prices are shown before you pay.</p>
                <Link href='/terms-conditions'>Read the terms →</Link>
              </article>
            </div>
          </div>
        </section>

        {/* How ordering works */}
        <section className='sec tight gut'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>How it works</span>
                <h2>Online in four steps.</h2>
              </div>
            </div>
            <div className='steps' id='steps'>
              <div className='rail'><i id='rail' /></div>
              <div className='st rv'><span className='dot'>1</span><h3>Pick a plan</h3><p>Choose cPanel hosting or a VPS, and add a domain if you need one.</p></div>
              <div className='st rv'><span className='dot'>2</span><h3>Pay your way</h3><p>Check out in taka or dollars from our secure client area.</p></div>
              <div className='st rv'><span className='dot'>3</span><h3>We set it up</h3><p>Your account, SSL and email are ready. Moving from another host? We help with that.</p></div>
              <div className='st rv'><span className='dot'>4</span><h3>Go live</h3><p>Publish your site and reach us 24/7 whenever you need help.</p></div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section className='sec tight gut' id='work'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>Our work</span>
                <h2>Websites we built and host.</h2>
                <p>Case studies from clients in Bangladesh and the United States, added with their permission.</p>
              </div>
              <Link className='btn btn-ghost' href='/work'>All case studies</Link>
            </div>
            <div className='work'>
              {[
                ['USA · Web design + hosting'],
                ['Bangladesh · E-commerce + VPS'],
                ['Bangladesh · Logo + website'],
              ].map(([meta]) => (
                <article className='case rv' key={meta}>
                  <div className='shot'>Client screenshot</div>
                  <div className='body'>
                    <span className='meta'>{meta}</span>
                    <h3>Case study coming soon</h3>
                    <p>Added after client approval.</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className='sec tight gut' id='faq'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>Questions</span>
                <h2>Before you order.</h2>
              </div>
            </div>
            <div className='faq'>
              {faqs.map((f) => (
                <details className='rv' key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className='gut'>
          <div className='in cta'>
            <span className='k'>Since 2008</span>
            <h2 className='rv'>Let&apos;s get your site <em className='sky'>online.</em></h2>
            <p className='rv'>Pick a plan now, or tell us about your project and we&apos;ll suggest the right setup.</p>
            <div className='row rv'>
              <Link className='btn btn-pri' href='/hosting'>See plans</Link>
              <Link className='btn btn-ghost' href='/contact'>Talk to us</Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
