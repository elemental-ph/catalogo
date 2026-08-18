import { ImageResponse } from 'next/og';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const size = { width: 1200, height: 630 };
// 1. Cambiar a JPEG (pesa hasta un 80% menos que PNG)
export const contentType = 'image/jpeg'; 
export const runtime = 'edge';
export const revalidate = 3600;

type Props = {
  params: Promise<{ sigla: string | string[] }>;
};

export default async function Image({ params }: Props) {
  const resolvedParams = await params;
  const siglaRaw = resolvedParams.sigla;
  const sigla = Array.isArray(siglaRaw) ? siglaRaw[0] : siglaRaw;

  let imageUrl: string | null = null;

  try {
    const query = `*[_type == "tipologia" && sigla == $sigla][0]{ render_inicial }`;
    const tipologia = await client.fetch(query, { sigla });

    if (tipologia?.render_inicial) {
      // 2. Compresión agresiva para asegurar un peso < 200 KB
      imageUrl = urlFor(tipologia.render_inicial)
        .width(800)
        .height(420)
        .fit('crop')
        .format('jpg') // Forzar formato JPG
        .quality(50)   // Calidad balanceada entre nitidez y peso reducido
        .url();
    }
  } catch (error) {
    console.error("Error obteniendo imagen de Sanity para OG:", error);
  }

  // Fallback si falla la consulta
  if (!imageUrl) {
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
            fontSize: 48,
            fontWeight: 'bold',
          }}
        >
          {sigla ? `TIPOLOGÍA ${sigla}` : 'CATÁLOGO DE VIVIENDAS'}
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        <img
          src={imageUrl}
          alt="Vista previa de tipología"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    { ...size }
  );
}