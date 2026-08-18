import { ImageResponse } from 'next/og';
import LogoSquare from '../components/logo-square'; // O la ruta a tu componente

// Cambiar a la proporción estándar 1.91:1
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const runtime = 'edge';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {/* El logo mantendrá sus proporciones en el centro del lienzo 1200x630 */}
        <LogoSquare width={280} height={237} fillColor="#000000" />
      </div>
    ),
    {
      ...size,
    }
  );
}