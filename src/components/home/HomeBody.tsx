import Link from 'next/link'
import PlanTabs from '@/components/site/PlanTabs'
import { CLIENT_AREA_URL } from '@/components/site/links'
import { sharedHostingPlans, vpsPlans } from '@/data/plans'
import { bdt, localPath, usd, type Lang } from '@/i18n'

const shared = sharedHostingPlans[0].price
const vps = vpsPlans[0].price

const text = {
  en: {
    servicesK: 'What we do',
    servicesH: 'One team for your whole web presence.',
    services: [
      { n: '/hosting', title: 'cPanel Hosting', body: `Email, SSL and one-click WordPress on SSD storage. Billed yearly, from ${bdt(shared.bdt)}.`, go: 'See hosting plans', href: '/hosting' },
      { n: '/vps', title: 'VPS Servers', body: `Your own server with root access and NVMe storage. Billed monthly, from ${bdt(vps.bdt)} or ${usd(vps.usd!)}.`, go: 'See VPS plans', href: '/vps' },
      { n: '/domains', title: 'Domains', body: '.com, .com.bd, .net and more, connected to your hosting in one step.', go: 'Search a domain', href: '/domains' },
      { n: '/services', title: 'Web Design', body: 'Fast, custom websites for companies anywhere, hosted by the team that built them.', go: 'See web design', href: '/services' },
      { n: '/logo-design', title: 'Logo & Graphics', body: 'Logos, brand colors and social graphics that match your new website.', go: 'See logo design', href: '/logo-design' },
    ],
    plansK: 'Plans',
    plansH: 'Clear prices. No surprises at renewal.',
    plansP: 'cPanel hosting is billed yearly. VPS is billed monthly. Upgrade any time without changing providers.',
    compare: 'Compare all plans',
    promK: 'Our promises',
    promH: 'The policies we stand behind.',
    promP: 'Written down, linked to the full terms, and the same for every customer.',
    money: {
      h: '30-day money-back guarantee',
      p: 'Not happy in your first 30 days? We refund your hosting fee for shared, VPS and reseller plans.',
      li: ['Request within 30 days of sign-up', 'Once per client, first service only', 'Account must be verified', 'Domains, setup fees and design work are not refundable'],
      a: 'Read the refund policy →',
    },
    uptime: { h: 'Uptime target', p: 'What we aim for on every server, with round-the-clock monitoring.', a: 'See our promises →' },
    ssl: { h: 'Free SSL on every plan', p: 'Installed and renewed automatically, at no extra cost.', a: 'What’s included →' },
    support: { h: 'Support from people', p: 'Open a ticket from your client area any time. Urgent issues are answered first.', a: 'Open the client area →' },
    billing: { h: 'Clear billing', p: 'cPanel hosting yearly, VPS monthly. Pay in taka or dollars. Renewal prices are shown before you pay.', a: 'Read the terms →' },
    stepsK: 'How it works',
    stepsH: 'Online in four steps.',
    steps: [
      ['Pick a plan', 'Choose cPanel hosting or a VPS, and add a domain if you need one.'],
      ['Pay your way', 'Check out in taka or dollars from our secure client area.'],
      ['We set it up', 'Your account, SSL and email are ready. Moving from another host? We help with that.'],
      ['Go live', 'Publish your site and reach us 24/7 whenever you need help.'],
    ],
    workK: 'Our work',
    workH: 'Websites we built and host.',
    workP: 'Case studies from clients around the world, added with their permission.',
    workAll: 'All case studies',
    workMeta: ['Web design + hosting', 'E-commerce + VPS', 'Logo + website'],
    shot: 'Client screenshot',
    soon: 'Case study coming soon',
    soonP: 'Added after client approval.',
    faqK: 'Questions',
    faqH: 'Before you order.',
    faqs: [
      ['How does the money-back guarantee work?', 'Ask within 30 days of sign-up and we refund the hosting fee for your first service. Domain fees, setup fees and design work are not refundable.'],
      ['Are prices monthly or yearly?', 'cPanel hosting is billed yearly. VPS servers are billed monthly. Every price on this site shows its billing period.'],
      ['Can I move my site from another host?', 'Yes. Open a ticket after you order and our team will help you move your files, databases and email.'],
      ['Can I upgrade from cPanel hosting to a VPS later?', 'Yes. When your site outgrows shared hosting, we move you to a VPS without changing providers.'],
    ],
    ctaK: 'Since 2008',
    ctaH: <>Let&apos;s get your site <em className='sky'>online.</em></>,
    ctaP: 'Pick a plan now, or tell us about your project and we’ll suggest the right setup.',
    seePlans: 'See plans',
    talk: 'Talk to us',
  },
  bn: {
    servicesK: 'আমরা যা করি',
    servicesH: 'আপনার পুরো ওয়েব উপস্থিতির জন্য একটি টিম।',
    services: [
      { n: '/hosting', title: 'cPanel হোস্টিং', body: `SSD স্টোরেজে ইমেইল, SSL ও এক ক্লিকে WordPress। বছরে বিল, ${bdt(shared.bdt)} থেকে শুরু।`, go: 'হোস্টিং প্ল্যান দেখুন', href: '/hosting' },
      { n: '/vps', title: 'VPS সার্ভার', body: `রুট অ্যাক্সেস ও NVMe স্টোরেজসহ নিজের সার্ভার। মাসে বিল, ${bdt(vps.bdt)} বা ${usd(vps.usd!)} থেকে শুরু।`, go: 'VPS প্ল্যান দেখুন', href: '/vps' },
      { n: '/domains', title: 'ডোমেইন', body: '.com, .com.bd, .net সহ আরও অনেক কিছু, এক ধাপেই আপনার হোস্টিংয়ের সাথে যুক্ত।', go: 'ডোমেইন খুঁজুন', href: '/domains' },
      { n: '/services', title: 'ওয়েব ডিজাইন', body: 'যেকোনো জায়গার প্রতিষ্ঠানের জন্য দ্রুত, কাস্টম ওয়েবসাইট, যে টিম বানায় সেই টিমই হোস্ট করে।', go: 'ওয়েব ডিজাইন দেখুন', href: '/services' },
      { n: '/logo-design', title: 'লোগো ও গ্রাফিক্স', body: 'আপনার নতুন ওয়েবসাইটের সাথে মিলিয়ে লোগো, ব্র্যান্ডের রং ও সোশ্যাল মিডিয়া গ্রাফিক্স।', go: 'লোগো ডিজাইন দেখুন', href: '/logo-design' },
    ],
    plansK: 'প্ল্যান',
    plansH: 'পরিষ্কার দাম। রিনিউয়ের সময় কোনো চমক নেই।',
    plansP: 'cPanel হোস্টিংয়ের বিল বছরে একবার, VPS-এর বিল প্রতি মাসে। প্রোভাইডার না বদলেই যেকোনো সময় আপগ্রেড করুন।',
    compare: 'সব প্ল্যান তুলনা করুন',
    promK: 'আমাদের প্রতিশ্রুতি',
    promH: 'যে নীতিগুলো আমরা মেনে চলি।',
    promP: 'লিখিত, পূর্ণ শর্তাবলীর সাথে যুক্ত, এবং প্রত্যেক গ্রাহকের জন্য একই।',
    money: {
      h: '৩০ দিনের মানি-ব্যাক গ্যারান্টি',
      p: 'প্রথম ৩০ দিনে সন্তুষ্ট নন? শেয়ার্ড, VPS ও রিসেলার প্ল্যানের হোস্টিং ফি আমরা ফেরত দিই।',
      li: ['সাইন-আপের ৩০ দিনের মধ্যে অনুরোধ করুন', 'প্রতি ক্লায়েন্ট একবার, শুধু প্রথম সার্ভিসে', 'অ্যাকাউন্ট ভেরিফাইড হতে হবে', 'ডোমেইন, সেটআপ ফি ও ডিজাইনের কাজ ফেরতযোগ্য নয়'],
      a: 'রিফান্ড নীতি পড়ুন →',
    },
    uptime: { h: 'আপটাইম লক্ষ্য', p: 'প্রতিটি সার্ভারে আমাদের লক্ষ্য, চব্বিশ ঘণ্টা নজরদারিসহ।', a: 'আমাদের প্রতিশ্রুতি দেখুন →' },
    ssl: { h: 'প্রতিটি প্ল্যানে ফ্রি SSL', p: 'কোনো বাড়তি খরচ ছাড়াই নিজে থেকে ইনস্টল ও রিনিউ হয়।', a: 'কী কী থাকছে →' },
    support: { h: 'মানুষের সাপোর্ট', p: 'যেকোনো সময় ক্লায়েন্ট এরিয়া থেকে টিকেট খুলুন। জরুরি সমস্যার উত্তর আগে দেওয়া হয়।', a: 'ক্লায়েন্ট এরিয়া খুলুন →' },
    billing: { h: 'পরিষ্কার বিল', p: 'cPanel হোস্টিং বছরে, VPS মাসে। টাকা বা ডলারে পেমেন্ট করুন। পেমেন্টের আগেই রিনিউয়ের দাম দেখানো হয়।', a: 'শর্তাবলী পড়ুন →' },
    stepsK: 'যেভাবে কাজ করে',
    stepsH: 'চার ধাপে অনলাইনে।',
    steps: [
      ['প্ল্যান বেছে নিন', 'cPanel হোস্টিং বা VPS বেছে নিন, দরকার হলে একটি ডোমেইন যোগ করুন।'],
      ['নিজের মতো পেমেন্ট', 'আমাদের নিরাপদ ক্লায়েন্ট এরিয়া থেকে টাকা বা ডলারে পেমেন্ট করুন।'],
      ['আমরা সেটআপ করি', 'আপনার অ্যাকাউন্ট, SSL ও ইমেইল তৈরি। অন্য হোস্ট থেকে আসছেন? আমরা সাহায্য করি।'],
      ['লাইভ হোন', 'সাইট প্রকাশ করুন, আর দরকার হলে ২৪/৭ আমাদের পাবেন।'],
    ],
    workK: 'আমাদের কাজ',
    workH: 'যে ওয়েবসাইট আমরা বানাই ও হোস্ট করি।',
    workP: 'বিশ্বের বিভিন্ন ক্লায়েন্টের কেস স্টাডি, তাদের অনুমতি নিয়ে যোগ করা হবে।',
    workAll: 'সব কেস স্টাডি',
    workMeta: ['ওয়েব ডিজাইন + হোস্টিং', 'ই-কমার্স + VPS', 'লোগো + ওয়েবসাইট'],
    shot: 'ক্লায়েন্টের স্ক্রিনশট',
    soon: 'কেস স্টাডি শিগগির আসছে',
    soonP: 'ক্লায়েন্টের অনুমতির পর যোগ করা হবে।',
    faqK: 'প্রশ্ন',
    faqH: 'অর্ডার করার আগে।',
    faqs: [
      ['মানি-ব্যাক গ্যারান্টি কীভাবে কাজ করে?', 'সাইন-আপের ৩০ দিনের মধ্যে অনুরোধ করলে আপনার প্রথম সার্ভিসের হোস্টিং ফি আমরা ফেরত দিই। ডোমেইন ফি, সেটআপ ফি ও ডিজাইনের কাজ ফেরতযোগ্য নয়।'],
      ['দাম কি মাসিক না বার্ষিক?', 'cPanel হোস্টিংয়ের বিল বছরে একবার, VPS সার্ভারের বিল প্রতি মাসে। এই সাইটের প্রতিটি দামের পাশে বিলের সময়কাল লেখা আছে।'],
      ['অন্য হোস্ট থেকে কি আমার সাইট আনতে পারব?', 'হ্যাঁ। অর্ডারের পর একটি টিকেট খুলুন, আমাদের টিম আপনার ফাইল, ডাটাবেস ও ইমেইল সরাতে সাহায্য করবে।'],
      ['পরে কি cPanel হোস্টিং থেকে VPS-এ যেতে পারব?', 'হ্যাঁ। শেয়ার্ড হোস্টিংয়ে আর না কুলালে প্রোভাইডার না বদলেই আমরা আপনাকে VPS-এ নিয়ে যাই।'],
    ],
    ctaK: '২০০৮ থেকে',
    ctaH: <>চলুন আপনার সাইট <em className='sky'>অনলাইনে আনি।</em></>,
    ctaP: 'এখনই একটি প্ল্যান বেছে নিন, অথবা আপনার প্রজেক্টের কথা জানান, আমরা সঠিক সেটআপ বলে দেব।',
    seePlans: 'প্ল্যান দেখুন',
    talk: 'কথা বলুন',
  },
}

