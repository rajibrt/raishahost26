import ContactView, { contactMetadata } from '@/views/ContactView'

export const metadata = contactMetadata('en')

export default function ContactPage() {
  return <ContactView lang='en' />
}
