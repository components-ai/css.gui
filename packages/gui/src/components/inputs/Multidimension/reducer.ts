import produce from 'immer'
import { CSSUnitValue, MultidimensionalLengthUnit } from '../../../types/css'
import { State, Action } from './types'
import { convertToMultidimensional } from './util'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGED_VALUE': {
      const dimension = action.dimension as number
      const newValueItem = action.value as CSSUnitValue

      // @ts-ignore
      if (isNaN(newValueItem.value) && dimension > 0) {
        const firstValue = convertToMultidimensional(state.value).values[0]

        return {
          ...state,
          isMultidimensional: false,
          value: firstValue,
        }
      }

      const newValue = produce(
        convertToMultidimensional(state.value),
        (draft: MultidimensionalLengthUnit) => {
          draft.values[dimension] = newValueItem
        }
      )

      return {
        ...state,
        isMultidimensional: true,
        value: newValue,
      }
    }
    default: {
      break
    }
  }

  return state
}
