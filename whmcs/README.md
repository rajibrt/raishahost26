# RaishaHost WHMCS theme

Theme for the billing and client area at https://hosting.raishahost.com (WHMCS 9.0.3).
Always change it here and upload; never edit the files on the server by hand.

| Folder | What |
|---|---|
| `templates/raishahost/` | Client theme, a child of WHMCS's **Nexus** theme. Only the files we change are here; everything else comes from Nexus, so WHMCS updates keep working. |
| `templates/orderforms/raishahost_cart/` | Order form (store pages), a child of **Standard Cart**. Plan cards like raishahost.com. `domainregister.tpl` is a copy of the stock file with one fix: a domain name in the link (`&query=name.com`) fills the AI search box. Re-copy it after a WHMCS update and keep the fix. |

## Design

- Same brand and tokens as raishahost.com (`src/styles/site.css`): blue `#1B75BB`, Manrope + IBM Plex Mono, navy footer.
- **Light mode is the default.** The moon/sun button in the header switches to dark mode (the raishahost.com redesign palette). The choice is kept in the visitor's browser (`localStorage` key `rh-theme`).
- All colours are CSS variables in `templates/raishahost/css/custom.css`: light values in `:root`, dark values in `:root[data-theme='dark']`. The same file maps Nexus's own variables (`--bg`, `--text`, `--primary`, ...) onto ours, so Nexus pages follow both modes.
- The printable invoice (`viewinvoice.php`) keeps WHMCS's own white layout.
- **PDF invoices and quotes** (`templates/raishahost/invoicepdf.tpl`, `quotepdf.tpl`) are copies of the Nexus files with one change: the PDF fonts have no Taka sign, so `৳` is written as `Tk ` in PDFs (it printed as `?`). Web pages and emails keep `৳`. Re-copy them after a WHMCS update and keep that line.
- **All CSS, including the order form's, is in `templates/raishahost/css/custom.css`.** The cart's own `css/custom.css` is linked by WHMCS without our cache-busting hash, so browsers kept stale copies; it is left empty on purpose.
- Nexus variables have meanings to respect: `--bg-inverted` is a solid button/badge surface (white text on it) but Nexus also uses it as cart label text, which we override; `--grayscale` is a dark button surface in light mode.
- After colour changes, check contrast in both modes (4.5:1 for text, 3:1 for large text). On 8 November 2026 every main page passed: home, store, domain register/transfer, cart, client area, invoices, tickets, knowledge base, contact, domain prices.

## Where the content comes from

- **Prices:** read live from WHMCS in the visitor's currency, so the homepage shows exactly what checkout charges.
- **Plan names, taglines, specs:** `src/data/plans.ts`, written into `templates/raishahost/includes/rh-plans.tpl` by the build script. Each plan's `whmcsPid` links it to its WHMCS product.
- `npm run check:prices` compares every BDT and USD price in `plans.ts` with WHMCS. Run it after changing a price in either place; both must match.
- WHMCS currencies: 1 = USD (base), 5 = BDT (prefix `৳`, format `1,234.56`).

## Build and upload

```bash
npm run whmcs:build      # writes rh-plans.tpl, stamps CSS/JS links with a file hash, makes whmcs/dist/raishahost-whmcs-theme.zip
```

1. cPanel → File Manager → `public_html/hosting/` → Upload the zip → Extract it there (it only contains `templates/raishahost/` and `templates/orderforms/raishahost_cart/`, so stock files are never touched). Delete the zip afterwards.
2. Preview without affecting visitors: open `https://hosting.raishahost.com/?systpl=raishahost&carttpl=raishahost_cart`. The choice sticks to your browser session only.
3. Go live (owner approval first): WHMCS Admin → System Settings → General → **System Theme** = RaishaHost; Ordering tab → **Order Form Template** = RaishaHost Cart.
4. Roll back: set the System Theme back to `six` (and the order form back to `universal_slider`).

## Smarty and Nexus notes (things that broke once)

- Never give the main menu `id="nav"`. Nexus's script runs `autoCollapse('#nav', 30)`, which moves items into a "More" menu until the menu is under 30 px tall; our taller menu without that "More" item made it loop forever and froze the page for every visitor who was not logged in (8 November 2026, fixed the same day). The menu is `id="rhMenu"`.
- Test as a guest too (private window or headless Chrome): pages for logged-in clients and for visitors run different code.

- Any `{` directly followed by a letter is a Smarty tag. Wrap inline JavaScript in `{literal}…{/literal}`.
- Variables set inside an included template are local to it; `rh-plans.tpl` uses `scope='global'`.
- `{function}` blocks do not see the page's variables; use an include (`includes/rh-plan-card.tpl`) instead.
- Static calls such as `\WHMCS\Product\Product::find($pid)` are allowed; most PHP functions used as modifiers are not.
- When logged in as admin, WHMCS shows the full error on the "Oops!" page, which is the quickest way to debug a template.
