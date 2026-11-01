import ServicesView, { servicesMetadata } from '@/views/ServicesView'

export const metadata = servicesMetadata('bn')

export default function ServicesBnPage() {
  return <ServicesView lang='bn' />
}
