export default {
  // 💡 Clave: type: 'object'
  name: 'portada',
  title: 'Portada',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'resumen',
      type: 'array',
      title: 'Resumen',
      of: [
        {
          type: 'block'
        }
      ]
    },
  ],
}