'use client';

import React, { useState } from 'react';
import Comparacion from './comparacion';
import { PortableText } from "@portabletext/react";

interface TipologiaData {
  name?: string;
  descripcion?: any;
  planta_ampliacion?: string;
  planta_inicial?: string;
  render_ampliacion?: string;
  render_inicial?: string;
}

export default function ComparadoresSincronizados({ data }: { data: TipologiaData }) {
  const [posicionCompartida, setPosicionCompartida] = useState(0);

  const hayComparacionPlanta = Boolean(data.planta_ampliacion && data.planta_inicial);
  const Name = data.name?.replace(/\n+/g, ' ').trim() ?? '';

  return (
    <>
      {/* Columna Izquierda: Texto + Planta */}
      <div className="prose xl:col-span-1 flex flex-col justify-between xl:h-full xl:min-h-0 max-w-none w-full">

        {/* --- VISTA MÓVIL (Render + Título) --- */}
        <div className="block md:hidden mb-6"> 
          <h1 className="font-bold text-2xl mb-4">
            {Name}
          </h1>
          {/* El aspecto cuadrado solo envuelve a la imagen */}
          <div className="relative w-full aspect-square overflow-hidden">
            <Comparacion 
              urlImagenAntes={data.render_ampliacion || ''} 
              urlImagenDespues={data.render_inicial} 
              posicion={posicionCompartida}
              onPosicionChange={setPosicionCompartida}
              posicionInicial={0}
              objectFit="cover"
            /> 
          </div>
        </div>
        
        {/* --- DESCRIPCIÓN --- */}
        <div className="shrink-0 mb-6 xl:mb-4 xl:overflow-y-auto xl:max-h-[35vh]">
          {/* Título visible solo en Desktop/Tablet */}
          <h1 className="font-bold text-2xl mb-4 hidden md:block">
            {Name}
          </h1>
          <PortableText value={data.descripcion}/>
        </div>
            
        {/* --- PLANTA DE ARQUITECTURA --- */}
        <div className="xl:flex-1 xl:min-h-0 flex flex-col justify-end w-full mb-6 xl:mb-0">
          <div className="relative w-full aspect-square xl:aspect-auto xl:flex-1 xl:min-h-0 overflow-hidden">
            <Comparacion 
              urlImagenAntes={data.planta_ampliacion || ''} 
              urlImagenDespues={data.planta_inicial} 
              posicion={posicionCompartida}
              onPosicionChange={setPosicionCompartida}
              posicionInicial={0}
              objectFit="contain"
            /> 
          </div>
          
          {hayComparacionPlanta && (
            <p className="mt-2 text-left text-[#ffe900] text-sm shrink-0">
              deslizar para ver ampliaciones
            </p>
          )}
        </div>
      </div>

      {/* --- VISTA DESKTOP (Render Grande) --- */}
      <div className="hidden md:block xl:col-span-3 xl:h-full xl:min-h-0"> 
        <div className="relative h-full w-full overflow-hidden min-h-[400px] xl:min-h-0"> 
          <Comparacion 
            urlImagenAntes={data.render_ampliacion || ''} 
            urlImagenDespues={data.render_inicial} 
            posicion={posicionCompartida}
            onPosicionChange={setPosicionCompartida}
            posicionInicial={0}
            objectFit="cover"
          /> 
        </div>
      </div>
    </>
  );
}