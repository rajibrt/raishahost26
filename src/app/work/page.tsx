import WorkView, { workMetadata } from '@/views/WorkView'

export const metadata = workMetadata('en')

export default function WorkPage() {
  return <WorkView lang='en' />
}
