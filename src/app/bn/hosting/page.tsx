import HostingView, { hostingMetadata } from '@/views/HostingView'

export const metadata = hostingMetadata('bn')

export default function HostingBnPage() {
  return <HostingView lang='bn' />
}
