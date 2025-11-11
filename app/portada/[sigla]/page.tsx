import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";


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
         
    <main className="flex flex-grow items-center w-full p-8">
      <div className=""> 
      <Image 
                                  className=""
                                  layout="fill"
                                  objectFit="cover"
                                  objectPosition="center"
                                  src={urlFor(tipologia.imagen_portada).url()}
                                  alt={tipologia.icono.alt || 'Sanity Image'}
                          /> 
      </div> 
      <div>
      <Link className="pb-10 absolute top-8 left-8 hover:underline" href='/'>-volver a portada</Link>
      <div className="absolute inset-0 flex items-center justify-center">
      <Link href={`/tipologia/${tipologia.sigla}`} className="rounded-3xl font-mono shadow-md bg-neutral-700 p-5
       left-8 hover:underline"> ver detalles {tipologia.sigla}</Link>
       </div>
      </div>

    </main>
      );
    }