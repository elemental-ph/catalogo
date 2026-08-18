import { Metadata } from 'next';
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";


export const metadata: Metadata = {
  title: "Catálogo de viviendas - ELEMENTAL",
  description: "Catálogo de viviendas diseñadas por ELEMENTAL ",
  openGraph: {
    title: "Catálogo de viviendas - ELEMENTAL",
    description: "Catálogo de viviendas diseñadas por ELEMENTAL ",
    siteName: "ELEMENTAL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de viviendas - ELEMENTAL",
    description: "Catálogo de viviendas diseñadas por ELEMENTAL ",
  },
};

const TIPOLOGIAS_QUERY = `*[
  _type == "tipologia"
]|order(sort asc)[0...12]{_id, sort, name, sigla, descripcion, icono, imagen_portada}`;

const PORTADA_QUERY = `*[
  _type == "portada"
][0]{
  titulo,
  resumen
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const tipologias = await client.fetch<SanityDocument[]>(TIPOLOGIAS_QUERY, {}, options);
  const portada = await client.fetch(PORTADA_QUERY);

  return (
    <main className="flex flex-grow items-center w-full p-6 pb-25 pt-20 md:p-8">
      <div className="container m-auto max-w-screen">
        
        <div className="m-auto max-w-md">
          <div className="text-center text-l w-full mb-8">
            <h1 className="text-2xl text-center text-white font-bold mb-8">{portada.titulo}</h1>  
{/*             <div className="underline decoration-1 hover:decoration-4 underline-offset-4 transition-all duration-200">
              <PortableText value={portada.resumen} />
            </div> */}
          </div>
        </div>

        <ul className="flex flex-col xl:flex-row items-start justify-center gap-6 m-auto list-none">
          {tipologias.map((tipologia) => (
            <Link 
              href={`/tipologia/${tipologia.sigla}`} 
              className="group flex flex-col flex-1 w-full hover:cursor-pointer" 
              key={tipologia._id}
            >
              <li className="flex flex-col items-center w-full">
                
                {/* Contenedor de imagen con altura fija alineado abajo */}
                <div className="w-full h-[200px] xl:h-[240px] flex items-end justify-center bg-transparent invert md:opacity-75 transition group-hover:opacity-100">
                  <Image 
                    src={urlFor(tipologia.icono).url()}
                    alt={tipologia.icono?.alt || 'Sanity Image'}
                    width={450}
                    height={450} 
                    className="max-h-full w-auto object-contain"
                    priority
                  />
                </div>
                
                {/* Texto alineado en la parte superior del contenedor */}
                <div className="w-full pt-6 text-center">
                  <h1 className="text-l font-bold md:opacity-75 transition group-hover:opacity-100 [&>p]:text-center [&>p]:m-0">
                    <PortableText value={tipologia.name} />
                  </h1>
                </div>

              </li>
            </Link>
          ))}
        </ul>

      </div>
    </main>
  );
}