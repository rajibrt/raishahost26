import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'Web Design, Development & Digital Services',
  description:
    'Professional web design, web app development, software development, e-commerce solutions, digital marketing, and graphic design services in Bangladesh.',
  alternates: { canonical: 'https://raishahost.com/services' },
  openGraph: {
    title: 'Web Design, Development & Digital Services | RaishaHost',
    description:
      'Complete digital solutions: web design, web apps, software development, e-commerce, digital marketing, and graphic design in Bangladesh.',
    url: 'https://raishahost.com/services',
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
