import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = ['portada', 'telefono_contacto', 'logo']
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
S.list()
    .title('Contenido')
    .items([
      // ----------------------------------------------------
      // A. SECCIÓN DE CONFIGURACIÓN GLOBAL (SINGLETONS)
      // ----------------------------------------------------
      S.listItem()
        .title('General')
        .id('globalConfig')
        .child(
          S.list()
            .title('Datos generales')
            .items([
              // Documento Único: Teléfono de Contacto
              S.listItem()
                .title('portada')
                .id('portada_id')
                .child(
                  S.document()
                    .schemaType('portada') // <--- El 'name' del schema
                    .documentId('portada') // <--- ID fijo para el documento
                ),

              // Documento Único: Teléfono de Contacto
              S.listItem()
                .title('telefono_contacto')
                .id('telefono_id')
                .child(
                  S.document()
                    .schemaType('telefono_contacto') // <--- El 'name' del schema
                    .documentId('telefono_telefon') // <--- ID fijo para el documento
                ),

                 // Documento Único: Teléfono de Contacto
              S.listItem()
                .title('logo')
                .id('logo_id')
                .child(
                  S.document()
                    .schemaType('logo') // <--- El 'name' del schema
                    .documentId('logo') // <--- ID fijo para el documento
                ),
              
              // Puedes añadir más singletons aquí
            ])
        ),

      S.divider(), // Separador visual

      // ----------------------------------------------------
      // B. EL RESTO DE DOCUMENTOS (LOS QUE SÍ PUEDEN SER MÚLTIPLES)
      // ----------------------------------------------------
      // Filtramos la lista automática de tipos de documentos para excluir los singletons
      ...S.documentTypeListItems().filter(
        // Excluye los tipos que definimos en la lista SINGLETON_TYPES
        (listItem: any) => !SINGLETON_TYPES.includes(listItem.getId() || '')
      ),
    ]);
// Fin de la función 'structure'







  