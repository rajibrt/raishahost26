import type { Metadata } from 'next'
import HomeV5 from '@/components/home/HomeV5'

export const metadata: Metadata = {
  title: 'Homepage v5 (preview)',
  robots: { index: false, follow: false },
}

export default function PreviewV5() {
  return <HomeV5 />
}
