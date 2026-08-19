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
    {
      name: 'galeria',
      title: 'Galería de imágenes',
      type: 'array',
      description: 'Sube un grupo de imágenes adicionales para esta tipología.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Buena práctica: permite al editor ajustar el recorte en el frontend
          },
          fields: [
            {
              name: 'creditos',
              title: 'Créditos de la imagen',
              type: 'string',
              description: 'Opcional. Ingresa el nombre del fotógrafo o la fuente.',
            },
          ],
        },
      ],
    },
  ],

  orderings: [
    {
      title: 'Por Orden (Sort)',
      name: 'sortAsc',
      by: [
        { field: 'sort', direction: 'asc' }
      ]
    }
  ],

  // --- CONFIGURACIÓN DE PREVISUALIZACIÓN EN SANITY STUDIO ---
  preview: {
    select: {
      sigla: 'sigla',
      name: 'name',
      media: 'render_inicial',
    },
    prepare(selection: { sigla?: string; name?: any[]; media?: any }) {
      const { sigla, name, media } = selection;

      // Extrae y une el texto de todos los bloques del PortableText 'name'
      let fullName = '';
      if (Array.isArray(name)) {
        fullName = name
          .map((block) =>
            block.children
              ? block.children.map((child: any) => child.text).join('')
              : ''
          )
          .filter(Boolean)
          .join(' ');
      }

      // Si existe sigla la antepone (ej: "V1 - Edificio Departamentos"), sino muestra solo el nombre
      const titleText = [sigla, fullName].filter(Boolean).join(' - ');

      return {
        title: titleText || 'Sin nombre',
        media: media,
      };
    },
  },
};