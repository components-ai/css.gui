import { CSSUnitValue, Length, UnitlessUnits } from '../types/css'
import { roundToStep } from './math'

/**
 * A mapping of units to their values relative to each other.
 */
export type UnitConversions = Record<string, number>
export type UnitSteps = Record<string, number>

export const convertUnits = (
  newUnit: string,
  value: CSSUnitValue,
  conversions: UnitConversions = {},
  steps: UnitSteps = {}
): number | string => {
  // If both the new and old units have mappings,
  // run the conversion logic
  if (conversions[value.unit] && conversions[newUnit]) {
    const newValue =
      (+value.value / conversions[value.unit]) * conversions[newUnit]

    // If steps are provided, round the new value to the given step
    const newSteps = steps[newUnit]
    return newSteps ? roundToStep(newValue, newSteps) : newValue
  }

  if (value.unit === 'keyword') {
    return conversions[newUnit] ?? 0
  }

  // If the new unit has a value but the old one doesn't, return the new one
  if (conversions[newUnit] && value.unit !== UnitlessUnits.Calc) {
    return conversions[newUnit]
  }

  // Otherwise, we perform no conversions and return the value as-is
  return value.value
}
