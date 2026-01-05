import { type SchemaTypeDefinition } from 'sanity'
import tipologia from './tipologia';
import portada from './portada'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tipologia, portada],
}
