import { createArraySchema, createObjectSchema } from './data-type'
import { color, length } from './primitives'

const singleTextShadow = createObjectSchema({
  fields: {
    color: { schema: color },
    offsetX: { schema: length },
    offsetY: { schema: length },
    blur: { schema: length },
  },
})

export const textShadow = createArraySchema({
  itemSchema: singleTextShadow,
  separator: ' ',
})
