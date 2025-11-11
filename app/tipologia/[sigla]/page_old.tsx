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
      
      <Link className="pb-10 absolute top-8 left-8 hover:underline" href='/'>volver a portada</Link>


        <div className="container pt-20 m-auto flex flex-col md:flex-row max-w-6xl justify-between">
          
                  <div className="flex-col min-w-2xs md:p-5 "> 
                          <h1 className="text-xl font-bold font-mono">Tipología {tipologia.sigla}</h1>
                          <h1 className="text-xl mb-8 font-mono">{tipologia.name}</h1>
                    
                          <Image 
                                  className="object-cover"
                                  src={urlFor(tipologia.imagen_portada).url()}
                                  alt={tipologia.icono.alt || 'Sanity Image'}
                                  width={600} // Specify width
                                  height={600} // Specify height
                          />
                          <p className="max-w-2xl mt-10">{tipologia.descripcion}</p>
                  </div>  

                  <div className="flex-col min-w-2xs md:p-5 "> 
                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_ampliacion).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_inicial).url()} 
                          />

                          <p className="max-w-2xl mt-10">Pisos: {tipologia.pisos}</p>
                          <p className="max-w-2xl">superficie inicial: {tipologia.superficie_inicial}m²</p>
                          <p className="max-w-2xl">Superficie ampliada: {tipologia.superficie_ampliada}m²</p>
                          <p className="max-w-2xl">Densidad máxima: {tipologia.densidad_maxima}viv/há</p>

                          <p className="max-w-2xl mt-10">Empresas industrializadoras:</p>
                          <a href={tipologia.link_empresa_1} className="block hover:underline">{tipologia.link_empresa_1}</a>
                          <a href={tipologia.link_empresa_2} className="block hover:underline">{tipologia.link_empresa_2}</a>

                          <p className="max-w-2xl mt-10">Proyectos elemental con la tipología:</p>
                          <a href={tipologia.proyecto_1} className="block hover:underline">{tipologia.proyecto_1}</a>
                          <a href={tipologia.proyecto_2} className="block hover:underline">{tipologia.proyecto_2}</a>

                  </div>
        </div>

    </main>
      );
    }