import * as React from 'react'
import { NumberInputProps } from './types'
import { useDrag } from 'react-use-gesture'
import { roundToStep } from '../../../lib/math'

interface DraggableLabelProps {
  step?: number
  onUpdate: (newValue: any) => void
  value: number
  min?: number
  max?: number
}

export const DraggableInput = ({
  value = 0,
  onUpdate,
  step = 1,
  min,
  max,
}: DraggableLabelProps) => {
  const [dragging, setDragging] = React.useState<boolean>(false)
  // Keep track of an internal value so that when the user types in an invalid number,
  // we just wait until the value is valid again to update
  const [internalValue, setInternalValue] = React.useState<number | string>(
    value
  )
  const initialValue = React.useRef<number>(value)

  const updateValue = (newValue: number) => {
    let inRangeValue = newValue
    if (min || min === 0) inRangeValue = Math.max(newValue, min)
    if (max || max === 0) inRangeValue = Math.min(inRangeValue, max)

    setInternalValue(inRangeValue)
    onUpdate(inRangeValue)
  }

  React.useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value)
    }
  }, [value])

  const bind = useDrag(
    ({ dragging, first, last, tap, movement: [dx] }) => {
      setDragging(dragging)

      const parsedValue = typeof value === 'string' ? parseFloat(value) : value
      if (tap || last) return
      if (first) {
        initialValue.current = parsedValue
      }

      const deltaValue = dx * step
      let newValue = roundToStep(initialValue.current + deltaValue, step)
      if (dragging && (min || min === 0)) newValue = Math.max(newValue, min)
      if (dragging && (max || max === 0)) newValue = Math.min(newValue, max)

      updateValue(newValue)
    },
    { pointerEvents: true }
  )

  return (
    <input
      type="text"
      value={internalValue}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowUp': {
            updateValue(roundToStep(value + step, step))
            return
          }
          case 'ArrowDown': {
            updateValue(roundToStep(value - step, step))
            return
          }
        }
      }}
      onChange={({ target: { value: inputValue } }: any) => {
        let newValue = parseFloat(inputValue)

        if (min || min === 0) newValue = Math.max(newValue, min)
        if (max || max === 0) newValue = Math.min(newValue, max)

        // A user is currently typing a negative number or a decimal which results
        // in the number being temporarily invalid. When this happens, update the
        // internal value and wait for the value to become valid again.
        const valueIsInFlight = inputValue === '-' || inputValue.endsWith('.')
        if (valueIsInFlight) {
          return setInternalValue(inputValue)
        }

        setInternalValue(newValue ?? '')
        onUpdate(newValue || 0)
      }}
      sx={{
        cursor: dragging ? 'ew-resize' : 'default',
        minHeight: '1.6em',
        width: `${value?.toString().length + 1}ch`,
        // Use fractional steps to approximate the minimum width
        // so we don't get "jitters" moving between fractional and integer values
        minWidth: `${step.toString().length + 1}ch`,
        textAlign: 'right',
        background: 'none',
        color: 'text',
        border: 'none',
        transition: 'width 150ms',
      }}
      {...bind()}
    />
  )
}

export const NumberInput = ({
  value,
  onChange,
  step = 1,
  min,
  max,
}: NumberInputProps): any => {
  return (
    <DraggableInput
      value={value}
      step={step}
      min={min}
      max={max}
      onUpdate={onChange}
    />
  )
}
