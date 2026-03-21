import type { Metadata } from 'next'
import LogoDesignContent from './LogoDesignContent'

export const metadata: Metadata = {
  title: 'Logo & Graphic Design Services',
  description:
    'Professional logo design and graphic design services in Bangladesh — social media graphics, print & branding, UI/UX design, flyers, illustrations, and brand style guides.',
  alternates: { canonical: 'https://raishahost.com/logo-design' },
  openGraph: {
    title: 'Logo & Graphic Design Services | RaishaHost',
    description:
      'Custom logo design and full graphic design services: social media graphics, print materials, UI/UX design, brand identity, and more.',
    url: 'https://raishahost.com/logo-design',
  },
}

export default function LogoDesignPage() {
  return <LogoDesignContent />
}
