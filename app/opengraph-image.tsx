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
          backgroundColor: '#0e2e1d',
        }}
      >
        {/* School name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: '80px',
              fontWeight: 800,
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            El-Shaddai
          </span>
          <span
            style={{
              color: '#ffffff',
              fontSize: '80px',
              fontWeight: 800,
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            Baptist Schools
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#4ade80',
            marginTop: '32px',
            marginBottom: '32px',
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <span
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '28px',
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: '2px',
          }}
        >
          Faith · Character · Excellence
        </span>

        {/* Location */}
        <span
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '20px',
            fontWeight: 400,
            marginTop: '16px',
            letterSpacing: '1px',
          }}
        >
          Ibadan, Nigeria
        </span>
      </div>
    ),
    { ...size }
  )
}
