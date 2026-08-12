'use client';

import React, { useState } from 'react';
import Comparacion from './comparacion';
import { PortableText } from "@portabletext/react";

interface TipologiaData {
  planta_ampliacion: string;
  planta_inicial: string;
  render_ampliacion: string;
  render_inicial: string;
}

export default function ComparadoresSincronizados({ data }: { data: TipologiaData }) {
  // Este es el estado único que ambos sliders compartirán
  const [posicionCompartida, setPosicionCompartida] = useState(0);

  return (
    <>
      <div className="prose sm:row-span-2 xl:col-span-1 whitespace-pre-line flex flex-col justify-between">
        
                    <div className="whitespace-pre-line">
                      <h1 className="bold text-2xl pb-5">{data.name}</h1>
                          <PortableText  value={data.descripcion}/>
                    </div>
                 
            
      <div className="block xl:col-span-1">
        <div>
          <Comparacion 
            urlImagenAntes={data.planta_ampliacion} 
            urlImagenDespues={data.planta_inicial} 
            posicion={posicionCompartida}
            onPosicionChange={setPosicionCompartida}
            posicionInicial={0}
          /> 
        </div>
        <p className="mt-3 text-left text-[#ffe900] min-w-3xs">
          deslizar para ver ampliaciones
        </p>
      </div>
       </div>

             <div className="xl:col-span-3"> 
        <div className="relative aspect-square md:aspect-auto"> 
          <Comparacion 
            urlImagenAntes={data.render_ampliacion} 
            urlImagenDespues={data.render_inicial} 
            posicion={posicionCompartida}
            onPosicionChange={setPosicionCompartida}
            posicionInicial={0}
          /> 
        </div>
      </div>
    </>
  );
}