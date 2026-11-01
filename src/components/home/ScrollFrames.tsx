'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface FrameCaption {
  /** Scroll progress (0-1) where this caption is shown. */
  from: number
  to: number
  content: React.ReactNode
  /** Short name shown in the chapter rail. */
  label?: string
  /** Where the caption sits on desktop. */
  align?: 'left' | 'right' | 'center'
}

/** Scroll distance (in viewport heights) over which a crossfading section fades in. */
const CROSSFADE_VH = 60

interface Manifest {
  desktop: { count: number; size: string }
  mobile: { count: number }
}

/**
 * A pinned section that plays a video as you scroll: the video is stored as
 * WebP frames (see scripts/extract-frames.sh) and drawn onto a canvas, so it
 * follows the scrollbar exactly, forwards and backwards, on phones too.
 * If the frames are missing, the captions still show over a plain background.
 */
export default function ScrollFrames({
  name,
  captions,
  length = 300,
  focusX = 0.5,
  crossfade = false,
  frameEnd = 1,
  id,
}: {
  name: string
  captions: FrameCaption[]
  /** Scroll length in viewport heights. */
  length?: number
  /** Horizontal focus (0-1) used when cropping the frame on narrow screens. */
  focusX?: number
  /**
   * Set when this section directly follows another ScrollFrames: it slides up under the
   * previous one, pins while that one is still pinned, and fades in over its last frames.
   */
  crossfade?: boolean
  /** Share of the video to play (0-1), to leave out a bad ending such as a flash to white. */
  frameEnd?: number
  id?: string
}) {
  const wrap = useRef<HTMLElement>(null)
  const stick = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = wrap.current
    const cv = canvas.current
    if (!section || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const mobile = window.innerWidth < 768
    const dir = mobile ? 'mobile' : 'desktop'
    const images: (HTMLImageElement | undefined)[] = []
    let count = 0
    let current = 0
    let drawn = -1
    let raf = 0
    let alive = true

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = cv.clientWidth * dpr
      cv.height = cv.clientHeight * dpr
      drawn = -1
    }

    // Draw the nearest loaded frame, cropped to cover the canvas.
    const draw = () => {
      raf = 0
      if (!count) return
      let i = current
      while (i > 0 && !images[i]?.complete) i--
      const img = images[i]
      if (!img || !img.complete || i === drawn) return
      drawn = i
      const cw = cv.width
      const ch = cv.height
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * s
      const h = img.naturalHeight * s
      const x = Math.min(0, Math.max(cw - w, cw / 2 - w * focusX))
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, (ch - h) / 2, w, h)
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    // Frames download a few at a time. A video starts with a coarse pass (every 8th frame) so it can be
    // scrubbed early; the rest waits until the page has finished loading, so the browser's loading
    // spinner stops quickly. Videos further down only start when you scroll near them, and the frame
    // you are looking at always jumps the queue. (Requesting every frame of every video at once kept
    // the page "loading" for minutes and left later sections blank on slower connections.)
    const PARALLEL = 4
    const COARSE = 8
    let queue: number[] = []
    let inFlight = 0
    let near = false
    let started = false
    const rest: number[] = []

    const load = (i: number) => {
      if (images[i] || i < 0 || i >= count) return
      const img = new Image()
      img.decoding = 'async'
      inFlight++
      const done = () => {
        inFlight--
        pump()
      }
      img.onload = () => {
        if (Math.abs(i - current) < 3 || drawn < 0) {
          drawn = -1
          request()
        }
        done()
      }
      img.onerror = done
      img.src = `/media/${name}/${dir}/${String(i + 1).padStart(4, '0')}.webp`
      images[i] = img
    }
    const pump = () => {
      if (!alive) return
      while (inFlight < PARALLEL && queue.length) load(queue.shift()!)
    }
    const pageLoaded = () => document.readyState === 'complete'
    const start = () => {
      if (started || !near || !count) return
      started = true
      const coarse: number[] = []
      for (let i = 0; i < count; i += COARSE) coarse.push(i)
      for (const step of [4, 2, 1]) for (let i = 0; i < count; i += step) if (i % COARSE) rest.push(i)
      queue = coarse
      if (pageLoaded()) queue.push(...rest.splice(0))
      pump()
    }
    const onPageLoad = () => {
      if (!started) return
      queue.push(...rest.splice(0))
      pump()
    }
    window.addEventListener('load', onPageLoad)

    // Start this video once it is within about one screen of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          near = true
          io.disconnect()
          start()
        }
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(section)

    size()
    window.addEventListener('resize', size)

    fetch(`/media/${name}/manifest.json`)
      .then((r) => (r.ok ? (r.json() as Promise<Manifest>) : null))
      .then((m) => {
        if (!alive || !m) return
        count = mobile ? m.mobile.count : m.desktop.count
        start()
      })
      .catch(() => {})

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress)
        if (count) {
          current = Math.min(count - 1, Math.round(self.progress * frameEnd * (count - 1)))
          // The frame on screen goes first if it has not been fetched yet.
          if (started && !images[current]) {
            queue = queue.filter((q) => q !== current)
            load(current)
          }
          request()
        }
      },
    })

    // Crossfade: both scenes are pinned during the overlap, so the new one fades in over the old.
    // Until it is fully shown it lets clicks through to the section underneath.
    const showStick = (p: number) => gsap.set(stick.current, { opacity: p, pointerEvents: p < 1 ? 'none' : 'auto' })
    const fade =
      crossfade && stick.current
        ? ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${(window.innerHeight * CROSSFADE_VH) / 100}`,
            onUpdate: (self) => showStick(self.progress),
            onRefresh: (self) => showStick(self.progress),
          })
        : null

    return () => {
      alive = false
      io.disconnect()
      window.removeEventListener('load', onPageLoad)
      st.kill()
      fade?.kill()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
    }
  }, [name, focusX, crossfade, frameEnd])

  return (
    <section
      ref={wrap}
      className={crossfade ? 'sf xf' : 'sf'}
      id={id}
      style={{ height: `${length}vh`, marginTop: crossfade ? `-${100 + CROSSFADE_VH}vh` : undefined }}
    >
      <div ref={stick} className='sf-stick'>
        <canvas ref={canvas} className='sf-canvas' aria-hidden='true' />
        <div className='sf-shade' aria-hidden='true' />
        <div className='sf-captions gut'>
          {captions.map((c, i) => (
            <div
              key={i}
              className={`sf-cap ${c.align ?? 'left'}${progress >= c.from && progress <= c.to ? ' on' : ''}`}
              aria-hidden={!(progress >= c.from && progress <= c.to)}
            >
              {c.content}
            </div>
          ))}
        </div>
        {/* Chapter rail: one step per caption; the current one fills as you scroll. */}
        <ol className='sf-rail' aria-hidden='true'>
          {captions.map((c, i) => {
            const fill = Math.min(1, Math.max(0, (progress - c.from) / (c.to - c.from)))
            const state = progress >= c.from && progress <= c.to ? 'on' : fill >= 1 ? 'done' : ''
            return (
              <li key={i} className={state} style={{ '--f': fill } as React.CSSProperties}>
                {c.label && <span className='l'>{c.label}</span>}
                <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                <span className='t'><i /></span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
