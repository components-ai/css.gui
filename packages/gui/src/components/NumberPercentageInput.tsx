import { NUMBER_PERCENTAGE_UNITS, CSSUnitValue } from '../types/css'
import { DimensionInput } from './Dimension'
import { EditorProps } from './editors/types'

/**
 * Input usually representing a ratio that can be expressed as either
 * a raw number or a percentage (for example, scale amount)
 */
export function AngleInput({ value, onChange }: EditorProps<CSSUnitValue>) {
  return (
    <DimensionInput
      value={value}
      onChange={onChange}
      units={NUMBER_PERCENTAGE_UNITS}
      conversions={numberPercentConversions}
    />
  )
}

const numberPercentConversions = {
  number: 1,
  '%': 100,
}
