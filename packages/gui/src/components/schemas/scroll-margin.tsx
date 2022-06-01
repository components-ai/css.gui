import { boxSideSchema } from './boxSide'
import { lengthPercentage } from './primitives'
import { tupleSchema } from './tuple'

const scrollMarginItem = lengthPercentage({
  keywords: ['auto'],
})

export const scrollMarginBottom = scrollMarginItem
export const scrollMarginTop = scrollMarginItem
export const scrollMarginLeft = scrollMarginItem
export const scrollMarginRight = scrollMarginItem

export const scrollMarginBlockStart = scrollMarginItem
export const scrollMarginBlockEnd = scrollMarginItem
export const scrollMarginInlineStart = scrollMarginItem
export const scrollMarginInlineEnd = scrollMarginItem

export const scrollMarginBlock = tupleSchema({
  itemSchema: scrollMarginItem,
  labels: ['Start', 'End'],
})
export const scrollMarginInline = tupleSchema({
  itemSchema: scrollMarginItem,
  labels: ['Start', 'End'],
})

export const scrollMargin = boxSideSchema({
  itemSchema: scrollMarginItem,
})
