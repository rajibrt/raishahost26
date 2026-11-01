import TermsView, { termsMetadata } from '@/views/TermsView'

export const metadata = termsMetadata('en')

export default function TermsConditionsPage() {
  return <TermsView lang='en' />
}
