'use client'; 

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from "next/link";

interface ImageGalleryProps {
  imageUrls: string[];
  sigla: string;
}

/**
 * Galería de imágenes a pantalla completa con navegación manual (botones y swipe), 
 * transición "fade" sin destello de fondo, y estilos Tailwind CSS.
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls, sigla }) => {
  // --- HOOKS DE ESTADO Y REFERENCIA ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [leavingImageIndex, setLeavingImageIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false); 
  const startX = useRef(0);         // Para el inicio del swipe táctil
  
  const FADE_DURATION_MS = 0;
  const SWIPE_THRESHOLD = 50; 

  // Asegurar el montaje en el cliente y resolver problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- LÓGICA DE NAVEGACIÓN Y FADE ---
  
  // Función central para cambiar de imagen, manejando el fade-out
  const handleChangeImage = useCallback((newIndex: number) => {
    // 1. La imagen actual se marca como "saliente"
    setLeavingImageIndex(currentImageIndex);
    
    // 2. Cambia la imagen entrante inmediatamente (aparece en z-30)
    setCurrentImageIndex(newIndex);
    
    // 3. Limpiamos la referencia a la imagen saliente SÓLO después de que la transición CSS (0.5s) haya terminado.
    setTimeout(() => {
        setLeavingImageIndex(-1);
    }, FADE_DURATION_MS);
    
  }, [currentImageIndex, FADE_DURATION_MS, imageUrls.length]);


  // Lógica para avanzar
  const handleNext = useCallback(() => {
    if (imageUrls.length <= 1) return;
    const newIndex = (currentImageIndex + 1) % imageUrls.length;
    handleChangeImage(newIndex);
  }, [currentImageIndex, imageUrls.length, handleChangeImage]);

  // Lógica para retroceder
  const handlePrev = useCallback(() => {
    if (imageUrls.length <= 1) return;
    const newIndex = currentImageIndex === 0 ? imageUrls.length - 1 : currentImageIndex - 1;
    handleChangeImage(newIndex);
  }, [currentImageIndex, imageUrls.length, handleChangeImage]);
  
  // --- LÓGICA DEL SWIPE TÁCTIL ---

  // Almacena la posición inicial X al tocar
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  // Calcula la diferencia al levantar el dedo y ejecuta la navegación
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX.current - endX; 

    if (imageUrls.length <= 1 || Math.abs(diffX) < SWIPE_THRESHOLD) {
      return;
    }

    if (diffX > 0) {
      // Swipe de derecha a izquierda -> Siguiente
      handleNext();
    } else {
      // Swipe de izquierda a derecha -> Anterior
      handlePrev();
    }
  };

  // --- RENDERIZADO CONDICIONAL ---
  if (!isMounted || imageUrls.length === 0) { 
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        {imageUrls.length === 0 ? 'No hay imágenes para mostrar.' : 'Cargando Galería...'}
      </div>
    );
  }

  // --- RENDERIZADO FINAL ---
  const buttonClasses = "p-3 hidden md:block bg-[#505050] cursor-pointer transition-colors backdrop-blur-sm disabled:hidden disabled:cursor-not-allowed";

  return (
    
    // Agregamos los manejadores táctiles al contenedor principal
    <div 
      className="fixed inset-0 bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Mapeo de todas las URLs para crear las capas de imagen */}
      {imageUrls.map((url, index) => {
        
        const isActive = index === currentImageIndex;
        const isLeaving = index === leavingImageIndex;
        
        let opacityClass = 'opacity-0';
        let zIndex = 10;

        if (isActive) {
            // IMAGEN ENTRANTE: Visible y encima de la saliente
            opacityClass = 'opacity-100';
            zIndex = 30; 
        } else if (isLeaving) {
            // IMAGEN SALIENTE: Inicia fade-out y se ubica debajo de la activa
            opacityClass = 'opacity-0';
            zIndex = 20; 
        }
        
        return (
          <div
            key={url}
            className={`
              absolute inset-0 w-full h-full 
              bg-cover bg-center 
              transition-opacity duration-1500 ease-in-out 
              ${opacityClass} 
              pointer-events-none 
            `}
            style={{ 
              backgroundImage: `url(${url})`,
              zIndex: zIndex
            }}
          />
        );
      })}

      {/* Controles de Navegación (z-50) */}
      <div className="absolute inset-0 flex items-center justify-between text-xl font-bold px-4 sm:px-7 z-50">
        <button 
          onClick={handlePrev} 
          aria-label="Imagen anterior" 
          disabled={imageUrls.length <= 1} 
          className={buttonClasses}
        >
          &#10094;
        </button>
        <button 
          onClick={handleNext} 
          aria-label="Imagen siguiente" 
          disabled={imageUrls.length <= 1} 
          className={buttonClasses}
        >
          &#10095;
        </button>
      </div>

      {/* Indicador de posición actual */}
      <div className="absolute bottom-0 left-0 z-50 bg-[#505050] font-bold h-14 px-3 py-3">
          {currentImageIndex + 1} / {imageUrls.length}
      </div>

      <div className="absolute bottom-0 right-0 z-50 bg-[#505050] w-15 h-14 text-4xl pb-3 px-2 pt-1 right-0">
            <Link href={`/tipologia/${sigla}`} className="p-3  font-bold transition hover:underline">+</Link>
      </div>
          

    </div>
  );
};

export default ImageGallery;