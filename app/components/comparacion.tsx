'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  ReactCompareSlider, 
  ReactCompareSliderHandle,
  styleFitContainer 
} from 'react-compare-slider';

interface ComparacionProps {
  urlImagenAntes?: string;
  urlImagenDespues?: string;
  posicion?: number; 
  onPosicionChange?: (val: number) => void; 
  posicionInicial?: number; 
  fit?: boolean;
  objectFit?: 'cover' | 'contain';
  objectPositionAntes?: string;  
  objectPositionDespues?: string;
}

export default function Comparacion({ 
  urlImagenAntes, 
  urlImagenDespues, 
  posicion, 
  onPosicionChange,
  posicionInicial = 50, 
  objectFit = 'cover',
  objectPositionAntes = 'center',
  objectPositionDespues = 'center'
}: ComparacionProps) {

  const imgAntes = urlImagenAntes?.trim() ? urlImagenAntes : undefined;
  const imgDespues = urlImagenDespues?.trim() ? urlImagenDespues : undefined;
  const esComparacion = Boolean(imgAntes && imgDespues);
  const imagenUnica = imgAntes || imgDespues;

  const [cargadaAntes, setCargadaAntes] = useState(false);
  const [cargadaDespues, setCargadaDespues] = useState(false);
  const refAntes = useRef<HTMLImageElement>(null);
  const refDespues = useRef<HTMLImageElement>(null);

  const [cargadaUnica, setCargadaUnica] = useState(false);
  const refUnica = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCargadaAntes(false);
    setCargadaDespues(false);
    setCargadaUnica(false);

    if (imgAntes && refAntes.current?.complete) setCargadaAntes(true);
    if (imgDespues && refDespues.current?.complete) setCargadaDespues(true);
    if (imagenUnica && refUnica.current?.complete) setCargadaUnica(true);
  }, [imgAntes, imgDespues, imagenUnica]);

  if (!imagenUnica) return null;

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', 
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'pan-y', // 👈 Permite scroll vertical nativo sobre el área
  };

  if (!esComparacion) {
    return (
      <div style={containerStyle}>
        <div style={{ position: 'relative', width: '100%', height: '100%', touchAction: 'pan-y' }}>
          <img
            ref={refUnica}
            src={imagenUnica}
            alt="Imagen de la tipología"
            onLoad={() => setCargadaUnica(true)}
            style={{
              ...styleFitContainer,
              objectFit,
              objectPosition: imgAntes ? objectPositionAntes : objectPositionDespues,
              transition: 'opacity 0.5s ease-in-out',
              opacity: cargadaUnica ? 1 : 0,
              display: 'block',
              width: '100%',
              height: '100%',
              touchAction: 'pan-y',
            }}
            // @ts-ignore
            fetchPriority="high"
          />
        </div>
      </div>
    );
  }

  const ambasCargadas = cargadaAntes && cargadaDespues;

  const CustomHandle = (
    <ReactCompareSliderHandle
      style={{ color: '#ffe900', touchAction: 'pan-y' }}
      buttonStyle={{
        backgroundColor: '#ffe900',
        color: '#000000',
        border: 'none',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        width: '38px',
        height: '38px',
      }}
    >
      <span 
        style={{ 
          position: 'absolute', 
          left: '45px', 
          color: '#ffe900', 
          fontWeight: 'bold',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}
      >
        deslizar
      </span>
    </ReactCompareSliderHandle>
  );

  return (
    <div style={containerStyle}>
      <div
        style={{
          width: '100%',
          height: '100%',
          transition: 'opacity 0.5s ease-in-out',
          opacity: ambasCargadas ? 1 : 0,
          touchAction: 'pan-y', // 👈 Habilita el pan vertical
        }}
      >
        <ReactCompareSlider
          position={posicion !== undefined ? posicion : posicionInicial} 
          onPositionChange={onPosicionChange}
          handle={CustomHandle}
          style={{ width: '100%', height: '100%', touchAction: 'pan-y' }} // 👈 Regla clave para el slider
          boundsPadding={0}
          itemOne={
            <img 
              ref={refAntes}
              src={imgAntes} 
              alt="Imagen Antes" 
              onLoad={() => setCargadaAntes(true)}
              style={{
                ...styleFitContainer,
                objectFit,
                objectPosition: objectPositionAntes,
                display: 'block',
                width: '100%',
                height: '100%',
                touchAction: 'pan-y',
              }}
              // @ts-ignore
              fetchPriority="high"
            />
          }
          itemTwo={
            <img 
              ref={refDespues}
              src={imgDespues} 
              alt="Imagen Después" 
              onLoad={() => setCargadaDespues(true)}
              style={{
                ...styleFitContainer,
                objectFit,
                objectPosition: objectPositionDespues,
                display: 'block',
                width: '100%',
                height: '100%',
                touchAction: 'pan-y',
              }}
              // @ts-ignore
              fetchPriority="high"
            />
          }
        />
      </div>
    </div>
  );
}