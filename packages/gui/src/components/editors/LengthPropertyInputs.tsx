import { compact, mapValues, pickBy } from 'lodash-es'
import {
  properties,
  getPropertyLabel,
  getPropertyData,
} from '../../data/properties'
import { UNITS } from '../../lib/constants'
import { isThemeable } from '../../lib/theme'
import {
  Length,
  PercentageLengthUnits,
  ThemeUnits,
  UnitlessUnits,
} from '../../types/css'
import { LengthInput as DimensionInput } from '../Length'
import { ResponsiveInput } from '../Responsive'
import { LengthEditorProps } from './types'

const lengthProperties = pickBy(
  properties,
  (property) => property.type === 'length'
)

export const lengthInputs = mapValues(lengthProperties, (property, name) => {
  return ({ value, onChange }: LengthEditorProps) => {
    return (
      <ResponsiveInput
        label={getPropertyLabel(name)}
        property={name}
        value={value}
        onChange={onChange}
        Component={LengthInput}
        componentProps={{
          property: name,
          ...property,
        }}
      />
    )
  }
})

interface LengthInputProps {
  value: Length
  onChange: (value: Length) => void
  property?: string
  keywords?: string[]
  number?: boolean
  percentage?: boolean
}

function LengthInput({
  property,
  number,
  percentage,
  ...props
}: LengthInputProps) {
  const propertyData = getPropertyData(property)
  const units = compact([
    isThemeable(property) && ThemeUnits.Theme,
    propertyData?.number && UnitlessUnits.Number,
    ...UNITS,
    propertyData?.percentage && PercentageLengthUnits.Pct,
  ])
  return <DimensionInput units={units} {...props} />
}
