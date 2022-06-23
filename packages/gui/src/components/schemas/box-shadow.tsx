import { CheckboxInput } from '../inputs/CheckboxInput'
import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { keyword, length } from './primitives'
import { DataTypeSchema } from './types'

const inset: DataTypeSchema<boolean> = {
  type: 'boolean',
  defaultValue: false,
  input: CheckboxInput,
  stringify: (value) => (value ? 'inset' : ''),
  validate: ((value: any) => !value || typeof value === 'boolean') as any,
}

const singleBoxShadow = objectSchema({
  type: '<box-shadow>',
  fields: {
    inset,
    color: color(),
    offsetX: length({ themeProperty: 'space' }),
    offsetY: length({ themeProperty: 'space' }),
    blur: length({ range: 'nonnegative', themeProperty: 'space' }),
    spread: length({ themeProperty: 'space' }),
  },
})

export const boxShadow = joinSchemas([
  listSchema({
    itemSchema: singleBoxShadow,
  }),
  keyword(['none']),
])
