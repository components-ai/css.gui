import { compact } from 'lodash-es'
import {
  CSSUnitValue,
  Length,
  LENGTH_UNITS,
  PercentageLengthUnits,
  UnitlessUnits,
} from '../../types/css'
import { DimensionInput } from './Dimension'

interface LengthInputProps {
  value: Length
  onChange: (value: Length) => void
  label: string
  property?: string
  number?: boolean
  percentage?: boolean
  flex?: boolean
  themeValues?: (CSSUnitValue & { id: string })[]
}

export function LengthInput({
  property,
  number,
  percentage,
  flex,
  value,
  ...props
}: LengthInputProps) {
  const units = compact([
    number && UnitlessUnits.Number,
    ...LENGTH_UNITS,
    percentage && PercentageLengthUnits.Pct,
    flex && 'fr',
  ])
  return (
    <DimensionInput
      value={value}
      units={units}
      conversions={lengthConversions}
      steps={lengthSteps}
      {...props}
    />
  )
}

const lengthConversions = {
  px: 16,
  rem: 1,
  em: 1,
}

export const lengthSteps = {
  number: 0.1,
  theme: 1,
  px: 1,
  em: 0.125,
  rem: 0.125,
  '%': 0.1,
  fr: 0.1,
}
