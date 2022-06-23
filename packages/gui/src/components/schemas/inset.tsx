import { boxSideSchema } from './box-side'
import { joinSchemas } from './joinSchemas'
import { keyword, lengthPercentage } from './primitives'

const insetItem = joinSchemas([
  lengthPercentage({ themeProperty: 'space' }),
  keyword(['auto']),
])

export const top = insetItem
export const bottom = insetItem
export const left = insetItem
export const right = insetItem

export const inset = boxSideSchema({
  itemSchema: insetItem,
})
