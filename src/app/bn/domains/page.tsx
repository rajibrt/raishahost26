import DomainsView, { domainsMetadata } from '@/views/DomainsView'

export const metadata = domainsMetadata('bn')

export default function DomainsBnPage() {
  return <DomainsView lang='bn' />
}
