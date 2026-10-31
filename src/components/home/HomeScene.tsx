'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

/**
 * One fixed WebGL stage behind the homepage. Scroll position of the
 * `[data-act]` sections drives four scenes: 3D logo, globe, server aisle, SSL lock.
 */
export default function HomeScene() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 768

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, powerPreference: 'high-performance' })
    } catch {
      canvas.style.display = 'none'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.setClearColor(0x02070c, 1)
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x02070c, 0.05)
    const camera = new THREE.PerspectiveCamera(small ? 55 : 42, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 0, 12)

    scene.add(new THREE.HemisphereLight(0x9fd0ff, 0x0a1420, 0.9))
    const key = new THREE.DirectionalLight(0xffffff, 3.2)
    key.position.set(5, 6, 8)
    scene.add(key)
    const rim = new THREE.PointLight(0x4fa8ea, 40, 30)
    rim.position.set(-6, -2, 4)
    scene.add(rim)

    const BLUE = new THREE.Color(0x1b75bb)
    const SKY = new THREE.Color(0x4fa8ea)
    const SILVER = new THREE.Color(0xc9ced6)
    const disposables: { dispose: () => void }[] = []
    const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x)

    /* ambient stars */
    const N = small ? 900 : 2200
    const sp = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      sp[i * 3] = (Math.random() - 0.5) * 60
      sp[i * 3 + 1] = (Math.random() - 0.5) * 40
      sp[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10
    }
    const starGeo = track(new THREE.BufferGeometry())
    starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
    const starMat = track(new THREE.PointsMaterial({ color: SKY, size: 0.05, transparent: true, opacity: 0.7, depthWrite: false }))
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    /* ACT 1: extruded RaishaHost mark, loaded from the official SVG */
    const logo = new THREE.Group()
    scene.add(logo)
    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(4.2, 0.012, 8, 160)),
      track(new THREE.MeshBasicMaterial({ color: SKY, transparent: true, opacity: 0.5 })),
    )
    ring.rotation.x = Math.PI / 2.4
    logo.add(ring)
    let cancelled = false
    fetch('/brand/raishahost-mark.svg')
      .then((r) => r.text())
      .then((svg) => {
        if (cancelled) return
        const data = new SVGLoader().parse(svg)
        const mBlue = track(new THREE.MeshStandardMaterial({ color: BLUE, metalness: 0.35, roughness: 0.3, emissive: BLUE, emissiveIntensity: 0.45, side: THREE.DoubleSide }))
        const mSilver = track(new THREE.MeshStandardMaterial({ color: SILVER, metalness: 0.3, roughness: 0.35, emissive: SILVER, emissiveIntensity: 0.25, side: THREE.DoubleSide }))
        const inner = new THREE.Group()
        data.paths.forEach((p) => {
          const isBlue = p.color.getHexString() === '1b75bb'
          SVGLoader.createShapes(p).forEach((sh) => {
            const g = track(new THREE.ExtrudeGeometry(sh, { depth: 16, bevelEnabled: true, bevelThickness: 2.2, bevelSize: 1.4, bevelSegments: 3, curveSegments: 10 }))
            inner.add(new THREE.Mesh(g, isBlue ? mBlue : mSilver))
          })
        })
        const box = new THREE.Box3().setFromObject(inner)
        const c = box.getCenter(new THREE.Vector3())
        const sz = box.getSize(new THREE.Vector3())
        inner.position.set(-c.x, -c.y, -c.z)
        const wrap = new THREE.Group()
        wrap.add(inner)
        const s = (small ? 2.8 : 4.4) / sz.x
        wrap.scale.set(s, -s, s)
        logo.add(wrap)
      })
      .catch(() => {})

    /* ACT 2: globe with arcs from Dhaka */
    const globe = new THREE.Group()
    scene.add(globe)
    const R = 3.2
    {
      const GP = small ? 1600 : 3200
      const gp = new Float32Array(GP * 3)
      for (let i = 0; i < GP; i++) {
        const y = 1 - (i / (GP - 1)) * 2
        const r = Math.sqrt(1 - y * y)
        const t = i * 2.399963
        gp[i * 3] = Math.cos(t) * r * R
        gp[i * 3 + 1] = y * R
        gp[i * 3 + 2] = Math.sin(t) * r * R
      }
      const g = track(new THREE.BufferGeometry())
      g.setAttribute('position', new THREE.BufferAttribute(gp, 3))
      globe.add(new THREE.Points(g, track(new THREE.PointsMaterial({ color: SKY, size: 0.035, transparent: true, opacity: 0.85, depthWrite: false }))))
      globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 0.985, 48, 48)), track(new THREE.MeshBasicMaterial({ color: 0x08121d, transparent: true, opacity: 0.92 }))))
      globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.08, 48, 48)), track(new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.07, side: THREE.BackSide }))))
    }
    const ll = (lat: number, lon: number, r = R) => {
      const ph = ((90 - lat) * Math.PI) / 180
      const th = ((lon + 180) * Math.PI) / 180
      return new THREE.Vector3(-r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th))
    }
    const DHAKA: [number, number] = [23.8, 90.4]
    const cities: [number, number][] = [[32.8, -96.8], [40.7, -74], [51.5, -0.1], [1.35, 103.8], [22.3, 91.8], [25.2, 55.3]]
    const pulses: { m: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; o: number }[] = []
    const dotGeo = track(new THREE.SphereGeometry(0.06, 12, 12))
    const white = track(new THREE.MeshBasicMaterial({ color: 0xffffff }))
    const skyMat = track(new THREE.MeshBasicMaterial({ color: SKY }))
    const arcMat = track(new THREE.LineBasicMaterial({ color: SKY, transparent: true, opacity: 0.55 }))
    cities.forEach((c, i) => {
      const a = ll(...DHAKA)
      const b = ll(...c)
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * (1.25 + a.distanceTo(b) * 0.08))
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      globe.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(80))), arcMat))
      const m = new THREE.Mesh(dotGeo, white)
      globe.add(m)
      pulses.push({ m, curve, o: i / cities.length })
      const dot = new THREE.Mesh(dotGeo, skyMat)
      dot.position.copy(b)
      globe.add(dot)
    })
    const home = new THREE.Mesh(track(new THREE.SphereGeometry(0.12, 16, 16)), white)
    home.position.copy(ll(...DHAKA))
    globe.add(home)

    /* ACT 3: server aisle */
    const aisle = new THREE.Group()
    scene.add(aisle)
    const ROWS = small ? 8 : 12
    const LPR = 10
    const racks = new THREE.InstancedMesh(
      track(new THREE.BoxGeometry(1.3, 3.4, 1.1)),
      track(new THREE.MeshStandardMaterial({ color: 0x1d3a57, metalness: 0.6, roughness: 0.35, emissive: 0x0a1f33, emissiveIntensity: 0.6 })),
      ROWS * 2,
    )
    const leds = new THREE.InstancedMesh(track(new THREE.BoxGeometry(0.5, 0.05, 0.02)), track(new THREE.MeshBasicMaterial({ color: 0xffffff })), ROWS * 2 * LPR)
    const M = new THREE.Matrix4()
    const col = new THREE.Color()
    let k = 0
    for (let i = 0; i < ROWS; i++)
      for (const side of [-1, 1]) {
        const x = side * 1.6
        const z = -i * 1.5
        M.makeTranslation(x, 0, z)
        racks.setMatrixAt(i * 2 + (side > 0 ? 1 : 0), M)
        for (let l = 0; l < LPR; l++) {
          M.makeTranslation(x - side * 0.66, -1.4 + l * 0.3, z)
          leds.setMatrixAt(k, M)
          leds.setColorAt(k, col.set(0x22c58b))
          k++
        }
      }
    aisle.add(racks, leds)
    const floor = new THREE.GridHelper(40, 40, 0x1b75bb, 0x163049)
    floor.position.y = -1.72
    ;(floor.material as THREE.Material).transparent = true
    ;(floor.material as THREE.Material).opacity = 0.5
    aisle.add(floor)
    const beam = new THREE.Mesh(track(new THREE.PlaneGeometry(0.08, ROWS * 1.5 + 6)), track(new THREE.MeshBasicMaterial({ color: SKY, transparent: true, opacity: 0.8 })))
    beam.rotation.x = -Math.PI / 2
    beam.position.set(0, -1.7, -ROWS * 0.75 + 1.5)
    aisle.add(beam)
    const aisleLight = new THREE.PointLight(0x4fa8ea, 30, 14)
    aisleLight.position.set(0, 2.5, -4)
    aisle.add(aisleLight)

    /* ACT 4: SSL lock */
    const lock = new THREE.Group()
    scene.add(lock)
    const lockMat = track(new THREE.MeshStandardMaterial({ color: BLUE, metalness: 0.6, roughness: 0.25, emissive: BLUE, emissiveIntensity: 0.25 }))
    lock.add(new THREE.Mesh(track(new THREE.BoxGeometry(2.2, 1.8, 0.8)), lockMat))
    const hole = new THREE.Mesh(track(new THREE.CylinderGeometry(0.16, 0.16, 0.82, 24)), track(new THREE.MeshBasicMaterial({ color: 0x08121d })))
    hole.rotation.x = Math.PI / 2
    hole.position.y = 0.12
    lock.add(hole)
    const shackle = new THREE.Mesh(track(new THREE.TorusGeometry(0.72, 0.16, 16, 48, Math.PI)), track(new THREE.MeshStandardMaterial({ color: SILVER, metalness: 0.9, roughness: 0.2 })))
    lock.add(shackle)
    const shields = [0, 1, 2].map((i) => {
      const t = new THREE.Mesh(track(new THREE.TorusGeometry(2.4 + i * 0.55, 0.015, 8, 140)), track(new THREE.MeshBasicMaterial({ color: SKY, transparent: true, opacity: 0.6 - i * 0.15 })))
      lock.add(t)
      return t
    })

    /* bloom on larger screens */
    let composer: EffectComposer | null = null
    if (!small) {
      composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.5, 0.22))
      composer.addPass(new OutputPass())
    }

    /* scroll mapping */
    const acts = Array.from(document.querySelectorAll<HTMLElement>('[data-act]'))
    const prog: Record<string, number> = {}
    acts.forEach((a) => (prog[a.dataset.act!] = 0))
    const smooth: Record<string, number> = { ...prog }
    const after = document.getElementById('services')
    const measure = () => {
      const vh = window.innerHeight
      acts.forEach((a) => {
        const r = a.getBoundingClientRect()
        prog[a.dataset.act!] = Math.max(0, Math.min(1, (vh - r.top) / (r.height + vh)))
      })
    }
    const bell = (p: number, a = 0.3, b = 0.7, f = 0.15) => Math.max(0, Math.min(1, (p - (a - f)) / f, (b + f - p) / f))
    const ss = (x: number) => x * x * (3 - 2 * x)
    const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
    const mouse = new THREE.Vector2()
    const target = new THREE.Vector2()
    const onMove = (e: PointerEvent) => target.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5)
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      composer?.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', onResize)

    const show = (g: THREE.Object3D, w: number) => {
      g.visible = w > 0.003
      g.scale.setScalar(0.6 + 0.4 * ss(w))
    }
    const clock = new THREE.Clock()
    let raf = 0
    const frame = () => {
      const t = reduce ? 0 : clock.getElapsedTime()
      measure()
      for (const key of Object.keys(prog)) smooth[key] += (prog[key] - smooth[key]) * (reduce ? 1 : 0.08)
      mouse.lerp(target, 0.05)
      const { hero: h = 0, globe: g = 0, infra: inf = 0, secure: sec = 0 } = smooth
      const past = after ? Math.max(0, 1 - after.getBoundingClientRect().top / window.innerHeight) : 0

      const wL = 1 - ss(clamp01((h - 0.55) / 0.3))
      logo.visible = wL > 0.003
      logo.position.set(small ? 1.6 : 4.4, (small ? -5.4 : 0) + (1 - wL) * 3, -(1 - wL) * 6)
      logo.rotation.y = -0.35 + Math.sin(t * 0.4) * 0.3 + mouse.x * 0.6 + (h - 0.5) * 2.4
      logo.rotation.x = mouse.y * 0.3 + Math.sin(t * 0.6) * 0.05
      ring.rotation.z = t * 0.3

      const wG = bell(g)
      show(globe, wG)
      globe.position.set(small ? 0 : -2.8, small ? 1.3 : 0, -(1 - wG) * 4)
      globe.rotation.set(0.35, -1.9 + g * 1.6 + t * 0.05, 0)
      pulses.forEach((p) => p.m.position.copy(p.curve.getPoint((t * 0.25 + p.o) % 1)))

      const wA = bell(inf)
      aisle.visible = wA > 0.02
      aisle.position.set(0, -0.3 + (1 - wA) * -5, -6 + inf * 15)
      if (!reduce && aisle.visible && leds.instanceColor) {
        for (let i = 0; i < ROWS * 2 * LPR; i++) {
          const on = Math.sin(t * 6 + i * 1.7) > 0.2
          leds.setColorAt(i, col.set(on ? (i % 7 === 0 ? 0x4fa8ea : 0x22c58b) : 0x0d2a22))
        }
        leds.instanceColor.needsUpdate = true
      }

      const wK = bell(sec)
      show(lock, wK)
      lock.position.set(small ? 0 : -2.6, small ? 1.4 : 0, -(1 - wK) * 4)
      lock.rotation.y = mouse.x * 0.6 + Math.sin(t * 0.5) * 0.25
      const shut = ss(clamp01((sec - 0.25) / 0.3))
      shackle.position.y = 0.9 + (1 - shut) * 0.7
      shields.forEach((s, i) => {
        s.rotation.x = Math.PI / 2 + Math.sin(t * 0.4 + i) * 0.6
        s.rotation.y = t * (0.2 + i * 0.1)
      })
      lockMat.emissiveIntensity = 0.2 + shut * 0.5

      stars.rotation.y = t * 0.01 + (h + g + inf + sec) * 0.25
      starMat.opacity = 0.7 - Math.min(0.45, past * 0.45)
      camera.position.x = mouse.x * 0.6
      camera.position.y = -mouse.y * 0.4
      camera.lookAt(0, 0, 0)

      if (composer) composer.render()
      else renderer.render(scene, camera)
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    frame()
    const onScrollReduced = () => frame()
    if (reduce) window.addEventListener('scroll', onScrollReduced, { passive: true })
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) frame()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScrollReduced)
      document.removeEventListener('visibilitychange', onVis)
      disposables.forEach((d) => d.dispose())
      composer?.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={ref} className='rh-stage' aria-hidden='true' />
}
