// Single source of truth for RaishaHost plan pricing and specs.
// Update prices here only; pages should read from this file.
//
// Billing periods (confirmed by the business):
//   - Shared Hosting (cPanel): yearly
//   - VPS: monthly
//
// Policy: never mention the upstream provider, data-center country or our
// cost price anywhere on the public site.

export type BillingPeriod = 'monthly' | 'yearly'

export interface Price {
  bdt: number
  /** USD price, when one is set in WHMCS. */
  usd?: number
  /** Pre-discount BDT price shown struck through, if any. */
  bdtOriginal?: number
}

export interface Plan {
  id: string
  name: string
  period: BillingPeriod
  price: Price
  tagline?: string
  /** Bangla tagline for the /bn site. */
  taglineBn?: string
  /** Headline specs shown on cards and in comparison tables. */
  specs: { label: string; value: string }[]
  orderUrl: string
  featured?: boolean
}

const STORE = 'https://hosting.raishahost.com/store'

export const sharedHostingPlans: Plan[] = [
  {
    id: 'shared-economy',
    name: 'Economy',
    period: 'yearly',
    price: { bdt: 3800, bdtOriginal: 4600 },
    tagline: 'Blogs, portfolios and small websites',
    taglineBn: 'ব্লগ, পোর্টফোলিও ও ছোট ওয়েবসাইট',
    specs: [
      { label: 'SSD Storage', value: '5 GB' },
      { label: 'Bandwidth', value: '30 GB/mo' },
      { label: 'Websites', value: '3' },
      { label: 'Sub Domains', value: '10' },
      { label: 'Addon Domains', value: '2' },
      { label: 'Email Accounts', value: '20' },
      { label: 'Free SSL', value: 'Yes' },
      { label: 'Control Panel', value: 'cPanel' },
    ],
    orderUrl: `${STORE}/linux-shared-hosting/economy`,
  },
  {
    id: 'shared-standard',
    name: 'Standard',
    period: 'yearly',
    price: { bdt: 6000, bdtOriginal: 8000 },
    tagline: 'Growing businesses with several sites',
    taglineBn: 'কয়েকটি সাইট নিয়ে বাড়তে থাকা ব্যবসা',
    specs: [
      { label: 'SSD Storage', value: '10 GB' },
      { label: 'Bandwidth', value: '60 GB/mo' },
      { label: 'Websites', value: '4' },
      { label: 'Sub Domains', value: '20' },
      { label: 'Addon Domains', value: '3' },
      { label: 'Email Accounts', value: '50' },
      { label: 'Free SSL', value: 'Yes' },
      { label: 'Control Panel', value: 'cPanel' },
    ],
    orderUrl: `${STORE}/linux-shared-hosting/standard`,
    featured: true,
  },
  {
    id: 'shared-pro',
    name: 'Pro',
    period: 'yearly',
    price: { bdt: 12000, bdtOriginal: 17000 },
    tagline: 'High-traffic and demanding projects',
    taglineBn: 'বেশি ভিজিটর ও ভারী প্রজেক্ট',
    specs: [
      { label: 'SSD Storage', value: '30 GB' },
      { label: 'Bandwidth', value: '100 GB/mo' },
      { label: 'Websites', value: '7' },
      { label: 'Sub Domains', value: '20' },
      { label: 'Addon Domains', value: '6' },
      { label: 'Email Accounts', value: '100' },
      { label: 'Free SSL', value: 'Yes' },
      { label: 'Control Panel', value: 'cPanel' },
    ],
    orderUrl: `${STORE}/linux-shared-hosting/pro`,
  },
]

/** Included with every cPanel hosting plan. */
export const sharedCommonFeatures = ['Free SSL', 'cPanel control panel', 'Email accounts', '30-day money-back']

/** Included with every VPS plan. */
export const vpsCommonFeatures = [
  '20 TB bandwidth',
  '1 dedicated IPv4 + IPv6',
  'Full root access',
  'Ubuntu / Debian / AlmaLinux',
  'DDoS protection',
  '99.9% uptime',
]

const vpsSpecs = (cpu: number, ram: number, disk: number) => [
  { label: 'CPU', value: `${cpu} vCPU (ARM64)` },
  { label: 'RAM', value: `${ram} GB` },
  { label: 'NVMe SSD', value: `${disk} GB` },
]

export const vpsPlans: Plan[] = [
  {
    id: 'vps-starter',
    name: 'VPS Starter',
    period: 'monthly',
    price: { bdt: 3599, usd: 29.99 },
    tagline: 'Apps, staging servers and small stores',
    taglineBn: 'অ্যাপ, টেস্ট সার্ভার ও ছোট অনলাইন শপ',
    specs: vpsSpecs(2, 4, 40),
    orderUrl: `${STORE}/vps`,
  },
  {
    id: 'vps-business',
    name: 'VPS Business',
    period: 'monthly',
    price: { bdt: 5599, usd: 46.99 },
    tagline: 'Business apps and busy websites',
    taglineBn: 'ব্যবসায়িক অ্যাপ ও ব্যস্ত ওয়েবসাইট',
    specs: vpsSpecs(4, 8, 40),
    orderUrl: `${STORE}/vps`,
    featured: true,
  },
  {
    id: 'vps-pro',
    name: 'VPS Pro',
    period: 'monthly',
    price: { bdt: 6599, usd: 54.99 },
    tagline: 'For busy websites, e-commerce & ERP',
    taglineBn: 'ব্যস্ত ওয়েবসাইট, ই-কমার্স ও ERP',
    specs: vpsSpecs(4, 8, 80),
    orderUrl: `${STORE}/vps`,
  },
]

