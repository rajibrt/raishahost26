'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CLIENT_AREA_URL, navItems } from './links'

export default function SiteNav() {
  const pathname = usePathname()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const current = (href: string) =>
    (href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 'page' : undefined

  return (
    <nav className={`rh-nav gut${solid ? ' solid' : ''}${open ? ' open' : ''}`} aria-label='Main'>
      <div className='in bar'>
        <Link href='/' aria-label='RaishaHost home'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className='logo' src='/brand/raishahost-logo-on-dark.svg' alt='RaishaHost' width={176} height={22} />
        </Link>
        <ul className='menu'>
          {navItems.map((item) =>
            item.children ? (
              <li key={item.label}>
                <button type='button' aria-haspopup='true'>
                  {item.label}
                </button>
                <ul className='drop'>
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} aria-current={current(c.href)}>
                        {c.label}
                        {c.note && <small>{c.note}</small>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                <Link href={item.href} aria-current={current(item.href)}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <span className='spacer' />
        <a className='btn btn-ghost hide-sm' href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>
          Client Area
        </a>
        <Link className='btn btn-pri' href='/hosting'>
          Get Started
        </Link>
        <button
          className='burger'
          type='button'
          aria-expanded={open}
          aria-controls='rh-sheet'
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>
      <div className='in sheet' id='rh-sheet' onClick={() => setOpen(false)}>
        {navItems.flatMap((item) => item.children ?? [item]).map((l) => (
          <Link key={l.href + l.label} href={l.href}>
            {l.label}
            {l.note && <small>{l.note}</small>}
          </Link>
        ))}
        <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>
          Client Area
        </a>
      </div>
    </nav>
  )
}
