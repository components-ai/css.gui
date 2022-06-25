import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, lengthPercentage } from './primitives'
import { shorthandSchema } from './shorthand'

export const columnRuleColor = color({ defaultValue: '#6465ff' })
export const columnRuleStyle = keyword(
  [
    'none',
    'hidden',
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
  ],
  { defaultValue: 'solid' }
)
export const columnRuleWidth = joinSchemas([
  lengthPercentage({ range: 'nonnegative' }),
  keyword(['thin', 'medium', 'thick']),
])

export const columnRule = shorthandSchema({
  fields: {
    color: columnRuleColor,
    style: columnRuleStyle,
    width: columnRuleWidth,
  },
  type: '<column-rule>',
})
