import { CSSUnitValue, MultidimensionalLengthUnit } from '../../../types/css'

export type State = {
  key: number
  dimensions: number
  value: MultidimensionalLengthUnit | CSSUnitValue
  isMultidimensional: boolean
}

export type Action =
  | {
      type: 'CHANGED_VALUE'
      dimension?: number
      value: CSSUnitValue
    }
  | {
      type: 'TOGGLE_MULTIDIMENSIONAL'
    }
