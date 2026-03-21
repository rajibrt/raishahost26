import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with RaishaHost for web hosting, domain registration, web design, and digital marketing services in Bangladesh. We respond within 2–4 hours.',
  alternates: { canonical: 'https://raishahost.com/contact' },
  openGraph: {
    title: 'Contact RaishaHost | Web Hosting & Design Services in Bangladesh',
    description:
      'Reach our team for hosting support, custom quotes, web design, and all digital services. Phone, email, and ticket support available.',
    url: 'https://raishahost.com/contact',
  },
}

export default function ContactPage() {
  return <ContactContent />
}
