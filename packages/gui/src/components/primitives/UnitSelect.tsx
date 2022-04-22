import * as React from 'react'
import { getPropertyData } from '../../data/properties'
import { UNITS, UNITS_WITH_PERCENTAGE } from '../../lib/constants'
import { isThemeable } from '../../lib/theme'
import { ThemeUnits } from '../../types/css'

type UnitSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  property?: string
  withTheme?: boolean
}
export const UnitSelect = ({
  withTheme,
  property,
  ...props
}: UnitSelectProps) => {
  const propertyData = getPropertyData(property)
  const units = propertyData?.percentage ? UNITS_WITH_PERCENTAGE : UNITS

  return (
    <select {...props}>
      {withTheme || isThemeable(property) ? (
        <option value={ThemeUnits.Theme}>{ThemeUnits.Theme}</option>
      ) : null}
      {propertyData?.number ? <option value="number">number</option> : null}
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

// type ValueSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
//   values: string[]
// }
// export const ValueSelect = ({
//   values,
//   ...props
// }: ValueSelectProps) => {
//   return (
//     <select {...props}>
//       {values?.map((v, i) => {
//         return (
//           <option key={i}>{v}</option>
//         )
//       })}
//     </select>
//   )
// }
