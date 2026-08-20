import { Metadata } from 'next';
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import TipologiaCard from '@/app/components/TipologiaCard';


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
]|order(sort asc)[0...12]{
  _id, 
  sort, 
  name, 
  sigla, 
  descripcion, 
  icono, 
  imagen_portada,
  render_inicial,
  galeria[0]{
    ...,
    asset->
  }
}`;

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
          <div className="text-center text-l w-full">
            <h1 className="text-2xl text-center text-white font-bold">{portada.titulo}</h1>  
          </div>
        </div>

        <ul className="flex flex-col xl:flex-row items-start justify-center gap-6 mt-15 m-auto list-none">
          {tipologias.map((tipologia) => (
            <TipologiaCard key={tipologia._id} tipologia={tipologia} />
          ))}
        </ul>
            <div className="mt-16 md:mt-24 w-full flex justify-center items-center">
          <div className="underline decoration-1 text-center text-2xl font-bold hover:decoration-4 underline-offset-4 transition-all duration-200 [&>p]:text-center [&>p]:m-0">
            <PortableText value={portada.resumen} />
          </div>
        </div>
      </div>
    </main>
  );
}