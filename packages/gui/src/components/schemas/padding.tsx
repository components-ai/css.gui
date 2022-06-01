import { BoxSide, boxSideSchema } from './boxSide'
import { lengthPercentage } from './primitives'

const paddingItem = lengthPercentage()

export const paddingBottom = paddingItem
export const paddingTop = paddingItem
export const paddingLeft = paddingItem
export const paddingRight = paddingItem

export const padding = boxSideSchema({
  itemSchema: paddingItem,
})
