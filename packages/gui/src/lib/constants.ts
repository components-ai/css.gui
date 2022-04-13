import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  LengthPercentageUnit,
  LengthUnit,
  PercentageLengthUnits,
} from '../types/css'

export const UNITS: LengthUnit[] = [
  AbsoluteLengthUnits.Px,
  FontRelativeLengthUnits.Em,
  FontRelativeLengthUnits.Rem,
]
export const UNITS_WITH_PERCENTAGE: LengthPercentageUnit[] = [
  ...UNITS,
  PercentageLengthUnits.Pct,
]
