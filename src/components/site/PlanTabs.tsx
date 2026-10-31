'use client'

import { useState } from 'react'
import {
  sharedHostingPlans,
  sharedCommonFeatures,
  vpsPlans,
  vpsCommonFeatures,
  type Plan,
} from '@/data/plans'

type Kind = 'shared' | 'vps'
type Currency = 'bdt' | 'usd'

const bdt = (n: number) => '৳' + n.toLocaleString('en-US')
const usd = (n: number) => '$' + n.toFixed(2)

function tilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
}

function PlanCard({ plan, currency }: { plan: Plan; currency: Currency }) {
  const showUsd = currency === 'usd' && plan.price.usd != null
  const per = plan.period === 'yearly' ? '/year' : '/month'
  const rows = plan.specs.slice(0, plan.period === 'yearly' ? 6 : 3)
  return (
    <article
      className={`plan${plan.featured ? ' pop' : ''}`}
      onMouseMove={tilt}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
    >
      <div className='top'>
        <h3>{plan.name}</h3>
        {plan.featured && <span className='pill'>Most popular</span>}
      </div>
      <div className='price'>
        <b>{showUsd ? usd(plan.price.usd!) : bdt(plan.price.bdt)}</b>
        <span>{per}</span>
        {!showUsd && plan.price.bdtOriginal && <s>{bdt(plan.price.bdtOriginal)}</s>}
      </div>
      {plan.tagline && <p className='tag'>{plan.tagline}</p>}
      <ul className='specs'>
        {rows.map((s) => (
          <li key={s.label}>
            <span>{s.label}</span>
            <b>{s.value}</b>
          </li>
        ))}
        {plan.period === 'monthly' && (
          <li>
            <span>Bandwidth</span>
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
        Order {plan.name}
      </a>
    </article>
  )
}

export default function PlanTabs({
  initial = 'shared',
  lockKind = false,
}: {
  initial?: Kind
  lockKind?: boolean
}) {
  const [kind, setKind] = useState<Kind>(initial)
  const [currency, setCurrency] = useState<Currency>('bdt')
  const plans = kind === 'shared' ? sharedHostingPlans : vpsPlans
  const features = kind === 'shared' ? sharedCommonFeatures : vpsCommonFeatures

  const note =
    kind === 'shared'
      ? currency === 'usd'
        ? 'cPanel hosting is priced in taka. USD prices for these plans are not set yet.'
        : 'Prices per year.'
      : 'Prices per month.'

  return (
    <div>
      <div className='controls' style={{ marginBottom: 24 }}>
        {!lockKind && (
          <div className='seg' role='group' aria-label='Plan type'>
            <button type='button' aria-pressed={kind === 'shared'} onClick={() => setKind('shared')}>
              cPanel Hosting
            </button>
            <button type='button' aria-pressed={kind === 'vps'} onClick={() => setKind('vps')}>
              VPS
            </button>
          </div>
        )}
        <div className='seg' role='group' aria-label='Currency'>
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
          <PlanCard key={p.id} plan={p} currency={currency} />
        ))}
      </div>
      <div className='incl'>
        {features.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      <p className='fine'>{note}</p>
    </div>
  )
}
