import AboutView, { aboutMetadata } from '@/views/AboutView'

export const metadata = aboutMetadata('bn')

export default function AboutBnPage() {
  return <AboutView lang='bn' />
}
