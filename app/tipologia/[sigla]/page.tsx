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
    <main className="flex font-mono items-center bg-neutral-700 h-svh w-full p-8">
      
      <div className="container m-auto max-w-7xl">
      <Link className="pb-10 text-bold hover:underline" href='/'>volver a portada</Link>
      <h1 className="text-xl font-bold mb-8 font-mono">Tipología {tipologia.sigla} {tipologia.name}</h1>
      <p className="max-w-2xl">{tipologia.descripcion}</p>
      <div className="flex  m-auto">
      
          <li className="flex flex-col items-center" >
              <div className="">
                <Comparacion 
                  urlImagenAntes={urlFor(tipologia.planta_inicial).url()} 
                  urlImagenDespues={urlFor(tipologia.planta_ampliacion).url()} 
                />
              <Image 
              src={urlFor(tipologia.imagen_portada).url()}
              alt={tipologia.icono.alt || 'Sanity Image'}
              width={800} // Specify width
              height={800} // Specify height
              />
              </div>
          </li>
      </div>
      </div>
    </main>
      );
    }