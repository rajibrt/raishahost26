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

/** One-time website packages (web design). Prices in BDT, paid once per project. */
export interface WebsitePackage {
  id: string
  name: string
  /** Short label for the kind of site. */
  kind: string
  price: { bdt: number }
  features: string[]
  featured?: boolean
  /** Bangla words for the /bn site. */
  bn: { name: string; kind: string; features: string[] }
}

export const websitePackages: WebsitePackage[] = [
  {
    id: 'company-basic',
    name: 'Company Website',
    kind: 'Basic',
    price: { bdt: 7500 },
    features: ['Up to 5 pages', 'Works on phones and computers', 'Contact form', 'Basic SEO setup', 'Social media links', 'Google Analytics', '3 months of support'],
    bn: { name: 'কোম্পানি ওয়েবসাইট', kind: 'বেসিক', features: ['৫টি পর্যন্ত পেজ', 'ফোন ও কম্পিউটারে সুন্দর দেখায়', 'যোগাযোগ ফর্ম', 'প্রাথমিক SEO সেটআপ', 'সোশ্যাল মিডিয়া লিংক', 'Google Analytics', '৩ মাস সাপোর্ট'] },
  },
  {
    id: 'company-standard',
    name: 'Company Website',
    kind: 'Standard',
    price: { bdt: 10000 },
    featured: true,
    features: ['Up to 10 pages', 'Edit your own content (CMS)', 'Works on phones and computers', 'Contact and quote forms', 'Blog section', 'SEO setup and analytics', 'Social media links', '6 months of support'],
    bn: { name: 'কোম্পানি ওয়েবসাইট', kind: 'স্ট্যান্ডার্ড', features: ['১০টি পর্যন্ত পেজ', 'নিজেই লেখা বদলাতে পারবেন (CMS)', 'ফোন ও কম্পিউটারে সুন্দর দেখায়', 'যোগাযোগ ও কোটেশন ফর্ম', 'ব্লগ সেকশন', 'SEO সেটআপ ও অ্যানালিটিক্স', 'সোশ্যাল মিডিয়া লিংক', '৬ মাস সাপোর্ট'] },
  },
  {
    id: 'news',
    name: 'News Portal',
    kind: 'Newspaper',
    price: { bdt: 7500 },
    features: ['Breaking news section', 'Category archive', 'Search', 'Comments', 'Social sharing', 'Ad placements', 'Works on phones and computers'],
    bn: { name: 'নিউজ পোর্টাল', kind: 'সংবাদপত্র', features: ['ব্রেকিং নিউজ সেকশন', 'ক্যাটাগরি আর্কাইভ', 'সার্চ', 'মন্তব্য', 'সোশ্যাল শেয়ার', 'বিজ্ঞাপনের জায়গা', 'ফোন ও কম্পিউটারে সুন্দর দেখায়'] },
  },
  {
    id: 'blog',
    name: 'Blog',
    kind: 'Blogging',
    price: { bdt: 7500 },
    features: ['Post system', 'Categories and tags', 'Comments', 'Author profiles', 'Related posts', 'Search', 'Newsletter sign-up'],
    bn: { name: 'ব্লগ', kind: 'ব্লগিং', features: ['পোস্ট সিস্টেম', 'ক্যাটাগরি ও ট্যাগ', 'মন্তব্য', 'লেখকের প্রোফাইল', 'সম্পর্কিত পোস্ট', 'সার্চ', 'নিউজলেটার সাইন-আপ'] },
  },
  {
    id: 'education',
    name: 'Education Website',
    kind: 'Courses (LMS)',
    price: { bdt: 10000 },
    features: ['Course management', 'Student portal', 'Assignment upload', 'Progress tracking', 'Online payment', 'Certificates', 'Admin dashboard'],
    bn: { name: 'শিক্ষা ওয়েবসাইট', kind: 'কোর্স (LMS)', features: ['কোর্স ম্যানেজমেন্ট', 'শিক্ষার্থী পোর্টাল', 'অ্যাসাইনমেন্ট আপলোড', 'অগ্রগতি দেখা', 'অনলাইন পেমেন্ট', 'সার্টিফিকেট', 'অ্যাডমিন ড্যাশবোর্ড'] },
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    kind: 'Creative',
    price: { bdt: 7500 },
    features: ['Portfolio gallery', 'Project showcase', 'Client reviews section', 'Blog section', 'Contact form', 'Animated design', 'Social links'],
    bn: { name: 'পোর্টফোলিও ওয়েবসাইট', kind: 'ক্রিয়েটিভ', features: ['পোর্টফোলিও গ্যালারি', 'প্রজেক্ট শোকেস', 'ক্লায়েন্ট রিভিউ সেকশন', 'ব্লগ সেকশন', 'যোগাযোগ ফর্ম', 'অ্যানিমেটেড ডিজাইন', 'সোশ্যাল লিংক'] },
  },
]
