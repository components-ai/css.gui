import * as React from 'react'

type UnitSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  units: string[]
}
export const UnitSelect = ({ units, ...props }: UnitSelectProps) => {
  return (
    <select {...props}>
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
