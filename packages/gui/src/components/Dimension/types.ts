import { UnitConversions } from '../../lib'
import { FullLengthUnit } from '../../types/css'

export type State = {
  key: number
  value: number | string
  unit: FullLengthUnit
  themeId?: string
  step: number
  min?: number
  max?: number
}

export type Action =
  | {
      type: 'CHANGED_INPUT_VALUE'
      value: number | string
      themeId?: string
    }
  | {
      type: 'CHANGED_UNIT_VALUE'
      unit: FullLengthUnit
      conversions: UnitConversions
    }
  | {
      type: 'CHANGED_INPUT_TO_THEME_VALUE'
      value: number | string
      unit: FullLengthUnit
      themeId?: string
    }
