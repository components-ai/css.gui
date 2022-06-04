import { CheckboxInput } from '../inputs/CheckboxInput'
import { listSchema } from './list'
import { objectSchema } from './object'
import { color, length } from './primitives'
import { DataTypeSchema } from './types'

const inset: DataTypeSchema<boolean> = {
  defaultValue: false,
  input: CheckboxInput,
  stringify: (value) => (value ? 'inset' : ''),
}

const singleBoxShadow = objectSchema({
  fields: {
    inset,
    color: color(),
    offsetX: length(),
    offsetY: length(),
    blur: length({ range: 'nonnegative' }),
    spread: length(),
  },
})

export const boxShadow = listSchema({
  itemSchema: singleBoxShadow,
  keywords: ['none'],
})
