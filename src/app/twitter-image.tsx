import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Message Your MP About Wealth Inequality'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'linear-gradient(to right, #4f46e5, #7c3aed, #d946ef)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div 
          style={{
            fontSize: 64,
            marginBottom: 24,
            color: 'white',
          }}
        >
          ✉️
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: -1,
            background: 'white',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'white',
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          Message Your MP About Wealth Inequality
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
          }}
        >
          Contact your Member of Parliament about the growing wealth inequality crisis in the UK
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
} 