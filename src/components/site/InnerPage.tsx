import '@/styles/site.css'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import PageMotion from './PageMotion'
import type { Lang } from '@/i18n'

/** Shell for redesigned inner pages: navigation, a page header, the footer and scroll motion. */
export default function InnerPage({
  kicker,
  title,
  lede,
  actions,
  headClass,
  lang = 'en',
  children,
}: {
  kicker: React.ReactNode
  title: React.ReactNode
  lede?: React.ReactNode
  /** Buttons or links shown under the header text. */
  actions?: React.ReactNode
  /** Extra class on the header, e.g. `bn` for Bangla text. */
  headClass?: string
  lang?: Lang
  children: React.ReactNode
}) {
  return (
    <div className='rh' lang={lang}>
      <SiteNav />
      <main className='page'>
        <header className={headClass ? `phead gut ${headClass}` : 'phead gut'}>
          <div className='in'>
            <span className='k'>{kicker}</span>
            <h1>{title}</h1>
            {lede && <p>{lede}</p>}
            {actions && <div className='row'>{actions}</div>}
          </div>
        </header>
        {children}
      </main>
      <SiteFooter lang={lang} />
      <PageMotion />
    </div>
  )
}
