import { LengthUnit } from '../../types/css'

export type State = {
  key: number
  value: number | string
  unit: LengthUnit
  step?: number
  min?: number
  max?: number
}

export type Action =
  | {
      type: 'CHANGED_INPUT_VALUE'
      value: number | string
    }
  | {
      type: 'CHANGED_UNIT_VALUE'
      unit: LengthUnit
    }
