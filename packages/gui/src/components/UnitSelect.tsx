import * as React from 'react'
import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  LengthPercentageUnits,
  LengthUnit,
  PercentageLengthUnits,
  ThemeUnits,
} from '../types/css'

const UNITS: LengthUnit[] = [
  AbsoluteLengthUnits.Px,
  FontRelativeLengthUnits.Em,
  FontRelativeLengthUnits.Rem,
]
const UNITS_WITH_PERCENTAGE: LengthPercentageUnits[] = [
  ...UNITS,
  PercentageLengthUnits.Pct,
]

type UnitSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  withTheme?: boolean
  withPercentages?: boolean
}
export const UnitSelect = ({
  withTheme,
  withPercentages,
  ...props
}: UnitSelectProps) => {
  const units = withPercentages ? UNITS_WITH_PERCENTAGE : UNITS

  return (
    <select {...props}>
      {withTheme ? (
        <option value={ThemeUnits.Theme}>{ThemeUnits.Theme}</option>
      ) : null}
      {units.map((unit: string) => {
        return (
          <option key={unit} value={unit}>
            {unit}
          </option>
        )
      })}
    </select>
  )
}
