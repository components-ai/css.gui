import { stringifyPosition } from '../../lib/stringify'
import { Position } from '../../types/css'
import { PositionInput } from '../inputs/PositionInput'
import { DataTypeSchema } from './types'

export const position: DataTypeSchema<Position> = {
  input: PositionInput,
  stringify: stringifyPosition,
  defaultValue: {
    x: { value: 0, unit: 'px' },
    y: { value: 0, unit: 'px' },
  },
}
