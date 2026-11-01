import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import { carePlans, webTiers, websiteAddOns, websitePackages, type WebTier } from '@/data/plans'
import { bdt, localPath, pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Web Design, Development & Digital Services',
    description:
      'Websites, web apps, custom software, online stores, digital marketing and graphic design for businesses worldwide, from a team that also hosts them.',
    kicker: 'Services',
    h1: <>One team for your <em className='sky'>whole web presence.</em></>,
    lede: 'We design, build and host websites, apps and online stores for businesses around the world, so you deal with one team from first idea to launch.',
    quote: 'Get a free quote',
    seePackages: 'See website packages',
    whatK: 'What we do',
    whatH: 'Six ways we can help.',
    services: [
      { title: 'Web design & development', body: 'Fast websites that look right on every phone and computer, built with WordPress, React or Next.js and set up for search engines.', tags: ['WordPress', 'Next.js', 'SEO'] },
      { title: 'Web applications', body: 'Dashboards, customer portals, booking systems: custom software that runs in the browser and fits how your business works.', tags: ['Portals', 'Dashboards', 'APIs'] },
      { title: 'Software development', body: 'Business tools built for you, from inventory and billing (ERP) to customer records (CRM) and automation.', tags: ['ERP', 'CRM', 'Automation'] },
      { title: 'Online stores', body: 'A shop with your products, online payments, stock tracking and order management, ready to sell from day one.', tags: ['WooCommerce', 'Payments', 'Orders'] },
      { title: 'Digital marketing', body: 'Help people find you: search engine optimisation (SEO), Google Ads, social media and content planning.', tags: ['SEO', 'Google Ads', 'Social'] },
      { title: 'Logo & graphic design', body: 'A logo and visual identity that people remember, plus social posts, banners and print material.', tags: ['Logo', 'Branding', 'Print'], href: '/logo-design' },
    ],
    goLogo: 'See logo & design →',
    goQuote: 'Ask for a quote →',
    pkgK: 'Website prices · one-time',
    pkgH: 'Clear price ranges.',
    pkgP: 'Every project is different, so each kind of site has a range. We confirm the exact price in a written quote before work starts.',
    recommended: 'Popular choice',
    oneTime: 'one-time',
    from: 'from',
    quoteBtn: 'Get a quote',
    careK: 'Care plans · monthly',
    careH: 'We look after your site.',
    careP: 'A team that keeps your website updated, backed up and secure, and makes small changes for you every month.',
    perMonth: '/month',
    careYearly: 'Pay yearly and get 2 months free.',
    addK: 'Add-ons · one-time',
    addH: 'Extras, at fixed prices.',
    termsK: 'How payment works',
    terms: [
      'Payment: 50% in advance, 30% after you approve the design, 20% before launch. Custom-code projects are paid by milestone.',
      'Up to 2 rounds of design changes are included.',
      'Domain, hosting, paid plugins and third-party fees are not included.',
    ],
    pkgFine: 'Prices are in Bangladeshi taka (BDT). Ask us for a quote in US dollars.',
    stepsK: 'How it works',
    stepsH: 'From idea to launch in four steps.',
    steps: [
      ['Tell us what you need', 'A short call or message about your business, your audience and your budget.'],
      ['Plan and quote', 'We send a clear plan and a fixed price before any work starts.'],
      ['Design and build', 'You see the design first, then the working site. You can ask for changes at each step.'],
      ['Launch and support', 'We put it live on fast hosting and stay on hand for updates and questions.'],
    ],
    bandH: 'Have a project in mind?',
    bandP: 'Tell us what you want to build. We reply with a plan and a fixed price.',
    seeHosting: 'See hosting plans',
  },
  bn: {
    title: 'ওয়েব ডিজাইন, ডেভেলপমেন্ট ও ডিজিটাল সার্ভিস',
    description:
      'বিশ্বের যেকোনো জায়গার ব্যবসার জন্য ওয়েবসাইট, ওয়েব অ্যাপ, কাস্টম সফটওয়্যার, অনলাইন শপ, ডিজিটাল মার্কেটিং ও গ্রাফিক ডিজাইন, এমন টিমের কাছ থেকে যারা হোস্টিংও করে।',
    kicker: 'সার্ভিস',
    h1: <>আপনার পুরো ওয়েব উপস্থিতির জন্য <em className='sky'>একটি টিম।</em></>,
    lede: 'বিশ্বের বিভিন্ন ব্যবসার জন্য আমরা ওয়েবসাইট, অ্যাপ ও অনলাইন শপ ডিজাইন করি, তৈরি করি ও হোস্ট করি। প্রথম আইডিয়া থেকে লঞ্চ পর্যন্ত আপনি একটি টিমের সাথেই কাজ করবেন।',
    quote: 'ফ্রি কোটেশন নিন',
    seePackages: 'ওয়েবসাইট প্যাকেজ দেখুন',
    whatK: 'আমরা যা করি',
    whatH: 'ছয়ভাবে আমরা সাহায্য করতে পারি।',
    services: [
      { title: 'ওয়েব ডিজাইন ও ডেভেলপমেন্ট', body: 'প্রতিটি ফোন ও কম্পিউটারে ঠিকমতো দেখায় এমন দ্রুত ওয়েবসাইট, WordPress, React বা Next.js দিয়ে তৈরি এবং সার্চ ইঞ্জিনের জন্য প্রস্তুত।', tags: ['WordPress', 'Next.js', 'SEO'] },
      { title: 'ওয়েব অ্যাপ্লিকেশন', body: 'ড্যাশবোর্ড, কাস্টমার পোর্টাল, বুকিং সিস্টেম: ব্রাউজারে চলা কাস্টম সফটওয়্যার, যা আপনার ব্যবসার কাজের ধরনের সাথে মেলে।', tags: ['পোর্টাল', 'ড্যাশবোর্ড', 'API'] },
      { title: 'সফটওয়্যার ডেভেলপমেন্ট', body: 'আপনার জন্য বানানো ব্যবসায়িক টুল: ইনভেন্টরি ও বিলিং (ERP) থেকে কাস্টমারের তথ্য (CRM) ও অটোমেশন।', tags: ['ERP', 'CRM', 'অটোমেশন'] },
      { title: 'অনলাইন শপ', body: 'আপনার পণ্য, অনলাইন পেমেন্ট, স্টক হিসাব ও অর্ডার ম্যানেজমেন্টসহ একটি শপ, প্রথম দিন থেকেই বিক্রির জন্য প্রস্তুত।', tags: ['WooCommerce', 'পেমেন্ট', 'অর্ডার'] },
      { title: 'ডিজিটাল মার্কেটিং', body: 'মানুষ যেন আপনাকে খুঁজে পায়: সার্চ ইঞ্জিন অপটিমাইজেশন (SEO), Google Ads, সোশ্যাল মিডিয়া ও কনটেন্ট পরিকল্পনা।', tags: ['SEO', 'Google Ads', 'সোশ্যাল'] },
      { title: 'লোগো ও গ্রাফিক ডিজাইন', body: 'এমন লোগো ও ভিজ্যুয়াল পরিচয় যা মানুষ মনে রাখে, সাথে সোশ্যাল পোস্ট, ব্যানার ও প্রিন্টের কাজ।', tags: ['লোগো', 'ব্র্যান্ডিং', 'প্রিন্ট'], href: '/logo-design' },
    ],
    goLogo: 'লোগো ও ডিজাইন দেখুন →',
    goQuote: 'কোটেশন চান →',
    pkgK: 'ওয়েবসাইটের দাম · এককালীন',
    pkgH: 'পরিষ্কার দামের সীমা।',
    pkgP: 'প্রতিটি প্রজেক্ট আলাদা, তাই প্রতি ধরনের সাইটের একটি দামের সীমা আছে। কাজ শুরুর আগেই লিখিত কোটেশনে সঠিক দাম জানিয়ে দিই।',
    recommended: 'জনপ্রিয়',
    oneTime: 'এককালীন',
    from: 'থেকে শুরু',
    quoteBtn: 'কোটেশন নিন',
    careK: 'কেয়ার প্ল্যান · মাসিক',
    careH: 'আপনার সাইটের দেখাশোনা আমরা করি।',
    careP: 'একটি টিম আপনার ওয়েবসাইট আপডেট, ব্যাকআপ ও নিরাপদ রাখে, আর প্রতি মাসে ছোট পরিবর্তনগুলো করে দেয়।',
    perMonth: '/মাস',
    careYearly: 'বছরে একবার দিলে ২ মাস ফ্রি।',
    addK: 'অ্যাড-অন · এককালীন',
    addH: 'বাড়তি কাজ, নির্দিষ্ট দামে।',
    termsK: 'পেমেন্ট যেভাবে',
    terms: [
      'পেমেন্ট: ৫০% অগ্রিম, ডিজাইন অনুমোদনের পর ৩০%, লঞ্চের আগে ২০%। কাস্টম কোডের প্রজেক্টে ধাপে ধাপে পেমেন্ট।',
      'ডিজাইনে ২ বার পর্যন্ত পরিবর্তন অন্তর্ভুক্ত।',
      'ডোমেইন, হোস্টিং, পেইড প্লাগইন ও তৃতীয় পক্ষের ফি আলাদা।',
    ],
    pkgFine: 'দাম বাংলাদেশি টাকায় (BDT)। ডলারে কোটেশনের জন্য আমাদের জানান।',
    stepsK: 'যেভাবে কাজ করে',
    stepsH: 'আইডিয়া থেকে লঞ্চ, চার ধাপে।',
    steps: [
      ['আপনার প্রয়োজন জানান', 'আপনার ব্যবসা, গ্রাহক ও বাজেট নিয়ে ছোট একটি কল বা মেসেজ।'],
      ['পরিকল্পনা ও কোটেশন', 'কাজ শুরুর আগেই আমরা পরিষ্কার পরিকল্পনা ও নির্দিষ্ট দাম পাঠাই।'],
      ['ডিজাইন ও তৈরি', 'প্রথমে ডিজাইন দেখবেন, তারপর চালু সাইট। প্রতিটি ধাপে পরিবর্তন চাইতে পারবেন।'],
      ['লঞ্চ ও সাপোর্ট', 'দ্রুত হোস্টিংয়ে সাইট লাইভ করি, আর আপডেট ও প্রশ্নের জন্য পাশে থাকি।'],
    ],
    bandH: 'মাথায় কোনো প্রজেক্ট আছে?',
    bandP: 'কী বানাতে চান জানান। আমরা পরিকল্পনা ও নির্দিষ্ট দাম জানিয়ে উত্তর দেব।',
    seeHosting: 'হোস্টিং প্ল্যান দেখুন',
  },
}

