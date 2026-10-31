// Site navigation. Each menu item opens its own route.
export const CLIENT_AREA_URL = 'https://hosting.raishahost.com/login'
export const STORE_URL = 'https://hosting.raishahost.com/store'
export const DOMAIN_SEARCH_URL = 'https://hosting.raishahost.com/cart.php?a=add&domain=register'

export interface NavItem {
  label: string
  href: string
  note?: string
  children?: NavItem[]
}

export const navItems: NavItem[] = [
  {
    label: 'Hosting',
    href: '/hosting',
    children: [
      { label: 'cPanel Hosting', href: '/hosting', note: 'Billed yearly' },
      { label: 'VPS Servers', href: '/vps', note: 'Billed monthly' },
      { label: 'Domains', href: '/domains', note: '.com, .com.bd and more' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Web Design', href: '/web-design', note: 'Custom websites' },
      { label: 'Logo & Graphic Design', href: '/logo-design', note: 'Brand identity' },
    ],
  },
  { label: 'Our Work', href: '/work' },
  { label: 'Knowledge', href: '/knowledge' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const footerColumns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'Hosting',
    links: [
      { label: 'cPanel Hosting', href: '/hosting' },
      { label: 'VPS Servers', href: '/vps' },
      { label: 'Domains', href: '/domains' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Design', href: '/web-design' },
      { label: 'Logo & Graphic Design', href: '/logo-design' },
      { label: 'Our Work', href: '/work' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Knowledge Base', href: '/knowledge' },
      { label: 'Contact', href: '/contact' },
      { label: 'Client Area', href: CLIENT_AREA_URL, external: true },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Money-Back Guarantee', href: '/money-back' },
      { label: 'Our Guarantees', href: '/guarantees' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
    ],
  },
]
