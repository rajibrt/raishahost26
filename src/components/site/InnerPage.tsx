import '@/styles/site.css'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/** Shell for redesigned inner pages: navigation, a page header and the footer. */
export default function InnerPage({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string
  title: React.ReactNode
  lede?: string
  children: React.ReactNode
}) {
  return (
    <div className='rh'>
      <SiteNav />
      <main className='page'>
        <header className='phead gut'>
          <div className='in'>
            <span className='k'>{kicker}</span>
            <h1>{title}</h1>
            {lede && <p>{lede}</p>}
          </div>
        </header>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
