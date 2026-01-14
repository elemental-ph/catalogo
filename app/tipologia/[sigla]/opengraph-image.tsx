import { ImageResponse } from 'next/og';
import { client } from "@/sanity/lib/client";
import { NextRequest } from 'next/server';


// Image metadata
export const size = {
  width: 1200,
  height: 630,
};
export const alt = 'About our website';
export const contentType = 'image/png';
export const runtime = 'edge'; // Recommended for performance

type Props = {
      params: Promise<{ sigla: string | string[] }>; // Define params as a Promise
    };

export default async function Image({ params }: Props) {
  // You can fetch dynamic data here
  // const data = await fetch(...);
const { sigla } = await params;
const query = `*[_type == "tipologia" && sigla == $sigla][0]{
    _id,
    name,
    sigla,
    icono,
    descripcion, 
    imagen_portada,
    }`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <h1>TEST</h1>
        <p>probando contenido dinamico para links. tipología: {sigla}</p>
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
