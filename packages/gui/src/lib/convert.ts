import {
  AbsoluteLengthUnits,
  CSSUnitValue,
  FontRelativeLengthUnits,
  Length,
  LengthUnit,
} from '../types/css'

const BASE_FONT_SIZE = 16
export const convertLengthUnits = (
  newUnit: LengthUnit,
  providedValue: Length
): number => {
  const value: CSSUnitValue =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue

  if (newUnit === AbsoluteLengthUnits.Px) {
    if (
      value.unit === FontRelativeLengthUnits.Em ||
      FontRelativeLengthUnits.Rem
    ) {
      return value.value * BASE_FONT_SIZE
    }

    return 16
  }

  if (newUnit === FontRelativeLengthUnits.Em || FontRelativeLengthUnits.Rem) {
    if (value.unit === AbsoluteLengthUnits.Px) {
      return value.value / BASE_FONT_SIZE
    }

    return 1
  }

  return value.value
}
