'use client'

import dynamic from 'next/dynamic'

// WebGL only runs in the browser, and three.js loads in its own chunk after the page text.
const HomeScene = dynamic(() => import('./HomeScene'), { ssr: false })

export default function HomeSceneLoader() {
  return <HomeScene />
}