export const servicesMetadata = (lang: Lang) => pageMeta('/services', lang, t[lang])

export default function ServicesView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const L = (h: string) => localPath(h, lang)
  return (
    <InnerPage
      lang={lang}
      kicker={c.kicker}
      title={c.h1}
      lede={c.lede}
      actions={
        <>
          <Link className='btn btn-pri' href={L('/contact')}>{c.quote}</Link>
          <a className='btn btn-ghost' href='#packages'>{c.seePackages}</a>
        </>
      }
    >
      <section className='sec tight gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.whatK}</span>
              <h2>{c.whatH}</h2>
            </div>
          </div>
          <div className='cards' data-stagger>
            {c.services.map((s, i) => (
              <Link key={s.title} className='card' href={L(s.href ?? '/contact')}>
                <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className='tags'>{s.tags.map((x) => <span key={x}>{x}</span>)}</div>
                <span className='go'>{s.href ? c.goLogo : c.goQuote}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut' id='packages'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.pkgK}</span>
              <h2>{c.pkgH}</h2>
              <p>{c.pkgP}</p>
            </div>
          </div>
          {(Object.keys(webTiers) as WebTier[]).map((tier) => (
            <div className='tier' key={tier}>
              <div className='tier-head rv'>
                <h3>{webTiers[tier][lang].name}</h3>
                <p>{webTiers[tier][lang].line}</p>
              </div>
              <div className='cards' data-stagger>
                {websitePackages
                  .filter((p) => p.tier === tier)
                  .map((p) => {
                    const w = lang === 'bn' ? p.bn : p
                    return (
                      <article key={p.id} className={p.featured ? 'plan pop' : 'plan'}>
                        <div className='top'>
                          <h3>{w.name}</h3>
                          {p.featured && <span className='pill'>{c.recommended}</span>}
                        </div>
                        <div className='price range'>
                          {p.price.bdtMax ? (
                            <b>{bdt(p.price.bdtMin)} – {bdt(p.price.bdtMax)}</b>
                          ) : (
                            <b>{bdt(p.price.bdtMin)}<small> {c.from}</small></b>
                          )}
                          <span>{c.oneTime}</span>
                        </div>
                        <p className='tag'>{w.priceNote}</p>
                        <Link className={p.featured ? 'btn btn-pri' : 'btn btn-ghost'} href={L('/contact')}>{c.quoteBtn}</Link>
                      </article>
                    )
                  })}
              </div>
            </div>
          ))}
          <ul className='note rv terms'>
            <li><b>{c.termsK}</b></li>
            {c.terms.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <p className='fine'>{c.pkgFine}</p>
        </div>
      </section>

      <section className='sec gut' id='care'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.careK}</span>
              <h2>{c.careH}</h2>
              <p>{c.careP}</p>
            </div>
          </div>
          <div className='plans' data-stagger>
            {carePlans.map((p) => (
              <article key={p.id} className={p.featured ? 'plan pop' : 'plan'}>
                <div className='top'>
                  <h3>{lang === 'bn' ? p.bn.name : p.name}</h3>
                  {p.featured && <span className='pill'>{c.recommended}</span>}
                </div>
                <div className='price'>
                  <b>{bdt(p.bdt)}</b>
                  <span>{c.perMonth}</span>
                </div>
                <ul className='checks'>{(lang === 'bn' ? p.bn.items : p.en).map((x) => <li key={x}>{x}</li>)}</ul>
                <Link className={p.featured ? 'btn btn-pri' : 'btn btn-ghost'} href={L('/contact')}>{c.quoteBtn}</Link>
              </article>
            ))}
          </div>
          <p className='fine'>{c.careYearly}</p>

          <div className='sec-head rv' style={{ marginTop: 72 }}>
            <div>
              <span className='k'>{c.addK}</span>
              <h2>{c.addH}</h2>
            </div>
          </div>
          <ul className='addons' data-stagger>
            {websiteAddOns.map((a) => (
              <li key={a.id}>
                <span>{lang === 'bn' ? a.bn : a.en}</span>
                <b>
                  {bdt(a.bdt)}
                  {a.from && ` ${c.from}`}
                  {a.per && <small> {lang === 'bn' ? a.per.bn : a.per.en}</small>}
                </b>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.stepsK}</span>
              <h2>{c.stepsH}</h2>
            </div>
          </div>
          <div className='steps'>
            <div className='rail'><i data-draw='x' /></div>
            {c.steps.map(([h, p], i) => (
              <div className='st rv' key={h}>
                <span className='dot'>{i + 1}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='sec gut'>
        <div className='in'>
          <div className='band rv'>
            <div>
              <h2>{c.bandH}</h2>
              <p>{c.bandP}</p>
            </div>
            <div className='row'>
              <Link className='btn btn-pri' href={L('/contact')}>{c.quote}</Link>
              <Link className='btn btn-ghost' href={L('/hosting')}>{c.seeHosting}</Link>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
