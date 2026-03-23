'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ball = ballRef.current
    if (!ball) return

    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      gsap.to(ball, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
    }

    const onEnter = () => gsap.to(ball, { scale: 1.8, duration: 0.2 })
    const onLeave = () => gsap.to(ball, { scale: 1, duration: 0.2 })

    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('mousemove', onMove)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ballRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9999,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: '#05CCF7',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
