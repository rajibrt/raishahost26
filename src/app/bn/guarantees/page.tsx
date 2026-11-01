import GuaranteesView, { guaranteesMetadata } from '@/views/GuaranteesView'

export const metadata = guaranteesMetadata('bn')

export default function GuaranteesBnPage() {
  return <GuaranteesView lang='bn' />
}
