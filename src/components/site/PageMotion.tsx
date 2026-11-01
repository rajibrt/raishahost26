'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll motion for redesigned inner pages. Content stays readable if this never runs.
 *
 * - `.rv`: rises in when it scrolls into view.
 * - `[data-stagger]`: its children rise in one after another.
 * - `[data-count]`: counts up to its number (`data-dec`, `data-suf`, `data-from` as on the homepage).
 * - `[data-draw="x" | "y"]`: a line that draws along with the scroll through its parent.
 */
export default function PageMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: el, start: 'top 88%' } },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        // fromTo with explicit end values: a plain from() takes the end from the element's current
        // style, so an interrupted run (fast page changes) left cards stuck at uneven heights.
        gsap.fromTo(group.children, { y: 36, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          clearProps: 'transform,opacity,visibility',
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 86%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count)
        const dec = Number(el.dataset.dec || 0)
        const suf = el.dataset.suf || ''
        const o = { v: el.dataset.from ? Number(el.dataset.from) : 0 }
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

      gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
        const axis = el.dataset.draw === 'x' ? 'scaleX' : 'scaleY'
        gsap.fromTo(
          el,
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top 75%', end: 'bottom 60%', scrub: true },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
