'use client';

import React, { useState } from 'react';
import Comparacion from './comparacion';

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
      {/* SECCIÓN PLANTA (Slider Izquierdo en Desktop) */}
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

      {/* SECCIÓN RENDER (Slider Derecho en Desktop) */}
      <div className="xl:col-span-2"> 
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