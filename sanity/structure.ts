import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // 1. Ítem personalizado de Tipologías con orden por defecto según el campo 'sort'
      S.listItem()
        .title('Tipologías')
        .child(
          S.documentTypeList('tipologia')
            .title('Tipologías')
            .defaultOrdering([{ field: 'sort', direction: 'asc' }])
        ),

      // 2. Traemos los demás tipos de documentos excluyendo 'tipologia'
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'tipologia'
      ),
    ]);