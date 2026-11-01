import ContactView, { contactMetadata } from '@/views/ContactView'

export const metadata = contactMetadata('bn')

export default function ContactBnPage() {
  return <ContactView lang='bn' />
}
