import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import BotonVolver from "@/app/components/BotonVolver";


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
                                  className="object-cover object-center"
                                  fill={true}
                                  src={urlFor(tipologia.imagen_portada).url()}
                                  alt={tipologia.icono.alt || 'Sanity Image'}
                          /> 
      </div> 
      <div>
      <div className="absolute inset-0 pointer-event-none flex flex-col items-center justify-center">
        <div className="h-[75%]"></div>
      <Link href={`/tipologia/${tipologia.sigla}`} className="font-mono bg-[#505050] p-5
       left-8 hover:underline"> ver detalles {tipologia.sigla}</Link>
       
       </div>
       <BotonVolver/>
      </div>

    </main>
      );
    }