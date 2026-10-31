# RaishaHost redesign prototypes

Every design iteration is kept here. Nothing is deleted; new work gets a new version number.

| Version | File | What it is | Published artifact |
|---|---|---|---|
| v1 | `v1-brand-directions.html` | Three brand directions (A/B/C) with mini homepage mockups and a draft brand guide. Uses the old cyan/indigo logo colors. | https://claude.ai/artifact/Er9HZz2UpWewSAN5PiEkfz |
| v2 | `v2-scroll-story-canvas.src.html` | First English homepage prototype: 2D canvas scroll story (domain → request → server → SSL → live), plans with BDT/USD toggle. Old colors. Source file; logo symbol placeholder `__LOGO__` not inlined. | https://claude.ai/artifact/EiKaN1jMkX3GpFJM92PP56 (version 1–2) |
| v3 | `v3-scroll-story-brand-colors.html` | Same as v2, switched to the official brand colors (#1B75BB blue, #3B3A3C charcoal) and the official logo. | https://claude.ai/artifact/EiKaN1jMkX3GpFJM92PP56 (unpublished locally) |
| v4 | `v4-threejs-live.html` | Three.js + GSAP homepage: 3D extruded logo, globe with arcs, server aisle fly-through, SSL lock, horizontal services, plans, policies, steps, work, FAQ. | https://claude.ai/artifact/2rKMxGnMrLzgx9uLPJotRg |

Official logo files: `public/brand/raishahost-logo.svg` (wordmark) and `public/brand/raishahost-mark.svg` (mark).

## In the Next.js app

| Version | Where | What it is |
|---|---|---|
| v5 | `src/app/page.tsx`, `src/components/home/`, `src/components/site/`, `src/styles/site.css` | v4 rebuilt as real Next.js pages: homepage with the Three.js scene and GSAP effects, new navigation and footer, plus `/hosting`, `/vps`, `/domains` and `/work`. Prices come from `src/data/plans.ts`. Old section components in `src/components/sections/` are kept, unused by the new homepage. |