// ---------------------------------------------------------------------------
// Website projects (owner-approved structure, November 2026; the Messenger bot quotes the same numbers,
// so tell the bot's session when you change any of them). Prices are RANGES in BDT, paid once per
// project; no USD prices and no delivery times are set yet. Care plans and add-ons are fixed.

export type WebTier = 'wordpress' | 'woocommerce' | 'custom'

export const webTiers: Record<WebTier, { en: { name: string; line: string }; bn: { name: string; line: string } }> = {
  wordpress: {
    en: { name: 'WordPress websites', line: 'Built on WordPress, so you can edit pages and posts yourself.' },
    bn: { name: 'WordPress ওয়েবসাইট', line: 'WordPress-এ তৈরি, তাই পেজ ও পোস্ট নিজেই বদলাতে পারবেন।' },
  },
  woocommerce: {
    en: { name: 'Online shops (WooCommerce)', line: 'A WordPress shop with products, cart, online payment and orders.' },
    bn: { name: 'অনলাইন শপ (WooCommerce)', line: 'পণ্য, কার্ট, অনলাইন পেমেন্ট ও অর্ডারসহ WordPress শপ।' },
  },
  custom: {
    en: { name: 'Custom code (Next.js / React)', line: 'Custom code is built from scratch, with no ready-made theme: faster, more secure, and any feature can be added.' },
    bn: { name: 'কাস্টম কোড (Next.js / React)', line: 'কোনো তৈরি থিম ছাড়া একদম শুরু থেকে বানানো: আরও দ্রুত, আরও নিরাপদ, আর যেকোনো ফিচার যোগ করা যায়।' },
  },
}

export interface WebsitePackage {
  id: string
  tier: WebTier
  name: string
  /** One-time price range. No `bdtMax` means "from". */
  price: { bdtMin: number; bdtMax?: number }
  /** What moves the price within the range. */
  priceNote: string
  featured?: boolean
  bn: { name: string; priceNote: string }
}

export const websitePackages: WebsitePackage[] = [
  { id: 'wp-landing', tier: 'wordpress', name: 'Landing Page', price: { bdtMin: 18000, bdtMax: 30000 }, priceNote: 'Depends on the number of sections, animation and copywriting.', bn: { name: 'ল্যান্ডিং পেজ', priceNote: 'সেকশনের সংখ্যা, অ্যানিমেশন ও লেখার কাজের ওপর নির্ভর করে।' } },
  { id: 'wp-business', tier: 'wordpress', name: 'Business Website', price: { bdtMin: 35000, bdtMax: 55000 }, priceNote: 'Depends on the pages (up to 10) and how custom the design is.', featured: true, bn: { name: 'বিজনেস ওয়েবসাইট', priceNote: 'পেজের সংখ্যা (১০টি পর্যন্ত) আর ডিজাইন কতটা কাস্টম তার ওপর নির্ভর করে।' } },
  { id: 'wp-business-pro', tier: 'wordpress', name: 'Business Pro', price: { bdtMin: 60000, bdtMax: 100000 }, priceNote: 'Bangla + English, booking or quote forms, and integrations.', bn: { name: 'বিজনেস প্রো', priceNote: 'বাংলা + ইংরেজি, বুকিং বা কোটেশন ফর্ম, আর অন্য সিস্টেমের সাথে সংযোগ।' } },
  { id: 'wp-news', tier: 'wordpress', name: 'News Portal', price: { bdtMin: 45000, bdtMax: 80000 }, priceNote: 'Depends on categories, the ad system and expected traffic.', bn: { name: 'নিউজ পোর্টাল', priceNote: 'ক্যাটাগরি, বিজ্ঞাপন ব্যবস্থা ও ভিজিটরের সংখ্যার ওপর নির্ভর করে।' } },
  { id: 'wp-lms', tier: 'wordpress', name: 'Education / LMS', price: { bdtMin: 70000, bdtMax: 150000 }, priceNote: 'Depends on the course system, payments and certificates.', bn: { name: 'শিক্ষা / LMS', priceNote: 'কোর্স সিস্টেম, পেমেন্ট ও সার্টিফিকেটের ওপর নির্ভর করে।' } },
  { id: 'woo-starter', tier: 'woocommerce', name: 'Shop Starter', price: { bdtMin: 60000, bdtMax: 100000 }, priceNote: 'Up to 100 products; payment gateways such as bKash or SSLCommerz.', featured: true, bn: { name: 'শপ স্টার্টার', priceNote: '১০০টি পর্যন্ত পণ্য; bKash বা SSLCommerz-এর মতো পেমেন্ট গেটওয়ে।' } },
  { id: 'woo-pro', tier: 'woocommerce', name: 'Shop Pro', price: { bdtMin: 120000, bdtMax: 250000 }, priceNote: 'Courier API, product variations, Facebook catalogue and Pixel, stock.', bn: { name: 'শপ প্রো', priceNote: 'কুরিয়ার API, পণ্যের ভ্যারিয়েশন, ফেসবুক ক্যাটালগ ও Pixel, স্টক।' } },
  { id: 'custom-site', tier: 'custom', name: 'Custom Website', price: { bdtMin: 150000, bdtMax: 350000 }, priceNote: 'Fully custom design, animation and a content editor (CMS), like this website.', featured: true, bn: { name: 'কাস্টম ওয়েবসাইট', priceNote: 'পুরো কাস্টম ডিজাইন, অ্যানিমেশন ও কনটেন্ট এডিটর (CMS), এই ওয়েবসাইটের মতো।' } },
  { id: 'custom-shop', tier: 'custom', name: 'Custom E-commerce', price: { bdtMin: 400000 }, priceNote: 'Usually ৳4–8 lakh: own admin panel, payments, courier, stock and search.', bn: { name: 'কাস্টম ই-কমার্স', priceNote: 'সাধারণত ৪–৮ লাখ টাকা: নিজস্ব অ্যাডমিন প্যানেল, পেমেন্ট, কুরিয়ার, স্টক ও সার্চ।' } },
  { id: 'web-app', tier: 'custom', name: 'Web App / Portal', price: { bdtMin: 300000 }, priceNote: 'Quoted per project: user roles, dashboards and APIs.', bn: { name: 'ওয়েব অ্যাপ / পোর্টাল', priceNote: 'প্রজেক্ট দেখে কোটেশন: ইউজার রোল, ড্যাশবোর্ড ও API।' } },
]

