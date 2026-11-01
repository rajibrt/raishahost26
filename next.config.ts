import type { NextConfig } from "next";

// Browser caching for files in public/. Next.js serves them with max-age=0 by default, so returning
// visitors re-downloaded hundreds of video frames. These names carry no version hash: when a video
// is replaced, give it a new folder name (e.g. server-explode-v2) instead of overwriting the frames.
const DAY = 86400;
const cache = (maxAge: number) => [
  { key: 'Cache-Control', value: `public, max-age=${maxAge}, stale-while-revalidate=${DAY}` },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    '192.168.1.107',
    '192.168.1.*',
    '192.168.*.*',
    '10.*.*.*',
    '172.16.*.*',
  ],
  async headers() {
    return [
      { source: '/media/:path*', headers: cache(30 * DAY) }, // scroll-video frames
      { source: '/work/:path*.webp', headers: cache(7 * DAY) }, // portfolio screenshots (re-shot now and then)
      { source: '/brand/:path*', headers: cache(7 * DAY) },
      { source: '/og/:path*', headers: cache(DAY) }, // share images
    ];
  },
};

export default nextConfig;
