type InputState = 'blurred' | 'pressed' | 'focused' | 'scrubbing'
type PointerState = 'locked' | 'unlocked'

export type NumberInputProps = {
  value: any
  onChange: (newNumber: number) => void
  id?: string,
  step?: number,
  property?: string
}

export type CursorProps = {
  x: number
  y: number
}

export type State = {
  inputState: InputState
  pointerState: PointerState
  value: number
  pointerId: number
  startValue: number
  startPoint: { x: number; y: number }
  currentPoint: { x: number; y: number }
}

export type Action =
  | {
      type: 'CHANGED_INPUT_VALUE'
      value: number
    }
  | {
      type: 'FOCUSED_INPUT'
    }
  | {
      type: 'BLURRED_INPUT'
    }
  | {
      type: 'LOCKED_POINTER'
    }
  | {
      type: 'UNLOCKED_POINTER'
    }
  | {
      type: 'STARTED_POINTING_INPUT'
      x: number
      y: number
      id: number
    }
  | {
      type: 'STOPPED_POINTING_INPUT'
      id: number
    }
  | {
      type: 'MOVED_POINTER_OVER_INPUT'
      x: number
      y: number
      id: number
    }
