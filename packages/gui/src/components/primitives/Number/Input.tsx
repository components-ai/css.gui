import * as React from 'react'

import { NumberInputProps } from './types'
import { useDrag } from 'react-use-gesture'

type DraggableLabelProps = {
  step: number
  onUpdate: (newValue: any) => void
  value: number
}

export const DraggableInput = ({ step = 1, onUpdate, value }: DraggableLabelProps) => {
  const [dragging, setDragging] = React.useState<boolean>(false)
  const bind = useDrag(({ dragging, first, tap, distance, delta: [dx] }) => {
      if (first || tap) return
      
      setDragging(dragging)
      const v = typeof(value) === 'string' ? parseFloat(value) : value
      const movement = distance * step
      const newValue = v + (movement * dx < 0 ? -1 : 1)

      onUpdate(Math.round(newValue))
    },
    { pointerEvents: true }
  )

  return (
    <input
      type="number"
      value={value}
      onChange={({ currentTarget: { value: inputValue } }) => {
        onUpdate(inputValue)
      }}
      style={{
        cursor: dragging ? 'ew-resize' : 'default'
      }}
      {...bind()}
    />
  )
}

export const NumberInput = ({ value, onChange, step = 1 }: NumberInputProps): any => {
  return (
    <>
      <DraggableInput value={value} step={step} onUpdate={onChange}/>
    </>
  )
}
