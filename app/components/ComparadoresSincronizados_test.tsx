'use client';

import React, { useState } from 'react';
import Comparacion from './comparacion';
import { PortableText } from "@portabletext/react";
// 1. IMPORTAMOS EL NUEVO COMPONENTE DE GALERÍA
import GaleriaTipologia from './GaleriaTipologia'; 

// 2. ACTUALIZAMOS LA INTERFAZ PARA INCLUIR LA GALERÍA
interface TipologiaData {
  name?: string;
  descripcion?: any;
  planta_ampliacion?: string;
  planta_inicial?: string;
  render_ampliacion?: string;
  render_inicial?: string;
  render_inicial_position?: string; 
  render_ampliacion_position?: string;
  galeria?: any[]; // <-- Añadido: Soporte para el array de imágenes
}

export default function ComparadoresSincronizados_test({ data }: { data: TipologiaData }) {
  const [posicionCompartida, setPosicionCompartida] = useState(50);

  const hayComparacionPlanta = Boolean(data.planta_ampliacion && data.planta_inicial);
  const Name = data.name?.replace(/\n+/g, ' ').trim() ?? '';
  
  // 3. VARIABLE DE CONTROL: ¿Tenemos una galería válida para mostrar?
  const tieneGaleria = Boolean(data.galeria && data.galeria.length > 0);

  return (
    <>
      <div className="prose xl:col-span-1 flex flex-col justify-between xl:h-full xl:min-h-0 max-w-none w-full">

        {/* --- VISTA MÓVIL (Render + Título) --- */}
        <div className="block md:hidden mb-6"> 
          <h1 className="font-bold text-2xl mb-4">
            {Name}
          </h1>
          <div className="relative w-full aspect-square overflow-hidden">
            {/* LÓGICA CONDICIONAL PARA MÓVIL */}
            {tieneGaleria ? (
              <GaleriaTipologia 
                galeria={data.galeria || []} 
                renderInicial={data.render_inicial} 
              />
            ) : (
              <Comparacion 
                urlImagenAntes={data.render_ampliacion || ''} 
                urlImagenDespues={data.render_inicial} 
                posicion={posicionCompartida}
                onPosicionChange={setPosicionCompartida}
                posicionInicial={50}
                objectFit="cover"
                objectPositionAntes={data.render_ampliacion_position}
                objectPositionDespues={data.render_inicial_position}
              /> 
            )}
          </div>
        </div>
        
        {/* --- DESCRIPCIÓN --- */}
        <div className="shrink-0 mb-6 text-lg xl:mb-4 xl:overflow-y-auto">
          <h1 className="font-bold uppercase text-xl hidden md:block">
            {Name}
          </h1>
          <PortableText value={data.descripcion}/>
        </div>
            
        
      

{/* --- PLANTA DE ARQUITECTURA (Sin cambios) --- */}
        <div className="xl:min-h-0 flex flex-col justify-start w-full mb-6 xl:mb-0">
          
          <div className="relative w-full overflow-hidden">
            <Comparacion 
              urlImagenAntes={data.planta_ampliacion || ''} 
              urlImagenDespues={data.planta_inicial} 
              posicion={posicionCompartida}
              onPosicionChange={setPosicionCompartida}
              posicionInicial={50}
              objectFit="contain"
              objectPositionAntes="center center"
              objectPositionDespues="center center"
            /> 
          </div>
          {hayComparacionPlanta && (
            <p className="mt-2 text-center text-[#ffe900] text-xl pb-5 shrink-0">
              deslizar para ver ampliaciones
            </p>
          )} 
        </div>
        </div>
      {/* --- VISTA DESKTOP (Render Grande) --- */}
      <div className="hidden md:block xl:col-span-3 xl:h-full xl:min-h-0"> 
        <div className="pt-[110] relative h-full w-full overflow-hidden min-h-[400px] xl:min-h-0 bg-transparent"> 
          {/* LÓGICA CONDICIONAL PARA DESKTOP */}
          {tieneGaleria ? (
            <GaleriaTipologia 
              galeria={data.galeria || []} 
              renderInicial={data.render_inicial} 
            />
          ) : (
            <Comparacion 
              urlImagenAntes={data.render_ampliacion || ''} 
              urlImagenDespues={data.render_inicial} 
              posicion={posicionCompartida}
              onPosicionChange={setPosicionCompartida}
              posicionInicial={50}
              objectFit="cover"
              objectPositionAntes={data.render_ampliacion_position}
              objectPositionDespues={data.render_inicial_position}
            /> 
          )}
        </div>
        
      </div>
      
    </>
  );
}