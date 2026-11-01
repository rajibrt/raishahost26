'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/providers/LenisProvider'
import { hostOf, work, workCategories, type WorkCategory, type WorkItem } from '@/data/work'
import type { Lang } from '@/i18n'

const text = {
  en: { visit: 'Visit site', launching: 'New site launching', all: 'All', filter: 'Filter by industry' },
  bn: { visit: 'সাইট দেখুন', launching: 'নতুন সাইট আসছে', all: 'সব', filter: 'খাত অনুযায়ী দেখুন' },
}

/**
 * A screenshot inside a browser frame. With `scroll`, the full-page shot glides down on hover.
 * If a screenshot is missing (a site that blocks the capture), a branded card with the name shows instead.
 */
export function BrowserShot({ item, scroll = false, eager = false }: { item: WorkItem; scroll?: boolean; eager?: boolean }) {
  const [missing, setMissing] = useState(false)
  const img = useRef<HTMLImageElement>(null)
  // An image that failed before React hydrated never fires onError, so check once on mount too.
  useEffect(() => {
    const el = img.current
    if (!el || !el.complete || el.naturalWidth > 0) return
    const raf = requestAnimationFrame(() => setMissing(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  const canScroll = scroll && !missing
  // The long screenshot is only needed on hover, so fetch it after the page has finished loading
  // instead of competing with the page's own files on a slow connection.
  const [bgReady, setBgReady] = useState(false)
  useEffect(() => {
    if (!scroll) return
    let id = 0
    const go = () => {
      id = window.setTimeout(() => setBgReady(true), 1500)
    }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      window.removeEventListener('load', go)
      clearTimeout(id)
    }
  }, [scroll])
  return (
    <div className={canScroll ? 'bshot scroll' : 'bshot'}>
      <div className='bar' aria-hidden='true'>
        <i /><i /><i />
        <span>{hostOf(item)}</span>
      </div>
      <div className='view' style={canScroll && bgReady ? { backgroundImage: `url(/work/${item.slug}-full.webp)` } : undefined}>
        {missing ? (
          <div className='ph'>
            <b>{item.name}</b>
            <span>{hostOf(item)}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={img}
            src={`/work/${item.slug}.webp`}
            alt={`${item.name} website`}
            width={1200}
            height={750}
            loading={eager ? 'eager' : 'lazy'}
            onError={() => setMissing(true)}
          />
        )}
      </div>
    </div>
  )
}

function Card({ item, lang, big = false }: { item: WorkItem; lang: Lang; big?: boolean }) {
  const t = text[lang]
  return (
    <a className={big ? 'proj big' : 'proj'} href={item.url} target='_blank' rel='noopener noreferrer'>
      <BrowserShot item={item} scroll={big} />
      <div className='info'>
        <span className='meta'>
          {workCategories[item.category][lang]}
          {item.launching && <b>{t.launching}</b>}
        </span>
        <h3>{item.name}</h3>
        <p>{lang === 'bn' ? item.bn : item.en}</p>
        <span className='go'>{t.visit} ↗</span>
      </div>
    </a>
  )
}

/** Featured projects, large, with hover-to-scroll screenshots. */
export function FeaturedWork({ lang, limit, compact = false }: { lang: Lang; limit?: number; compact?: boolean }) {
  const items = work.filter((w) => w.featured).slice(0, limit)
  return (
    <div className={compact ? 'projs feat three' : 'projs feat'} data-stagger>
      {items.map((w) => <Card key={w.slug} item={w} lang={lang} big />)}
    </div>
  )
}

/** Every project (featured ones too), filterable by industry; each filter shows its count. */
export function WorkGallery({ lang }: { lang: Lang }) {
  const t = text[lang]
  const [cat, setCat] = useState<WorkCategory | 'all'>('all')
  const grid = useRef<HTMLDivElement>(null)
  const box = useRef<HTMLDivElement>(null)
  // Industries in the order of workCategories, only those with at least one project.
  const cats = (Object.keys(workCategories) as WorkCategory[]).filter((c) => work.some((w) => w.category === c))
  const count = (c: WorkCategory | 'all') => (c === 'all' ? work.length : work.filter((w) => w.category === c).length)
  const shown = cat === 'all' ? work : work.filter((w) => w.category === cat)

  // A shorter list can end above the screen: if the visitor has scrolled into the gallery, bring
  // its top back under the navigation so the new cards are in view.
  const pick = (c: WorkCategory | 'all') => {
    setCat(c)
    const el = box.current
    if (!el || el.getBoundingClientRect().top > 0) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -110, immediate: reduce, duration: 0.9 })
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: reduce ? 'auto' : 'smooth' })
  }

  // Cards rise in again whenever the filter changes; the page height changed, so re-measure triggers.
  useEffect(() => {
    ScrollTrigger.refresh()
    if (!grid.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(grid.current.children, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' })
  }, [cat])

  return (
    <div className='gallery' ref={box}>
      <div className='filters' role='group' aria-label={t.filter}>
        {(['all', ...cats] as const).map((c) => (
          <button key={c} type='button' aria-pressed={cat === c} onClick={() => pick(c)}>
            <span>{c === 'all' ? t.all : workCategories[c][lang]}</span>
            <small>{count(c).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}</small>
          </button>
        ))}
      </div>
      <div className='projs' ref={grid}>
        {shown.map((w) => <Card key={w.slug} item={w} lang={lang} />)}
      </div>
    </div>
  )
}
