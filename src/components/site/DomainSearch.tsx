'use client'

import { useState } from 'react'
import { DOMAIN_SEARCH_URL } from './links'
import { ui, type Lang } from '@/i18n'

/** Sends the visitor to the WHMCS domain search with their query filled in. */
export default function DomainSearch({ className = '', lang = 'en' }: { className?: string; lang?: Lang }) {
  const t = ui[lang]
  const [q, setQ] = useState('')
  return (
    <form
      className={`search ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        const query = q.trim().toLowerCase().replace(/[^a-z0-9.-]/g, '')
        window.location.href = DOMAIN_SEARCH_URL + (query ? '&query=' + encodeURIComponent(query) : '')
      }}
    >
      <label htmlFor='rh-domain' className='sr'>
        {t.searchDomain}
      </label>
      <input
        id='rh-domain'
        name='domain'
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.findDomain}
        autoComplete='off'
        spellCheck={false}
      />
      <button className='btn btn-pri' type='submit'>
        {t.search}
      </button>
    </form>
  )
}
