// HTML emails sent by the contact form (src/app/api/contact/route.ts), in the site's design tokens
// (.rh in src/styles/site.css). Email clients ignore <style> blocks and web fonts unevenly, so every
// style is inline, the layout uses tables and fonts fall back to system ones. All values passed in
// must already be HTML-escaped.

const C = {
  bg: '#08121d',
  panel: '#0e1c2b',
  panel2: '#13263a',
  line: '#22384f',
  text: '#e8eef5',
  muted: '#93a6ba',
  sky: '#4fa8ea',
  blue: '#1B75BB',
}
const FONT = "Manrope, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const MONO = "'IBM Plex Mono', SFMono-Regular, Menlo, Consolas, monospace"
const SITE = 'https://raishahost.com'
const LOGO = `${SITE}/brand/raishahost-logo-on-dark@2x.png`

const label = (text: string) =>
  `<div style="font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.sky};margin:0 0 10px;">${text}</div>`

const row = (name: string, value: string, last = false) => `
  <tr>
    <td style="padding:10px 12px 10px 0;width:150px;vertical-align:top;font-family:${MONO};font-size:12px;color:${C.muted};${last ? '' : `border-bottom:1px solid ${C.line};`}">${name}</td>
    <td style="padding:10px 0;vertical-align:top;font-size:14px;color:${C.text};word-break:break-word;${last ? '' : `border-bottom:1px solid ${C.line};`}">${value}</td>
  </tr>`

const button = (href: string, text: string) =>
  `<a href="${href}" style="display:inline-block;background:${C.blue};color:#ffffff;font-family:${FONT};font-size:15px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:10px;">${text}</a>`

/** The outer frame: dark page, logo header, content card, footer. */
function frame(preheader: string, body: string, footer: string) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"></head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;font-family:${FONT};color:${C.text};">
      <tr><td style="padding:0 4px 20px;">
        <a href="${SITE}" style="text-decoration:none;"><img src="${LOGO}" width="200" height="26" alt="RaishaHost" style="display:block;border:0;width:200px;height:auto;"></a>
      </td></tr>
      <tr><td style="background:${C.panel};border:1px solid ${C.line};border-radius:16px;padding:32px 28px;">
        ${body}
      </td></tr>
      <tr><td style="padding:20px 4px 0;font-size:12px;line-height:1.7;color:${C.muted};">${footer}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

export interface ContactNotice {
  name: string
  email: string
  subject: string
  message: string
  /** [label, value] pairs, already escaped. */
  metadata: [string, string][]
}

/** The message RaishaHost receives for each form submission. */
export function contactNoticeEmail(m: ContactNotice) {
  const body = `
    ${label('New contact message')}
    <h1 style="margin:0 0 6px;font-size:26px;line-height:1.2;font-weight:800;color:${C.text};">${m.subject}</h1>
    <p style="margin:0 0 24px;font-size:14px;color:${C.muted};">From the contact form on <a href="${SITE}/contact" style="color:${C.sky};text-decoration:none;">raishahost.com</a></p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Name', `<strong>${m.name}</strong>`)}
      ${row('Email', `<a href="mailto:${m.email}" style="color:${C.sky};text-decoration:none;">${m.email}</a>`, true)}
    </table>
    <div style="margin:24px 0 0;">
      ${label('Message')}
      <div style="background:${C.bg};border:1px solid ${C.line};border-radius:12px;padding:16px 18px;font-size:15px;line-height:1.7;color:${C.text};white-space:pre-wrap;">${m.message}</div>
    </div>
    <div style="margin:28px 0 0;text-align:center;">${button(`mailto:${m.email}`, `Reply to ${m.name}`)}</div>
    <div style="margin:32px 0 0;padding:20px 0 0;border-top:1px solid ${C.line};">
      ${label('Sender details')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${m.metadata.map(([k, v], i) => row(k, v, i === m.metadata.length - 1)).join('')}
      </table>
    </div>`
  const footer = 'Sent by the contact form on raishahost.com. Replying to this email goes straight to the sender.'
  return frame(`${m.name}: ${m.subject}`, body, footer)
}

/** The confirmation the visitor receives. */
export function contactReceiptEmail(r: { name: string; message: string }) {
  const body = `
    ${label('Message received')}
    <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;font-weight:800;color:${C.text};">Hi ${r.name}, we got <span style="color:${C.sky};">your message.</span></h1>
    <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:${C.muted};">Thank you for writing to RaishaHost. A real person from our team will reply, usually within <strong style="color:${C.text};">2–4 hours</strong> during business hours (10 am – 8 pm, Bangladesh time).</p>
    ${label('Your message')}
    <div style="background:${C.bg};border:1px solid ${C.line};border-radius:12px;padding:16px 18px;font-size:15px;line-height:1.7;color:${C.text};white-space:pre-wrap;">${r.message}</div>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:${C.muted};">Need help sooner? Call <a href="tel:+8801878037803" style="color:${C.sky};text-decoration:none;">+880 1878-037803</a>, or open a support ticket if you are already a customer.</p>
    <div style="margin:28px 0 0;">${button(`${SITE}/hosting`, 'See our hosting plans')}</div>`
  const footer = `RaishaHost · Web hosting, VPS servers, domains and web design since 2008<br><a href="${SITE}" style="color:${C.sky};text-decoration:none;">raishahost.com</a> · <a href="https://facebook.com/RaishaHost" style="color:${C.sky};text-decoration:none;">facebook.com/RaishaHost</a>`
  return frame('We received your message and will reply soon.', body, footer)
}
