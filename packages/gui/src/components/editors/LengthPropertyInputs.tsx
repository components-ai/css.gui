import { LengthInput } from '../Length'
import { ResponsiveInput } from '../Responsive'
import { LengthEditorProps } from './types'

export const BorderWidthInput = ({ value, onChange }: LengthEditorProps) => {
  return (
    <ResponsiveInput
      label="Border width"
      property="borderWidth"
      value={value}
      onChange={onChange}
      Component={LengthInput}
      componentProps={{}}
    />
  )
}

export const FontSizeInput = ({ value, onChange }: LengthEditorProps) => {
  return (
    <ResponsiveInput
      label="Font size"
      property="fontSize"
      value={value}
      onChange={onChange}
      Component={LengthInput}
      componentProps={{}}
    />
  )
}

export const LineHeightInput = ({ value, onChange }: LengthEditorProps) => {
  return (
    <ResponsiveInput
      label="Line height"
      property="lineHeight"
      value={value}
      onChange={onChange}
      Component={LengthInput}
      componentProps={{}}
    />
  )
}
