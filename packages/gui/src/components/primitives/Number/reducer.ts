import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGED_INPUT_VALUE': {
      return { ...state, value: action.value }
    }
    case 'BLURRED_INPUT': {
      if (state.inputState === 'focused') {
        return { ...state, inputState: 'blurred' }
      }
      break
    }
    case 'FOCUSED_INPUT': {
      if (state.inputState === 'blurred') {
        return { ...state, inputState: 'focused' }
      }
      break
    }
    case 'STARTED_POINTING_INPUT': {
      if (state.inputState === 'blurred') {
        const { x, y, id } = action

        return {
          ...state,
          inputState: 'pressed',
          pointerId: id,
          startPoint: { x, y },
          currentPoint: { x, y },
        }
      }
      break
    }
    case 'STOPPED_POINTING_INPUT': {
      if (state.inputState === 'pressed') {
        return { ...state, inputState: 'focused' }
      }

      if (state.inputState === 'scrubbing') {
        return { ...state, inputState: 'blurred' }
      }
      break
    }
    case 'LOCKED_POINTER': {
      if (state.inputState === 'scrubbing') {
        return { ...state, pointerState: 'locked' }
      }
      break
    }
    case 'UNLOCKED_POINTER': {
      return { ...state, pointerState: 'unlocked' }
    }
    case 'MOVED_POINTER_OVER_INPUT': {
      if (state.inputState === 'pressed') {
        const { startPoint, value } = state
        const { x } = action

        if (Math.abs(startPoint.x - x) > 4) {
          return {
            ...state,
            inputState: 'scrubbing',
            startValue: value,
          }
        }
      } else if (state.inputState === 'scrubbing') {
        const { startValue, startPoint, currentPoint } = state
        const next = { ...currentPoint, x: currentPoint.x + action.x }
        return {
          ...state,
          currentPoint: next,
          value: Math.floor(startValue + next.x - startPoint.x),
        }
      }
      break
    }
    default: {
      break
    }
  }

  return state
}
