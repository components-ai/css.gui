import * as React from 'react'

import { Cursor } from './Cursor'
import { reducer } from './reducer'
import { NumberInputProps } from './types'

export const NumberInput = ({ value, onChange }: NumberInputProps): any => {
  const rInput = React.useRef<HTMLInputElement>(null)
  const rCursor = React.useRef<SVGSVGElement>(null)

  const [state, dispatch] = React.useReducer(reducer, {
    inputState: 'blurred',
    pointerState: 'unlocked',
    value,
    pointerId: -1,
    startValue: 0,
    startPoint: { x: -1, y: -1 },
    currentPoint: { x: -1, y: -1 },
  })

  // Request or exit pointer capture
  React.useEffect(() => {
    const input = rInput.current!

    if (state.inputState === 'pressed') {
      input.setPointerCapture(state.pointerId)
    } else if (
      state.inputState === 'blurred' ||
      state.inputState === 'focused'
    ) {
      if (input.hasPointerCapture(state.pointerId)) {
        input.releasePointerCapture(state.pointerId)
      }
    }
  }, [state.inputState, state.pointerId])

  // Request or exit pointer lock
  React.useEffect(() => {
    if (state.inputState === 'scrubbing' && state.pointerState === 'unlocked') {
      rInput.current!.requestPointerLock?.()
    }

    if (state.inputState !== 'scrubbing' && state.pointerState === 'locked') {
      document.exitPointerLock?.()
    }
  }, [state.inputState, state.pointerState])

  // Dispatch events on pointer lock changes
  React.useEffect(() => {
    const handlePointerChange = () => {
      if (document.pointerLockElement) {
        dispatch({ type: 'LOCKED_POINTER' })
      } else {
        dispatch({ type: 'UNLOCKED_POINTER' })
      }
    }

    document.addEventListener('pointerlockchange', handlePointerChange)
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerChange)
    }
  }, [dispatch, state.inputState])

  React.useEffect(() => {
    onChange(state.value)
  }, [state.value])

  const { value: inputValue, startPoint, currentPoint } = state

  return (
    <>
      <input
        ref={rInput}
        type="number"
        value={inputValue}
        style={
          {
            //cursor: state.inputState === 'focused' ? 'text' : 'col-resize',
          }
        }
        onFocus={() => dispatch({ type: 'FOCUSED_INPUT' })}
        onBlur={() => dispatch({ type: 'BLURRED_INPUT' })}
        onPointerMove={(e) => {
          dispatch({
            type: 'MOVED_POINTER_OVER_INPUT',
            x: e.movementX,
            y: e.movementY,
            id: e.pointerId,
          })
        }}
        onPointerDown={(e) =>
          dispatch({
            type: 'STARTED_POINTING_INPUT',
            x: e.clientX,
            y: e.clientY,
            id: e.pointerId,
          })
        }
        onPointerUp={(e) =>
          dispatch({ type: 'STOPPED_POINTING_INPUT', id: e.pointerId })
        }
        onChange={({ currentTarget: { value: inputValue } }) =>
          dispatch({ type: 'CHANGED_INPUT_VALUE', value: Number(inputValue) })
        }
      />
      {state.pointerState === 'locked' && (
        <Cursor
          ref={rCursor}
          x={(currentPoint.x + window.innerWidth) % window.innerWidth}
          y={startPoint.y + window.pageYOffset}
        />
      )}
    </>
  )
}
