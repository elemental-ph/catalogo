import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import Comparacion from '../../components/comparacion'
import BotonVolver from "@/app/components/BotonVolver";


// Define esta interfaz en tu archivo de componentes o en un archivo de tipos separado
interface Proyecto {
  texto: string;
  url: string;
  // Agrega cualquier otra propiedad que pueda tener un proyecto
}

type Props = {
      params: Promise<{ sigla: string | string[] }>; // Define params as a Promise
    };

export default async function Tipologia({ params }: Props) {
    const { sigla } = await params;
const query = `*[_type == "tipologia" && sigla == $sigla][0]{
    _id,
    name,
    sigla,
    icono,
    descripcion, 
    imagen_portada,
    ficha_tecnica,
    planta_inicial,
    planta_ampliacion,
    recintos,
    render_inicial,
    render_ampliacion,
    }`;

    const tipologia = await client.fetch(query, { sigla });

    const options = { next: { revalidate: 30 } };

    console.log("Sanity Document:", tipologia);
      // Now you can safely use sigla
      return (
         
    <main className="mt-[130px] mb-[130px] px-8 grid md:grid-cols-4 gap-15">
                  
                  <div className="md:col-span-4 h-full"> 
                        <Image 
                        src={urlFor(tipologia.imagen_portada).url()}
                        alt={tipologia.imagen_portada.alt || 'Sanity Image'}
                        width={2000} // Specify width
                        height={2000} // Specify height
                        />
                        <p className="italic">{tipologia.imagen_portada.alt}</p>
                  </div>    

                  <div className="md:col-span-4"> 
                      <h2 className="font-bold">{tipologia.sigla}</h2>
                      <h2 className="">{tipologia.name}</h2>
                      
                  </div> 

                  <div className="">
                  <div className="">
                        <PortableText  value={tipologia.descripcion}/>
                  </div> 
                  <div className="pt-10"> 
                      <PortableText  value={tipologia.ficha_tecnica}/>
                  </div>  
                  </div>

                  <div className=""> 
                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_ampliacion).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_inicial).url()} 
                          /> 
                    <p className="mt-3 text-xs italic whitespace-pre-line">{tipologia.recintos}</p>
                    <p className="mt-3 text-[#ffe900] min-w-3xs">deslizar para ver ampliaciones</p>
                  </div>

                  <div className="md:col-span-2"> 
                      <Comparacion 
                          urlImagenAntes={urlFor(tipologia.render_ampliacion).url()} 
                          urlImagenDespues={urlFor(tipologia.render_inicial).url()} 
                      /> 
                      <p className="mt-3 text-[#ffe900] min-w-3xs">deslizar para ver ampliaciones</p>
                  </div>

                  

                  

                  <div className="mt-10 md:col-span-4"> 

                  </div>  

                  

                  
    </main>
      );
    }