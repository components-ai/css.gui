import { lengthPercentage } from './primitives'
import { tupleSchema } from './tuple'

const borderRadiusItem = tupleSchema({
  itemSchema: lengthPercentage({ range: 'nonnegative' }),
  labels: ['x', 'y'],
})

export const borderTopLeftRadius = borderRadiusItem
export const borderBottomLeftRadius = borderRadiusItem
export const borderTopRightRadius = borderRadiusItem
export const borderBottomRightRadius = borderRadiusItem

// TODO four-valued syntax
export const borderRadius = lengthPercentage()
