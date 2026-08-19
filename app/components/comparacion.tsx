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
  objectFit?: 'cover' | 'contain';
  objectPositionAntes?: string;  
  objectPositionDespues?: string;
}

const Comparacion: React.FC<ComparacionProps> = ({ 
  urlImagenAntes, 
  urlImagenDespues, 
  posicion, 
  onPosicionChange,
  posicionInicial = 50, 
  fit = true,
  objectFit = 'cover',
  objectPositionAntes = 'center',
  objectPositionDespues = 'center'
}) => {

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', 
    position: 'relative',
    overflow: 'hidden'
  };

  // --- ESTILOS INDIVIDUALES PARA APLICAR EL HOTSPOT ---
  const styleAntes: React.CSSProperties = {
    ...styleFitContainer,
    objectFit: objectFit,
    objectPosition: objectPositionAntes,
  };

  const styleDespues: React.CSSProperties = {
    ...styleFitContainer,
    objectFit: objectFit,
    objectPosition: objectPositionDespues,
  };

  const imgAntes = urlImagenAntes?.trim() ? urlImagenAntes : undefined;
  const imgDespues = urlImagenDespues?.trim() ? urlImagenDespues : undefined;
  const imagenUnica = imgAntes || imgDespues;
  const styleUnica = imgAntes ? styleAntes : styleDespues;

  if (!imagenUnica) return null;

  if (!imgAntes || !imgDespues) {
    return (
      <div style={containerStyle}>
        <ReactCompareSliderImage 
          src={imagenUnica} 
          alt="Imagen de la tipología" 
          style={styleUnica}
        />
      </div>
    );
  }

  // --- HANDLE PERSONALIZADO CON ALINEACIÓN EXACTA Y LÍNEA AMARILLA ---
  const CustomHandle = (
    <ReactCompareSliderHandle
      style={{ color: '#ffe900' }}
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
            style={styleAntes}
          />
        }
        itemTwo={
          <ReactCompareSliderImage 
            src={imgDespues} 
            alt="Imagen Después" 
            style={styleDespues}
          />
        }
      />
    </div>
  );
};

export default Comparacion;