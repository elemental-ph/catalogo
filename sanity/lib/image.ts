import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { dataset, projectId } from '../env';

const builder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

/**
 * Devuelve el builder de Sanity para encadenar transformaciones personalizadas.
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

/**
 * Helper con parámetros de compresión predeterminados (WebP/AVIF, 80% calidad, ancho dinámico).
 */
export const urlForOptimized = (
  source: SanityImageSource, 
  width = 1200, 
  quality = 80
) => {
  if (!source) return '';
  return builder
    .image(source)
    .width(width)
    .quality(quality)
    .auto('format') // Convierte a AVIF/WebP según soporte del navegador
    .url();
};