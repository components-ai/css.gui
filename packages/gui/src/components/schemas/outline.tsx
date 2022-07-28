import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, length } from './primitives'

export const outlineColor = joinSchemas([
  color({ defaultValue: '#6465ff' }),
  keyword(['invert']),
])

export const outlineWidth = joinSchemas([
  length(),
  keyword(['thin', 'medium', 'thick']),
])

export const outlineStyle = keyword([
  'auto',
  'none',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
])

export const outline = objectSchema({
  fields: {
    color: outlineColor,
    width: outlineWidth,
    style: outlineStyle,
  },
})

export const outlineOffset = length({ defaultValue: { value: 4, unit: 'px' } })
