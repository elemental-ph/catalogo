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
    <main className="flex font-mono bg-neutral-700 h-svh w-full p-8">
      
      <Link className="pb-10 absolute top-8 left-8 hove:text-bold underline" href='/'>volver a portada</Link>


        <div className="container m-auto flex flex-row max-w-6xl justify-between">
                  <div className="flex-col max-w-xl"> 

                          <h1 className="text-xl font-bold font-mono">Tipología {tipologia.sigla}</h1>
                          <h1 className="text-xl font-bold mb-8 font-mono">{tipologia.name}</h1>
                          <p className="max-w-2xl">{tipologia.descripcion}</p>

                          <p className="max-w-2xl mt-10">Pisos: {tipologia.pisos}</p>
                          <p className="max-w-2xl">superficie inicial: {tipologia.superficie_incial}m²</p>
                          <p className="max-w-2xl">Superficie ampliada: {tipologia.superficie_ampliada}m²</p>
                          <p className="max-w-2xl">Densidad máxima: {tipologia.densidad_maxima}viv/há</p>
                          

                  </div>  

                  <div className="flex-col aspect-video max-w-md"> 
                          <Image 
                                  className="object-cover"
                                  src={urlFor(tipologia.imagen_portada).url()}
                                  alt={tipologia.icono.alt || 'Sanity Image'}
                                  width={600} // Specify width
                                  height={600} // Specify height
                          />

                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_inicial).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_ampliacion).url()} 
                          />

                  </div>
        </div>

    </main>
      );
    }