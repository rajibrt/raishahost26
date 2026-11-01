<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# RaishaHost website: guide for AI agents

This file is the single source of instructions for any AI agent (Claude Code, Codex, Cursor, Copilot, …) working on this repo. `CLAUDE.md` imports it. Read it fully before changing anything.

The owner usually writes in Bengali. Answer in the language they write in. Keep the website itself in English.

## 1. What this project is

The public website of **RaishaHost** (https://raishahost.com): a web hosting company in Bangladesh, in business **since 2008**, selling cPanel hosting, VPS servers, domains, web design and logo/graphic design to clients **worldwide**. The team is based in Bangladesh.

- Billing and the customer area run on WHMCS at `https://hosting.raishahost.com` (not in this repo).
  - Client Area / login: `https://hosting.raishahost.com/login`
  - Store: `https://hosting.raishahost.com/store` (VPS: `/store/vps`, cPanel: `/store/linux-shared-hosting/<plan>`)
  - Domain search: `https://hosting.raishahost.com/cart.php?a=add&domain=register&query=<name>`
- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind 4 (old pages), plain CSS for the redesign, three.js, GSAP + ScrollTrigger, Lenis smooth scroll, nodemailer + Cloudflare Turnstile for the contact form.

## 2. Deployment — read before you push

- Production runs on the owner's own server with **Dokploy**, app "Frontend", from GitHub `rajibrt/raishahost26`, branch **`main`**, built with the `Dockerfile` (Next.js `output: 'standalone'`, port 3000). Domains: `raishahost.com`, `www.raishahost.com`.
- **Autodeploy is ON: anything that reaches `main` goes live immediately.**
- Never push to `main` and never merge a PR unless the owner explicitly says so in the current conversation.
- Redesign work happens on branch `claude/dreamy-shannon-lp4smg`, open as draft PR #1 (`rajibrt/raishahost26#1`). Keep working on that branch (or a new branch off it) and push there for review.
- Old Vercel projects (`raishahost`, `raisha-host-site-fixed`) are unrelated older repos. Ignore them.

## 3. Business rules (must hold on every page)

- **Market:** focus on the **international market**. Say "worldwide" / "clients around the world", not "Bangladesh and the United States" or any short list of countries. It is fine (and builds trust) to say the team is based in Bangladesh.
- **Easy for Bangladeshi customers too:** plain, simple English (short sentences, everyday words, explain any technical term in a few words), BDT prices next to USD where a USD price exists, and local details such as payment methods and the +880 phone number easy to find. Apply this to every page and every new piece of copy.
- **Language:** English first, international standard. Bangla may be added later as `/bn`; keep copy in data/components so that is easy.
- **Billing periods:** cPanel (shared) hosting is billed **yearly**. VPS is billed **monthly**. Every price shown must state its period.
- **Prices live only in `src/data/plans.ts`.** Never hard-code a price elsewhere; read it from that file.
  - cPanel: Economy ৳3,800/yr, Standard ৳6,000/yr, Pro ৳12,000/yr (BDT only; no USD price set yet).
  - VPS: Starter ৳3,599 / $29.99, Business ৳5,599 / $46.99, Pro ৳6,599 / $54.99 per month.
  - VPS specs: Starter 2 vCPU / 4 GB / 40 GB NVMe; Business 4 vCPU / 8 GB / 40 GB; Pro 4 vCPU / 8 GB / 80 GB. All: 20 TB bandwidth, 1 IPv4 + IPv6, root access, Ubuntu/Debian/AlmaLinux, DDoS protection, 99.9% uptime.
- **Never reveal** the upstream server provider, data-center country/city or our cost price anywhere on the site (this was removed from WHMCS on purpose).
- **Money-back policy (30 days):** refunds the hosting fee for shared, VPS and reseller plans; request within 30 days of sign-up; once per client, first service only; account must be verified; domains, setup fees, payment-gateway fees, add-ons and design/development/SEO work are not refundable; free domain/SSL bundled with a plan is suspended on refund. Full text: `src/app/money-back/page.tsx`.
- Other promises shown on the site: free SSL on every hosting plan, 99.9% uptime target, 24/7 support via tickets.
- **No invented proof.** No fake testimonials, made-up client counts or ratings. Client names, logos and case studies only with the client's written permission. Case-study slots stay marked as placeholders until real ones arrive. Do not name existing clients (for example London Park, RCN) without permission.
- Contact: phone +880 1878-037803, Facebook `facebook.com/RaishaHost` (see `src/app/layout.tsx` JSON-LD for the full list).

## 4. Brand

- Official logo files: `public/brand/raishahost-logo.svg` (wordmark), `public/brand/raishahost-mark.svg` (RH mark).
- Brand colors: **blue `#1B75BB`**, **charcoal `#3B3A3C`**. On dark backgrounds the charcoal parts become white: use `public/brand/*-on-dark.svg`.
- The old `public/raisha-host-logo.svg` (cyan/indigo) is **not** the official logo; it is only still used by old pages.
- Redesign tokens (dark theme) are in `src/styles/site.css` under `.rh`: background `#08121d`, panels `#0e1c2b`, sky accent `#4fa8ea`, fonts Manrope (text) and IBM Plex Mono (labels, numbers).
- Style direction: a "living" site that tells a story as you scroll (owner's reference: YouTube `snErQUyqwCU`, scroll-scrubbed AI video sites). Avoid generic AI-template looks: no custom cursor, no glow on every card, no gradient text everywhere.

## 5. Where things are

| Path | What |
|---|---|
| `src/app/page.tsx` | Homepage (current version **v7**) |
| `src/components/home/ScrollFrames.tsx` | Pinned section that plays a video frame by frame with the scrollbar, with captions per scroll range |
| `src/components/home/HomeScene.tsx` | Fixed three.js stage (3D logo, globe, server aisle, SSL lock) driven by `[data-act]` sections. Only `/preview/v5` uses it now; the v7 homepage uses scroll videos instead |
| `src/components/home/HomeBody.tsx` | Homepage sections after the story: services, plans, policies, steps, work, FAQ, CTA |
| `src/components/home/HomeMotion.tsx` | GSAP reveals, counters, horizontal services, steps rail |
| `src/components/home/HomeV5.tsx` | Frozen v5 homepage, served at `/preview/v5` |
| `src/components/site/` | New nav (`SiteNav`), footer, links (`links.ts`), plan cards (`PlanTabs`), domain search, inner page shell |
| `src/app/hosting`, `vps`, `domains`, `work`, `services`, `about`, `contact`, `logo-design`, `knowledge`, `money-back`, `guarantees`, `terms-conditions`, `privacy` | Redesign pages, all built on `InnerPage` |
| `src/components/site/PageMotion.tsx`, `DocMotion.tsx`, `PolicyDoc.tsx` | Scroll motion for inner pages, reading progress and contents list, policy document layout |
| `src/components/sections/`, `Navbar.tsx`, `Footer.tsx`, `*Content.tsx` in old routes | Old design, no longer used. Keep until the owner agrees to remove |
| `src/data/plans.ts` | All plan prices and specs |
| `design/prototypes/` | Every design version (v1–v6) with a README. **Never delete a version; add the next number** |
| `scripts/fetch-media.sh`, `scripts/extract-frames.sh` | Download the Higgsfield videos and turn them into WebP frames in `public/media/<name>/` |

## 6. Commands

```bash
npm ci                     # install
npm run dev                # dev server on http://localhost:3000
npm run build && npm start # production build, closest to the live site (use this to judge 3D/scroll smoothness)
npm run lint               # eslint
npx tsc --noEmit -p .      # type check
scripts/fetch-media.sh     # needs ffmpeg (macOS: brew install ffmpeg); creates public/media/* frames
```

Before every push: `npm run lint`, `npx tsc --noEmit -p .` and `npm run build` must pass.

## 7. Scroll video sections (how v6 works)

1. Generate a short (≈8 s), single continuous shot with no cuts and slow linear motion (Higgsfield: still with `gpt_image_2_5`, then video with `seedance_2_5`, no audio). Ask the owner before spending credits and tell them the cost first.
2. Add its URL to `scripts/fetch-media.sh` and run it. It writes `public/media/<name>/desktop/*.webp`, `mobile/*.webp` and `manifest.json`.
3. Use `<ScrollFrames name="<name>" captions={[...]} length={300} />`. Captions are `{ from, to, content, align }` with scroll progress 0–1.
4. Keep frame folders small (desktop ≈1600 px wide, WebP q≈74; mobile 900 px, half the fps). Commit the generated frames so Dokploy can serve them.

Current videos: `server-explode` (hero), `earth-reach` (light lines from Dhaka to the world) and `light-tunnel`.

## 8. Working rules for agents

- Keep each design iteration: record it in `design/prototypes/README.md` with its version number.
- Don't delete old pages, components or prototypes unless the owner asks.
- Scope new CSS under `.rh` so old pages are not affected.
- Respect `prefers-reduced-motion`, keep pages usable on a 390 px phone with no horizontal scroll, and make content readable even if WebGL or the frames fail to load.
- Every page must work on any screen: small phones (280–360 px wide, including foldable cover screens), tall modern phones (19.5:9–21:9), phones held sideways (short screens, about 390 px tall), tablets, laptops and ultrawide monitors (2560 px+). See "Responsive targets" below.
- Commit with clear messages. Ask before anything outward-facing: merging, deploying, changing Dokploy/WHMCS, spending Higgsfield credits, posting comments.

### Building a page in the redesign

- Use `InnerPage` (navigation, page header, footer, page-entry motion) and the shared `.rh` classes in `src/styles/site.css`. Do not use Tailwind classes, `lucide` colour icons, gradient text or glow cards on redesigned pages.
- Motion: `PageMotion` (loaded by `InnerPage`) reveals `.rv` elements and the children of `[data-stagger]` as they scroll in, runs `[data-count]` counters and draws `[data-draw]` lines. `src/app/template.tsx` plays the entrance when a page opens. Pick motion that explains the content (a timeline that draws, a list that builds up); do not animate everything.
- Three.js is only worth it where a 3D object carries meaning; it costs load time on phones. The v7 homepage uses scroll videos instead. Inner pages use GSAP.

### Responsive targets (audit these before you push)

| Size | What it stands for |
|---|---|
| 280 × 653 | Foldable cover screen, smallest phone |
| 320 × 568, 360 × 800 | Small Android / older iPhone |
| 375 × 667, 390 × 844, 412 × 915, 430 × 932 | Common phones, tall 19.5:9–20:9 |
| 844 × 390, 932 × 430 | Phones held sideways (short screens) |
| 600 × 960, 768 × 1024, 820 × 1180 | Foldable open, tablets |
| 1024 × 768, 1280 × 800, 1440 × 900 | Small laptops |
| 1920 × 1080, 2560 × 1080 | Desktop and ultrawide |

Check: no horizontal scroll, nothing hidden under the fixed navigation, text readable (no text under 12 px), buttons at least 44 px tall on touch screens.

## 9. Status and plan

The single place to see what is done and what is left. Update it in the same commit as the work.

### Done

- Homepage v7: three scroll videos (server, Earth reach, light tunnel) with a chapter rail, crossfades between videos and a soft handoff to the services section; no three.js on the homepage.
- Every route is in the new design (v8): `/`, `/hosting`, `/vps`, `/domains`, `/work`, `/services`, `/about`, `/contact`, `/logo-design`, `/knowledge`, `/knowledge/[slug]`, `/money-back`, `/guarantees`, `/terms-conditions` and the new `/privacy`. `/web-design` and `/web-design/packages` redirect to `/services`.
- Shared blocks in `src/styles/site.css` (cards, split, checks/crosses, timeline, policy document with sticky contents, forms, contact cards, band, article) and motion components: `PageMotion` (scroll reveals, staggers, counters, drawn lines), `DocMotion` (reading-progress bar and active contents link), `PolicyDoc`.
- Per-page motion: services (staggered cards, steps rail that draws), about (counters, a timeline that draws), contact (staggered contact cards, form thank-you), logo design (checklist, steps rail), knowledge (staggered articles, reading progress on articles), policies (contents list that follows the section you read, reading progress).
- Copy is plain English and follows section 3: no testimonials or client counts, "99.9% uptime target", money-back conditions written out, website package prices moved to `websitePackages` in `src/data/plans.ts`.
- Same header (`SiteNav`) and footer (`SiteFooter`) on every page; mobile GSAP drawer; desktop GSAP dropdowns; page-entry motion (`src/app/template.tsx`).
- Responsive audit (November 2026): all 15 routes at all 18 sizes in "Responsive targets" have no sideways scroll, nothing cut off and no text under 12 px. Short screens (phones held sideways) get smaller homepage captions and a compact chapter rail.
- Sitemap lists every route, including `/hosting`, `/vps`, `/domains`, `/work` and `/privacy`; the footer links to `/privacy`.

### Kept but no longer used

- `src/app/services/ServicesContent.tsx`, `src/app/logo-design/LogoDesignContent.tsx`, `src/app/contact/ContactContent.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/sections/*`, `src/components/ScrollReveal.tsx`, `src/components/ui/BorderGlow.tsx`: old design, kept until the owner agrees to remove them.

### To do

1. Real case studies for `/work` (needs client permission).
2. Optional: a `/bn` Bangla version (copy lives in each page file and `src/data/plans.ts`).
3. Optional: a scroll video or 3D piece for `/vps` (server parts) if the owner wants one; ask before spending Higgsfield credits.
4. Re-run the responsive audit after any layout change.

### Needs the owner

- Confirm: "Renewal prices are shown before you pay" (homepage billing card), payment methods offered (bKash, Nagad, bank, card?), and whether the Messenger widget text should be English.
- Are the old testimonials (Jim J., Wayne, M L Shannon) real and may we show them? They are off the site until confirmed.
- Real case studies (with permission) for `/work`.
- Review the new `/privacy` text before it goes live.
- Business hours and the second phone number (+880 1711-380679) shown on the old contact page: still correct?