/** Fixed, one-time add-ons. */
export const websiteAddOns: { id: string; bdt: number; from?: boolean; en: string; bn: string; per?: { en: string; bn: string } }[] = [
  { id: 'page-wp', bdt: 2500, en: 'Extra page (WordPress)', bn: 'অতিরিক্ত পেজ (WordPress)', per: { en: 'per page', bn: 'প্রতি পেজ' } },
  { id: 'page-custom', bdt: 6000, en: 'Extra page (custom code)', bn: 'অতিরিক্ত পেজ (কাস্টম কোড)', per: { en: 'per page', bn: 'প্রতি পেজ' } },
  { id: 'bilingual', bdt: 10000, from: true, en: 'Bangla + English', bn: 'বাংলা + ইংরেজি' },
  { id: 'gateway', bdt: 10000, en: 'Extra payment gateway', bn: 'অতিরিক্ত পেমেন্ট গেটওয়ে', per: { en: 'each', bn: 'প্রতিটি' } },
  { id: 'courier', bdt: 12000, en: 'Courier API (Pathao, Steadfast…)', bn: 'কুরিয়ার API (Pathao, Steadfast…)' },
  { id: 'products', bdt: 3000, en: 'Product upload', bn: 'পণ্য আপলোড', per: { en: 'per 100 products', bn: 'প্রতি ১০০ পণ্য' } },
  { id: 'content', bdt: 1500, en: 'Content writing', bn: 'লেখার কাজ', per: { en: 'per page', bn: 'প্রতি পেজ' } },
]

/** Fixed monthly care (maintenance) plans. Paying yearly gives 2 months free. */
export const carePlans: { id: string; name: string; bdt: number; featured?: boolean; en: string[]; bn: { name: string; items: string[] } }[] = [
  { id: 'care-basic', name: 'Basic', bdt: 3000, en: ['Updates and backups', 'Security monitoring', '1 hour of small changes a month'], bn: { name: 'বেসিক', items: ['আপডেট ও ব্যাকআপ', 'নিরাপত্তা নজরদারি', 'মাসে ১ ঘণ্টা ছোট পরিবর্তন'] } },
  { id: 'care-business', name: 'Business', bdt: 7500, featured: true, en: ['Everything in Basic', '3 hours of work a month', 'Faster support'], bn: { name: 'বিজনেস', items: ['বেসিকের সবকিছু', 'মাসে ৩ ঘণ্টা কাজ', 'দ্রুত সাপোর্ট'] } },
  { id: 'care-commerce', name: 'Commerce', bdt: 15000, en: ['Everything in Business', '6 hours of work a month', 'Product uploads', 'Priority support'], bn: { name: 'কমার্স', items: ['বিজনেসের সবকিছু', 'মাসে ৬ ঘণ্টা কাজ', 'পণ্য আপলোড', 'অগ্রাধিকার সাপোর্ট'] } },
]
