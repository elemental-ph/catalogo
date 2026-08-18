import { ImageResponse } from 'next/og';
import LogoSquare from '../components/logo-square'; // Asegúrate de que la ruta sea correcta

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function Image() {
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
          flexDirection: 'column', // Opcional, ayuda a centrar si agregas más elementos
        }}
      >
        <LogoSquare width={350} height={296} fillColor="#000000" />
      </div>
    ),
    { ...size }
  );
}