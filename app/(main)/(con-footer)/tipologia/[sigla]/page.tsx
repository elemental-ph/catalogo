import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import ComparadoresSincronizados from "@/app/components/ComparadoresSincronizados";


function getPositionFromHotspot(hotspot: { x: number; y: number } | undefined) {
  if (!hotspot) return 'center';
  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}


type Props = {
      params: Promise<{ sigla: string | string[] }>; // Define params as a Promise
    };

// This function generates the text metadata
export async function generateMetadata({ params }: Props) {
  const { sigla } = await params;

  const query = `*[_type == "tipologia" && sigla == $sigla][0]{
    sigla,
    "name": pt::text(name),
    render_inicial
  }`;

  const tipologia = await client.fetch(query, { sigla });

  // Generar URL en JPG comprimido directamente desde Sanity CDN (~120 KB)
  const imageUrl = tipologia?.render_inicial
    ? urlFor(tipologia.render_inicial)
        .width(1200)
        .height(630)
        .fit('crop')
        .format('jpg')
        .quality(70)
        .url()
    : undefined;

  const title = `${tipologia.sigla} - ${tipologia.name}`;
  const description = "Diseño por ELEMENTAL fabricado con tecnología industrializada.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "ELEMENTAL",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function Tipologia({ params }: Props) {
const { sigla } = await params;
const query = `*[_type == "tipologia" && sigla == $sigla][0]{
    _id,
    "name": pt::text(name),
    sigla,
    icono,
    descripcion, 
    imagen_portada,
    ficha_tecnica,
    planta_inicial,
    planta_ampliacion,
    recintos,
    render_inicial,
    render_ampliacion,
    }`;

    const tipologia = await client.fetch(query, { sigla });

    const options = { next: { revalidate: 30 } };

    console.log("Sanity Document:", tipologia);
      // Now you can safely use sigla
      return (
         
    <main className="mt-[130px] px-6 pb-20 md:pb-6 md:px-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 xl:h-[calc(100vh-150px)] xl:overflow-hidden pb-6">

                  <ComparadoresSincronizados 
                    data={{
                      name: tipologia.name,
                      descripcion: tipologia.descripcion,
                      planta_ampliacion: tipologia.planta_ampliacion ? urlFor(tipologia.planta_ampliacion).url() : undefined,
                      planta_inicial: tipologia.planta_inicial ? urlFor(tipologia.planta_inicial).url() : undefined,
                      render_ampliacion: tipologia.render_ampliacion ? urlFor(tipologia.render_ampliacion).url() : undefined,
                      render_inicial: tipologia.render_inicial ? urlFor(tipologia.render_inicial).url() : undefined,
                    }}
                  />    
    </main>
      );
    }