'use client';

import { useState, useEffect, useCallback, TouchEvent } from 'react';
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
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

  // Estados para swipe táctil
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const MIN_SWIPE_DISTANCE = 50; // Mínimo de px recorridos para registrar swipe
  const hasGaleria = Array.isArray(galeria) && galeria.length > 0;

  const getOptimizedUrl = useCallback((source: any) => {
    if (!source) return '';
    return urlFor(source)
      .width(2000)
      .quality(85)
      .auto('format')
      .url();
  }, []);

  const handlePrev = useCallback(() => {
    if (!hasGaleria) return;
    setCurrentIndex((prev) => (prev === 0 ? galeria.length - 1 : prev - 1));
  }, [hasGaleria, galeria.length]);

  const handleNext = useCallback(() => {
    if (!hasGaleria) return;
    setCurrentIndex((prev) => (prev + 1) % galeria.length);
  }, [hasGaleria, galeria.length]);

  useEffect(() => {
    setCurrentIndex(0);
    setLoadedImages({});
    setFallbackLoaded(false);
  }, [galeria, renderInicial]);

  // Precarga de la imagen siguiente y anterior
  useEffect(() => {
    if (!hasGaleria || galeria.length <= 1) return;

    const nextIndex = (currentIndex + 1) % galeria.length;
    const prevIndex = (currentIndex - 1 + galeria.length) % galeria.length;

    [nextIndex, prevIndex].forEach((idx) => {
      const img = galeria[idx];
      if (img?.asset) {
        const imgPreloader = new window.Image();
        imgPreloader.src = getOptimizedUrl(img);
      }
    });
  }, [currentIndex, galeria, hasGaleria, getOptimizedUrl]);

  // Listener para Teclado (Flecha Izquierda y Derecha)
  useEffect(() => {
    if (!hasGaleria || galeria.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasGaleria, galeria.length, handlePrev, handleNext]);

  // Controladores de eventos de Swipe (Móvil / Pantallas táctiles)
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || galeria.length <= 1) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const creditosActuales = hasGaleria ? galeria[currentIndex]?.creditos : null;

  // ESCENARIO 1: Galería de imágenes
  if (hasGaleria) {
    return (
      <div 
        className="relative w-full h-full overflow-hidden bg-transparent isolate transform-gpu select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {galeria.map((img, idx) => {
          const isActive = idx === currentIndex;
          const isLoaded = Boolean(loadedImages[idx]);
          const imgUrl = getOptimizedUrl(img);

          return (
            <div
              key={img._key || idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out will-change-opacity ${
                isActive && isLoaded
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
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
                  onLoad={() => {
                    setLoadedImages((prev) => ({ ...prev, [idx]: true }));
                  }}
                  draggable={false}
                />
              )}
            </div>
          );
        })}

        {/* Botones de navegación (Visuales) */}
        {galeria.length > 1 && (
          <div className="absolute inset-0 z-20 flex items-center justify-between p-4 pointer-events-none">
            <button
              onClick={handlePrev}
              aria-label="Imagen anterior"
              className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Siguiente imagen"
              className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Créditos en la esquina inferior derecha */}
        {/* {creditosActuales && (
          <div className="absolute bottom-3 right-3 z-20 pointer-events-none select-none flex items-end justify-end translate-x-[10px]">
            <span className="text-[10px] md:text-xs text-white/80 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
              © {creditosActuales}
            </span>
          </div>
        )} */}
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
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'center',
              transition: 'opacity 0.7s ease-in-out',
              opacity: fallbackLoaded ? 1 : 0
            }}
            priority
            fetchPriority="high"
            onLoad={() => setFallbackLoaded(true)}
          />
        )}
      </div>
    );
  }

  return null;
}