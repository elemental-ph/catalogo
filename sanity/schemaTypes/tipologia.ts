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
      type: 'string',
    },
    {
      name: 'sort',
      title: 'Sort',
      type: 'number',
    },
    {
      name: 'descripcion',
      title: 'Texto introductorio',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'imagen_portada',
      title: 'Foto unidad',
      type: 'image',
      options: {
            hotspot: true, // Allows content editors to define a hotspot for image cropping
          },
      fields: [
            defineField({
              name: 'alt',
              title: 'Caption',
              type: 'string',
              description: 'Alt text for accessibility and SEO',
              validation: (Rule) => Rule.required(),
            }),
          ],
    },
    {
      name: 'ficha_tecnica',
      title: 'Ficha Tecnica',
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
      name: 'recintos',
      title: 'Recintos',
      type: 'text',
    },
        {
      name: 'render_inicial',
      title: 'Render barrio incial',
      type: 'image',
    },
    {
      name: 'render_ampliacion',
      title: 'Render barrio con ampliaciones',
      type: 'image',
    },
  ],
};