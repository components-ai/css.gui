import { boxSideSchema } from './boxSide'
import { lengthPercentage } from './primitives'

const insetItem = lengthPercentage({
  keywords: ['auto'],
})

export const top = insetItem
export const bottom = insetItem
export const left = insetItem
export const right = insetItem

export const inset = boxSideSchema({
  itemSchema: insetItem,
})
