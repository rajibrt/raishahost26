import type { Metadata } from 'next'
import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

// One 404 for both languages: English first, with the Bangla line and links beside it.
export default function NotFound() {
  return (
    <InnerPage
      kicker='404 · Page not found'
      title={<>This page has <em className='sky'>moved or never existed.</em></>}
      lede='The link may be old or mistyped. Try one of these instead.'
      actions={
        <>
          <Link className='btn btn-pri' href='/'>Go to the homepage</Link>
          <Link className='btn btn-ghost' href='/hosting'>See hosting plans</Link>
          <Link className='btn btn-ghost' href='/contact'>Contact us</Link>
        </>
      }
    >
      <section className='sec tight gut'>
        <div className='in'>
          <p className='note' lang='bn'>
            পেজটি খুঁজে পাওয়া যায়নি। <Link href='/bn' style={{ color: 'var(--rh-sky)' }}>বাংলা হোমপেজে যান →</Link>
          </p>
        </div>
      </section>
    </InnerPage>
  )
}
