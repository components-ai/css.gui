import { Color } from '../../types/css'
import { EditorProps } from '../../types/editor'
import { ColorPopover, Label } from '../primitives'
import { useTheme } from '../providers/ThemeContext'
import { InputHeader } from '../ui/InputHeader'

interface Props extends EditorProps<Color> {
  label: string
  defaultValue?: Color
}

export function ColorInput({ value, onChange, ...props }: Props) {
  const { theme } = useTheme()

  return (
    <InputHeader {...props}>
      <div sx={{ display: 'flex', flexDirection: 'row' }}>
        <ColorPopover value={value} onChange={onChange} theme={theme} />
      </div>
    </InputHeader>
  )
}
