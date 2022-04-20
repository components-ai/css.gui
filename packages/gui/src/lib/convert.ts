import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  Length,
  LengthUnit,
  ThemeUnits,
} from '../types/css'

const BASE_FONT_SIZE = 16
export const convertLengthUnits = (
  newUnit: LengthUnit,
  value: Length
): number => {
  const operatingUnit = value.unit === ThemeUnits.Theme
    ? value.themeUnit
    : value.unit
  if (newUnit === AbsoluteLengthUnits.Px) {
    if (
      operatingUnit === FontRelativeLengthUnits.Em ||
      operatingUnit === FontRelativeLengthUnits.Rem
    ) {
      return value.value * BASE_FONT_SIZE
    }
  }

  if (newUnit === FontRelativeLengthUnits.Em || newUnit === FontRelativeLengthUnits.Rem) {
    if (operatingUnit === AbsoluteLengthUnits.Px) {
      return value.value / BASE_FONT_SIZE
    }
  }

  return value.value
}
