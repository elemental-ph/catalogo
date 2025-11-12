import { type SchemaTypeDefinition } from 'sanity'
import tipologia from './tipologia';
import logo from './logo';
import telefono_contacto from './contacto';
import portada from './portada'
import proyecto from './proyecto'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tipologia, proyecto, portada],
}
