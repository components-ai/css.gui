import { FullLengthUnit, LengthUnit } from '../../types/css'

export type State = {
  key: number
  value: number
  unit: FullLengthUnit
  themeUnit?: FullLengthUnit
  step: number
}

export type Action =
  | {
      type: 'CHANGED_INPUT_VALUE'
      value: number
      themeUnit?: LengthUnit | undefined
    }
  | {
      type: 'CHANGED_UNIT_VALUE'
      unit: LengthUnit
    }
