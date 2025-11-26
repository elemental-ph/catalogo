import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import BotonVolver from "@/app/components/BotonVolver";
import ImageGallery from "@/app/components/gallery";
import { SanityImage } from "@/app/types/sanity";

type Props = {
      params: Promise<{ sigla: string | string[] }>; // Define params as a Promise
    };

export default async function Tipologia({ params }: Props) {
    const { sigla } = await params;
    //const query = `*[_type == "tipologia" && sigla == $sigla][0]`; // [0] to get the first matching document

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
    lista_imagenes[] {
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    planta_inicial,
    planta_ampliacion,
    recintos,
    lista_proyectos[]->{
      texto,
      url,
    },
    }`;

    const tipologia = await client.fetch(query, { sigla });

    const options = { next: { revalidate: 30 } };

    const imageArray=tipologia.lista_imagenes;

    const imageUrls = imageArray.map((item: SanityImage)=> urlFor(item).url());



      // Now you can safely use sigla
      return (
         
    <main className="flex flex-grow items-center w-full p-8">
          <ImageGallery imageUrls={imageUrls} sigla={tipologia.sigla}/>
          <BotonVolver/>
    </main>
      );
    }