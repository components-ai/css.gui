import { boxSideSchema } from './box-side'
import { lengthPercentage } from './primitives'

const insetItem = lengthPercentage({
  keywords: ['auto'],
  themeProperty: 'space',
})

export const top = insetItem
export const bottom = insetItem
export const left = insetItem
export const right = insetItem

export const inset = boxSideSchema({
  itemSchema: insetItem,
})
