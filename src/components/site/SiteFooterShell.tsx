import '@/styles/site.css'
import SiteFooter from './SiteFooter'

/** The redesign footer for pages that still use the old design, so every page shares the homepage footer. */
export default function SiteFooterShell() {
  return (
    <div className='rh'>
      <SiteFooter />
    </div>
  )
}
