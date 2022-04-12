import { LengthUnit } from '../../types/css'

export type State = {
  key: number
  value: number
  unit: LengthUnit
}

export type Action =
  | {
      type: 'CHANGED_INPUT_VALUE'
      value: number
    }
  | {
      type: 'CHANGED_UNIT_VALUE'
      unit: LengthUnit
    }
