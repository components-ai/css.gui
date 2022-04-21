import { FONT_SIZE_MAX, FONT_SIZE_MIN } from '../../lib/constants'
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
      componentProps={{
        min: {
          'px': FONT_SIZE_MIN['px'],
          'em': FONT_SIZE_MIN['em'],
          'rem': FONT_SIZE_MIN['rem'],
          '%': FONT_SIZE_MIN['%'],
        },
        max: {
          'px': FONT_SIZE_MAX['px'],
          'em': FONT_SIZE_MAX['em'],
          'rem': FONT_SIZE_MAX['rem'],
          '%': FONT_SIZE_MAX['%'],
        },
      }}
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
