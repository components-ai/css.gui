import {
  AbsoluteLengthUnits,
  CSSUnitValue,
  FontRelativeLengthUnits,
  Length,
  LengthUnit,
  ThemeUnits,
} from '../types/css'

const BASE_FONT_SIZE = 16
export const convertLengthUnits = (
  newUnit: LengthUnit | ThemeUnits,
  providedValue: Length
): number | string => {
  const value: CSSUnitValue =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
  const operatingUnit = value.unit

  if (newUnit === AbsoluteLengthUnits.Px) {
    if (
      operatingUnit === FontRelativeLengthUnits.Em ||
      operatingUnit === FontRelativeLengthUnits.Rem
    ) {
      //@ts-ignore
      return value * BASE_FONT_SIZE
    }
  }

  if (newUnit === FontRelativeLengthUnits.Em || newUnit === FontRelativeLengthUnits.Rem) {
    if (operatingUnit === AbsoluteLengthUnits.Px) {
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
