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
    ficha_tecnica,
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
                  
                  <div className="sm:col-span-2 xl:col-span-4 text-center"> 
                      <h2 className="font-bold">{tipologia.sigla}</h2>
                      <h2 className="">{tipologia.name}</h2>
                  </div> 
                  
                  <div className="md:hidden h-full"> 
                    <div className="relative aspect-square"> 
                        <Image 
                          src={urlFor(tipologia.imagen_portada).url()}
                          alt={tipologia.imagen_portada.alt || 'Sanity Image'}
                          fill={true}
                          style={{ objectFit: 'cover',
                            objectPosition: getPositionFromHotspot(tipologia.imagen_portada?.hotspot),
                           }} 
                          sizes="(max-width: 768px) 100vw, 50vw" 
                          priority
                        />
                    </div>   
                        <p className="italic">{tipologia.imagen_portada.alt}</p>
                  </div>    

                  <div className="hidden md:block sm:col-span-2 xl:col-span-4 h-full"> 
                    <div className=""> 
                        <Image 
                          src={urlFor(tipologia.imagen_portada).url()}
                          alt={tipologia.imagen_portada.alt || 'Sanity Image'}
                          height={3000}
                          width={3000}
                          priority
                        />
                    </div>
                        <p className="italic">{tipologia.imagen_portada.alt}</p>
                  </div>

                  <div className="prose sm:row-span-2 xl:col-span-1 whitespace-pre-line">
                    <div className="whitespace-pre-line">
                          <PortableText  value={tipologia.descripcion}/>
                    </div>


                    <div className="hidden md:block whitespace-pre-line pt-10"> 
                          <PortableText  value={tipologia.ficha_tecnica}/>
                    </div>  
                  </div>

                  <ComparadoresSincronizados 
                    data={{
                      planta_ampliacion: urlFor(tipologia.planta_ampliacion).url(),
                      planta_inicial: urlFor(tipologia.planta_inicial).url(),
                      render_ampliacion: urlFor(tipologia.render_ampliacion).url(),
                      render_inicial: urlFor(tipologia.render_inicial).url(),
                    }}
                  />



                  <div className="xl:col-span-2"> 

                      <div className="md:hidden whitespace-pre-line pt-10"> 
                          <PortableText  value={tipologia.ficha_tecnica}/>
                    </div>    
                  </div>      
    </main>
      );
    }