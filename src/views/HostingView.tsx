import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PlanTabs from '@/components/site/PlanTabs'
import { sharedHostingPlans } from '@/data/plans'
import { bdt, localPath, pageMeta, planWord, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'cPanel Hosting',
    description: 'cPanel web hosting with free SSL, email accounts and SSD storage. Billed yearly. 30-day money-back guarantee.',
    kicker: 'cPanel hosting · billed yearly',
    h1: <>Hosting that just <em className='sky'>works.</em></>,
    lede: 'Everything a business website needs: cPanel, email accounts, free SSL and SSD storage. Pay once a year.',
    compareK: 'Compare',
    compareH: 'Every plan, side by side.',
    feature: 'Feature',
    perYear: 'Price per year',
    outgrow: 'Outgrowing shared hosting?',
    seeVps: 'See VPS servers →',
  },
  bn: {
    title: 'cPanel হোস্টিং',
    description: 'ফ্রি SSL, ইমেইল অ্যাকাউন্ট ও SSD স্টোরেজসহ cPanel ওয়েব হোস্টিং। বছরে একবার বিল। ৩০ দিনের মানি-ব্যাক গ্যারান্টি।',
    kicker: 'cPanel হোস্টিং · বছরে বিল',
    h1: <>যে হোস্টিং <em className='sky'>ঝামেলা ছাড়াই চলে।</em></>,
    lede: 'একটি ব্যবসায়িক ওয়েবসাইটের যা দরকার সবই: cPanel, ইমেইল অ্যাকাউন্ট, ফ্রি SSL ও SSD স্টোরেজ। বছরে একবার পেমেন্ট।',
    compareK: 'তুলনা',
    compareH: 'সব প্ল্যান পাশাপাশি।',
    feature: 'সুবিধা',
    perYear: 'বছরে দাম',
    outgrow: 'শেয়ার্ড হোস্টিংয়ে আর কুলাচ্ছে না?',
    seeVps: 'VPS সার্ভার দেখুন →',
  },
}

export const hostingMetadata = (lang: Lang) => pageMeta('/hosting', lang, t[lang])

export default function HostingView({ lang }: { lang: Lang }) {
  const c = t[lang]
  const labels = sharedHostingPlans[0].specs.map((s) => s.label)
  const cell = { padding: '12px 8px' }
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in'>
          <PlanTabs initial='shared' lockKind lang={lang} />
        </div>
      </section>

      <section className='sec tight gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.compareK}</span>
              <h2>{c.compareH}</h2>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }} className='rv'>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560, fontSize: 15 }}>
              <thead>
                <tr>
                  <th style={{ ...cell, textAlign: 'left', color: 'var(--rh-muted)' }}>{c.feature}</th>
                  {sharedHostingPlans.map((p) => (
                    <th key={p.id} style={{ ...cell, textAlign: 'left' }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {labels.map((label) => (
                  <tr key={label} style={{ borderTop: '1px solid var(--rh-line)' }}>
                    <td style={{ ...cell, color: 'var(--rh-muted)' }}>{planWord(label, lang)}</td>
                    {sharedHostingPlans.map((p) => (
                      <td key={p.id} style={{ ...cell, fontFamily: 'var(--rh-mono)' }}>
                        {planWord(p.specs.find((s) => s.label === label)?.value ?? '—', lang)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ borderTop: '1px solid var(--rh-line)' }}>
                  <td style={{ ...cell, color: 'var(--rh-muted)' }}>{c.perYear}</td>
                  {sharedHostingPlans.map((p) => (
                    <td key={p.id} style={{ ...cell, fontWeight: 800 }}>{bdt(p.price.bdt)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className='fine' style={{ marginTop: 18 }}>
            {c.outgrow} <Link href={localPath('/vps', lang)} style={{ color: 'var(--rh-sky)' }}>{c.seeVps}</Link>
          </p>
        </div>
      </section>
    </InnerPage>
  )
}
