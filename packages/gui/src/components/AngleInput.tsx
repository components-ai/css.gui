import { ANGLE_UNITS, CSSUnitValue } from '../types/css'
import { DimensionInput } from './Dimension'
import { EditorProps } from './editors/types'

// TODO allow optional percentage for conic gradients
export function AngleInput({
  value,
  onChange,
  label,
}: EditorProps<CSSUnitValue> & { label: string }) {
  return (
    <DimensionInput
      value={value}
      onChange={onChange}
      label={label}
      units={ANGLE_UNITS}
      conversions={angleConversions}
    />
  )
}

const angleConversions = {
  deg: 360,
  turn: 1,
  rad: 2 * Math.PI,
  grad: 400,
}
