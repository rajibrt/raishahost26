import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ must stay crawlable: Google needs the CSS and JavaScript to render pages.
        disallow: ['/api/', '/preview/'],
      },
    ],
    sitemap: 'https://raishahost.com/sitemap.xml',
    host: 'https://raishahost.com',
  }
}
