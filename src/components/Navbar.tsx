'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/logo-design', label: 'Logo & Graphic Design' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/contact', label: 'Contact' },
]

const footerLinks = [
  { href: 'https://facebook.com/RaishaHost', label: 'Facebook' },
  { href: 'tel:+8801878037803', label: '+880-18-7803-7803' },
]

const menuEase: [number, number, number, number] = [0.75, 0, 0.24, 1]
const itemEase: [number, number, number, number] = [0.215, 0.61, 0.355, 1]

// Panel expands FROM the button position (top-right) DOWN and LEFT
const panelVariants = {
  closed: {
    clipPath: 'inset(0% 0% 100% 0% round 20px)',
    opacity: 0,
    transition: { duration: 0.6, delay: 0.2, ease: menuEase },
  },
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 20px)',
    opacity: 1,
    transition: { duration: 0.75, ease: menuEase },
  },
}

const navItemVariants = {
  initial: { opacity: 0, rotateX: 90 },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.65,
      opacity: { duration: 0.35 },
      delay: 0.3 + i * 0.08,
      ease: itemEase,
    },
  }),
  exit: {
    opacity: 0,
    rotateX: 90,
    transition: { duration: 0.15 },
  },
}

const footerLinkVariants = {
  initial: { opacity: 0, y: 20 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.8 + i * 0.1, ease: itemEase },
  }),
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const navLinksRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [viewH, setViewH] = useState(0)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const moveGlowToElement = (el: HTMLElement, instant = false) => {
    const glow = glowRef.current
    const container = navLinksRef.current
    if (!glow || !container) return
    const cRect = container.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    const x = eRect.left - cRect.left
    const w = eRect.width
    if (instant) {
      gsap.set(glow, { x, width: w, opacity: 1 })
    } else {
      gsap.to(glow, { x, width: w, opacity: 1, duration: 0.35, ease: 'power2.out' })
    }
  }

  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    moveGlowToElement(e.currentTarget)
  }

  const handleNavMouseLeave = () => {
    const glow = glowRef.current
    const container = navLinksRef.current
    if (!glow || !container) return
    const activeEl = container.querySelector<HTMLElement>('[data-active="true"]')
    if (activeEl) {
      moveGlowToElement(activeEl)
    } else {
      gsap.to(glow, { opacity: 0, duration: 0.3 })
    }
  }

  useEffect(() => {
    const update = () => setViewH(window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 },
    )
  }, [])

  // Keep glow on active link whenever route changes
  useEffect(() => {
    const container = navLinksRef.current
    if (!container) return
    const activeEl = container.querySelector<HTMLElement>('[data-active="true"]')
    if (activeEl) {
      moveGlowToElement(activeEl, true)
    } else {
      gsap.set(glowRef.current, { opacity: 0 })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      {/* ─── Navbar ─── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/raisha-host-logo.svg"
                alt="RaishaHost"
                width={200}
                height={28}
                priority
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Link>

            {/* Desktop Nav */}
            <div
              ref={navLinksRef}
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={handleNavMouseLeave}
            >
              <span
                ref={glowRef}
                className="pointer-events-none absolute bottom-0 opacity-0"
                style={{
                  height: 1,
                  borderRadius: 9999,
                  background: '#05CCF7',
                  boxShadow: '0 0 8px 2px #05CCF7, 0 0 20px 4px rgba(5,204,247,0.4)',
                  left: 0,
                  width: 0,
                }}
              />
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={active ? 'true' : undefined}
                    onMouseEnter={handleLinkMouseEnter}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'text-[#05CCF7] bg-[#05CCF7]/8'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="https://raishahost.com/hosting/clientarea.php" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Client Area
              </a>
              <Link href="/contact"
                className="px-5 py-2 text-sm font-semibold bg-linear-to-r from-[#05CCF7] to-[#0284c7] text-white rounded-lg hover:shadow-lg hover:shadow-[#05CCF7]/25 hover:-translate-y-0.5 transition-all">
                Get Started
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Button (always on top) ─── */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        onTouchStart={() => {/* ensures iOS registers the tap immediately */}}
        className="md:hidden fixed z-80 overflow-hidden select-none"
        style={{
          top: 18,
          right: 16,
          width: 76,
          height: 28,
          borderRadius: 14,
          /* Removes iOS 300ms delay */
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer',
        }}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {/* MENU — pointer-events:none so it never swallows the touch */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: mobileOpen ? '-100%' : '0%' }}
          transition={{ duration: 0.45, ease: menuEase }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #05CCF7, #0284c7)', pointerEvents: 'none' }}
        >
          <span className="text-white font-bold text-[11px] uppercase tracking-[0.18em]">Menu</span>
        </motion.div>

        {/* CLOSE — pointer-events:none so it never swallows the touch */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: mobileOpen ? '0%' : '100%' }}
          transition={{ duration: 0.45, ease: menuEase }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', pointerEvents: 'none' }}
        >
          <span className="text-white font-bold text-[11px] uppercase tracking-[0.18em]">Close</span>
        </motion.div>
      </button>

      {/* ─── Mobile Menu Panel ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-panel"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden fixed z-70 flex flex-col justify-between overflow-hidden"
            style={{
              top: 12,
              right: 16,
              width: 'calc(100vw - 32px)',
              height: viewH > 0 ? viewH - 20 : 'calc(100vh - 20px)',
              background: 'linear-gradient(160deg, #0d1117 0%, #030712 60%, #0a0f1e 100%)',
              border: '1px solid rgba(5, 204, 247, 0.15)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 80px rgba(5,204,247,0.05)',
            }}
          >
            {/* Nav Links */}
            <div
              className="flex flex-col gap-1 px-9 pt-24"
              style={{ perspective: 120, perspectiveOrigin: '0% 50%' }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={navItemVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  style={{ transformOrigin: 'top center' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 transition-colors"
                    style={{
                      color: isActive(link.href) ? '#05CCF7' : '#f9fafb',
                      fontSize: 30,
                      fontWeight: 700,
                      lineHeight: 1.3,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {isActive(link.href) && (
                      <span style={{ marginRight: 8, fontSize: 20 }}>›</span>
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 px-9 pb-10"
              style={{ borderTop: '1px solid rgba(5,204,247,0.15)', paddingTop: 20 }}>
              {footerLinks.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  custom={i}
                  variants={footerLinkVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-xs font-semibold hover:text-[#05CCF7] transition-colors"
                  style={{ color: 'rgba(249,250,251,0.5)' }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
