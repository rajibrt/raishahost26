import Link from 'next/link'
import { footerColumns } from './links'

export default function SiteFooter() {
  return (
    <footer className='rh-footer gut'>
      <div className='in' style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className='grid'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='logo' src='/brand/raishahost-logo-on-dark.svg' alt='RaishaHost' width={170} height={22} />
            <p>Web hosting, VPS servers, domains and web design since 2008.</p>
            <p>
              <a href='tel:+8801878037803'>+880 1878-037803</a>
              <br />
              <a href='https://facebook.com/RaishaHost' target='_blank' rel='noopener noreferrer'>
                facebook.com/RaishaHost
              </a>
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} target='_blank' rel='noopener noreferrer'>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='legal'>
          <span>© {new Date().getFullYear()} RaishaHost. All rights reserved.</span>
          <span>Prices in BDT and USD. cPanel hosting billed yearly, VPS billed monthly.</span>
        </div>
      </div>
    </footer>
  )
}
