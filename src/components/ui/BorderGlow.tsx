'use client'

import { useRef, useCallback, useEffect } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface BorderGlowProps {
  children: ReactNode
  glowColor?: string
  edgeSensitivity?: number
  borderRadius?: string
  className?: string
  style?: CSSProperties
}

export default function BorderGlow({
  children,
  glowColor = '#05CCF7',
  edgeSensitivity = 120,
  borderRadius = '1rem',
  className = '',
  style,
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  const update = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top

      // Proximity is always 1 when hovering anywhere on the card.
      // edgeSensitivity controls the fade-in distance as the mouse enters the card from outside.
      const minDist = Math.min(x, width - x, y, height - y)
      const proximity = minDist < 0 ? 0 : Math.min(1, (minDist + edgeSensitivity) / edgeSensitivity)
      const angle = Math.atan2(y - height / 2, x - width / 2) * (180 / Math.PI) + 90

      el.style.setProperty('--bg-proximity', String(proximity))
      el.style.setProperty('--bg-angle', `${angle}deg`)
    },
    [edgeSensitivity],
  )

  const reset = useCallback(() => {
    ref.current?.style.setProperty('--bg-proximity', '0')
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', update)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', update)
      el.removeEventListener('mouseleave', reset)
    }
  }, [update, reset])

  return (
    <div
      ref={ref}
      className={`border-glow-outer ${className}`}
      style={
        {
          '--bg-glow-color': glowColor,
          '--bg-proximity': '0',
          '--bg-angle': '45deg',
          '--bg-border-radius': borderRadius,
          ...style,
        } as CSSProperties
      }
    >
      {/* Glow border ring — sits outside the inner card */}
      <div className='border-glow-ring' aria-hidden='true' />
      {children}
    </div>
  )
}
