'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// The first page load is left alone (no flash of hidden content); only later navigations animate.
let firstLoad = true

/**
 * Next.js mounts a template again on every navigation, so this plays a short entrance each
 * time a page opens: the content fades in, then its header and first sections rise in turn.
 * The navigation is left out so it stays still, and nothing is transformed above the fixed
 * navigation or the sticky scroll-video sections.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (firstLoad) {
        firstLoad = false
        return
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = root.current
      if (!el) return
      const head = el.querySelectorAll('.phead .k, .phead h1, .phead p')
      // Skip the homepage's pinned video sections; move only ordinary first sections.
      const blocks = el.querySelector('.sf') ? [] : Array.from(el.querySelectorAll('main > section:not(.phead)')).slice(0, 3)
      // Everything else inside <main> just fades, except a wrapper that holds the navigation
      // (old pages put it inside <main>).
      const content = Array.from(el.querySelectorAll('main > *')).filter((n) => !n.querySelector('.rh-nav') && !blocks.includes(n))

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'power1.out', clearProps: 'opacity,visibility' })
        .fromTo(head, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, clearProps: 'all' }, 0.05)
        .fromTo(blocks, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, clearProps: 'all' }, 0.2)
    },
    { scope: root },
  )

  return <div ref={root}>{children}</div>
}
