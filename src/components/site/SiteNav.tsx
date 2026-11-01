'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Languages } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { CLIENT_AREA_URL, navItems, type NavItem } from './links'
import { basePath, langOf, localPath, ui, type Lang } from '@/i18n'

gsap.registerPlugin(useGSAP)

const PHONE = { label: '+880 1878-037803', href: 'tel:+8801878037803' }

export default function SiteNav() {
  const pathname = usePathname()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const drawer = useRef<HTMLDivElement>(null)
  const burger = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  // Desktop dropdowns: which one is open, their panels, and a short close delay so moving
  // the pointer from the button to the panel does not flicker it shut.
  const [menu, setMenu] = useState<string | null>(null)
  const drops = useRef<Record<string, HTMLUListElement | null>>({})
  const shown = useRef<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lang = langOf(pathname)
  const t = ui[lang]
  const L = (href: string) => localPath(href, lang)
  const lbl = (i: NavItem) => (lang === 'bn' ? i.bn : i.label)
  const note = (i: NavItem) => (lang === 'bn' ? i.noteBn : i.note)

  const close = useCallback(() => setOpen(false), [])
  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMenu(label)
  }
  const closeMenuSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenu(null), 140)
  }

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Drawer timeline: veil fades in, panel slides from the right, then the links rise in one by one.
  useGSAP(
    () => {
      const q = gsap.utils.selector(drawer)
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .set(drawer.current, { autoAlpha: 1 })
        .fromTo(q('.dr-veil'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' }, 0)
        .fromTo(q('.dr-panel'), { xPercent: 100 }, { xPercent: 0, duration: 0.65, ease: 'expo.out' }, 0)
        .fromTo(q('.dr-item'), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05 }, 0.16)
        .fromTo(q('.dr-foot > *'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06 }, 0.34)
    },
    { scope: drawer },
  )

  useEffect(() => {
    const t = tl.current
    if (!t) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.toggle('rh-lock', open)
    if (open) {
      t.timeScale(reduce ? 20 : 1).play()
      // Focus once the drawer is visible (GSAP shows it on its next tick).
      gsap.delayedCall(0.05, () => closeBtn.current?.focus({ preventScroll: true }))
    } else if (t.progress() > 0) {
      t.timeScale(reduce ? 20 : 1.8).reverse()
      burger.current?.focus({ preventScroll: true })
    }
  }, [open])

  // Sliding highlight inside a dropdown: one pill that glides to the hovered or focused link,
  // instead of each link switching its own background.
  const moveHighlight = (label: string, link: HTMLElement | null, instant = false) => {
    const hl = drops.current[label]?.querySelector<HTMLElement>('.hl')
    if (!hl) return
    if (!link) {
      gsap.to(hl, { autoAlpha: 0, duration: 0.2, ease: 'power1.out', overwrite: 'auto' })
      return
    }
    const li = link.parentElement as HTMLElement
    const to = { y: li.offsetTop, height: li.offsetHeight }
    const hidden = Number(gsap.getProperty(hl, 'opacity')) < 0.05
    if (instant || hidden) gsap.set(hl, to)
    gsap.to(hl, { ...(instant || hidden ? {} : to), autoAlpha: 1, duration: 0.35, ease: 'power3.out', overwrite: 'auto' })
  }
  const restHighlight = (label: string) =>
    moveHighlight(label, drops.current[label]?.querySelector<HTMLElement>("a[aria-current='page']") ?? null)

  // Dropdown motion: the panel eases down into place, then its links rise in one by one.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prev = shown.current ? drops.current[shown.current] : null
    const next = menu ? drops.current[menu] : null
    if (prev && prev !== next) {
      gsap.to(prev, { autoAlpha: 0, y: -4, scale: 0.98, duration: reduce ? 0 : 0.2, ease: 'power2.in', overwrite: 'auto' })
    }
    if (next && next !== prev && menu) {
      gsap.fromTo(
        next,
        { autoAlpha: 0, y: -8, scale: 0.98, transformOrigin: '50% 0%' },
        { autoAlpha: 1, y: 0, scale: 1, duration: reduce ? 0 : 0.38, ease: 'power2.out', overwrite: 'auto' },
      )
      gsap.fromTo(
        next.querySelectorAll('li:not(.hl)'),
        { y: 6, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: reduce ? 0 : 0.32, stagger: reduce ? 0 : 0.035, delay: reduce ? 0 : 0.05, ease: 'power2.out', overwrite: 'auto' },
      )
      const here = next.querySelector<HTMLElement>("a[aria-current='page']")
      moveHighlight(menu, here, true)
      if (!here) gsap.set(next.querySelector('.hl'), { autoAlpha: 0 })
    }
    shown.current = menu
  }, [menu])

  // Close the open dropdown on Escape or a click elsewhere (links close it on click).
  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      document.querySelector<HTMLButtonElement>('.rh-nav .menu > li.open > button')?.focus()
      setMenu(null)
    }
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.('.rh-nav .menu')) setMenu(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [menu])

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  // Close on Escape, and when the screen grows past the phone/tablet layout.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const wide = window.matchMedia(lang === 'bn' ? '(min-width: 1301px)' : '(min-width: 1121px)')
    const onWide = () => wide.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open, lang])

  useEffect(() => () => document.documentElement.classList.remove('rh-lock'), [])

  const here = basePath(pathname)
  const current = (href: string) => ((href === '/' ? here === '/' : here.startsWith(href)) ? 'page' : undefined)

  // Language button, as in the London Park app: a translate icon and the name of the other
  // language. It opens this page in that language and remembers the choice for a year.
  const other: Lang = lang === 'bn' ? 'en' : 'bn'
  const langSwitch = (
    <Link
      className='lang-btn'
      href={localPath(here, other)}
      hrefLang={other}
      lang={other}
      aria-label={other === 'en' ? 'Switch to English' : 'বাংলায় দেখুন'}
      onClick={() => {
        document.cookie = `rh-lang=${other}; path=/; max-age=31536000; samesite=lax`
        close()
      }}
    >
      <Languages aria-hidden='true' />
      {other === 'en' ? 'English' : 'বাংলা'}
    </Link>
  )

  return (
    <>
      <nav className={`rh-nav gut${solid ? ' solid' : ''}`} aria-label={t.mainNav}>
        <div className='in bar'>
          <Link href={L('/')} aria-label={t.home}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='logo' src='/brand/raishahost-logo-on-dark.svg' alt='RaishaHost' width={176} height={22} />
          </Link>
          <ul className='menu'>
            {navItems.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className={menu === item.label ? 'open' : undefined}
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={closeMenuSoon}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setMenu(null)}
                >
                  <button
                    type='button'
                    aria-haspopup='true'
                    aria-expanded={menu === item.label}
                    onClick={() => setMenu((m) => (m === item.label ? null : item.label))}
                  >
                    {lbl(item)}
                    <i className='caret' aria-hidden='true' />
                  </button>
                  <ul className='drop' ref={(el) => { drops.current[item.label] = el }} onMouseLeave={() => restHighlight(item.label)}>
                    <li className='hl' aria-hidden='true' />
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={L(c.href)}
                          aria-current={current(c.href)}
                          onClick={() => setMenu(null)}
                          onMouseEnter={(e) => moveHighlight(item.label, e.currentTarget)}
                          onFocus={(e) => moveHighlight(item.label, e.currentTarget)}
                        >
                          {lbl(c)}
                          {note(c) && <small>{note(c)}</small>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <Link href={L(item.href)} aria-current={current(item.href)}>
                    {lbl(item)}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <span className='spacer' />
          <div className='hide-sm'>{langSwitch}</div>
          <a className='btn btn-ghost hide-sm' href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>
            {t.clientArea}
          </a>
          <Link className='btn btn-pri' href={L('/hosting')}>
            {t.getStarted}
          </Link>
          <button
            ref={burger}
            className='burger'
            type='button'
            aria-expanded={open}
            aria-controls='rh-drawer'
            onClick={() => setOpen(true)}
          >
            <span className='bars' aria-hidden='true'><i /><i /></span>
            {t.menu}
          </button>
        </div>
      </nav>

      <div
        ref={drawer}
        className='rh-drawer'
        id='rh-drawer'
        role='dialog'
        aria-modal='true'
        aria-label={t.siteMenu}
        aria-hidden={!open}
        data-lenis-prevent
      >
        <div className='dr-veil' onClick={close} />
        <div className='dr-panel'>
          <div className='dr-head'>
            <Link href={L('/')} aria-label={t.home} onClick={close}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src='/brand/raishahost-logo-on-dark.svg' alt='RaishaHost' width={150} height={19} />
            </Link>
            <button ref={closeBtn} className='dr-close' type='button' aria-label={t.closeMenu} onClick={close}>
              <span /><span />
            </button>
          </div>
          <div className='dr-lang dr-item'>{langSwitch}</div>

          <nav className='dr-body' aria-label={t.mobileNav}>
            {navItems.map((item, i) => {
              const n = String(i + 1).padStart(2, '0')
              return item.children ? (
                <div key={item.label} className='dr-group dr-item'>
                  <span className='dr-k'><b>{n}</b>{lbl(item)}</span>
                  {item.children.map((c) => (
                    <Link key={c.href} className='dr-sub' href={L(c.href)} aria-current={current(c.href)} onClick={close}>
                      {lbl(c)}
                      {note(c) && <small>{note(c)}</small>}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.label} className='dr-link dr-item' href={L(item.href)} aria-current={current(item.href)} onClick={close}>
                  <b>{n}</b>
                  {lbl(item)}
                </Link>
              )
            })}
          </nav>

          <div className='dr-foot'>
            <Link className='btn btn-pri' href={L('/hosting')} onClick={close}>
              {t.getStarted}
            </Link>
            <a className='btn btn-ghost' href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>
              {t.clientArea}
            </a>
            <a className='dr-tel' href={PHONE.href}>
              {t.callLine} <b>{PHONE.label}</b>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
