import { type SchemaTypeDefinition } from 'sanity'
import tipologia from './tipologia';
import logo from './logo';
import telefono_contacto from './contacto';
// @ts-ignore
import proyecto from './proyecto'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [logo, tipologia, telefono_contacto, proyecto],
}
