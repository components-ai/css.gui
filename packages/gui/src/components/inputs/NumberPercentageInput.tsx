import { NUMBER_PERCENTAGE_UNITS, CSSUnitValue } from '../../types/css'
import { DimensionInput } from './Dimension'
import { EditorProps } from '../../types/editor'

/**
 * Input usually representing a ratio that can be expressed as either
 * a raw number or a percentage (for example, scale amount)
 */
export function NumberPercentageInput({
  value,
  onChange,
  label,
}: EditorProps<CSSUnitValue> & { label: string }) {
  return (
    <DimensionInput
      value={value}
      onChange={onChange}
      label={label}
      units={NUMBER_PERCENTAGE_UNITS}
      steps={numberPercentSteps}
      conversions={numberPercentConversions}
    />
  )
}

const numberPercentConversions = {
  number: 1,
  '%': 100,
}

const numberPercentSteps = {
  number: 0.01,
  '%': 1,
}
