import { FONT_SIZE_MAX, FONT_SIZE_MIN } from '../../lib/constants'
import { AbsoluteLengthUnits, FontRelativeLengthUnits, PercentageLengthUnits } from '../../types/css'
import { LengthInput } from '../Length'
import { ResponsiveInput, DimensionsInput } from '../Responsive'
import { LengthEditorProps } from './types'

// should MarginInput or PaddingInput
export const MarginInput = ({ value, onChange }: LengthEditorProps) => {

  return (
    <DimensionsInput
      property='margin'
      value={value}
      onChange={onChange}
      componentProps={{}}
      label="Margin"
    />

  )
}

export const PaddingInput = ({ value, onChange }: LengthEditorProps) => {
  return (
    <div>This is my padding div</div>
  )
}


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
          [AbsoluteLengthUnits.Px]: FONT_SIZE_MIN[AbsoluteLengthUnits.Px],
          [FontRelativeLengthUnits.Em]: FONT_SIZE_MIN[FontRelativeLengthUnits.Em],
          [FontRelativeLengthUnits.Rem]: FONT_SIZE_MIN[FontRelativeLengthUnits.Rem],
          [PercentageLengthUnits.Pct]: FONT_SIZE_MIN[PercentageLengthUnits.Pct],
        },
        max: {
          [AbsoluteLengthUnits.Px]: FONT_SIZE_MAX[AbsoluteLengthUnits.Px],
          [FontRelativeLengthUnits.Em]: FONT_SIZE_MAX[FontRelativeLengthUnits.Em],
          [FontRelativeLengthUnits.Rem]: FONT_SIZE_MAX[FontRelativeLengthUnits.Rem],
          [PercentageLengthUnits.Pct]: FONT_SIZE_MAX[PercentageLengthUnits.Pct],
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
