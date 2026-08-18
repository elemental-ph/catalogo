import { ImageResponse } from 'next/og';
import LogoSquare from '../components/logo-square'; // Ajusta la ruta relativa a tu componente

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const runtime = 'edge'; // Edge runtime para respuesta ultrarrápida
export const revalidate = 86400; // Cachea la imagen por 24 horas en CDN

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
        <LogoSquare width={280} height={237} fillColor="#000000" />
      </div>
    ),
    {
      ...size,
    }
  );
}