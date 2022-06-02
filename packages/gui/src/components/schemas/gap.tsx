import { lengthPercentage } from './primitives'
import { tupleSchema } from './tuple'

const gapItem = lengthPercentage({
  keywords: ['normal'],
})

export const rowGap = gapItem
export const columnGap = gapItem
export const gap = tupleSchema({
  itemSchema: gapItem,
  labels: ['row', 'column'],
})
