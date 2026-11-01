#!/usr/bin/env node
// Builds the share images (Open Graph / X cards) for every page in English and Bangla:
// public/og/<lang>/<page>.jpg, 1200 x 630.
//
// Each card is a frame from the homepage scroll videos that fits the page, the logo, and the
// page's own title. Text is laid out by rsvg-convert (Pango), which shapes Bangla conjuncts
// correctly; Next's built-in image renderer cannot.
//
// Needs: rsvg-convert, ffmpeg, ImageMagick (`magick`), and the fonts "Inter" and
// "Noto Sans Bengali UI" installed. Run from the project root: node scripts/make-og.mjs
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Background frames (public/media/<video>/desktop/<frame>.webp), picked to match each page.
const BG = {
  serverClosed: ['server-explode', '0012'],
  serverOpen: ['server-explode', '0150'],
  serverParts: ['server-explode', '0100'],
  earthDhaka: ['earth-reach', '0010'],
  earthLines: ['earth-reach', '0170'],
  tunnel: ['light-tunnel', '0100'],
  tunnelDeep: ['light-tunnel', '0060'],
}

// key, background, then per language: kicker, title lines, one-line description
const CARDS = [
  ['home', 'serverOpen', {
    en: ['Web hosting since 2008', ['Your website,', 'always on.'], 'Hosting, VPS servers, domains and websites worldwide.'],
    bn: ['২০০৮ থেকে ওয়েব হোস্টিং', ['আপনার ওয়েবসাইট,', 'সবসময় অনলাইনে।'], 'বিশ্বজুড়ে হোস্টিং, VPS সার্ভার, ডোমেইন ও ওয়েবসাইট।'],
  }],
  ['hosting', 'serverClosed', {
    en: ['cPanel hosting · billed yearly', ['Hosting that', 'just works.'], 'cPanel, email, free SSL and SSD storage.'],
    bn: ['cPanel হোস্টিং · বছরে বিল', ['যে হোস্টিং', 'ঝামেলা ছাড়াই চলে।'], 'cPanel, ইমেইল, ফ্রি SSL ও SSD স্টোরেজ।'],
  }],
  ['vps', 'serverParts', {
    en: ['VPS servers · billed monthly', ['Your own server.', 'Your rules.'], 'Root access, NVMe storage, 20 TB bandwidth.'],
    bn: ['VPS সার্ভার · মাসে বিল', ['নিজের সার্ভার।', 'নিজের নিয়ম।'], 'রুট অ্যাক্সেস, NVMe স্টোরেজ, ২০ টিবি ব্যান্ডউইথ।'],
  }],
  ['domains', 'earthLines', {
    en: ['Domains', ['Find your', 'name.'], '.com, .com.bd, .net, .org and more.'],
    bn: ['ডোমেইন', ['আপনার', 'নাম খুঁজুন।'], '.com, .com.bd, .net, .org সহ আরও।'],
  }],
  ['work', 'earthLines', {
    en: ['Our work', ['Websites we', 'designed and built.'], 'E-commerce, developers, ISPs, finance, travel and more.'],
    bn: ['আমাদের কাজ', ['যে ওয়েবসাইট আমরা', 'ডিজাইন ও তৈরি করেছি।'], 'ই-কমার্স, ডেভেলপার, ইন্টারনেট প্রোভাইডারসহ আরও অনেক।'],
  }],
  ['services', 'tunnel', {
    en: ['Services', ['One team for your', 'whole web presence.'], 'Websites, apps, online stores and design.'],
    bn: ['সার্ভিস', ['আপনার পুরো ওয়েব উপস্থিতির', 'জন্য একটি টিম।'], 'ওয়েবসাইট, অ্যাপ, অনলাইন শপ ও ডিজাইন।'],
  }],
  ['logo-design', 'tunnelDeep', {
    en: ['Logo & graphic design', ['Your brand,', 'clearly designed.'], 'Logos, brand identity, social and print design.'],
    bn: ['লোগো ও গ্রাফিক ডিজাইন', ['আপনার ব্র্যান্ড,', 'স্পষ্ট ডিজাইনে।'], 'লোগো, ব্র্যান্ড পরিচিতি, সোশ্যাল ও প্রিন্ট ডিজাইন।'],
  }],
  ['about', 'earthDhaka', {
    en: ['About us · since 2008', ['Hosting with', 'people behind it.'], 'Based in Bangladesh, serving clients worldwide.'],
    bn: ['আমাদের সম্পর্কে · ২০০৮ থেকে', ['যে হোস্টিংয়ের পেছনে', 'মানুষ আছে।'], 'বাংলাদেশভিত্তিক, বিশ্বজুড়ে ক্লায়েন্টদের সেবায়।'],
  }],
  ['contact', 'earthLines', {
    en: ['Contact', ['Talk to', 'a real person.'], 'Call, email or message. Replies in 2–4 hours.'],
    bn: ['যোগাযোগ', ['সরাসরি মানুষের', 'সাথে কথা বলুন।'], 'কল, ইমেইল বা মেসেজ। ২–৪ ঘণ্টায় উত্তর।'],
  }],
  ['knowledge', 'tunnelDeep', {
    en: ['Knowledge base', ['Learn before', 'you launch.'], 'Practical guides on hosting, domains and websites.'],
    bn: ['নলেজ বেস', ['লঞ্চের আগে', 'জেনে নিন।'], 'হোস্টিং, ডোমেইন ও ওয়েবসাইট নিয়ে কাজের গাইড।'],
  }],
  ['facebook-dependent-business', 'tunnelDeep', {
    en: ['Knowledge base · Business', ['Does your business depend', 'only on Facebook?'], 'Why your own website protects you.'],
    bn: ['নলেজ বেস · ব্যবসা', ['আপনার ব্যবসা কি শুধুমাত্র', 'ফেসবুক নির্ভর?'], 'নিজের ওয়েবসাইট কেন আপনাকে সুরক্ষা দেয়।'],
  }],
  ['woocommerce-product-pages', 'tunnelDeep', {
    en: ['Knowledge base · E-commerce', ['4 ways to create better', 'WooCommerce product pages'], 'Turn more visitors into buyers.'],
    bn: ['নলেজ বেস · ই-কমার্স', ['4 Ways to Create Better', 'WooCommerce Product Pages'], 'আর্টিকেলটি ইংরেজিতে।'],
  }],
  ['domain-hosting-tips', 'tunnelDeep', {
    en: ['Knowledge base · Hosting tips', ['What to check before you buy', 'a domain and hosting'], 'The points that matter, and the mistakes to avoid.'],
    bn: ['নলেজ বেস · হোস্টিং টিপস', ['ডোমেইন ও হোস্টিং কেনার আগে', 'অবশ্যই মনে রাখবেন'], 'যা দেখবেন, আর যে ভুলগুলো এড়াবেন।'],
  }],
  ['money-back', 'serverClosed', {
    en: ['Refund policy', ['30-day', 'money-back.'], 'Refund of the hosting fee within 30 days of sign-up.'],
    bn: ['রিফান্ড নীতি', ['৩০ দিনের', 'মানি-ব্যাক।'], 'সাইন-আপের ৩০ দিনের মধ্যে হোস্টিং ফি ফেরত।'],
  }],
  ['guarantees', 'serverOpen', {
    en: ['Our promises', ['What you can', 'count on.'], '99.9% uptime target, free SSL, 24/7 support.'],
    bn: ['আমাদের প্রতিশ্রুতি', ['যার ওপর', 'ভরসা রাখতে পারেন।'], '৯৯.৯% আপটাইম লক্ষ্য, ফ্রি SSL, ২৪/৭ সাপোর্ট।'],
  }],
  ['terms-conditions', 'serverClosed', {
    en: ['Legal', ['Terms &', 'conditions.'], 'The rules for using RaishaHost services.'],
    bn: ['আইনি', ['শর্তাবলী'], 'RaishaHost-এর সার্ভিস ব্যবহারের নিয়ম।'],
  }],
  ['privacy', 'serverClosed', {
    en: ['Legal', ['Privacy', 'policy.'], 'What we collect, why, and how we protect it.'],
    bn: ['আইনি', ['গোপনীয়তা', 'নীতি।'], 'কী সংগ্রহ করি, কেন করি, কীভাবে সুরক্ষা দিই।'],
  }],
]

