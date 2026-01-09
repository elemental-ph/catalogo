// Comparacion.tsx

import React from 'react';
import { 
  ReactCompareSlider, 
  ReactCompareSliderImage, 
  ReactCompareSliderHandle,
  styleFitContainer 
} from 'react-compare-slider';

// Definición de las Props que recibirá el componente
interface ComparacionProps {
  /** URL de la imagen que estará en la parte 'antes' o 'fondo'. */
  urlImagenAntes: string;
  /** URL de la imagen que estará en la parte 'después' o 'frente'. */
  urlImagenDespues: string;
  /** Permite elegir donde parte el slider (0 a 100). Por defecto 50. */
  posicionInicial?: number; 
  fit?: boolean;
}

/**
 * Componente que muestra dos imágenes superpuestas con un slider para compararlas.
 */
const Comparacion: React.FC<ComparacionProps> = ({ 
  urlImagenAntes, 
  urlImagenDespues, 
  posicionInicial = 50, // Valor por defecto en el centro
  fit = true 
}) => {

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', 
    overflow: 'hidden'
  };

  // 1. El Handle (manejador) personalizado
  const CustomHandle = (
    <ReactCompareSliderHandle
      style={{
        color: '#ffe900',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      buttonStyle={{
        backdropFilter: undefined,
        WebkitBackdropFilter: undefined,
        backgroundColor: '#ffe900',
        width:'35px',
        height:'35px',
        color: '#505050',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        border: '1px solid #ffe900'
      }}
    >
      {'<test>'}
    </ReactCompareSliderHandle>
  );

  return (
    <div style={containerStyle}>
      <ReactCompareSlider
        // USAMOS EL PARÁMETRO AQUÍ:
        position={posicionInicial} 

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