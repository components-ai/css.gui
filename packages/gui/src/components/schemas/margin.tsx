import { boxSideSchema } from './box-side'
import { lengthPercentage } from './primitives'
import { tupleSchema } from './tuple'

const marginItem = lengthPercentage({
  keywords: ['auto'],
})

export const marginBottom = marginItem
export const marginTop = marginItem
export const marginLeft = marginItem
export const marginRight = marginItem

export const marginBlockStart = marginItem
export const marginBlockEnd = marginItem
export const marginInlineStart = marginItem
export const marginInlineEnd = marginItem

export const marginBlock = tupleSchema({
  itemSchema: marginItem,
  labels: ['Start', 'End'],
})
export const marginInline = tupleSchema({
  itemSchema: marginItem,
  labels: ['Start', 'End'],
})

export const margin = boxSideSchema({
  itemSchema: marginItem,
})
