'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  sharedHostingPlans,
  sharedCommonFeatures,
  vpsPlans,
  vpsCommonFeatures,
  type Plan,
} from '@/data/plans'
import { bdt, usd, planWord, ui, type Lang } from '@/i18n'

type Kind = 'shared' | 'vps'
type Currency = 'bdt' | 'usd'


function tilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
}

/**
 * A price that counts to its new value when it changes (currency switch, cPanel/VPS switch).
 * Short and light: one GSAP tween on a number, text updated in place. Respects reduced motion.
 */
function CountPrice({ value, format, unit }: { value: number; format: (n: number) => string; unit: string }) {
  const el = useRef<HTMLElement>(null)
  const last = useRef<{ value: number; unit: string } | null>(null)
  useLayoutEffect(() => {
    const node = el.current
    const prev = last.current
    last.current = { value, unit }
    if (!node) return
    // The text is written directly (React's own text node is replaced once a count has run),
    // so every path sets the final value itself.
    if (!prev || prev.value === value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = format(value)
      return
    }
    // Same currency: count from the old number. New currency: count up from about half.
    const o = { v: prev.unit === unit ? prev.value : value * 0.5 }
    node.textContent = format(o.v)
    const tl = gsap.timeline()
    tl.to(o, { v: value, duration: 0.6, ease: 'power3.out', onUpdate: () => { node.textContent = format(o.v) } }, 0)
    tl.fromTo(node, { y: 10, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' }, 0)
    // Backstop: if the browser is not drawing frames (background tab, screenshot tools), never
    // leave a half-counted price on screen.
    const done = window.setTimeout(() => tl.progress(1), 900)
    return () => {
      window.clearTimeout(done)
      tl.kill()
      node.textContent = format(value)
    }
  }, [value, unit, format])
  return <b ref={el}>{format(value)}</b>
}

const fmtBdt = (n: number) => bdt(Math.round(n))
const fmtUsd = (n: number) => usd(n)

function PlanCard({ plan, currency, lang }: { plan: Plan; currency: Currency; lang: Lang }) {
  const t = ui[lang]
  const showUsd = currency === 'usd' && plan.price.usd != null
  const per = plan.period === 'yearly' ? t.perYear : t.perMonth
  const tagline = lang === 'bn' ? plan.taglineBn ?? plan.tagline : plan.tagline
  const rows = plan.specs.slice(0, plan.period === 'yearly' ? 6 : 3)
  return (
    <article
      className={`plan${plan.featured ? ' pop' : ''}`}
      onMouseMove={tilt}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
    >
      <div className='top'>
        <h3>{plan.name}</h3>
        {plan.featured && <span className='pill'>{t.recommended}</span>}
      </div>
      <div className='price'>
        <CountPrice
          value={showUsd ? plan.price.usd! : plan.price.bdt}
          format={showUsd ? fmtUsd : fmtBdt}
          unit={showUsd ? 'usd' : 'bdt'}
        />
        <span>{per}</span>
        {!showUsd && plan.price.bdtOriginal && <s>{bdt(plan.price.bdtOriginal)}</s>}
      </div>
      {tagline && <p className='tag'>{tagline}</p>}
      <ul className='specs'>
        {rows.map((s) => (
          <li key={s.label}>
            <span>{planWord(s.label, lang)}</span>
            <b>{planWord(s.value, lang)}</b>
          </li>
        ))}
        {plan.period === 'monthly' && (
          <li>
            <span>{t.bandwidth}</span>
            <b>20 TB</b>
          </li>
        )}
      </ul>
      <a
        className={`btn ${plan.featured ? 'btn-pri' : 'btn-ghost'}`}
        href={plan.orderUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        {t.order} · {plan.name}
      </a>
    </article>
  )
}

export default function PlanTabs({
  initial = 'shared',
  lockKind = false,
  lang = 'en',
}: {
  initial?: Kind
  lockKind?: boolean
  lang?: Lang
}) {
  const t = ui[lang]
  const [kind, setKind] = useState<Kind>(initial)
  const [currency, setCurrency] = useState<Currency>('bdt')
  const plans = kind === 'shared' ? sharedHostingPlans : vpsPlans
  const features = kind === 'shared' ? sharedCommonFeatures : vpsCommonFeatures

  // Switching cPanel/VPS: the cards rise in one after another while their prices count.
  const cards = useRef<HTMLDivElement>(null)
  const firstKind = useRef(true)
  useLayoutEffect(() => {
    if (firstKind.current) {
      firstKind.current = false
      return
    }
    const el = cards.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tw = gsap.fromTo(
      el.children,
      { y: 18, opacity: 0.4 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity' },
    )
    return () => {
      tw.progress(1).kill()
    }
  }, [kind])

  // Only offer USD where every plan has a USD price (cPanel has none yet; prices live in plans.ts).
  const hasUsd = plans.every((p) => p.price.usd != null)
  const shown: Currency = hasUsd ? currency : 'bdt'
  const note = kind === 'shared' ? (hasUsd ? t.pricesYear : t.usdNotSet) : t.pricesMonth

  return (
    <div>
      {(!lockKind || hasUsd) && (
        <div className='controls' style={{ marginBottom: 24 }}>
          {!lockKind && (
            <div className='seg' role='group' aria-label={t.planType}>
              <button type='button' aria-pressed={kind === 'shared'} onClick={() => setKind('shared')}>
                {t.cpanel}
              </button>
              <button type='button' aria-pressed={kind === 'vps'} onClick={() => setKind('vps')}>
                {t.vps}
              </button>
            </div>
          )}
          {hasUsd && (
            <div className='seg' role='group' aria-label={t.currency}>
              <button type='button' aria-pressed={currency === 'bdt'} onClick={() => setCurrency('bdt')}>
                ৳ BDT
              </button>
              <button type='button' aria-pressed={currency === 'usd'} onClick={() => setCurrency('usd')}>
                $ USD
              </button>
            </div>
          )}
        </div>
      )}
      <div className='plans' ref={cards}>
        {/* Keyed by position, so switching cPanel/VPS updates the same cards and the prices count. */}
        {plans.map((p, i) => (
          <PlanCard key={i} plan={p} currency={shown} lang={lang} />
        ))}
      </div>
      <div className='incl'>
        {features.map((f) => (
          <span key={f}>{planWord(f, lang)}</span>
        ))}
      </div>
      <p className='fine'>{note}</p>
    </div>
  )
}
