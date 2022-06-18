import { joinSchemas } from './joinSchemas'
import { lengthPercentage } from './primitives'
import { theme } from './theme'
import { tupleSchema } from './tuple'

const borderRadiusItem = tupleSchema({
  itemSchema: joinSchemas([
    lengthPercentage({ range: 'nonnegative' }),
    theme('borderRadius'),
  ]),
  labels: ['x', 'y'],
})

export const borderTopLeftRadius = borderRadiusItem
export const borderBottomLeftRadius = borderRadiusItem
export const borderTopRightRadius = borderRadiusItem
export const borderBottomRightRadius = borderRadiusItem

// TODO four-valued syntax
export const borderRadius = lengthPercentage()
