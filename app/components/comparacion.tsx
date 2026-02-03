// Comparacion.tsx

import React from 'react';
import { 
  ReactCompareSlider, 
  ReactCompareSliderImage, 
  ReactCompareSliderHandle,
  styleFitContainer 
} from 'react-compare-slider';

interface ComparacionProps {
  urlImagenAntes: string;
  urlImagenDespues: string;
  /** * AHORA ES CRÍTICO: 'posicion' controla el estado desde afuera.
   * Si no se envía, usará 'posicionInicial'.
   */
  posicion?: number; 
  /** Callback que informa al padre que el usuario movió este slider */
  onPosicionChange?: (val: number) => void; 
  posicionInicial?: number; 
  fit?: boolean;
}

const Comparacion: React.FC<ComparacionProps> = ({ 
  urlImagenAntes, 
  urlImagenDespues, 
  posicion, 
  onPosicionChange,
  posicionInicial, 
  fit = true 
}) => {

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', 
    overflow: 'hidden'
  };

  const CustomHandle = (
    <div style={{alignItems: 'center', display: 'flex', height: '100%', position: 'relative'}}>
      <span style={{width: '20px', color: '#ffe900', padding: '5px'}}>
      </span> 
    <ReactCompareSliderHandle
      style={{
        color: '#ffe900',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      buttonStyle={{
        backgroundColor: 'transparent',
        width:'40px',
        height:'40px',
        color: '#ffe900',
        filter: 'none',
        boxShadow: '0 0 0px rgba(0,0,0,0.3)',
        border: '2px solid #ffe900'
      }}
    >
    
    </ReactCompareSliderHandle>
    <span style={{width: '20px', transition: 'opacity 0.25s ease-in-out', color: '#ffe900', padding: '5px'}}>
      deslizar</span> 
    </div>
  );

  return (
    <div style={containerStyle}>
      <ReactCompareSlider
        /** * CAMBIO 1: Si existe 'posicion' (controlado por el padre), la usamos.
         * Si no, cae en 'posicionInicial'.
         */
        position={posicion !== undefined ? posicion : posicionInicial} 

        /** * CAMBIO 2: Escuchamos el movimiento del usuario.
         * Cuando el usuario arrastra el slider, ejecutamos la función del padre.
         */
        onPositionChange={onPosicionChange}

        handle={CustomHandle}
        style={{ width: '100%', height: '100%' }}
        boundsPadding={0}
        
        itemOne={
          <ReactCompareSliderImage 
            src={urlImagenAntes} 
            alt="Imagen Antes" 
            style={styleFitContainer as React.CSSProperties}
          />
        }
        
        itemTwo={
          <ReactCompareSliderImage 
            src={urlImagenDespues} 
            alt="Imagen Después" 
            style={styleFitContainer as React.CSSProperties}
          />
        }
      />
    </div>
  );
};

export default Comparacion;