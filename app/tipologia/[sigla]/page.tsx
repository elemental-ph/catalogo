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
         
    <main className="divide-dashed flex flex-grow flex-col mt-[130px] items-center max-w-5xl mx-auto">
      {/* <Link href={`/portada/${tipologia.sigla}`} className="pb-10 absolute top-14 left-8 hover:underline" key={tipologia._id}>-ver imagen {tipologia.sigla}</Link> */}
      <section className="container border-solid grid grid-cols-1 md:grid-cols-2 gap-5 h-dvh" id="descripcion">
                  
                  <div className="md:col-span-2 h-full"> 
                        <Image 
                        src={urlFor(tipologia.imagen_portada).url()}
                        alt={tipologia.imagen_portada.alt || 'Sanity Image'}
                        width={2000} // Specify width
                        height={2000} // Specify height
                        />
                        <p className="italic">{tipologia.imagen_portada.alt}</p>
                  </div>    
      </section>
      <section className="container grid md:grid-cols-2 gap-5 h-dvh" id="textos">
                  <div className="text-right text-2xl"> 
                    <h2 className="font-bold">{tipologia.sigla}</h2>
                    <h2 className="">{tipologia.name}</h2>
                  </div> 

                  <div className="">
                      <PortableText  value={tipologia.descripcion}/>
                  </div> 

                  <div className=""> 
                          <PortableText  value={tipologia.ficha_tecnica}/>
                  </div>  

                  <div className="min-w-2xs grid-cols-1 md:col-span-1"> 
                          <Comparacion 
                            urlImagenAntes={urlFor(tipologia.planta_ampliacion).url()} 
                            urlImagenDespues={urlFor(tipologia.planta_inicial).url()} 
                          /> 
                    <p className="mt-3 text-xs italic whitespace-pre-line">{tipologia.recintos}</p>
                    <p className="mt-3 text-[#ffe900] min-w-3xs">deslizar para ver tipo de ampliación</p>
                  </div>
      </section>
      <section className="container grid grid-cols-1 md:grid-cols-2 gap-5 h-dvh" id="render">
        <div className="container m-auto grid grid-cols-1 md:col-span-2 gap-8">
          <div className=""> 
              <Comparacion 
                  urlImagenAntes={urlFor(tipologia.render_ampliacion).url()} 
                  urlImagenDespues={urlFor(tipologia.render_inicial).url()} 
              /> 
              <p className="mt-3 text-[#ffe900] text-center min-w-3xs">deslizar para ver tipo de ampliación</p>
          </div>
        </div>
      </section>
    </main>
      );
    }