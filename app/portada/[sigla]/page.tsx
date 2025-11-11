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
         
    <main className="flex font-mono md:h-svh h-full w-full">
      <div className="relative h-svh min-w-screen min-h"> 
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
      <Link href={`/tipologia/${tipologia.sigla}`} className="pb-10 absolute top-14
       left-8 hover:underline">-ver detalles {tipologia.sigla}</Link>
      </div>

    </main>
      );
    }