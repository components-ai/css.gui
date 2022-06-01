import { BoxSide, boxSideSchema } from './boxSide'
import { lengthPercentage } from './primitives'

const marginItem = lengthPercentage({
  keywords: ['auto'],
})

export const marginBottom = marginItem
export const marginTop = marginItem
export const marginLeft = marginItem
export const marginRight = marginItem

export const margin = boxSideSchema({
  itemSchema: marginItem,
})
