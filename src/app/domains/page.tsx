import type { Metadata } from 'next'
import InnerPage from '@/components/site/InnerPage'
import DomainSearch from '@/components/site/DomainSearch'

export const metadata: Metadata = {
  title: 'Domains',
  description: 'Register .com, .com.bd, .net, .org and more, and connect your domain to RaishaHost hosting in one step.',
  alternates: { canonical: 'https://raishahost.com/domains' },
}

export default function DomainsPage() {
  return (
    <InnerPage
      kicker='Domains'
      title={<>Find your <em className='sky'>name.</em></>}
      lede='Search for a domain and register it with your hosting in one checkout.'
    >
      <section className='sec tight gut'>
        <div className='in'>
          <DomainSearch />
          <div className='tlds'>
            <span><b>.com</b></span>
            <span><b>.com.bd</b></span>
            <span><b>.net</b></span>
            <span><b>.org</b></span>
            <span><b>.xyz</b></span>
          </div>
          <p className='fine' style={{ marginTop: 24 }}>
            Domain registration and renewal fees are not covered by the 30-day money-back guarantee.
          </p>
        </div>
      </section>
    </InnerPage>
  )
}
