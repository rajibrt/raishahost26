'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** GSAP scroll effects for the homepage. Content stays readable if this never runs. */
export default function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.hero h1 .ln > span', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.15 })
      gsap.from('.hero .rv', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.45 })

      gsap.utils.toArray<HTMLElement>('.rv').forEach((el) => {
        if (el.closest('.hero')) return
        gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count)
        const dec = Number(el.dataset.dec || 0)
        const suf = el.dataset.suf || ''
        const from = el.dataset.from ? Number(el.dataset.from) : 0
        const o = { v: from }
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
          onUpdate: () => {
            el.textContent = o.v.toFixed(dec) + suf
          },
        })
      })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const trackEl = document.getElementById('hsTrack')
        if (!trackEl) return
        const dist = () => trackEl.scrollWidth - window.innerWidth + 40
        gsap.to(trackEl, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: { trigger: '#services', start: 'top top', end: () => '+=' + dist(), pin: '.hs-pin', scrub: 1, invalidateOnRefresh: true },
        })
      })
      mm.add('(max-width: 767px)', () => {
        const trackEl = document.getElementById('hsTrack')
        if (trackEl) {
          trackEl.style.flexDirection = 'column'
          trackEl.style.padding = '0 20px'
        }
        gsap.utils.toArray<HTMLElement>('.svc').forEach((s) =>
          gsap.from(s, { y: 60, opacity: 0, scrollTrigger: { trigger: s, start: 'top 90%' } }),
        )
        return () => {
          if (trackEl) trackEl.style.cssText = ''
        }
      })

      gsap.to('#rail', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#steps', start: 'top 75%', end: 'bottom 55%', scrub: true } })
    })

    return () => ctx.revert()
  }, [])

  return null
}
