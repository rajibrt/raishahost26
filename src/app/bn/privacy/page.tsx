import PrivacyView, { privacyMetadata } from '@/views/PrivacyView'

export const metadata = privacyMetadata('bn')

export default function PrivacyBnPage() {
  return <PrivacyView lang='bn' />
}
