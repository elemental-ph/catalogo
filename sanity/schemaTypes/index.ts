import { type SchemaTypeDefinition } from 'sanity'
import tipologia from './tipologia';
import portada from './portada'
import proyecto from './proyecto'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tipologia, proyecto, portada],
}
