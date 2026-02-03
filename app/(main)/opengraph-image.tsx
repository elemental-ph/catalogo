import { ImageResponse } from 'next/og';
import LogoSquare from '../components/logo-square';

// Image metadata
export const size = {
  width: 630,
  height: 630,
};

export const contentType = 'image/png';
export const runtime = 'edge'; // Recommended for performance


export default async function Image() {
  // You can fetch dynamic data here
  // const data = await fetch(...);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          position: "relative",
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
                    <LogoSquare/>
      </div>
    ),
    {
      ...size,
      // Load fonts efficiently
      // fonts: [
      //   {
      //     name: 'Inter',
      //     data: fontData, // ArrayBuffer of the font file
      //     style: 'normal',
      //     weight: 400,
      //   },
      // ],
    }
  );
}