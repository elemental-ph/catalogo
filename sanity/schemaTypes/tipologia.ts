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
    {
      name: 'link_empresa_1',
      title: 'link empresa 1',
      type: 'string',
    },
    {
      name: 'link_empresa_2',
      title: 'link empresa 2',
      type: 'string',
    },
    {
      name: 'link_empresa_3',
      title: 'link empresa 3',
      type: 'string',
    },
    {
      name: 'lista_proyectos',
      title: 'lista_proyectos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
           {type: 'proyecto'},
           ],
        },
      ],
    },
  ],
};