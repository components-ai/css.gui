import { length } from './primitives'
import { tupleSchema } from './tuple'

export const borderSpacing = tupleSchema({
  itemSchema: length(),
  labels: ['x', 'y'],
})
