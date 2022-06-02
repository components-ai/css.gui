import { keyword } from './primitives'
import { tupleSchema } from './tuple'

// TODO include other scroll snap attributes here?
export const scrollSnapAlign = tupleSchema({
  itemSchema: keyword(['none', 'start', 'center', 'end']),
  labels: ['block', 'inline'],
})
