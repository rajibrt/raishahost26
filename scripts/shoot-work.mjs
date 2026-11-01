#!/usr/bin/env node
// Screenshots of client websites for /work, saved as WebP in public/work/:
//   <slug>.webp       first screen (1440 x 900), shown on cards
//   <slug>-full.webp  long page (1440 x 2700), scrolls inside the browser frame on hover
//
// Drives Google Chrome over the DevTools protocol in real time: it opens each site, waits for
// sliders and lazy images, scrolls once through the page to wake scroll animations, returns to the
// top and then captures. (Chrome's --virtual-time-budget skips real time, which left hero sliders
// blank on many sites.)
//
// Needs Google Chrome, ImageMagick (`magick`) and cwebp. Run from the project root:
//   node scripts/shoot-work.mjs              all sites
//   node scripts/shoot-work.mjs rcn fnf      only these slugs
// Keep slugs in step with src/data/work.ts.
import { spawn, execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const OUT = 'public/work'
const PORT = 9333

// slug -> address to photograph (RCN is shot from its preview until the new site is on rcnbd.net)
const SITES = {
  camerabazar: 'https://camerabazar.net/',
  londonpark: 'https://londonparkdhaka.com/',
  smartarchi: 'https://smartarchibd.com/',
  greenpeak: 'https://greenpeakbd.com/',
  gloriahomes: 'https://gloriahomesbd.com/',
  porzobekkhon: 'https://porzobekkhon.net/',
  fnf: 'https://fnfltd.com/',
  jake: 'https://www.jakebd.com/',
  hexagontex: 'https://hexagontex.com/',
  rolatrims: 'https://rolatrims.com/',
  janani: 'https://jananibd.com/',
  rcn: 'https://preview.rcnbd.net/en',
  primefinance: 'https://primefinancr.com.au/',
  rmttourism: 'https://rmttourism.com/',
  sgreliable: 'https://sgreliablepainting.com/',
  sohelart: 'https://sohelart.com/',
  ultratech: 'https://ultratechbd.com/',
  wingsfly: 'https://wingsflyaviationacademy.com/',
}

// Sites whose sections only appear while you scroll (scroll animations): their long screenshot is
// stitched from three real screens taken while scrolling, instead of one capture of the whole page.
const STITCH = new Set(['londonpark', 'primefinance'])
const STICKY_HEADER = 80 // px of fixed header to drop from the 2nd and 3rd screens

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const withTimeout = (p, ms, what) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(`${what} timed out`)), ms))])

/** A tiny DevTools-protocol client over the page's WebSocket. */
async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl)
  await new Promise((res, rej) => ((ws.onopen = res), (ws.onerror = rej)))
  let id = 0
  const pending = new Map()
  const listeners = new Map()
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) rej(new Error(msg.error.message))
      else res(msg.result)
    } else if (msg.method && listeners.has(msg.method)) listeners.get(msg.method)(msg.params)
  }
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const n = ++id
      pending.set(n, { res, rej })
      ws.send(JSON.stringify({ id: n, method, params }))
    })
  const once = (method) => new Promise((res) => listeners.set(method, res))
  return { send, once, close: () => ws.close() }
}

