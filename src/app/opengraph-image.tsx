import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'RaishaHost — Affordable Web Hosting in Bangladesh'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #030712 0%, #0d1117 60%, #030712 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(rgba(5,204,247,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(5,204,247,0.8) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        {/* Top glow */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(5,204,247,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Bottom glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 400,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 1, padding: '0 60px' }}>
          {/* Badge */}
          <div
            style={{
              fontSize: 18,
              color: '#05CCF7',
              background: 'rgba(5,204,247,0.1)',
              border: '1px solid rgba(5,204,247,0.35)',
              borderRadius: 100,
              padding: '8px 24px',
              letterSpacing: 3,
            }}
          >
            FREEDOM OF HOST · SINCE 2008
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.05,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #05CCF7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            RaishaHost
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 30, color: '#9ca3af', textAlign: 'center', maxWidth: 750, lineHeight: 1.4 }}>
            Affordable Linux SSD Web Hosting in Bangladesh
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Web Hosting', 'Domain Registration', 'Web Design', 'Logo & Graphic Design', 'Digital Marketing'].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 15,
                  color: '#6b7280',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  padding: '6px 16px',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Footer URL */}
        <div style={{ position: 'absolute', bottom: 28, fontSize: 18, color: '#374151' }}>
          raishahost.com
        </div>
      </div>
    ),
    { ...size },
  )
}
