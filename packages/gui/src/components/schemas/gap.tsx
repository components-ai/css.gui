import { joinSchemas } from './joinSchemas'
import { keyword, lengthPercentage } from './primitives'
import { theme } from './theme'
import { tupleSchema } from './tuple'

const gapItem = joinSchemas([
  lengthPercentage({ range: 'nonnegative' }),
  keyword(['normal']),
  theme('space'),
])

export const rowGap = gapItem
export const columnGap = gapItem
export const gap = tupleSchema({
  itemSchema: gapItem,
  labels: ['row', 'column'],
})
