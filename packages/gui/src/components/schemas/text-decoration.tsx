import { createObjectSchema } from './data-type'
import { color, length, keyword } from './primitives'

export const textDecorationLines = [
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

export const textDecorationStyles = [
  'solid',
  'double',
  'dotted',
  'dashed',
  'wavy',
] as const

export const textDecoration = createObjectSchema({
  fields: {
    color: { schema: color },
    line: keyword(textDecorationLines),
    style: keyword(textDecorationStyles),
    thickness: {
      schema: length,
      props: { percentage: true, keywords: ['auto', 'from-font'] },
    },
  },
})

// TODO I think we can define the individual text-decoration properties here as well?
