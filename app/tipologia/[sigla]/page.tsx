import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import Comparacion from '../../components/comparacion'



const components = {
  // ... other components
  hardBreak: () => <br />,
};

function getPositionFromHotspot(hotspot: { x: number; y: number } | undefined) {
  if (!hotspot) return 'center';
  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}
// Define esta interfaz en tu archivo de componentes o en un archivo de tipos separado
interface Proyecto {
  texto: string;
  url: string;
  // Agrega cualquier otra propiedad que pueda tener un proyecto
}

type Props = {
      params: Promise<{ sigla: string | string[] }>; // Define params as a Promise
    };

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
                          height={2000}
                          width={2000}
                          priority
                        />
                    </div>   
                        <p className="italic">{tipologia.imagen_portada.alt}</p>
                  </div>

                  <div className="prose sm:row-span-2 xl:col-span-1 whitespace-pre-line">
                    <div className="whitespace-pre-line">
                          <PortableText  value={tipologia.descripcion}/>
                    </div>

                    <div className="md:hidden mt-10"> 
                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_ampliacion).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_inicial).url()} 
                            posicionInicial={5}
                          /> 
                    <p className="mt-3 text-xs italic whitespace-pre-line">{tipologia.recintos}</p>
                    <p className="mt-3 text-center text-[#ffe900] min-w-3xs">deslizar para ver ampliaciones</p>
                  </div>

                    <div className="whitespace-pre-line pt-10"> 
                          <PortableText  value={tipologia.ficha_tecnica} components={components}/>
                    </div>  
                  </div>

                  <div className="hidden md:block xl:col-span-1"> 
                    <div>
                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_ampliacion).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_inicial).url()} 
                            posicionInicial={5}
                          /> 
                    </div>
                    <p className="mt-3 text-xs italic whitespace-pre-line">{tipologia.recintos}</p>
                    <p className="mt-3 text-center text-[#ffe900] min-w-3xs">deslizar para ver ampliaciones</p>
                  </div>

                  <div className="xl:col-span-2"> 
                    <div className="relative aspect-square md:aspect-auto"> 
                      <Comparacion 
                          urlImagenAntes={urlFor(tipologia.render_ampliacion).url()} 
                          urlImagenDespues={urlFor(tipologia.render_inicial).url()} 
                          posicionInicial={50}
                      /> 
                      <p className="mt-3 text-[#ffe900] text-center min-w-3xs">deslizar para ver ampliaciones</p>
                      </div>     
                  </div>      
    </main>
      );
    }