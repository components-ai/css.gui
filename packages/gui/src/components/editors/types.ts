import { Color, Length, ResponsiveLength } from '../../types/css'

export type LengthEditorProps = {
  value?: Length | ResponsiveLength
  onChange: (newValue: Length | ResponsiveLength) => void
}

export type ColorEditorProps = {
  value?: Color
  onChange: (newValue: Color) => void
}
