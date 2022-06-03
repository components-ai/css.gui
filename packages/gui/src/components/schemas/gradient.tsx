import { GradientEditor } from '../inputs/Gradient/field'
import { stringifyGradient } from '../inputs/Gradient/stringify'
import { Gradient } from '../inputs/Gradient/types'
import { DataTypeSchema } from './types'

export const gradient: DataTypeSchema<Gradient> = {
  input: GradientEditor,
  stringify: stringifyGradient,
  defaultValue: {
    type: 'linear',
    stops: [],
    angle: { value: 0, unit: 'deg' },
  },
}
