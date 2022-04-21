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
  console.log(providedValue, "provided")
  const value: CSSUnitValue =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
  const operatingUnit = value.unit

  if (newUnit === AbsoluteLengthUnits.Px) {
    // switch (operatingUnit) {
    //   case FontRelativeLengthUnits.Em:
    //   case FontRelativeLengthUnits.Rem:
    //     return value.value * BASE_FONT_SIZE
    // }
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
