import { type SchemaTypeDefinition } from 'sanity'
import tipologia from './tipologia';
import logo from './logo';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [logo, tipologia],
}
