import { convertUnits } from '../../../lib/convert'
import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGED_INPUT_VALUE': {
      return {
        ...state,
        value: action.value,
        themePath: action.themePath,
      }
    }
    case 'CHANGED_UNIT_VALUE': {
      return {
        ...state,
        value: convertUnits(
          action.unit,
          state,
          action.conversions,
          action.steps
        ),
        unit: action.unit,
        key: state.key + 1, // Force number scrubber re-render
        themePath: undefined,
      }
    }
    case 'CHANGED_INPUT_TO_THEME_VALUE': {
      return {
        ...state,
        value: action.value,
        unit: action.unit,
        themePath: action.themePath,
      }
    }
    default: {
      break
    }
  }

  return state
}
