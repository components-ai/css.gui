import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, lengthPercentage } from './primitives'

const textDecorationLineKeywords = [
  'none',
  'underline',
  'overline',
  'line-through',
  'blink',
  'underline line-through',
  'underline overline',
  'overline line-through',
  'underline overline line-through',
] as const
export const textDecorationLine = keyword(textDecorationLineKeywords, {
  defaultValue: 'underline',
})

const textDecorationStyleKeywords = [
  'solid',
  'double',
  'dotted',
  'dashed',
  'wavy',
] as const
export const textDecorationStyle = keyword(textDecorationStyleKeywords)
export const textDecorationLength = joinSchemas([
  keyword(['auto', 'from-font']),
  lengthPercentage(),
])

export const textDecorationColor = color({ defaultValue: '#6465ff' })
export const textDecorationThickness = joinSchemas([
  keyword(['auto', 'from-font']),
  lengthPercentage({
    defaultValue: { value: 4, unit: 'px' },
  }),
])

export const textDecoration = objectSchema({
  fields: {
    color: textDecorationColor,
    line: textDecorationLine,
    style: textDecorationStyle,
    thickness: textDecorationThickness,
  },
})

// TODO I think we can define the individual text-decoration properties here as well?
