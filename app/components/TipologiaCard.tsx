'use client';

import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

interface TipologiaCardProps {
  tipologia: any;
}

export default function TipologiaCard({ tipologia }: TipologiaCardProps) {
  // Identifica la primera imagen (galería o render inicial)
  const primeraImagen = tipologia.galeria || tipologia.render_inicial;

  const precargarImagenTarget = () => {
    if (!primeraImagen) return;

    // Genera exactamente la misma URL optimizada que usa GaleriaTipologia
    const imgUrl = urlFor(primeraImagen)
      .width(1200)
      .quality(80)
      .auto('format')
      .url();

    if (imgUrl) {
      const preloader = new window.Image();
      preloader.src = imgUrl; // El navegador la guarda inmediatamente en memoria
    }
  };

  return (
    <Link 
      href={`/tipologia/${tipologia.sigla}`} 
      className="group flex flex-col flex-1 w-full hover:cursor-pointer" 
      onMouseEnter={precargarImagenTarget}
      onTouchStart={precargarImagenTarget}
    >
      <li className="flex flex-col items-center w-full">
        {/* Contenedor de imagen */}
        <div className="w-full md:h-[280px] flex items-end justify-center bg-transparent invert md:opacity-75 transition group-hover:opacity-100">
          {tipologia.icono && (
            <Image 
              src={urlFor(tipologia.icono).url()}
              alt={tipologia.icono?.alt || 'Sanity Image'}
              width={450}
              height={450} 
              className="max-h-full w-auto object-contain"
              priority
            />
          )}
        </div>
        
        {/* Texto */}
        <div className="w-full pt-6 text-center">
          <h1 className="text-l font-bold md:opacity-75 transition group-hover:opacity-100 [&>p]:text-center [&>p]:m-0">
            <PortableText value={tipologia.name} />
          </h1>
        </div>
      </li>
    </Link>
  );
}