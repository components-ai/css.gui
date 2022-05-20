import { useId } from 'react'
import { Color } from '../../types/css'
import { EditorProps } from '../../types/editor'
import { ColorPopover, Label } from '../primitives'
import { useTheme } from '../providers/ThemeContext'
import { DeletePropButton } from './Dimension/Input'

interface Props extends EditorProps<Color> {
  label: string
  defaultValue?: Color
}

export function ColorInput({
  label,
  value,
  onChange,
  onRemove,
  defaultValue = '#000',
}: Props) {
  const theme = useTheme()
  const id = useId()
  const fullId = `${id}-${label}`
  return (
    <div>
      <Label htmlFor={fullId}>{label}</Label>
      <div sx={{ display: 'flex', flexDirection: 'row' }}>
        <ColorPopover
          id={fullId}
          value={value || defaultValue}
          onChange={onChange}
          theme={theme}
        />
        {onRemove && <DeletePropButton onRemove={onRemove} />}
      </div>
    </div>
  )
}
