import { boxSideSchema } from './box-side'
import { joinSchemas } from './joinSchemas'
import { keyword, lengthPercentage } from './primitives'
import { themeScale } from './theme'
import { tupleSchema } from './tuple'

const scrollPaddingItem = joinSchemas([
  lengthPercentage(),
  keyword(['auto']),
  themeScale('space'),
])

export const scrollPaddingBottom = scrollPaddingItem
export const scrollPaddingTop = scrollPaddingItem
export const scrollPaddingLeft = scrollPaddingItem
export const scrollPaddingRight = scrollPaddingItem

export const scrollPaddingBlockStart = scrollPaddingItem
export const scrollPaddingBlockEnd = scrollPaddingItem
export const scrollPaddingInlineStart = scrollPaddingItem
export const scrollPaddingInlineEnd = scrollPaddingItem

export const scrollPaddingBlock = tupleSchema({
  itemSchema: scrollPaddingItem,
  labels: ['Start', 'End'],
})
export const scrollPaddingInline = tupleSchema({
  itemSchema: scrollPaddingItem,
  labels: ['Start', 'End'],
})

export const scrollPadding = boxSideSchema({
  itemSchema: scrollPaddingItem,
})
