import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";



const TIPOLOGIAS_QUERY = `*[
  _type == "tipologia"
]|order(sort asc)[0...12]{_id, sort, name, sigla, descripcion, icono, imagen_portada}`;


const options = { next: { revalidate: 30 } };
export default async function Menu() {

  const tipologias = await client.fetch<SanityDocument[]>(TIPOLOGIAS_QUERY, {}, options);
  return (
        <div className="flex flex-row">
        {tipologias.map((tipologia) => (
          <Link href={`/tipologia/${tipologia.sigla}`} className="pointer-events-auto decoration-3 underline-offset-6 transition duration-300 hover:underline" key={tipologia._id}>

              <h1 className="pr-5">{tipologia.sigla}</h1>

          </Link>
        ))}
      </div>
  )
}