/** Homepage sections after the opening story: services, plans, policies, steps, work, FAQ, CTA. */
export default function HomeBody({ lang = 'en' }: { lang?: Lang }) {
  const t = text[lang]
  const L = (h: string) => localPath(h, lang)
  return (
    <>
        {/* Services, horizontal on desktop */}
        <section className='hs' id='services'>
          <div className='hs-pin'>
            <div className='in gut'>
              <span className='k'>{t.servicesK}</span>
              <h2 style={{ fontSize: 'clamp(32px,4.4vw,54px)', fontWeight: 800, marginTop: 10 }}>{t.servicesH}</h2>
            </div>
            <div className='hs-track' id='hsTrack'>
              {t.services.map((s, i) => (
                <Link className='svc' href={L(s.href)} key={s.n}>
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
                <span className='k'>{t.plansK}</span>
                <h2>{t.plansH}</h2>
                <p>{t.plansP}</p>
              </div>
              <Link className='btn btn-ghost' href={L('/hosting')}>{t.compare}</Link>
            </div>
            <PlanTabs lang={lang} />
          </div>
        </section>

        {/* Business policies */}
        <section className='sec tight gut' id='promises'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>{t.promK}</span>
                <h2>{t.promH}</h2>
                <p>{t.promP}</p>
              </div>
            </div>
            <div className='prom'>
              <article className='pr wide rv'>
                <span className='big' data-count='30'>30</span>
                <h3>{t.money.h}</h3>
                <p>{t.money.p}</p>
                <ul>{t.money.li.map((x) => <li key={x}>{x}</li>)}</ul>
                <Link href={L('/money-back')}>{t.money.a}</Link>
              </article>
              <article className='pr rv'>
                <span className='big' data-count='99.9' data-dec='1' data-suf='%'>99.9%</span>
                <h3>{t.uptime.h}</h3>
                <p>{t.uptime.p}</p>
                <Link href={L('/guarantees')}>{t.uptime.a}</Link>
              </article>
              <article className='pr rv'>
                <span className='big'>SSL</span>
                <h3>{t.ssl.h}</h3>
                <p>{t.ssl.p}</p>
                <Link href={L('/guarantees')}>{t.ssl.a}</Link>
              </article>
              <article className='pr rv'>
                <span className='big'>24/7</span>
                <h3>{t.support.h}</h3>
                <p>{t.support.p}</p>
                <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>{t.support.a}</a>
              </article>
              <article className='pr rv'>
                <span className='big'>৳ · $</span>
                <h3>{t.billing.h}</h3>
                <p>{t.billing.p}</p>
                <Link href={L('/terms-conditions')}>{t.billing.a}</Link>
              </article>
            </div>
          </div>
        </section>

        {/* How ordering works */}
        <section className='sec tight gut'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>{t.stepsK}</span>
                <h2>{t.stepsH}</h2>
              </div>
            </div>
            <div className='steps' id='steps'>
              <div className='rail'><i id='rail' /></div>
              {t.steps.map(([h, p], i) => (
                <div className='st rv' key={h}><span className='dot'>{i + 1}</span><h3>{h}</h3><p>{p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section className='sec tight gut' id='work'>
          <div className='in'>
            <div className='sec-head rv'>
              <div>
                <span className='k'>{t.workK}</span>
                <h2>{t.workH}</h2>
                <p>{t.workP}</p>
              </div>
              <Link className='btn btn-ghost' href={L('/work')}>{t.workAll}</Link>
            </div>
            <div className='work'>
              {t.workMeta.map((meta) => (
                <article className='case rv' key={meta}>
                  <div className='shot'>{t.shot}</div>
                  <div className='body'>
                    <span className='meta'>{meta}</span>
                    <h3>{t.soon}</h3>
                    <p>{t.soonP}</p>
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
                <span className='k'>{t.faqK}</span>
                <h2>{t.faqH}</h2>
              </div>
            </div>
            <div className='faq'>
              {t.faqs.map(([q, a]) => (
                <details className='rv' key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className='gut'>
          <div className='in cta'>
            <span className='k'>{t.ctaK}</span>
            <h2 className='rv'>{t.ctaH}</h2>
            <p className='rv'>{t.ctaP}</p>
            <div className='row rv'>
              <Link className='btn btn-pri' href={L('/hosting')}>{t.seePlans}</Link>
              <Link className='btn btn-ghost' href={L('/contact')}>{t.talk}</Link>
            </div>
          </div>
        </section>
    </>
  )
}
