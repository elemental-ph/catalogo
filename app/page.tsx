import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";


const TIPOLOGIAS_QUERY = `*[
  _type == "tipologia"
]|order(sort asc)[0...12]{_id, sort, name, sigla, descripcion, icono, imagen_portada}`;

const PORTADA_QUERY = `*[
  _type == "portada"
][0]{
  resumen
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const tipologias = await client.fetch<SanityDocument[]>(TIPOLOGIAS_QUERY, {}, options);
  const portada = await client.fetch(PORTADA_QUERY);

  return (
    
    <main className="flex flex-grow items-center w-full p-6 md:p-8">
      
      <div className="container pt-20 m-auto max-w-7xl">
       
      <h1 className="text-xl text-center font-bold mb-8">{portada.titulo}</h1>
      <div className="m-auto max-w-md">
        <div className="text-center text-l w-full mb-8">
      <PortableText  value={portada.resumen}/>
      </div>
      </div>
      <div className="flex flex-col md:flex-row m-auto">
        {tipologias.map((tipologia) => (
          <Link href={`/tipologia/${tipologia.sigla}`} className="group hover:cursor-pointer" key={tipologia._id}>
          <li className="flex flex-col items-center" >
              <div className="bg-neutral-400 md:opacity-75 transition group-hover:opacity-100 bg-transparent invert">
              <Image 
              src={urlFor(tipologia.icono).url()}
              alt={tipologia.icono.alt || 'Sanity Image'}
              width={450} // Specify width
              height={450} // Specify height
              />
              </div>
              <h1 className="text-l pt-6 pb-20 text-bold md:opacity-75 transition group-hover:opacity-100">{tipologia.sigla}</h1>
          </li>
          </Link>
        ))}
      </div>
      </div>

    </main>
  );
}
