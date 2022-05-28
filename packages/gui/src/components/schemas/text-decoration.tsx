import { createObjectSchema } from './data-type'
import { color, keyword, lengthPercentage } from './primitives'

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
export const textDecorationLength = lengthPercentage({
  keywords: ['auto', 'from-font'],
})

export const textDecorationColor = color({ defaultValue: '#6465ff' })
export const textDecorationThickness = lengthPercentage({
  keywords: ['auto', 'from-font'],
  defaultValue: { value: 4, unit: 'px' },
})

export const textDecoration = createObjectSchema({
  fields: {
    color: textDecorationColor,
    line: textDecorationLine,
    style: textDecorationStyle,
    thickness: textDecorationThickness,
  },
})

// TODO I think we can define the individual text-decoration properties here as well?
