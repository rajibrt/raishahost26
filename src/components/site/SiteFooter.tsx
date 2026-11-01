import Link from 'next/link'
import { footerColumns } from './links'
import { localPath, ui, type Lang } from '@/i18n'

export default function SiteFooter({ lang = 'en' }: { lang?: Lang }) {
  const t = ui[lang]
  return (
    <footer className='rh-footer gut'>
      <div className='in' style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className='grid'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='logo' src='/brand/raishahost-logo-on-dark.svg' alt='RaishaHost' width={170} height={22} />
            <p>{t.footerTagline}</p>
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
              <h4>{lang === 'bn' ? col.bn : col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} target='_blank' rel='noopener noreferrer'>
                        {lang === 'bn' ? l.bn : l.label}
                      </a>
                    ) : (
                      <Link href={localPath(l.href, lang)}>{lang === 'bn' ? l.bn : l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='legal'>
          <span>© {new Date().getFullYear()} RaishaHost. {t.rights}</span>
          <span>{t.footerBilling}</span>
        </div>
      </div>
    </footer>
  )
}
