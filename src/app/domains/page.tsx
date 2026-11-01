import DomainsView, { domainsMetadata } from '@/views/DomainsView'

export const metadata = domainsMetadata('en')

export default function DomainsPage() {
  return <DomainsView lang='en' />
}
