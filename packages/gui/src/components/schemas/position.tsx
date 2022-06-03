import { stringifyPosition } from '../../lib/stringify'
import { Position } from '../../types/css'
import { PositionInput } from '../inputs/PositionInput'
import { DataTypeSchema } from './types'

// TODO function so we can set default values
// TODO offset values
export const position: DataTypeSchema<Position> = {
  input: PositionInput,
  stringify: stringifyPosition,
  defaultValue: {
    x: { value: 50, unit: '%' },
    y: { value: 50, unit: '%' },
  },
}
