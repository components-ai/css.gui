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
  value,
  onUpdate,
  step = 1,
  min,
  max,
}: DraggableLabelProps) => {
  const [dragging, setDragging] = React.useState<boolean>(false)
  const [internalValue, setInternalValue] = React.useState<number | string>(
    value
  )
  const initialValue = React.useRef<number>(value)

  const updateValue = (newValue: number | string) => {
      setInternalValue(newValue)
      onUpdate(newValue)
  }

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

        setInternalValue(
          newValue || newValue === 0
            ? newValue
            : inputValue === '-' ? '-' : ''
        )
        onUpdate(newValue || 0)
      }}
      sx={{
        cursor: dragging ? 'ew-resize' : 'default',
        minHeight: '1.6em',
        width: `${value.toString().length + 1}ch`,
        // Use fractional steps to approximate the minimum width
        // so we don't get "jitters" moving between fractional and integer values
        minWidth: `${step.toString().length + 1}ch`,
        textAlign: 'right',
        background: 'none',
        color: 'text',
        border: 'none',
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
