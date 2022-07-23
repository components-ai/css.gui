import { boxSideSchema } from './box-side'
import { joinSchemas } from './joinSchemas'
import { keyword, lengthPercentage } from './primitives'
import { themeScale } from './theme'
import { tupleSchema } from './tuple'

const scrollMarginItem = joinSchemas([
  lengthPercentage(),
  keyword(['auto']),
  themeScale('space'),
])

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
