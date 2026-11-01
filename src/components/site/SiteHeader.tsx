import '@/styles/site.css'
import SiteNav from './SiteNav'

/** The redesign navigation for pages that still use the old design, so every page shares the homepage header. */
export default function SiteHeader() {
  return (
    <div className='rh'>
      <SiteNav />
    </div>
  )
}
