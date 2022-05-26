import { createObjectSchema } from './data-type'
import { color, length, keywordSchema } from './primitives'

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
    line: keywordSchema(textDecorationLines),
    style: keywordSchema(textDecorationStyles),
    thickness: {
      schema: length,
      props: { percentage: true, keywords: ['auto', 'from-font'] },
    },
  },
})
