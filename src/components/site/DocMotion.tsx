'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * For long reads (policies, articles): a thin reading-progress bar under the navigation, and
 * the `.toc` link of the section being read marked with `.on`.
 */
export default function DocMotion({ target = '.prose' }: { target?: string }) {
  const bar = useRef<HTMLElement>(null)

  useEffect(() => {
    const body = document.querySelector<HTMLElement>(target)
    if (!body || !bar.current) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: body, start: 'top 80px', end: 'bottom bottom', scrub: reduce ? true : 0.3 } },
      )
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]'))
      links.forEach((a) => {
        const sec = document.getElementById(a.hash.slice(1))
        if (!sec) return
        ScrollTrigger.create({
          trigger: sec,
          // The line just below the navigation, where a section lands after a contents-link jump.
          start: 'top 130px',
          end: 'bottom 130px',
          onToggle: (self) => self.isActive && links.forEach((l) => l.classList.toggle('on', l === a)),
        })
      })
    })
    return () => ctx.revert()
  }, [target])

  return (
    <div className='readbar' aria-hidden='true'>
      <i ref={bar} />
    </div>
  )
}
