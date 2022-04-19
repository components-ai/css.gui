import * as React from 'react'
import { NumberInputProps } from './types'
import { useDrag } from 'react-use-gesture'

type DraggableLabelProps = {
  step: number
  onUpdate: (newValue: any) => void
  value: number
}

export const DraggableInput = ({ value, onUpdate, step }: DraggableLabelProps) => {
  const [dragging, setDragging] = React.useState<boolean>(false)
  const initialValue = React.useRef<number>(value)

  const bind = useDrag(({ dragging, first, tap, movement: [dx] }) => {
      setDragging(dragging)
      const parsedValue = typeof(value) === 'string'
        ? parseFloat(value)
        : value

      if (tap) return
      if (first) {
        initialValue.current = parsedValue
      }      

      const deltaValue = Math.round(dx) * step
      const newValue = initialValue.current + deltaValue
      onUpdate(newValue)
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
