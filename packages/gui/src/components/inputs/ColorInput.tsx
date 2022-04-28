import { useId } from 'react'
import { Color } from '../../types/css'
import { EditorProps } from '../../types/editor'
import { ColorPopover, Label } from '../primitives'
import { useTheme } from '../providers/ThemeContext'

interface Props extends EditorProps<Color> {
  label: string
  defaultValue?: Color
}

export function ColorInput({
  label,
  value,
  onChange,
  defaultValue = '#000',
}: Props) {
  const theme = useTheme()
  const id = useId()
  const fullId = `${id}-${label}`
  return (
    <div sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Label htmlFor={fullId}>{label}</Label>
      <ColorPopover
        id={fullId}
        value={value || defaultValue}
        onChange={onChange}
        theme={theme}
      />
    </div>
  )
}
