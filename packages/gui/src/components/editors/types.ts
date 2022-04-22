import { Color, Length, ResponsiveLength } from '../../types/css'

export type LengthEditorProps = {
  value?: Length | ResponsiveLength
  onChange: (newValue: Length | ResponsiveLength) => void
}

export type KeywordEditorProps = {
  value?: string
  onChange: (newValue: string) => void
}

export type ColorEditorProps = {
  value?: Color
  onChange: (newValue: Color) => void
}
