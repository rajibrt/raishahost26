import VpsView, { vpsMetadata } from '@/views/VpsView'

export const metadata = vpsMetadata('en')

export default function VpsPage() {
  return <VpsView lang='en' />
}
