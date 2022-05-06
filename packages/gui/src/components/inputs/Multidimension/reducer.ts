import produce from 'immer'
import { isNumber } from 'lodash-es'
import { MultidimensionalLengthUnit } from '../../../types/css'
import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGED_VALUE': {
      if (isNumber(action.dimension)) {
        const newValue = produce(
          state.value,
          (draft: MultidimensionalLengthUnit) => {
            draft.values[action.dimension!] = action.value
          }
        )

        return {
          ...state,
          value: newValue,
        }
      }

      return {
        ...state,
        value: action.value,
      }
    }
    case 'TOGGLE_MULTIDIMENSIONAL': {
      if (state.isMultidimensional) {
        // @ts-ignore
        const firstValue = state.value.values[0]
        return {
          ...state,
          isMultidimensional: false,
          value: firstValue,
        }
      }

      const firstValue = state.value
      return {
        ...state,
        isMultidimensional: true,
        value: {
          type: 'multidimensionalLength',
          values: Array(state.dimensions).fill(firstValue),
        },
      }
    }
    default: {
      break
    }
  }

  return state
}
