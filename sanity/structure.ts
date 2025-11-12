import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
S.list()
    .title('Contenido')
    .items([
      // Filtramos la lista automática de tipos de documentos para excluir los singletons
      ...S.documentTypeListItems(),
    ]);
// Fin de la función 'structure'







  