'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { gsap } from 'gsap'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
        },
      ) => string
      remove: (widgetId: string) => void
      reset: (widgetId?: string) => void
    }
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

/** Contact form: Cloudflare Turnstile, a hidden honeypot field and a fill-time check, posted to /api/contact. */
export default function ContactForm() {
  const formStartedAt = useRef(Date.now())
  const turnstileBox = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const done = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [captchaReady, setCaptchaReady] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })

  useEffect(() => {
    if (!captchaReady || !turnstileSiteKey || !turnstileBox.current || !window.turnstile) return
    if (widgetId.current) {
      window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
    widgetId.current = window.turnstile.render(turnstileBox.current, {
      sitekey: turnstileSiteKey,
      theme: 'dark',
      callback: (token: string) => {
        setCaptchaToken(token)
        setError('')
      },
      'expired-callback': () => setCaptchaToken(''),
      'error-callback': () => {
        setCaptchaToken('')
        setError('The security check could not be completed. Please try again.')
      },
    })
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [captchaReady])

  // Thank-you message rises in after a successful send.
  useEffect(() => {
    if (submitted && done.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from(done.current.children, { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' })
    }
  }, [submitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileSiteKey) {
      setError('The form is not set up yet. Please call or email us instead.')
      return
    }
    if (!captchaToken) {
      setError('Please complete the security check first.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formStartedAt: formStartedAt.current, turnstileToken: captchaToken }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value })

  if (submitted) {
    return (
      <div ref={done} className='card' role='status'>
        <span className='k'>Message sent</span>
        <h3>Thank you. We will reply soon.</h3>
        <p>We usually answer within 2–4 hours during business hours. Check your email, including the spam folder.</p>
      </div>
    )
  }

  return (
    <form className='form card' onSubmit={handleSubmit}>
      {turnstileSiteKey && (
        <Script
          src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
          strategy='afterInteractive'
          onLoad={() => setCaptchaReady(true)}
        />
      )}
      <h3>Send us a message</h3>
      <div className='hp' aria-hidden='true'>
        <label htmlFor='company-website'>Website</label>
        <input id='company-website' type='text' tabIndex={-1} autoComplete='off' value={form.website} onChange={set('website')} />
      </div>
      <div className='two'>
        <div className='field'>
          <label htmlFor='cf-name'>Your name</label>
          <input id='cf-name' type='text' required autoComplete='name' value={form.name} onChange={set('name')} placeholder='Your full name' />
        </div>
        <div className='field'>
          <label htmlFor='cf-email'>Email</label>
          <input id='cf-email' type='email' required autoComplete='email' value={form.email} onChange={set('email')} placeholder='you@example.com' />
        </div>
      </div>
      <div className='field'>
        <label htmlFor='cf-subject'>Subject</label>
        <input id='cf-subject' type='text' required value={form.subject} onChange={set('subject')} placeholder='How can we help?' />
      </div>
      <div className='field'>
        <label htmlFor='cf-message'>Message</label>
        <textarea id='cf-message' required minLength={10} rows={6} value={form.message} onChange={set('message')} placeholder='Tell us about your project or question' />
      </div>
      <div ref={turnstileBox} style={{ minHeight: turnstileSiteKey ? 65 : 0 }} />
      {!turnstileSiteKey && <p className='fine'>The online form is not switched on here. Please call or email us.</p>}
      {error && <p className='err' role='alert'>{error}</p>}
      <button className='btn btn-pri' type='submit' disabled={loading || !captchaToken || !turnstileSiteKey}>
        {loading ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
