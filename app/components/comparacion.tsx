// Comparacion.tsx

import React from 'react';
import { 
  ReactCompareSlider, 
  ReactCompareSliderImage, 
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
  objectFit?: 'cover' | 'contain'; // Propiedad agregada
}

const Comparacion: React.FC<ComparacionProps> = ({ 
  urlImagenAntes, 
  urlImagenDespues, 
  posicion, 
  onPosicionChange,
  posicionInicial = 50, 
  fit = true,
  objectFit = 'cover' // Valor por defecto
}) => {

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', 
    position: 'relative',
    overflow: 'hidden'
  };

  const imageStyle: React.CSSProperties = {
    ...styleFitContainer,
    objectFit: objectFit, // Aplica el ajuste según el tipo de imagen
  };

  const imgAntes = urlImagenAntes?.trim() ? urlImagenAntes : undefined;
  const imgDespues = urlImagenDespues?.trim() ? urlImagenDespues : undefined;
  const imagenUnica = imgAntes || imgDespues;

  if (!imagenUnica) return null;

  if (!imgAntes || !imgDespues) {
    return (
      <div style={containerStyle}>
        <ReactCompareSliderImage 
          src={imagenUnica} 
          alt="Imagen de la tipología" 
          style={imageStyle}
        />
      </div>
    );
  }

  // --- HANDLE PERSONALIZADO CON ALINEACIÓN EXACTA Y LÍNEA AMARILLA ---
  const CustomHandle = (
    <ReactCompareSliderHandle
      style={{ color: '#ffe900' }} // Color para la línea vertical
      buttonStyle={{
        backgroundColor: '#ffe900', // Fondo del botón circular
        color: '#000000',            // Flechas en negro
        border: 'none',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        width: '38px',
        height: '38px',
      }}
    >
      {/* Texto posicionado absolutamente a la derecha del botón */}
      <span 
        style={{ 
          position: 'absolute', 
          left: '45px', 
          color: '#ffe900', 
          fontWeight: 'bold',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none' // Evita interferir con el arrastre del ratón
        }}
      >
        deslizar
      </span>
    </ReactCompareSliderHandle>
  );

  return (
    <div style={containerStyle}>
      <ReactCompareSlider
        position={posicion !== undefined ? posicion : posicionInicial} 
        onPositionChange={onPosicionChange}
        handle={CustomHandle}
        style={{ width: '100%', height: '100%' }}
        boundsPadding={0}
        itemOne={
          <ReactCompareSliderImage 
            src={imgAntes} 
            alt="Imagen Antes" 
            style={imageStyle}
          />
        }
        itemTwo={
          <ReactCompareSliderImage 
            src={imgDespues} 
            alt="Imagen Después" 
            style={imageStyle}
          />
        }
      />
    </div>
  );
};

export default Comparacion;