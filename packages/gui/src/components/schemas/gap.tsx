import { joinSchemas } from './joinSchemas'
import { keyword, lengthPercentage } from './primitives'
import { themeScale } from './theme'
import { tupleSchema } from './tuple'

const gapItem = joinSchemas([
  lengthPercentage({ range: 'nonnegative' }),
  keyword(['normal']),
  themeScale('space'),
])

export const rowGap = gapItem
export const columnGap = gapItem
export const gap = tupleSchema({
  itemSchema: gapItem,
  labels: ['row', 'column'],
})
