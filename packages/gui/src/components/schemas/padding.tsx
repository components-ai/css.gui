import { boxSideSchema } from './box-side'
import { lengthPercentage } from './primitives'
import { tupleSchema } from './tuple'

const paddingItem = lengthPercentage({ range: 'nonnegative', themeProperty: 'space' })

export const paddingBottom = paddingItem
export const paddingTop = paddingItem
export const paddingLeft = paddingItem
export const paddingRight = paddingItem

export const paddingBlockStart = paddingItem
export const paddingBlockEnd = paddingItem
export const paddingInlineStart = paddingItem
export const paddingInlineEnd = paddingItem

export const paddingBlock = tupleSchema({
  itemSchema: paddingItem,
  labels: ['Start', 'End'],
})
export const paddingInline = tupleSchema({
  itemSchema: paddingItem,
  labels: ['Start', 'End'],
})

export const padding = boxSideSchema({
  itemSchema: paddingItem,
})
