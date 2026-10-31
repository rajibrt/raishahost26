import type { Metadata } from 'next'
import InnerPage from '@/components/site/InnerPage'
import PlanTabs from '@/components/site/PlanTabs'

export const metadata: Metadata = {
  title: 'VPS Servers',
  description: 'VPS servers with full root access, NVMe SSD storage, 20 TB bandwidth and DDoS protection. Billed monthly in BDT or USD.',
  alternates: { canonical: 'https://raishahost.com/vps' },
}

const points = [
  { t: 'Full root access', d: 'Install anything. Choose Ubuntu, Debian or AlmaLinux.' },
  { t: 'NVMe SSD storage', d: 'Fast disks for databases, stores and business apps.' },
  { t: '20 TB bandwidth', d: 'Included every month with every VPS.' },
  { t: 'Dedicated IPv4 + IPv6', d: 'Your own address, ready for email and SSL.' },
  { t: 'DDoS protection', d: 'Attack traffic is filtered before it reaches your server.' },
  { t: '99.9% uptime', d: 'Our target for every server.' },
]

export default function VpsPage() {
  return (
    <InnerPage
      kicker='VPS servers · billed monthly'
      title={<>Your own server. <em className='sky'>Your rules.</em></>}
      lede='Root access, NVMe storage and room to grow. Pay monthly in taka or dollars.'
    >
      <section className='sec tight gut'>
        <div className='in'>
          <PlanTabs initial='vps' lockKind />
        </div>
      </section>
      <section className='sec tight gut'>
        <div className='in'>
          <div className='sec-head'>
            <div>
              <span className='k'>Included</span>
              <h2>Every VPS comes with.</h2>
            </div>
          </div>
          <div className='prom'>
            {points.map((p) => (
              <article className='pr' key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