const W = 1200
const H = 630
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function card(bg, logo, lang, [kicker, lines, sub]) {
  const font = lang === 'bn' ? "'Noto Sans Bengali UI', 'Inter', sans-serif" : "'Inter', 'Noto Sans Bengali UI', sans-serif"
  const size = lines.some((l) => l.length > 22) ? 58 : 72
  const lh = Math.round(size * (lang === 'bn' ? 1.3 : 1.08))
  const titleTop = 300 - ((lines.length - 1) * lh) / 2
  const title = lines
    .map((l, i) => `<text x='80' y='${titleTop + i * lh}' font-size='${size}' font-weight='800' fill='${i === lines.length - 1 && lines.length > 1 ? '#4fa8ea' : '#f3f6fa'}'>${esc(l)}</text>`)
    .join('')
  return `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>
  <defs>
    <linearGradient id='shade' x1='0' x2='1' y1='0' y2='0'>
      <stop offset='0' stop-color='#08121d' stop-opacity='0.96'/>
      <stop offset='0.55' stop-color='#08121d' stop-opacity='0.72'/>
      <stop offset='1' stop-color='#08121d' stop-opacity='0.2'/>
    </linearGradient>
    <linearGradient id='foot' x1='0' x2='0' y1='0' y2='1'>
      <stop offset='0.6' stop-color='#08121d' stop-opacity='0'/>
      <stop offset='1' stop-color='#08121d' stop-opacity='0.9'/>
    </linearGradient>
  </defs>
  <rect width='${W}' height='${H}' fill='#08121d'/>
  <image href='data:image/jpeg;base64,${bg}' x='0' y='0' width='${W}' height='${H}' preserveAspectRatio='xMidYMid slice'/>
  <rect width='${W}' height='${H}' fill='url(#shade)'/>
  <rect width='${W}' height='${H}' fill='url(#foot)'/>
  <image href='data:image/svg+xml;base64,${logo}' x='80' y='64' width='260' height='33'/>
  <g font-family="${font}">
    <text x='80' y='${titleTop - size - 8}' font-size='24' font-weight='600' fill='#4fa8ea' letter-spacing='${lang === 'bn' ? 0 : 3}'>${esc(lang === 'bn' ? kicker : kicker.toUpperCase())}</text>
    ${title}
    <text x='80' y='${titleTop + (lines.length - 1) * lh + 62}' font-size='28' fill='#b6c4d3'>${esc(sub)}</text>
    <text x='80' y='572' font-size='22' font-weight='600' fill='#93a6ba'>raishahost.com</text>
  </g>
  <rect x='${W - 80 - 176}' y='546' width='176' height='40' rx='20' fill='#0e1c2b' stroke='#22384f'/>
  <text x='${W - 80 - 88}' y='573' text-anchor='middle' font-family="${font}" font-size='19' font-weight='600' fill='#f3f6fa'>${lang === 'bn' ? '২০০৮ থেকে' : 'Since 2008'}</text>
</svg>`
}

const tmp = mkdtempSync(join(tmpdir(), 'rh-og-'))
try {
  const logo = readFileSync('public/brand/raishahost-logo-on-dark.svg').toString('base64')
  const bgs = {}
  for (const [name, [video, frame]] of Object.entries(BG)) {
    const out = join(tmp, `${name}.jpg`)
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', `public/media/${video}/desktop/${frame}.webp`, '-vf', `scale=${W}:-2,crop=${W}:${H}`, '-q:v', '3', out])
    bgs[name] = readFileSync(out).toString('base64')
  }
  for (const lang of ['en', 'bn']) {
    mkdirSync(`public/og/${lang}`, { recursive: true })
    for (const [key, bg, text] of CARDS) {
      const svg = join(tmp, `${lang}-${key}.svg`)
      const png = join(tmp, `${lang}-${key}.png`)
      writeFileSync(svg, card(bgs[bg], logo, lang, text[lang]))
      execFileSync('rsvg-convert', ['-w', String(W), '-h', String(H), '-o', png, svg])
      execFileSync('magick', [png, '-strip', '-quality', '84', `public/og/${lang}/${key}.jpg`])
    }
  }
  console.log(`Wrote ${CARDS.length * 2} share images to public/og/`)
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
