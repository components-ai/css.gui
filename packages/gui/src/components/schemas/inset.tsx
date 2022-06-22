import { boxSideSchema } from './box-side'
import { joinSchemas } from './joinSchemas'
import { keyword, lengthPercentage } from './primitives'

const insetItem = joinSchemas([
  keyword(['auto']),
  lengthPercentage({
    themeProperty: 'space',
  }),
])

export const top = insetItem
export const bottom = insetItem
export const left = insetItem
export const right = insetItem

export const inset = boxSideSchema({
  itemSchema: insetItem,
})
