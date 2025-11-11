import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import Comparacion from '../../components/comparacion'


type Props = {
      params: Promise<{ sigla: string | string[] }>; // Define params as a Promise
    };

export default async function Tipologia({ params }: Props) {
    const { sigla } = await params;
    const query = `*[_type == "tipologia" && sigla == $sigla][0]`; // [0] to get the first matching document

    const tipologia = await client.fetch(query, { sigla });

    const options = { next: { revalidate: 30 } };

      // Now you can safely use sigla
      return (
         
    <main className="flex font-mono md:h-svh h-full w-full p-8">
      <Link className="pb-10 absolute top-8 left-8 hover:underline" href='/'>-volver a portada</Link>
      <Link href={`/portada/${tipologia.sigla}`} className="pb-10 absolute top-14 left-8 hover:underline" key={tipologia._id}>-ver imagen {tipologia.sigla}</Link>

        <div className="container pt-20 m-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="min-w-2xs md:col-span-2"> 
                    <h1 className="font-bold">Tipología {tipologia.sigla}</h1>
                    <h1 className="">{tipologia.name}</h1>
                  </div> 

                  <div className="min-w-2xs"> 
                         
                  
                          <p className="">{tipologia.descripcion}</p>
                          
                          <p className="mt-5">Superficie inicial: {tipologia.superficie_inicial}m²</p>
                          <p className="">Superficie ampliada: {tipologia.superficie_ampliada}m²</p>
                          <p className="">Densidad máxima: {tipologia.densidad_maxima}viv/há</p>
                          <p className="">Pisos: {tipologia.pisos}</p>

                          <p className="mt-5">Proyectos elemental con la misma tipología:</p>
                          <a href={tipologia.proyecto_1} className="block hover:underline">{tipologia.proyecto_1}</a>
                          <a href={tipologia.proyecto_2} className="block hover:underline">{tipologia.proyecto_2}</a>
                          <a href={tipologia.proyecto_3} className="block hover:underline">{tipologia.proyecto_3}</a>

                          <p className="mt-5">Empresas industrializadoras:</p>
                          <a href={tipologia.link_empresa_1} className="block hover:underline">{tipologia.link_empresa_1}</a>
                          <a href={tipologia.link_empresa_2} className="block hover:underline">{tipologia.link_empresa_2}</a>

                 
                  </div>  

                  <div className="min-w-2xs grid grid-cols-1 md:grid-cols-2"> 
                    <div className="min-w-2xs md:col-span-2"> 
                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_ampliacion).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_inicial).url()} 
                          />
                    </div> 
                  </div>
        </div>

    </main>
      );
    }