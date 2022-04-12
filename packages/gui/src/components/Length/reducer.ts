import { convertLengthUnits } from '../../lib/convert'
import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGED_INPUT_VALUE': {
      return { ...state, value: action.value }
    }
    case 'CHANGED_UNIT_VALUE': {
      return {
        ...state,
        value: convertLengthUnits(action.unit, state),
        unit: action.unit,
        key: state.key + 1,
      }
    }
    default: {
      break
    }
  }

  return state
}
