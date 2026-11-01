import HomeView, { homeMetadata } from '@/views/HomeView'

export const metadata = homeMetadata('bn')

export default function HomeBn() {
  return <HomeView lang='bn' />
}
