// Site navigation. Each menu item opens its own route; `bn` / `noteBn` are the Bangla words.
// Internal hrefs are English paths; components turn them into /bn paths with localPath().
export const CLIENT_AREA_URL = 'https://hosting.raishahost.com/login'
export const STORE_URL = 'https://hosting.raishahost.com/store'
export const DOMAIN_SEARCH_URL = 'https://hosting.raishahost.com/cart.php?a=add&domain=register'

export interface NavItem {
  label: string
  bn: string
  href: string
  note?: string
  noteBn?: string
  children?: NavItem[]
}

export const navItems: NavItem[] = [
  {
    label: 'Hosting',
    bn: 'হোস্টিং',
    href: '/hosting',
    children: [
      { label: 'cPanel Hosting', bn: 'cPanel হোস্টিং', href: '/hosting', note: 'Billed yearly', noteBn: 'বছরে বিল' },
      { label: 'VPS Servers', bn: 'VPS সার্ভার', href: '/vps', note: 'Billed monthly', noteBn: 'মাসে বিল' },
      { label: 'Domains', bn: 'ডোমেইন', href: '/domains', note: '.com, .com.bd and more', noteBn: '.com, .com.bd সহ আরও' },
    ],
  },
  {
    label: 'Services',
    bn: 'সার্ভিস',
    href: '/services',
    children: [
      { label: 'Web Design', bn: 'ওয়েব ডিজাইন', href: '/services', note: 'Websites, apps and stores', noteBn: 'ওয়েবসাইট, অ্যাপ ও শপ' },
      { label: 'Logo & Graphic Design', bn: 'লোগো ও গ্রাফিক ডিজাইন', href: '/logo-design', note: 'Brand identity', noteBn: 'ব্র্যান্ড পরিচিতি' },
    ],
  },
  { label: 'Our Work', bn: 'আমাদের কাজ', href: '/work' },
  { label: 'Knowledge', bn: 'নলেজ বেস', href: '/knowledge' },
  { label: 'About', bn: 'আমাদের সম্পর্কে', href: '/about' },
  { label: 'Contact', bn: 'যোগাযোগ', href: '/contact' },
]

export interface FooterLink {
  label: string
  bn: string
  href: string
  external?: boolean
}

export const footerColumns: { title: string; bn: string; links: FooterLink[] }[] = [
  {
    title: 'Hosting',
    bn: 'হোস্টিং',
    links: [
      { label: 'cPanel Hosting', bn: 'cPanel হোস্টিং', href: '/hosting' },
      { label: 'VPS Servers', bn: 'VPS সার্ভার', href: '/vps' },
      { label: 'Domains', bn: 'ডোমেইন', href: '/domains' },
    ],
  },
  {
    title: 'Services',
    bn: 'সার্ভিস',
    links: [
      { label: 'Web Design', bn: 'ওয়েব ডিজাইন', href: '/services' },
      { label: 'Logo & Graphic Design', bn: 'লোগো ও গ্রাফিক ডিজাইন', href: '/logo-design' },
      { label: 'Our Work', bn: 'আমাদের কাজ', href: '/work' },
    ],
  },
  {
    title: 'Company',
    bn: 'প্রতিষ্ঠান',
    links: [
      { label: 'About', bn: 'আমাদের সম্পর্কে', href: '/about' },
      { label: 'Knowledge Base', bn: 'নলেজ বেস', href: '/knowledge' },
      { label: 'Contact', bn: 'যোগাযোগ', href: '/contact' },
      { label: 'Client Area', bn: 'ক্লায়েন্ট এরিয়া', href: CLIENT_AREA_URL, external: true },
    ],
  },
  {
    title: 'Policies',
    bn: 'নীতিমালা',
    links: [
      { label: 'Money-Back Guarantee', bn: 'মানি-ব্যাক গ্যারান্টি', href: '/money-back' },
      { label: 'Our Promises', bn: 'আমাদের প্রতিশ্রুতি', href: '/guarantees' },
      { label: 'Terms & Conditions', bn: 'শর্তাবলী', href: '/terms-conditions' },
      { label: 'Privacy Policy', bn: 'গোপনীয়তা নীতি', href: '/privacy' },
    ],
  },
]
