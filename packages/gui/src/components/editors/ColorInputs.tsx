import { useId } from 'react'
import { ColorPopover, Label } from '../primitives'
import { ColorEditorProps } from './types'

const DEFAULT_BACKGROUND_COLOR = '#fff'
export const BackgroundColorInput = ({ value, onChange }: ColorEditorProps) => {
  const id = useId()
  const fullId = `${id}-backgroundColor`
  return (
    <>
      <Label htmlFor={fullId}>Background color</Label>
      <ColorPopover
        id={fullId}
        value={value || DEFAULT_BACKGROUND_COLOR}
        onChange={onChange}
      />
    </>
  )
}

const DEFAULT_COLOR = '#000'
export const ColorInput = ({ value, onChange }: ColorEditorProps) => {
  const id = useId()
  const fullId = `${id}-color`
  return (
    <>
      <Label htmlFor={fullId}>Color</Label>
      <ColorPopover
        id={fullId}
        value={value || DEFAULT_COLOR}
        onChange={onChange}
      />
    </>
  )
}
