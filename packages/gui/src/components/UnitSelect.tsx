import * as React from 'react'
import { UNITS, UNITS_WITH_PERCENTAGE } from '../lib/constants'
import { isThemeable } from '../lib/theme'
import { ThemeUnits } from '../types/css'

type UnitSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  property?: string
  withTheme?: boolean
  withPercentages?: boolean
  withUnitless?: boolean
}
export const UnitSelect = ({
  withTheme,
  withPercentages,
  withUnitless,
  property,
  ...props
}: UnitSelectProps) => {
  const units = withPercentages ? UNITS_WITH_PERCENTAGE : UNITS

  return (
    <select {...props}>
      {withTheme || isThemeable(property) ? (
        <option value={ThemeUnits.Theme}>{ThemeUnits.Theme}</option>
      ) : null}
      {withUnitless ? <option value="number">number</option> : null}
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
