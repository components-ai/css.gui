import { CSSUnitValue, Length } from '../types/css'

/**
 * A mapping of units to their values relative to each other.
 */
export type UnitConversions = Record<string, number>

export const convertLengthUnits = (
  newUnit: string,
  providedValue: Length,
  conversions: UnitConversions = {}
): number | string => {
  const value: CSSUnitValue =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue

  // If both the new and old units have mappings,
  // run the conversion logic
  if (conversions[value.unit] && conversions[newUnit]) {
    return (+value.value / conversions[value.unit]) * conversions[newUnit]
  }

  // If the new unit has a value but the old one doesn't, return the new one
  if (conversions[newUnit]) {
    return conversions[newUnit]
  }

  // Otherwise, we perform no conversions and return the value as-is
  return value.value
}
