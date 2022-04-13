import * as React from 'react'
import { UNITS, UNITS_WITH_PERCENTAGE } from '../lib/constants'
import { ThemeUnits } from '../types/css'

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
