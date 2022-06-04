import { length } from './primitives'
import { tupleSchema } from './tuple'

// TODO inlcude other table properties here?
export const borderSpacing = tupleSchema({
  itemSchema: length({ range: 'nonnegative' }),
  labels: ['x', 'y'],
})
