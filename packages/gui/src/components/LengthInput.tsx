import { compact } from 'lodash-es'
import {
  Length,
  PercentageLengthUnits,
  ThemeUnits,
  UnitlessUnits,
} from '../types/css'
import { DimensionInput } from './Dimension'

interface LengthInputProps {
  value: Length
  onChange: (value: Length) => void
  label: string
  property?: string
  keywords?: string[]
  theme?: boolean
  number?: boolean
  percentage?: boolean
  keyword?: boolean
}

export function LengthInput({
  property,
  theme,
  number,
  percentage,
  keyword = true,
  value: providedValue,
  ...props
}: LengthInputProps) {
  const units = compact([
    theme && ThemeUnits.Theme,
    number && UnitlessUnits.Number,
    'px',
    'em',
    'rem',
    keyword && 'keyword',
    percentage && PercentageLengthUnits.Pct,
  ])
  const value =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
  return <DimensionInput value={value} units={units} {...props} />
}
