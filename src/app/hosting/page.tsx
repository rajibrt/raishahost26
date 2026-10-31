import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PlanTabs from '@/components/site/PlanTabs'
import { sharedHostingPlans } from '@/data/plans'

export const metadata: Metadata = {
  title: 'cPanel Hosting',
  description: 'cPanel web hosting with free SSL, email accounts and SSD storage. Billed yearly. 30-day money-back guarantee.',
  alternates: { canonical: 'https://raishahost.com/hosting' },
}

export default function HostingPage() {
  const labels = sharedHostingPlans[0].specs.map((s) => s.label)
  return (
    <InnerPage
      kicker='cPanel hosting · billed yearly'
      title={<>Hosting that just <em className='sky'>works.</em></>}
      lede='Everything a business website needs: cPanel, email accounts, free SSL and SSD storage. Pay once a year.'
    >
      <section className='sec tight gut'>
        <div className='in'>
          <PlanTabs initial='shared' lockKind />
        </div>
      </section>

      <section className='sec tight gut'>
        <div className='in'>
          <div className='sec-head'>
            <div>
              <span className='k'>Compare</span>
              <h2>Every plan, side by side.</h2>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560, fontSize: 15 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--rh-muted)' }}>Feature</th>
                  {sharedHostingPlans.map((p) => (
                    <th key={p.id} style={{ textAlign: 'left', padding: '12px 8px' }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {labels.map((label) => (
                  <tr key={label} style={{ borderTop: '1px solid var(--rh-line)' }}>
                    <td style={{ padding: '12px 8px', color: 'var(--rh-muted)' }}>{label}</td>
                    {sharedHostingPlans.map((p) => (
                      <td key={p.id} style={{ padding: '12px 8px', fontFamily: 'var(--rh-mono)' }}>
                        {p.specs.find((s) => s.label === label)?.value ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ borderTop: '1px solid var(--rh-line)' }}>
                  <td style={{ padding: '12px 8px', color: 'var(--rh-muted)' }}>Price per year</td>
                  {sharedHostingPlans.map((p) => (
                    <td key={p.id} style={{ padding: '12px 8px', fontWeight: 800 }}>৳{p.price.bdt.toLocaleString('en-US')}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className='fine' style={{ marginTop: 18 }}>
            Outgrowing shared hosting? <Link href='/vps' style={{ color: 'var(--rh-sky)' }}>See VPS servers →</Link>
          </p>
        </div>
      </section>
    </InnerPage>
  )
}
