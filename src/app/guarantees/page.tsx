import GuaranteesView, { guaranteesMetadata } from '@/views/GuaranteesView'

export const metadata = guaranteesMetadata('en')

export default function GuaranteesPage() {
  return <GuaranteesView lang='en' />
}
