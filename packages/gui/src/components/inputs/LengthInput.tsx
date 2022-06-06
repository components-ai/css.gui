import { compact } from 'lodash-es'
import {
  CSSFunctionCalc,
  CSSUnitValue,
  Dimension,
  Length,
  LENGTH_UNITS,
  PercentageLengthUnits,
  UnitlessUnits,
} from '../../types/css'
import { DimensionInput } from './Dimension'

interface LengthInputProps {
  value: Dimension
  onChange: (value: Length) => void
  label: string
  property?: string
  keywords?: string[]
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
  value: providedValue,
  ...props
}: LengthInputProps) {
  const units = compact([
    number && UnitlessUnits.Number,
    ...LENGTH_UNITS,
    percentage && PercentageLengthUnits.Pct,
    flex && 'fr',
  ])
  const value =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
  return (
    <DimensionInput
      value={value}
      units={units}
      conversions={lengthConversions}
      steps={lengthSteps}
      property={property}
      {...props}
    />
  )
}

const lengthConversions = {
  px: 16,
  rem: 1,
  em: 1,
}

const lengthSteps = {
  number: 0.1,
  theme: 1,
  px: 1,
  em: 0.125,
  rem: 0.125,
  '%': 0.1,
  fr: 0.1,
}
