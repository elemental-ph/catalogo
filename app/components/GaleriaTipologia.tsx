'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface GaleriaProps {
  galeria: any[];
  renderInicial: any;
  renderAmpliacion?: any;
}

export default function GaleriaTipologia({ 
  galeria, 
  renderInicial, 
  renderAmpliacion 
}: GaleriaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- CONFIGURACIÓN DEL DESARROLLADOR ---
  // Cambia este valor para ajustar la velocidad de la transición en segundos
  const INTERVALO_SEGUNDOS = 4; 
  // ----------------------------------------

  const hasGaleria = galeria && galeria.length > 0;

  useEffect(() => {
    if (!hasGaleria || galeria.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galeria.length);
    }, INTERVALO_SEGUNDOS * 1000);

    return () => clearInterval(intervalId);
  }, [hasGaleria, galeria]);

  // ESCENARIO 1: Tiene Galería
  if (hasGaleria) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {galeria.map((img, idx) => (
          <div
            key={img._key || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {img.asset && (
              <Image
                src={urlFor(img).url()}
                alt={`Imagen de galería ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            )}
            {img.creditos && (
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm shadow-md">
                {img.creditos}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ESCENARIO 2: Fallback al render inicial (Comportamiento original)
  if (renderInicial) {
    return (
      <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={urlFor(renderInicial).url()}
          alt="Render Inicial"
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }

  return null;
}