'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { gsap } from 'gsap'
import type { Lang } from '@/i18n'

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

const text = {
  en: {
    checkFailed: 'The security check could not be completed. Please try again.',
    notSetUp: 'The form is not set up yet. Please call or email us instead.',
    doCheck: 'Please complete the security check first.',
    wrong: 'Something went wrong.',
    sentK: 'Message sent',
    sentH: 'Thank you. We will reply soon.',
    sentP: 'We usually answer within 2–4 hours during business hours. Check your email, including the spam folder.',
    title: 'Send us a message',
    name: 'Your name',
    namePh: 'Your full name',
    email: 'Email',
    subject: 'Subject',
    subjectPh: 'How can we help?',
    message: 'Message',
    messagePh: 'Tell us about your project or question',
    off: 'The online form is not switched on here. Please call or email us.',
    sending: 'Sending…',
    send: 'Send message',
  },
  bn: {
    checkFailed: 'নিরাপত্তা যাচাই শেষ করা যায়নি। আবার চেষ্টা করুন।',
    notSetUp: 'ফর্মটি এখনো চালু হয়নি। অনুগ্রহ করে কল বা ইমেইল করুন।',
    doCheck: 'আগে নিরাপত্তা যাচাইটি সম্পন্ন করুন।',
    wrong: 'কিছু একটা সমস্যা হয়েছে।',
    sentK: 'মেসেজ পাঠানো হয়েছে',
    sentH: 'ধন্যবাদ। আমরা শিগগির উত্তর দেব।',
    sentP: 'অফিস সময়ে আমরা সাধারণত ২–৪ ঘণ্টার মধ্যে উত্তর দিই। আপনার ইমেইল দেখুন, স্প্যাম ফোল্ডারসহ।',
    title: 'আমাদের মেসেজ পাঠান',
    name: 'আপনার নাম',
    namePh: 'আপনার পুরো নাম',
    email: 'ইমেইল',
    subject: 'বিষয়',
    subjectPh: 'কীভাবে সাহায্য করতে পারি?',
    message: 'মেসেজ',
    messagePh: 'আপনার প্রজেক্ট বা প্রশ্নের কথা লিখুন',
    off: 'এখানে অনলাইন ফর্মটি চালু নেই। অনুগ্রহ করে কল বা ইমেইল করুন।',
    sending: 'পাঠানো হচ্ছে…',
    send: 'মেসেজ পাঠান',
  },
}

/** Contact form: Cloudflare Turnstile, a hidden honeypot field and a fill-time check, posted to /api/contact. */
export default function ContactForm({ lang = 'en' }: { lang?: Lang }) {
  const t = text[lang]
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
        setError(t.checkFailed)
      },
    })
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [captchaReady, t.checkFailed])

  // Thank-you message rises in after a successful send.
  useEffect(() => {
    if (submitted && done.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from(done.current.children, { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' })
    }
  }, [submitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileSiteKey) {
      setError(t.notSetUp)
      return
    }
    if (!captchaToken) {
      setError(t.doCheck)
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
      if (!res.ok) throw new Error(data.error || t.wrong)
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.wrong)
    } finally {
      setLoading(false)
    }
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value })

  if (submitted) {
    return (
      <div ref={done} className='card' role='status'>
        <span className='k'>{t.sentK}</span>
        <h3>{t.sentH}</h3>
        <p>{t.sentP}</p>
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
      <h3>{t.title}</h3>
      {/* Spam trap. Neutral id and label on purpose: a field called "Website" was filled by browser
          autofill, and real messages were rejected as spam ("Failed validation."). */}
      <div className='hp' aria-hidden='true'>
        <label htmlFor='cf-hp-x9'>Leave this empty</label>
        <input id='cf-hp-x9' name='cf-hp-x9' type='text' tabIndex={-1} autoComplete='off' data-lpignore='true' data-1p-ignore='true' value={form.website} onChange={set('website')} />
      </div>
      <div className='two'>
        <div className='field'>
          <label htmlFor='cf-name'>{t.name}</label>
          <input id='cf-name' type='text' required autoComplete='name' value={form.name} onChange={set('name')} placeholder={t.namePh} />
        </div>
        <div className='field'>
          <label htmlFor='cf-email'>{t.email}</label>
          <input id='cf-email' type='email' required autoComplete='email' value={form.email} onChange={set('email')} placeholder='you@example.com' />
        </div>
      </div>
      <div className='field'>
        <label htmlFor='cf-subject'>{t.subject}</label>
        <input id='cf-subject' type='text' required value={form.subject} onChange={set('subject')} placeholder={t.subjectPh} />
      </div>
      <div className='field'>
        <label htmlFor='cf-message'>{t.message}</label>
        <textarea id='cf-message' required minLength={10} rows={6} value={form.message} onChange={set('message')} placeholder={t.messagePh} />
      </div>
      <div ref={turnstileBox} style={{ minHeight: turnstileSiteKey ? 65 : 0 }} />
      {!turnstileSiteKey && <p className='fine'>{t.off}</p>}
      {error && <p className='err' role='alert'>{error}</p>}
      <button className='btn btn-pri' type='submit' disabled={loading || !captchaToken || !turnstileSiteKey}>
        {loading ? t.sending : t.send}
      </button>
    </form>
  )
}
