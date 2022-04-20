import { ColorPopover, Label } from '../primitives'
import { ColorEditorProps } from './types'

const DEFAULT_BACKGROUND_COLOR = '#fff'
export const BackgroundColorInput = ({ value, onChange }: ColorEditorProps) => {
  return (
    <>
      <Label>Background color</Label>
      <ColorPopover
        value={value || DEFAULT_BACKGROUND_COLOR}
        onChange={onChange}
      />
    </>
  )
}

const DEFAULT_COLOR = '#000'
export const ColorInput = ({ value, onChange }: ColorEditorProps) => {
  return (
    <>
      <Label>Color</Label>
      <ColorPopover value={value || DEFAULT_COLOR} onChange={onChange} />
    </>
  )
}
