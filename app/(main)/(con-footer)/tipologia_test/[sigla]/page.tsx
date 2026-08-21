import { PortableText } from "@portabletext/react";
import { Metadata } from 'next';
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import ComparadoresSincronizados_test from "@/app/components/ComparadoresSincronizados_test";


function getPositionFromHotspot(hotspot: { x: number; y: number } | undefined) {
  if (!hotspot) return 'center';
  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}


type Props = {
      params: Promise<{ sigla: string | string[] }>; // Define params as a Promise
    };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const siglaRaw = resolvedParams.sigla;
  const sigla = Array.isArray(siglaRaw) ? siglaRaw[0] : siglaRaw;

  // Quitamos el pt::text() para evitar que Sanity corte el texto si hay varios bloques
  const query = `*[_type == "tipologia" && sigla == $sigla][0]{
    sigla,
    name, 
    render_inicial
  }`;

  const tipologia = await client.fetch(query, { sigla });

  // LÓGICA ROBUSTA PARA EL NOMBRE:
  // Si 'name' es texto enriquecido (Array), unimos todos los bloques. Si es un String normal, lo usamos tal cual.
  let fullName = "Nombre no disponible";
  if (tipologia?.name) {
    if (typeof tipologia.name === 'string') {
      fullName = tipologia.name;
    } else if (Array.isArray(tipologia.name)) {
      // Extrae y une todo el texto si viene en formato Portable Text de Sanity
      fullName = tipologia.name
        .map((block: any) => block.children?.map((child: any) => child.text).join(''))
        .join(' '); 
    }
  }

  const title = tipologia ? `${fullName}` : 'Tipología';
  const description = "Catálogo de viviendas diseñadas por ELEMENTAL";

  // Generamos la URL de la imagen en JPG optimizado (1200x630)
  const imageUrl = tipologia?.render_inicial
    ? urlFor(tipologia.render_inicial)
        .width(1200)
        .height(630)
        .fit('crop')
        .format('jpg')
        .quality(75)
        .url()
    : undefined;

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
              secureUrl: imageUrl,
              width: 1200,
              height: 630,
              type: "image/jpeg",
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
  galeria[]{
    ...,
    asset->
  }
}`;

    const tipologia = await client.fetch(query, { sigla });

    const options = { next: { revalidate: 30 } };

    console.log("Sanity Document:", tipologia);
      // Now you can safely use sigla
      return (
         
    <main className="mt-[20px] px-6 md:px-8 grid xl:grid-cols-4 gap-6 xl:gap-10 xl:h-[calc(100vh-20px)] xl:overflow-hidden pb-6">

                  <ComparadoresSincronizados_test
                  data={{
                    name: tipologia.name,
                    descripcion: tipologia.descripcion,
                    planta_ampliacion: tipologia.planta_ampliacion ? urlFor(tipologia.planta_ampliacion).url() : undefined,
                    planta_inicial: tipologia.planta_inicial ? urlFor(tipologia.planta_inicial).url() : undefined,
                    
                    // 1. Dejamos las imágenes sin forzar tamaño para no arruinar el Desktop
                    render_ampliacion: tipologia.render_ampliacion ? urlFor(tipologia.render_ampliacion).url() : undefined,
                    render_inicial: tipologia.render_inicial ? urlFor(tipologia.render_inicial).url() : undefined,
                    
                    // 2. PASAMOS EL HOTSPOT (¡Esto es lo que faltaba en tu archivo!)
                    // Esto obligará al celular a mover la imagen cuadrada hacia el punto azul de Sanity
                    render_inicial_position: getPositionFromHotspot(tipologia.render_inicial?.hotspot),
                    render_ampliacion_position: getPositionFromHotspot(tipologia.render_ampliacion?.hotspot),
                    
                    galeria: tipologia.galeria,
                  }}
                />
    </main>
      );
    }