'use client'

import { useState } from 'react'
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
        <b>{showUsd ? usd(plan.price.usd!) : bdt(plan.price.bdt)}</b>
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

  const note = kind === 'shared' ? (currency === 'usd' ? t.usdNotSet : t.pricesYear) : t.pricesMonth

  return (
    <div>
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
        <div className='seg' role='group' aria-label={t.currency}>
          <button type='button' aria-pressed={currency === 'bdt'} onClick={() => setCurrency('bdt')}>
            ৳ BDT
          </button>
          <button type='button' aria-pressed={currency === 'usd'} onClick={() => setCurrency('usd')}>
            $ USD
          </button>
        </div>
      </div>
      <div className='plans'>
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} currency={currency} lang={lang} />
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
