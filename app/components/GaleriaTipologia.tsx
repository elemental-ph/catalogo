'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface GaleriaProps {
  galeria?: any[];
  renderInicial?: any;
  renderAmpliacion?: any;
}

export default function GaleriaTipologia({ 
  galeria = [], 
  renderInicial 
}: GaleriaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const INTERVALO_SEGUNDOS = 4;
  const hasGaleria = Array.isArray(galeria) && galeria.length > 0;

  // Ajuste de nitidez: Elevamos el ancho base a 2000px y la calidad al 85%
  const getOptimizedUrl = (source: any) => {
    if (!source) return '';
    return urlFor(source)
      .width(2000)
      .quality(85)
      .auto('format')
      .url();
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [galeria, renderInicial]);

  // Precarga de la siguiente imagen
  useEffect(() => {
    if (!hasGaleria || galeria.length <= 1) return;

    const nextIndex = (currentIndex + 1) % galeria.length;
    const nextImg = galeria[nextIndex];

    if (nextImg?.asset) {
      const imgPreloader = new window.Image();
      imgPreloader.src = getOptimizedUrl(nextImg);
    }
  }, [currentIndex, galeria, hasGaleria]);

  // Carrusel automático
  useEffect(() => {
    if (!hasGaleria || galeria.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galeria.length);
    }, INTERVALO_SEGUNDOS * 1000);

    return () => clearInterval(intervalId);
  }, [hasGaleria, galeria.length]);

  const creditosActuales = hasGaleria ? galeria[currentIndex]?.creditos : null;

  // ESCENARIO 1: Galería de imágenes
  if (hasGaleria) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-transparent isolate transform-gpu">
        {galeria.map((img, idx) => {
          const isActive = idx === currentIndex;
          const imgUrl = getOptimizedUrl(img);

          return (
            <div
              key={img._key || idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out will-change-opacity ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt={`Imagen de galería ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 75vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority={idx === 0}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                />
              )}
            </div>
          );
        })}

        {/* Créditos en la esquina inferior derecha */}
        {creditosActuales && (
          <div className="absolute bottom-10 right-2 z-20 pointer-events-none select-none flex items-end justify-end translate-x-[10px]">
            <span className="text-[10px] md:text-xs text-white/80 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              © {creditosActuales}
            </span>
          </div>
        )}
      </div>
    );
  }

  // ESCENARIO 2: Fallback Render Inicial
  if (renderInicial) {
    const renderUrl = getOptimizedUrl(renderInicial);
    return (
      <div className="relative w-full h-full overflow-hidden bg-transparent isolate">
        {renderUrl && (
          <Image
            src={renderUrl}
            alt="Render Inicial"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 75vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            fetchPriority="high"
          />
        )}
      </div>
    );
  }

  return null;
}