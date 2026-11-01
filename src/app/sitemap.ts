import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
import { SITE, localPath } from '@/i18n'

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

// Every page exists in English and in Bangla (/bn); each entry lists both versions.
const pages: [string, Freq, number][] = [
  ['/', 'weekly', 1],
  ['/hosting', 'monthly', 0.9],
  ['/vps', 'monthly', 0.9],
  ['/domains', 'monthly', 0.8],
  ['/services', 'monthly', 0.9],
  ['/logo-design', 'monthly', 0.8],
  ['/work', 'monthly', 0.6],
  ['/contact', 'yearly', 0.8],
  ['/knowledge', 'weekly', 0.7],
  ['/about', 'yearly', 0.6],
  ['/guarantees', 'yearly', 0.5],
  ['/money-back', 'yearly', 0.5],
  ['/terms-conditions', 'yearly', 0.4],
  ['/privacy', 'yearly', 0.4],
  ...articles.map((a): [string, Freq, number] => [`/knowledge/${a.slug}`, 'yearly', 0.6]),
]

const url = (path: string) => SITE + (path === '/' ? '' : path)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return pages.flatMap(([path, changeFrequency, priority]) => {
    const languages = { en: url(localPath(path, 'en')), bn: url(localPath(path, 'bn')) }
    return (['en', 'bn'] as const).map((lang) => ({
      url: languages[lang],
      lastModified: now,
      changeFrequency,
      priority: lang === 'en' ? priority : Math.round(priority * 9) / 10,
      alternates: { languages },
    }))
  })
}
