'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Shield, Zap, Globe, ArrowRight, Check } from 'lucide-react'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const domainTLDs = ['.com', '.net', '.info', '.biz', '.org', '.io']

function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Create particle field
    const particlesGeometry = new THREE.BufferGeometry()
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20

      const colorChoice = Math.random()
      if (colorChoice < 0.5) {
        colors[i] = 0.02
        colors[i + 1] = 0.8
        colors[i + 2] = 0.97 // #05CCF7
      } else if (colorChoice < 0.8) {
        colors[i] = 0.39
        colors[i + 1] = 0.4
        colors[i + 2] = 0.95 // #6366f1
      } else {
        colors[i] = 0.96
        colors[i + 1] = 0.62
        colors[i + 2] = 0.04 // #f59e0b
      }
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    )
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3),
    )

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Create wireframe sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(2, 2)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x05ccf7,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
    const sphere = new THREE.Mesh(sphereGeometry, wireframeMat)
    scene.add(sphere)

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(1.2, 32, 32)
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x05ccf7,
      transparent: true,
      opacity: 0.04,
    })
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat)
    scene.add(innerSphere)

    // Mouse interaction
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const handleResize = () => {
      if (!canvas) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animationId: number
    const timer = new THREE.Timer()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      timer.update()
      const elapsed = timer.getElapsed()

      particles.rotation.x = elapsed * 0.02
      particles.rotation.y = elapsed * 0.03

      sphere.rotation.x = elapsed * 0.05 + mouse.y * 0.1
      sphere.rotation.y = elapsed * 0.07 + mouse.x * 0.1

      innerSphere.rotation.x = -elapsed * 0.03
      innerSphere.rotation.y = -elapsed * 0.04

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      sphereGeometry.dispose()
      wireframeMat.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full' />
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const [domain, setDomain] = useState('')
  const [activeTLD, setActiveTLD] = useState('.com')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(
        '.hero-badge',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      )
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.4',
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6',
        )
        .fromTo(
          formRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.5',
        )
        .fromTo(
          badgesRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3',
        )

      // Parallax on scroll
      gsap.to('.hero-content', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain) {
      window.open(
        `https://hosting.raishahost.com/cart.php?a=add&domain=register&query=${domain}${activeTLD}`,
        '_blank',
      )
    }
  }

  return (
    <section
      ref={heroRef}
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* 3D Canvas Background */}
      <ThreeCanvas />

      {/* Gradient overlays */}
      <div className='absolute inset-0 hero-gradient pointer-events-none' />
      <div className='absolute inset-0 grid-pattern opacity-40 pointer-events-none' />
      <div className='absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none' />

      {/* Floating orbs */}
      <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-[#05CCF7]/5 rounded-full blur-3xl animate-float pointer-events-none' />
      <div className='absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#6366f1]/5 rounded-full blur-3xl animate-float-delayed pointer-events-none' />

      {/* Main content */}
      <div className='hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center'>
        {/* Badge */}
        <div className='hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#05CCF7]/20 text-sm text-[#05CCF7] font-medium mb-8 backdrop-blur-sm'>
          <span className='w-2 h-2 bg-[#05CCF7] rounded-full animate-pulse' />
          Freedom of Host — Since 2008
          <span className='w-2 h-2 bg-[#05CCF7] rounded-full animate-pulse' />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none'
        >
          <span className='text-white'>Get Your</span>
          <br />
          <span className='gradient-text'>Domain &amp; Host</span>
          <br />
          <span className='text-white'>In Minutes</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className='text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed'
        >
          Ultra-fast SSD hosting with{' '}
          <span className='text-[#05CCF7] font-semibold'>99.9% uptime</span>,
          free SSL, cPanel, and 24/7 support. Trusted by thousands in
          Bangladesh.
        </p>

        {/* Domain Search */}
        <div ref={formRef} className='max-w-3xl mx-auto mb-10'>
          <form
            onSubmit={handleSearch}
            className='glass border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl shadow-black/40'
          >
            <div className='flex-1 flex items-center gap-3 px-4'>
              <Globe className='w-5 h-5 text-[#05CCF7] shrink-0' />
              <input
                type='text'
                value={domain}
                onChange={(e) =>
                  setDomain(e.target.value.toLowerCase().replace(/\s/g, ''))
                }
                placeholder='Find your perfect domain...'
                className='flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base py-2'
              />
            </div>
            <div className='flex items-center gap-1 px-2'>
              {domainTLDs.slice(0, 3).map((tld) => (
                <button
                  key={tld}
                  type='button'
                  onClick={() => setActiveTLD(tld)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeTLD === tld
                      ? 'bg-[#05CCF7] text-[#030712]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tld}
                </button>
              ))}
            </div>
            <button
              type='submit'
              className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#05CCF7] to-[#0284c7] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#05CCF7]/25 hover:-translate-y-0.5 transition-all duration-200 sm:rounded-xl'
            >
              <Search className='w-4 h-4' />
              Search
            </button>
          </form>

          {/* TLD Prices */}
          <div className='flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-500'>
            <span>
              .com <span className='text-[#05CCF7]'>$11.29</span>
            </span>
            <span>
              .net <span className='text-[#05CCF7]'>$11.87</span>
            </span>
            <span>
              .info <span className='text-[#05CCF7]'>$12.61</span>
            </span>
            <span>
              .biz <span className='text-[#05CCF7]'>$17.99</span>
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          ref={badgesRef}
          className='flex flex-wrap justify-center gap-6 text-sm text-gray-400'
        >
          {[
            { icon: Shield, text: 'Free SSL Certificate' },
            { icon: Zap, text: 'SSD Powered Servers' },
            { icon: Check, text: '30-Day Money Back' },
            { icon: Globe, text: '99.9% Uptime SLA' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className='flex items-center gap-2'>
              <Icon className='w-4 h-4 text-[#05CCF7]' />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-float'>
          <span className='text-xs uppercase tracking-widest'>Scroll</span>
          <div className='w-px h-12 bg-gradient-to-b from-[#05CCF7] to-transparent' />
        </div>
      </div>

      {/* Stats bar */}
      <div className='absolute bottom-0 left-0 right-0 border-t border-white/5'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5'>
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '5K+', label: 'Happy Clients' },
              { value: '99.9%', label: 'Uptime Guarantee' },
              { value: '24/7', label: 'Expert Support' },
            ].map(({ value, label }) => (
              <div key={label} className='py-4 px-6 text-center glass'>
                <div className='text-2xl font-black text-[#05CCF7]'>
                  {value}
                </div>
                <div className='text-xs text-gray-500 mt-0.5'>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
