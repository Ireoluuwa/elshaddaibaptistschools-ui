import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0b1a12 0%, #0e2e1d 50%, #1a4a2e 100%)',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #006442, #00a86b, #006442)',
            display: 'flex',
          }}
        />

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #006442, #00a86b, #006442)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            padding: '0 80px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 100, 66, 0.4)',
              border: '1px solid rgba(0, 168, 107, 0.4)',
              borderRadius: '100px',
              padding: '8px 24px',
            }}
          >
            <span style={{ color: '#4ade80', fontSize: '18px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
              Est. 1998 · Ibadan, Nigeria
            </span>
          </div>

          {/* School name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span
              style={{
                color: '#ffffff',
                fontSize: '72px',
                fontWeight: 800,
                lineHeight: 1.1,
                textAlign: 'center',
                letterSpacing: '-1px',
              }}
            >
              El-Shaddai
            </span>
            <span
              style={{
                color: '#4ade80',
                fontSize: '72px',
                fontWeight: 800,
                lineHeight: 1.1,
                textAlign: 'center',
                letterSpacing: '-1px',
              }}
            >
              Baptist Schools
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '80px',
              height: '3px',
              background: '#006442',
              borderRadius: '2px',
              display: 'flex',
            }}
          />

          {/* Tagline */}
          <span
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '26px',
              fontWeight: 400,
              textAlign: 'center',
              letterSpacing: '1px',
            }}
          >
            Nurturing Faith · Character · Excellence
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
