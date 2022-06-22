import { functionSchema } from './function'
import { string } from './primitives'

export const url = functionSchema(
  'url',
  string({ defaultValue: 'https://source.unsplash.com/random' })
)
