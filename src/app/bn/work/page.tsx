import WorkView, { workMetadata } from '@/views/WorkView'

export const metadata = workMetadata('bn')

export default function WorkBnPage() {
  return <WorkView lang='bn' />
}
