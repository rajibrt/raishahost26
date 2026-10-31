'use client'

import { useState } from 'react'
import { DOMAIN_SEARCH_URL } from './links'

/** Sends the visitor to the WHMCS domain search with their query filled in. */
export default function DomainSearch({ className = '' }: { className?: string }) {
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
        Search for a domain
      </label>
      <input
        id='rh-domain'
        name='domain'
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='find your domain'
        autoComplete='off'
        spellCheck={false}
      />
      <button className='btn btn-pri' type='submit'>
        Search
      </button>
    </form>
  )
}
