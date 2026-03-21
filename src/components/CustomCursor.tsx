'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const POINTS = 40

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number
}

export default function CustomCursor() {
  const ballRef   = useRef<HTMLDivElement>(null)
  const pulseRef  = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ball   = ballRef.current
    const pulse  = pulseRef.current
    const canvas = canvasRef.current
    if (!ball || !pulse || !canvas) return

    document.documentElement.style.cursor = 'none'

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const ctx = canvas.getContext('2d')!

    // ── Tail line state ──
    const pts = Array.from({ length: POINTS }, () => ({ x: -200, y: -200, o: 0 }))
    const head = { x: -200, y: -200 }

    // ── Smoke particles ──
    const particles: Particle[] = []

    let mouseX = -200, mouseY = -200
    let lastX  = -200, lastY  = -200
    let velocityTimer: ReturnType<typeof setTimeout>

    const pulseTween = gsap.to(pulse, {
      scale: 2.4, opacity: 0, duration: 1.4,
      ease: 'power2.out', repeat: -1,
    })

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const speed = Math.sqrt(dx * dx + dy * dy)
      lastX = mouseX = e.clientX
      lastY = mouseY = e.clientY

      gsap.to(ball,  { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(pulse, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })

      const scale = 1 + Math.min(speed * 0.055, 2)
      gsap.to(ball, { scale, duration: 0.12, ease: 'power2.out' })

      pulseTween.timeScale(0.3)
      clearTimeout(velocityTimer)
      velocityTimer = setTimeout(() => {
        gsap.to(ball, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
        pulseTween.timeScale(1)
      }, 80)

      // Spawn smoke along the tail (more when faster)
      const count = Math.max(1, Math.floor(speed * 0.2))
      for (let i = 0; i < count; i++) {
        const angle  = Math.random() * Math.PI * 2
        const spread = Math.random() * 0.4
        particles.push({
          x:       e.clientX + (Math.random() - 0.5) * 6,
          y:       e.clientY + (Math.random() - 0.5) * 6,
          vx:      Math.cos(angle) * spread - dx * 0.03,
          vy:      Math.sin(angle) * spread - dy * 0.03 - 0.2,
          life:    1,
          maxLife: 50 + Math.random() * 45,
          size:    1.5 + Math.random() * 2.5,
        })
      }
    }

    let rafId: number

    const draw = () => {
      rafId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ── 1. Smoke particles (behind the line) ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x  += p.vx
        p.y  += p.vy
        p.vx *= 0.97
        p.vy *= 0.97
        p.vy -= 0.01
        p.vx += (Math.random() - 0.5) * 0.05
        p.life -= 1 / p.maxLife

        if (p.life <= 0) { particles.splice(i, 1); continue }

        const sizeRatio = Math.sin(p.life * Math.PI)
        const radius    = p.size * (0.5 + sizeRatio * 2)
        const opacity   = p.life * p.life * 0.45

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
        grd.addColorStop(0,   `rgba(5,204,247,${opacity})`)
        grd.addColorStop(0.5, `rgba(5,204,247,${opacity * 0.3})`)
        grd.addColorStop(1,   `rgba(5,204,247,0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      }

      // ── 2. Tail line (on top of smoke) ──
      head.x += (mouseX - head.x) * 0.3
      head.y += (mouseY - head.y) * 0.3

      for (let i = POINTS - 1; i > 0; i--) {
        pts[i].x = pts[i - 1].x
        pts[i].y = pts[i - 1].y
        pts[i].o = pts[i - 1].o
      }
      pts[0].x = head.x
      pts[0].y = head.y
      pts[0].o = 1

      for (let i = 1; i < POINTS; i++) pts[i].o *= 0.97

      for (let i = 0; i < POINTS - 1; i++) {
        const t  = 1 - i / POINTS
        const p0 = pts[i]
        const p1 = pts[i + 1]
        const w  = Math.max(0.3, 5 * t * t)
        const a  = p0.o * t * 0.9

        // Soft glow
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.lineWidth   = w * 4
        ctx.lineCap     = 'round'
        ctx.strokeStyle = `rgba(5,204,247,${a * 0.15})`
        ctx.shadowBlur  = 0
        ctx.stroke()

        // Bright core
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.lineWidth   = w
        ctx.lineCap     = 'round'
        ctx.strokeStyle = `rgba(5,204,247,${a})`
        ctx.shadowColor = '#05CCF7'
        ctx.shadowBlur  = 6 * t
        ctx.stroke()
      }

      ctx.shadowBlur = 0
    }
    draw()

    const onEnter = () => gsap.to(ball, { scale: 1.8, duration: 0.2 })
    const onLeave = () => gsap.to(ball, { scale: 1,   duration: 0.2 })
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
      window.removeEventListener('resize', resize)
      observer.disconnect()
      cancelAnimationFrame(rafId)
      clearTimeout(velocityTimer)
      pulseTween.kill()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
      />
      <div
        ref={pulseRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999, width: 12, height: 12, borderRadius: '50%',
          border: '1px solid #05CCF7',
          transform: 'translate(-50%, -50%)', opacity: 0.6,
        }}
      />
      <div
        ref={ballRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999, width: 10, height: 10, borderRadius: '50%',
          background: '#05CCF7',
          boxShadow: '0 0 6px 2px #05CCF7, 0 0 14px 4px rgba(5,204,247,0.5), 0 0 30px 6px rgba(5,204,247,0.2)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
