import { boxSideSchema } from './box-side'
import { joinSchemas } from './joinSchemas'
import { keyword, lengthPercentage } from './primitives'
import { themeScale } from './theme'
import { tupleSchema } from './tuple'

const marginItem = joinSchemas([
  lengthPercentage({ themeProperty: 'space' }),
  keyword(['auto']),
  themeScale('space'),
])

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
