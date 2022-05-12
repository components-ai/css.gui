import { Length, MultidimensionalLengthUnit } from '../../../types/css'

export type State = {
  key: number
  dimensions: number
  value: MultidimensionalLengthUnit | Length
  isMultidimensional: boolean
}

export type Action =
  | {
      type: 'CHANGED_VALUE'
      dimension?: number
      value: Length
    }
  | {
      type: 'TOGGLE_MULTIDIMENSIONAL'
    }
