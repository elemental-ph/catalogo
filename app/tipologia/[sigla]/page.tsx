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
    superficie,
    superficie_inicial,
    superficie_ampliada,
    densidad_maxima,
    pisos,
    link_empresa_1,
    link_empresa_2,
    link_empresa_3,
    imagen_portada,
    planta_inicial,
    planta_ampliacion,
    recintos,
    lista_proyectos[]->{
      texto,
      url,
    },
    }`; // [0] to get the first matching document

    const tipologia = await client.fetch(query, { sigla });

    const options = { next: { revalidate: 30 } };

    console.log("Sanity Document:", tipologia);
      // Now you can safely use sigla
      return (
         
    <main className="flex flex-grow items-center w-full p-8">
      <BotonVolver/>
      {/* <Link href={`/portada/${tipologia.sigla}`} className="pb-10 absolute top-14 left-8 hover:underline" key={tipologia._id}>-ver imagen {tipologia.sigla}</Link> */}

        <div className="container pt-20 m-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="min-w-2xs md:col-span-2"> 
                    <h1 className="font-bold">Tipología {tipologia.sigla}</h1>
                    <h1 className="">{tipologia.name}</h1>
                  </div> 

                  <div className="decoration-3 underline-offset-6 transition duration-300 min-w-2xs"> 
                         
                  
                          <p className="">{tipologia.descripcion}</p>
                          
                          <p className="pl-10 mt-5">Superficie: {tipologia.superficie}</p>
                          <p className="pl-10">Densidad máxima: {tipologia.densidad_maxima}viv/há</p>
                          <p className="pl-10">Pisos: {tipologia.pisos}</p>

                          <p className="mt-5">Links relacionados:</p>
                          <ul>
                            {tipologia.lista_proyectos.map((proyecto: Proyecto) => (
                              <li key={proyecto.texto}>
                                <a href={proyecto.url} className="pl-10 text-bold decoration-3 underline-offset-6 transition duration-300 underline">{proyecto.texto}</a>
                              </li>
                            ))}
                          </ul>

                          <p className="mt-5">Disponible en las siguientes tecnologías:</p>
                          <a href={tipologia.link_empresa_1} className="pl-10 block underline">{tipologia.link_empresa_1}</a>
                          <a href={tipologia.link_empresa_2} className="pl-10 block underline">{tipologia.link_empresa_2}</a>

                 
                  </div>  

                  <div className="min-w-2xs grid grid-cols-1 md:grid-cols-2"> 
                    <div className="min-w-2xs md:col-span-2"> 
                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_ampliacion).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_inicial).url()} 
                          /> 
                    </div>
                    <p className="mt-3 min-w-3xs">deslizar para ver tipo de ampliación</p>
                    <div className="min-w-2xs md:col-span-2"> 
                    <p className="mt-3 text-xs italic whitespace-pre-line">{tipologia.recintos}</p>
                    </div>
                  </div>
        </div>

    </main>
      );
    }