async function shoot(slug, url, tmp) {
  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json()
  const cdp = await connect(target.webSocketDebuggerUrl)
  try {
    await cdp.send('Page.enable')
    await cdp.send('Network.setUserAgentOverride', { userAgent: UA })
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    const loaded = cdp.once('Page.loadEventFired')
    await cdp.send('Page.navigate', { url })
    await withTimeout(loaded, 45000, 'page load').catch(() => {}) // some sites never fire load; carry on
    await sleep(6000) // bot checks, sliders and web fonts
    const evalJs = (expression) => cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    // Some WordPress sites sometimes print PHP warnings above the page (a server permission problem on
    // their side). Remove that text before the screenshot and report it so the site can be fixed.
    const php = await evalJs(`(() => {
      // PHP prints warnings as loose text, <b> and <br> before the page's first real element.
      const lead = []
      for (const node of document.body.childNodes) {
        if (node.nodeType === 1 && !['B', 'BR', 'STRONG', 'FONT'].includes(node.tagName)) break
        lead.push(node)
      }
      const text = lead.map((n) => n.textContent).join('').replace(/\\s+/g, ' ').trim()
      if (!/(Warning|Notice|Deprecated|Fatal error)\\s*:/.test(text)) return ''
      lead.forEach((n) => n.remove())
      return text.slice(0, 140)
    })()`)
    if (php.result?.value) console.log(`${slug}  PHP warning on the live site, removed from the screenshot: ${php.result.value}`)
    // Scroll through the page to trigger lazy images and reveal-on-scroll animations, then go back up.
    await evalJs(`(async () => { const h = Math.min(document.body.scrollHeight, 6000); for (let y = 0; y <= h; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) } scrollTo(0, 0) })()`)
    await sleep(2500)
    const cover = await cdp.send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(join(tmp, `${slug}.png`), Buffer.from(cover.data, 'base64'))
    if (STITCH.has(slug)) {
      const parts = []
      for (const y of [0, 900, 1800]) {
        await evalJs(`scrollTo(0, ${y})`)
        await sleep(1800)
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png' })
        const part = join(tmp, `${slug}-part${y}.png`)
        writeFileSync(part, Buffer.from(shot.data, 'base64'))
        // Below the first screen, cut off the site's sticky header so it does not repeat at each join.
        if (y > 0) execFileSync('magick', [part, '-crop', `1440x${900 - STICKY_HEADER}+0+${STICKY_HEADER}`, '+repage', part])
        parts.push(part)
      }
      execFileSync('magick', [...parts, '-append', join(tmp, `${slug}-full.png`)])
    } else {
      const full = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: 1440, height: 2700, scale: 1 },
      })
      writeFileSync(join(tmp, `${slug}-full.png`), Buffer.from(full.data, 'base64'))
    }
  } finally {
    cdp.close()
    await fetch(`http://127.0.0.1:${PORT}/json/close/${target.id}`).catch(() => {})
  }
}

const only = process.argv.slice(2)
const tmp = mkdtempSync(join(tmpdir(), 'rh-work-'))
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${join(tmp, 'profile')}`,
  '--hide-scrollbars',
  '--mute-audio',
  '--no-first-run',
  'about:blank',
], { stdio: 'ignore' })

try {
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(`http://127.0.0.1:${PORT}/json/version`)
      break
    } catch {
      await sleep(200)
    }
  }
  for (const [slug, url] of Object.entries(SITES)) {
    if (only.length && !only.includes(slug)) continue
    try {
      await withTimeout(shoot(slug, url, tmp), 90000, 'capture')
      execFileSync('magick', [join(tmp, `${slug}.png`), '-resize', '1200x', join(tmp, `${slug}-s.png`)])
      execFileSync('magick', [join(tmp, `${slug}-full.png`), '-resize', '800x', join(tmp, `${slug}-full-s.png`)])
      execFileSync('cwebp', ['-quiet', '-q', '78', join(tmp, `${slug}-s.png`), '-o', `${OUT}/${slug}.webp`])
      execFileSync('cwebp', ['-quiet', '-q', '72', join(tmp, `${slug}-full-s.png`), '-o', `${OUT}/${slug}-full.webp`])
      const kb = (f) => Math.round(statSync(f).size / 1024)
      console.log(`${slug}  ${kb(`${OUT}/${slug}.webp`)} KB + ${kb(`${OUT}/${slug}-full.webp`)} KB`)
    } catch (e) {
      console.log(`${slug}  FAILED (${e.message}); kept any older screenshot`)
    }
  }
} finally {
  chrome.kill()
  await sleep(500)
  rmSync(tmp, { recursive: true, force: true })
}
