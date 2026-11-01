import ServicesView, { servicesMetadata } from '@/views/ServicesView'

export const metadata = servicesMetadata('en')

export default function ServicesPage() {
  return <ServicesView lang='en' />
}
