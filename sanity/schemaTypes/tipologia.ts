export default {
  name: 'tipologia',
  title: 'Tipologia',
  type: 'document',
  fields: [
    {
      name: 'sort',
      title: 'sort',
      type: 'number',
    },
    {
      name: 'sigla',
      title: 'sigla',
      type: 'string',
    },
    {
      name: 'name',
      title: 'name',
      type: 'string',
    },
    {
      name: 'descripcion',
      title: 'descripcion',
      type: 'text',
    },
    {
      name: 'pisos',
      title: 'Pisos',
      type: 'string',
    },
    {
      name: 'superficie_inicial',
      title: 'superficie_inicial',
      type: 'number',
    },
    {
      name: 'superficie_ampliada',
      title: 'superficie_ampliada',
      type: 'number',
    },
    {
      name: 'densidad_maxima',
      title: 'densidad_maxima',
      type: 'number',
    },
    {
      name: 'icono',
      title: 'icono',
      type: 'image',
    },
    {
      name: 'imagen_portada',
      title: 'imagen portada',
      type: 'image',
    },
    {
      name: 'planta_inicial',
      title: 'planta entrega incial',
      type: 'image',
    },
    {
      name: 'planta_ampliacion',
      title: 'planta ampliacion',
      type: 'image',
    },
  ],
};