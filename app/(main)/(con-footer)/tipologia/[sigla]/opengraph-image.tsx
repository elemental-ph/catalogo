import { ImageResponse } from 'next/og';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};
export const alt = 'ELEMENTAL PREFAB';
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
    icono,
    imagen_portada,
    }`;

const tipologia = await client.fetch(query, { sigla });

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
        }}
      >
                    <img
                      src={urlFor(tipologia.imagen_portada)
                        .width(1200) // Optimal width
                        .height(630) // Optimal height
                        .fit('crop') // Crops to maintain aspect ratio, using Sanity's smart cropping if available
                        .quality(75)
                        .url()}
                      />
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
