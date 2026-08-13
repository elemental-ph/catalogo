import { defineField, defineType } from 'sanity';

export default {
  name: 'tipologia',
  title: 'Tipologias',
  type: 'document',
  fields: [
    {
      name: 'icono',
      title: 'Icono',
      type: 'image',
    },
    {
      name: 'icono_ampliado',
      title: 'Icono ampliado',
      type: 'image',
    },
    {
      name: 'sigla',
      title: 'Sigla tipología',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Nombre tipología',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'sort',
      title: 'Sort',
      type: 'number',
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
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
      name: 'render_inicial',
      title: 'Imagen inicial',
      type: 'image',
            options: {
            hotspot: true, // Allows content editors to define a hotspot for image cropping
          },
    },
    {
      name: 'render_ampliacion',
      title: 'Imagen ampliación',
      type: 'image',
            options: {
            hotspot: true, // Allows content editors to define a hotspot for image cropping
          },
    },
        {
      name: 'recintos',
      title: 'Pie de imagen',
      type: 'text',
    },
  ],
};