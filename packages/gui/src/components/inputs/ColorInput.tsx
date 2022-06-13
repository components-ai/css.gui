import { Color } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { ColorPopover } from '../primitives'
import { useTheme } from '../providers/ThemeContext'
import { InputHeader } from '../ui/InputHeader'

interface Props extends EditorPropsWithLabel<Color> {
  defaultValue?: Color
}

export function ColorInput(props: Props) {
  const theme = useTheme()
  return (
    <InputHeader {...props}>
      <div sx={{ display: 'flex', flexDirection: 'row' }}>
        <ColorPopover {...props} theme={theme} />
      </div>
    </InputHeader>
  )
}
