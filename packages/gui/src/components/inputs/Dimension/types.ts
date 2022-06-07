import { UnitConversions, UnitSteps } from '../../../lib'
import { CSSFunctionCalc } from '../../../types/css'

export type State = {
  key: number
  value: number | string
  unit: string
  themePath?: string
  min?: number
  max?: number
}

export type Action =
  | {
      type: 'CHANGED_INPUT_VALUE'
      value: number | string
      themePath?: string
    }
  | {
      type: 'CHANGED_UNIT_VALUE'
      unit: string
      conversions: UnitConversions
      steps?: UnitSteps
    }
  | {
      type: 'CHANGED_INPUT_TO_THEME_VALUE'
      value: number | string
      unit: string
      themePath?: string
    }
