import {
  AbsoluteLengthUnits,
  CSSUnitValue,
  FontRelativeLengthUnits,
  FullLengthUnit,
  Length,
  ThemeUnits,
} from '../types/css'

const BASE_FONT_SIZE = 16
export const convertLengthUnits = (
  newUnit: FullLengthUnit,
  providedValue: Length
): number | string => {
  const value: CSSUnitValue =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue

  if (newUnit === AbsoluteLengthUnits.Px) {
    if (
      value.unit === FontRelativeLengthUnits.Em ||
      value.unit === FontRelativeLengthUnits.Rem
    ) {
      //@ts-ignore
      return value * BASE_FONT_SIZE
    }
  }

  if (newUnit === FontRelativeLengthUnits.Em || newUnit === FontRelativeLengthUnits.Rem) {
    if (value.unit === AbsoluteLengthUnits.Px) {
      //@ts-ignore
      return value.value / BASE_FONT_SIZE
    }
  }

  if (newUnit === ThemeUnits.Theme) {
    return `${value.value}${value.unit}`
  }
  //@ts-ignore
  return value.value
}
