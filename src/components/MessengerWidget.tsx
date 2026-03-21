'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronUp } from 'lucide-react'

const MESSAGES = [
  'যে কোন প্রশ্ন থাকলে আমাকে ক্লিক করুন ➜',
  'ওয়েবসাইট বানাতে চান? জানান! ➜',
  'ফ্রি পরামর্শ নিন এখনই ➜',
]

const MOBILE_URL = 'https://m.me/RaishaHost'
const DESKTOP_URL = 'https://www.facebook.com/messages/t/raishahost'

export default function MessengerWidget() {
  const [displayed, setDisplayed] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [messengerUrl, setMessengerUrl] = useState(DESKTOP_URL)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hiddenByTimer = useRef(false)

  // Set URL and auto-hide based on device
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 640
    if (isMobile) {
      setMessengerUrl(MOBILE_URL)
      timeoutRef.current = setTimeout(() => {
        hiddenByTimer.current = true
        setVisible(false)
      }, 12000)
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  // Scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Typing animation loop
  useEffect(() => {
    const text = MESSAGES[msgIndex]
    let i = 0
    let erasing = false
    let current = ''
    let raf: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!erasing) {
        if (i <= text.length) {
          current = text.slice(0, i)
          setDisplayed(current)
          i++
          raf = setTimeout(tick, 40)
        } else {
          raf = setTimeout(() => { erasing = true; tick() }, 1600)
        }
      } else {
        if (i > 0) {
          i--
          current = text.slice(0, i)
          setDisplayed(current)
          raf = setTimeout(tick, 20)
        } else {
          raf = setTimeout(() => {
            erasing = false
            setMsgIndex((prev) => (prev + 1) % MESSAGES.length)
          }, 600)
        }
      }
    }

    raf = setTimeout(tick, 300)
    return () => clearTimeout(raf)
  }, [msgIndex])

  return (
    <div
      className="fixed z-140 right-4 bottom-5 sm:right-5 sm:bottom-6"
      style={{ pointerEvents: 'none' }}
    >
      {/* Row: text bubble + messenger button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Text bubble */}
          {visible && (
            <div
              onClick={() => window.open(messengerUrl, '_blank', 'noopener noreferrer')}
              style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.97)',
                color: '#0f172a',
                border: '1px solid #e2e8f0',
                borderRadius: 9999,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 500,
                boxShadow: '0 10px 24px rgba(2,6,23,0.13)',
                maxWidth: 'min(72vw, 300px)',
                whiteSpace: 'nowrap',
                pointerEvents: 'auto',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <span style={{ fontFamily: "var(--font-hind-siliguri), 'Hind Siliguri', sans-serif" }}>{displayed}</span>
              <span style={{
                display: 'inline-block',
                marginLeft: 1,
                animation: 'fbCaretBlink 1s step-end infinite',
                fontWeight: 300,
                opacity: 1,
              }}>|</span>
              {/* Tail */}
              <span style={{
                position: 'absolute',
                right: -6,
                top: '50%',
                marginTop: -5,
                width: 10,
                height: 10,
                background: 'rgba(255,255,255,0.97)',
                border: '1px solid #e2e8f0',
                borderLeft: 'none',
                borderTop: 'none',
                transform: 'rotate(-45deg)',
              }} />
            </div>
          )}

          {/* Messenger button (relative so scroll-to-top can anchor to it) */}
          <div style={{ position: 'relative', flexShrink: 0, width: 56 }}>

            {/* Scroll to top — centered above messenger button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 10px)',
                left: '50%',
                transform: scrolled ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(8px)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(5,204,247,0.3)',
                backdropFilter: 'blur(12px)',
                color: '#05CCF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                pointerEvents: scrolled ? 'auto' : 'none',
                opacity: scrolled ? 1 : 0,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <ChevronUp style={{ width: 18, height: 18 }} />
            </button>

          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => { if (hiddenByTimer.current) setVisible(true) }}
            onMouseLeave={() => { if (hiddenByTimer.current) setVisible(false) }}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00c6ff 0%, #1877f2 60%)',
              color: 'white',
              boxShadow: '0 10px 32px rgba(24,119,242,0.45)',
              flexShrink: 0,
              pointerEvents: 'auto',
              animation: 'fbFloat 3.2s ease-in-out infinite',
            }}
            aria-label="Facebook Messenger"
          >
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              animation: 'fbPulse 2.4s ease-out infinite',
              background: 'rgba(24,119,242,0.35)',
            }} />
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>
              <path d="M14 2C7.373 2 2 7.06 2 13.333c0 3.311 1.37 6.29 3.587 8.446V26l4.27-2.347C10.842 23.88 12.388 24 14 24c6.627 0 12-5.06 12-11.333C26 7.06 20.627 2 14 2Z" fill="white"/>
              <path d="M15.273 16.727 12.09 13.364l-6.09 3.363 6.727-7.09 3.273 3.363 5.999-3.363-6.726 7.09Z" fill="url(#msgGrad)"/>
              <defs>
                <linearGradient id="msgGrad" x1="6" y1="13" x2="22" y2="13" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00c6ff"/>
                  <stop offset="1" stopColor="#1877f2"/>
                </linearGradient>
              </defs>
            </svg>
          </a>
          </div>
        </div>

      <style>{`
        @keyframes fbFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes fbPulse {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fbCaretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
