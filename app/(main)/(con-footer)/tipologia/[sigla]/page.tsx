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
    _id,
    name,
    sigla,
    icono,
    descripcion, 
    imagen_portada,
    planta_inicial,
    planta_ampliacion,
    recintos,
    render_inicial,
    render_ampliacion,
    }`;

  const tipologia = await client.fetch(query, { sigla });
  const postTitle = `${tipologia.sigla} - ${tipologia.name}`;
  const postDescription = `Diseño por ELEMENTAL fabricado con tecnología industrializada`;
  
  return {
    title: postTitle,
    description: postDescription,
    openGraph: {
      title: postTitle,
      description: postDescription,
      // The opengraph-image.tsx in this directory handles the 'images' property automatically
    },
    twitter: {
      card: 'summary_large_image', // specifies Twitter card type
      title: postTitle,
      description: postDescription,
    },
  };
}

export default async function Tipologia({ params }: Props) {
const { sigla } = await params;
const query = `*[_type == "tipologia" && sigla == $sigla][0]{
    _id,
    name,
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
         
    <main className="mt-[130px] pb-[100px] px-6 md:px-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-15">

                  <ComparadoresSincronizados 
                    data={{
                      name: tipologia.name,
                      descripcion: tipologia.descripcion,
                      planta_ampliacion: urlFor(tipologia.planta_ampliacion).url(),
                      planta_inicial: urlFor(tipologia.planta_inicial).url(),
                      render_ampliacion: urlFor(tipologia.render_ampliacion).url(),
                      render_inicial: urlFor(tipologia.render_inicial).url(),
                    }}
                  />    
    </main>
      );
    }