import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  Length,
  LengthUnit,
} from '../types/css'

const BASE_FONT_SIZE = 16
export const convertLengthUnits = (
  newUnit: LengthUnit,
  value: Length
): number => {
  if (newUnit === AbsoluteLengthUnits.Px) {
    if (
      value.unit === FontRelativeLengthUnits.Em ||
      FontRelativeLengthUnits.Rem
    ) {
      return value.value * BASE_FONT_SIZE
    }
  }

  if (newUnit === FontRelativeLengthUnits.Em || FontRelativeLengthUnits.Rem) {
    if (value.unit === AbsoluteLengthUnits.Px) {
      return value.value / BASE_FONT_SIZE
    }
  }

  return value.value
}
