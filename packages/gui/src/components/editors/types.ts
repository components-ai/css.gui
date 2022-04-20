import { Length, ResponsiveLength } from '../../types/css'

export type LengthEditorProps = {
  value?: Length | ResponsiveLength
  onChange: (newValue: Length | ResponsiveLength) => void
}
