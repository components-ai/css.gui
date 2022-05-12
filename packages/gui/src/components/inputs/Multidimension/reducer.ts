import produce from 'immer'
import { isNumber } from 'lodash-es'
import { CSSUnitValue, MultidimensionalLengthUnit } from '../../../types/css'
import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGED_VALUE': {
      console.log(JSON.stringify({ action, state }, null, 2))

      if (isNumber(action.dimension)) {
        const dimension = action.dimension as number
        const newValueItem = action.value as CSSUnitValue

        // @ts-ignore
        if (isNaN(newValueItem.value) && dimension > 0) {
          const firstValue = (state.value as MultidimensionalLengthUnit)
            .values[0]

          return {
            ...state,
            isMultidimensional: false,
            value: firstValue,
          }
        }

        const newValue = produce(
          state.value,
          (draft: MultidimensionalLengthUnit) => {
            draft.values[action.dimension!] = newValueItem
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
        const firstValue = (state.value as MultidimensionalLengthUnit).values[0]
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
