import { compact } from 'lodash-es'
import {
  CSSUnitValue,
  Length,
  PercentageLengthUnits,
  UnitlessUnits,
} from '../types/css'
import { DimensionInput } from './Dimension'

interface LengthInputProps {
  value: Length
  onChange: (value: Length) => void
  label: string
  property?: string
  keywords?: string[]
  number?: boolean
  percentage?: boolean
  themeValues?: (CSSUnitValue & { id: string })[]
}

export function LengthInput({
  property,
  number,
  percentage,
  value: providedValue,
  ...props
}: LengthInputProps) {
  const units = compact([
    number && UnitlessUnits.Number,
    'px',
    'em',
    'rem',
    percentage && PercentageLengthUnits.Pct,
  ])
  const value =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
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

const lengthSteps = {
  number: 0.1,
  theme: 1,
  px: 1,
  em: 0.125,
  rem: 0.125,
  '%': 0.1,
}
