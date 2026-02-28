import { functionSchema } from './function'
import { string } from './primitives'

export const url = functionSchema(
  'url',
  string({ defaultValue: 'https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg' })
)
