import { Styles } from '../../types/css'
import { Theme } from '../../types/theme'
import { EditorProvider } from '../providers/EditorContext'

type ControlsProps = {
  styles: Styles
  theme?: Theme
  onChange: (newStyles: any) => void
}
export const Controls = ({ theme, styles, onChange }: ControlsProps) => {
  return (
    <EditorProvider theme={theme} value={styles} onChange={onChange}>
      <h1>Hello, world!</h1>
    </EditorProvider>
  )
}
