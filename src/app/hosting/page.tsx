import HostingView, { hostingMetadata } from '@/views/HostingView'

export const metadata = hostingMetadata('en')

export default function HostingPage() {
  return <HostingView lang='en' />
}
