import * as React from 'react'
import { NumberInputProps } from './types'
import { useDrag } from 'react-use-gesture'
import { roundToStep } from '../../../lib/math'

type DraggableLabelProps = {
  step: number
  onUpdate: (newValue: any) => void
  value: number
  min?: number
  max?: number
}

export const DraggableInput = ({
  value,
  onUpdate,
  step,
  min,
  max,
}: DraggableLabelProps) => {
  const [dragging, setDragging] = React.useState<boolean>(false)
  const initialValue = React.useRef<number>(value)

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

      onUpdate(newValue)
    },
    { pointerEvents: true }
  )

  return (
    <input
      type="number"
      value={value}
      onChange={({ target: { value: inputValue }}: any) => {
        let newValue = parseFloat(inputValue)
        if (dragging && (min || min === 0)) newValue = Math.max(newValue, min)
        if (dragging && (max || max === 0)) newValue = Math.min(newValue, max)

        onUpdate(newValue)
      }}
      sx={{
        cursor: dragging ? 'ew-resize' : 'default',
        minHeight: '1.6em',
        width: '100%',
        textAlign: 'right',
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
