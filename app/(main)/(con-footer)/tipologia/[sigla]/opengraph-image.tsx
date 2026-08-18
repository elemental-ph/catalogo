import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge'; // Recommended for performance
export const revalidate = 3600;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          color: '#ffe900',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 60,
          fontWeight: 'bold',
        }}
      >
        TEST OG IMAGE
      </div>
    ),
    { ...size }
  );
}
