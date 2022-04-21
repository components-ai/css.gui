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

  //@ts-ignore
  return value.value
}
