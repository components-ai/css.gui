import * as React from 'react'
import { NumberInputProps } from './types'
import { useDrag } from 'react-use-gesture'

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
    ({ dragging, first, tap, movement: [dx] }) => {
      setDragging(dragging)
      const parsedValue = typeof value === 'string' ? parseFloat(value) : value

      if (tap) return
      if (first) {
        initialValue.current = parsedValue
      }

      const deltaValue = Math.round(dx) * step
      let newValue = initialValue.current + deltaValue
      if (min || min === 0) newValue = Math.max(newValue, min)
      if (max) newValue = Math.min(newValue, max)

      onUpdate(newValue)
    },
    { pointerEvents: true }
  )

  return (
    <input
      type="number"
      value={value}
      onChange={({ currentTarget: { value: inputValue } }) => {
        let newValue = parseFloat(inputValue)
        if (min || min === 0) newValue = Math.max(newValue, min)
        if (max) newValue = Math.min(newValue, max)

        onUpdate(newValue)
      }}
      sx={{
        cursor: dragging ? 'ew-resize' : 'default',
        minHeight: '1.6em',
        width: '100%',
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
    <>
      <DraggableInput
        value={value}
        step={step}
        min={min}
        max={max}
        onUpdate={onChange}
      />
    </>
  )
}
