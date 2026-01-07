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
  fit?: boolean;
}

/**
 * Componente que muestra dos imágenes superpuestas con un slider para compararlas.
 * Utiliza la librería 'react-compare-slider'.
 * * @param {ComparacionProps} props - Las URLs de las dos imágenes.
 * @returns {JSX.Element} El componente de comparación.
 */
const Comparacion: React.FC<ComparacionProps> = ({ 
  urlImagenAntes, 
  urlImagenDespues, 
  fit = true }) => {
  // Un estilo simple para el contenedor, puedes ajustarlo en tu CSS global o módulos.
const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', // O un alto fijo como '500px'
    overflow: 'hidden'
  };

  // Estilo para la línea separadora: más gruesa y de color primario

// 1. El Handle (manejador) personalizado
  const CustomHandle = (
    <ReactCompareSliderHandle
      // El handle personalizado define el estilo de la línea visible al 
      // establecer un borde o sombra en el handle mismo.
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
        boxShadow: '',
        border: '1px solid #ffe900'
      }}
    >
      {'<>'}
    </ReactCompareSliderHandle>
  );

  return (
    <div style={containerStyle}>
      {/* El componente ReactCompareSlider recibe los dos elementos de la comparación 
        como props 'itemOne' y 'itemTwo'.
      */}
      <ReactCompareSlider
        // Ajuste para el desplazamiento del slider (horizontal por defecto)
        position={0} // Inicia el slider a la mitad (50%)

        // 2. Aplicar el Handle personalizado
        handle={CustomHandle}
        style={{ width: '100%', height: '100%' }}

        boundsPadding={0}
        // itemChangeDelay={200} // Puedes añadir un ligero retraso si quieres
        
        // Imagen 1: La que está detrás (Antes)
        itemOne={
          <ReactCompareSliderImage 
            src={urlImagenAntes} 
            alt="Imagen Antes" 
            style={styleFitContainer as React.CSSProperties} // Asegura que la imagen cubra el espacio
          />
        }
        
        // Imagen 2: La que está delante (Después)
        itemTwo={
          <ReactCompareSliderImage 
            src={urlImagenDespues} 
            alt="Imagen Después" 
            style={styleFitContainer as React.CSSProperties} // Asegura que la imagen cubra el espacio
          />
        }
      />
    </div>
  );
};

export default Comparacion;