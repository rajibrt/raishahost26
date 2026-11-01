// Two languages: English at the root (/hosting) and Bangla under /bn (/bn/hosting).
// Pages render the same view with a `lang`, so design, prices and plans never drift apart.

export type Lang = 'en' | 'bn'

export const SITE = 'https://raishahost.com'

/** The language of a path: everything under /bn is Bangla. */
export const langOf = (path: string): Lang => (path === '/bn' || path.startsWith('/bn/') ? 'bn' : 'en')

/** A path without its /bn prefix. */
export function basePath(path: string): string {
  if (path === '/bn') return '/'
  return path.startsWith('/bn/') ? path.slice(3) : path
}

/** The same page in the given language. External links and #anchors pass through. */
export function localPath(path: string, lang: Lang): string {
  if (!path.startsWith('/')) return path
  const base = basePath(path)
  if (lang === 'en') return base
  return base === '/' ? '/bn' : `/bn${base}`
}

/** canonical + hreflang alternates for a page's metadata. */
export function alternates(path: string, lang: Lang) {
  return {
    canonical: SITE + (localPath(path, lang) === '/' ? '' : localPath(path, lang)),
    languages: {
      en: SITE + (path === '/' ? '' : localPath(path, 'en')),
      bn: SITE + localPath(path, 'bn'),
      'x-default': SITE + (path === '/' ? '' : localPath(path, 'en')),
    },
  }
}

/** Taka with Western digits, as on invoices: ৳3,800. */
export const bdt = (n: number) => '৳' + n.toLocaleString('en-US')
export const usd = (n: number) => '$' + n.toFixed(2)

/** Words shared by every page: navigation, buttons, footer, plan cards, forms. */
export const ui = {
  en: {
    clientArea: 'Client Area',
    getStarted: 'Get Started',
    menu: 'MENU',
    closeMenu: 'Close menu',
    siteMenu: 'Site menu',
    mainNav: 'Main',
    mobileNav: 'Mobile',
    home: 'RaishaHost home',
    callLine: 'Questions? Call',
    langLabel: 'Language',
    footerTagline: 'Web hosting, VPS servers, domains and web design since 2008.',
    rights: 'All rights reserved.',
    footerBilling: 'Prices in BDT and USD. cPanel hosting billed yearly, VPS billed monthly.',
    perYear: '/year',
    perMonth: '/month',
    recommended: 'Recommended',
    order: 'Order',
    planType: 'Plan type',
    currency: 'Currency',
    cpanel: 'cPanel Hosting',
    vps: 'VPS',
    bandwidth: 'Bandwidth',
    usdNotSet: 'cPanel hosting is priced in taka. USD prices for these plans are not set yet.',
    pricesYear: 'Prices per year.',
    pricesMonth: 'Prices per month.',
    searchDomain: 'Search for a domain',
    findDomain: 'find your domain',
    search: 'Search',
    onThisPage: 'On this page',
    lastUpdated: 'Last updated',
  },
  bn: {
    clientArea: 'ক্লায়েন্ট এরিয়া',
    getStarted: 'শুরু করুন',
    menu: 'মেনু',
    closeMenu: 'মেনু বন্ধ করুন',
    siteMenu: 'সাইট মেনু',
    mainNav: 'প্রধান মেনু',
    mobileNav: 'মোবাইল মেনু',
    home: 'RaishaHost হোম',
    callLine: 'প্রশ্ন আছে? কল করুন',
    langLabel: 'ভাষা',
    footerTagline: '২০০৮ সাল থেকে ওয়েব হোস্টিং, VPS সার্ভার, ডোমেইন ও ওয়েব ডিজাইন।',
    rights: 'সর্বস্বত্ব সংরক্ষিত।',
    footerBilling: 'দাম টাকা ও ডলারে। cPanel হোস্টিংয়ের বিল বছরে একবার, VPS-এর বিল প্রতি মাসে।',
    perYear: '/বছর',
    perMonth: '/মাস',
    recommended: 'প্রস্তাবিত',
    order: 'অর্ডার করুন',
    planType: 'প্ল্যানের ধরন',
    currency: 'মুদ্রা',
    cpanel: 'cPanel হোস্টিং',
    vps: 'VPS',
    bandwidth: 'ব্যান্ডউইথ',
    usdNotSet: 'cPanel হোস্টিংয়ের দাম টাকায়। এই প্ল্যানগুলোর ডলার দাম এখনো ঠিক করা হয়নি।',
    pricesYear: 'দাম প্রতি বছরের।',
    pricesMonth: 'দাম প্রতি মাসের।',
    searchDomain: 'ডোমেইন খুঁজুন',
    findDomain: 'আপনার ডোমেইন খুঁজুন',
    search: 'খুঁজুন',
    onThisPage: 'এই পেজে',
    lastUpdated: 'সর্বশেষ আপডেট',
  },
} as const

export type UI = (typeof ui)['en']

/** Bangla names for plan spec labels and shared features in src/data/plans.ts. */
export const planWordsBn: Record<string, string> = {
  'SSD Storage': 'SSD স্টোরেজ',
  Bandwidth: 'ব্যান্ডউইথ',
  Websites: 'ওয়েবসাইট',
  'Sub Domains': 'সাব-ডোমেইন',
  'Addon Domains': 'অ্যাডঅন ডোমেইন',
  'Email Accounts': 'ইমেইল অ্যাকাউন্ট',
  'Free SSL': 'ফ্রি SSL',
  'Control Panel': 'কন্ট্রোল প্যানেল',
  Yes: 'আছে',
  CPU: 'CPU',
  RAM: 'RAM',
  'NVMe SSD': 'NVMe SSD',
  'cPanel control panel': 'cPanel কন্ট্রোল প্যানেল',
  'Email accounts': 'ইমেইল অ্যাকাউন্ট',
  '30-day money-back': '৩০ দিনের মানি-ব্যাক',
  '20 TB bandwidth': '২০ টিবি ব্যান্ডউইথ',
  '1 dedicated IPv4 + IPv6': '১টি নিজস্ব IPv4 + IPv6',
  'Full root access': 'পূর্ণ রুট অ্যাক্সেস',
  'Ubuntu / Debian / AlmaLinux': 'Ubuntu / Debian / AlmaLinux',
  'DDoS protection': 'DDoS সুরক্ষা',
  '99.9% uptime': '৯৯.৯% আপটাইম লক্ষ্য',
}

/** A plans.ts word in the page language (English words pass through). */
export const planWord = (word: string, lang: Lang) => (lang === 'bn' ? planWordsBn[word] ?? word : word)

/** Metadata for an inner page in one language: title, description, canonical, hreflang and Open Graph. */
export function pageMeta(path: string, lang: Lang, m: { title: string; description: string }) {
  const alt = alternates(path, lang)
  return {
    title: m.title,
    description: m.description,
    alternates: alt,
    openGraph: { title: `${m.title} | RaishaHost`, description: m.description, url: alt.canonical, locale: lang === 'bn' ? 'bn_BD' : 'en_US' },
  }
}
