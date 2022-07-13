import { Label } from '../primitives'
import { Slot } from './types'
import { ChangeEvent } from 'react'

interface SlotEditorProps {
  value: Slot
  onChange(value: Slot): void
}

export const SlotEditor = ({ value, onChange }: SlotEditorProps) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, name: e.target.value })
  }

  const handleDefaultValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, value: e.target.value })
  }

  return (
    <div>
      <div sx={{ px: 3, pb: 3 }}>
        <Label>Prop name</Label>
        <input type="text" value={value.name} onChange={handleNameChange} />
        <Label>Default Value</Label>
        <input
          type="text"
          value={value.value ?? ''}
          onChange={handleDefaultValueChange}
        />
      </div>
    </div>
  )
}
