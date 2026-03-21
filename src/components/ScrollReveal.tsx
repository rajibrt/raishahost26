'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: ReactNode
  className?: string
  y?: number
  delay?: number
  /** if set, animates direct children with stagger instead of the wrapper */
  stagger?: number
  start?: string
}

export default function ScrollReveal({
  children,
  className,
  y = 50,
  delay = 0,
  stagger,
  start = 'top 85%',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = stagger ? Array.from(el.children) : el
    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: stagger ? 0 : delay,
          stagger: stagger ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          },
        },
      )
    })
    return () => ctx.revert()
  }, [y, delay, stagger, start])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
