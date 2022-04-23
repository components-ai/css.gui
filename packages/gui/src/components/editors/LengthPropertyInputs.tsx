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
import { DimensionInput } from '../Dimension'
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

const percentageProperties = pickBy(
  properties,
  (property) => property.type === 'percentage'
)
export const percentageInputs = mapValues(
  percentageProperties,
  (property, name) => {
    return ({ value, onChange }: LengthEditorProps) => {
      return (
        <div>
          <DimensionInput
            value={value as any}
            label={getPropertyLabel(name)}
            onChange={onChange}
            property={name}
            units={['%', 'keyword']}
            {...property}
          />
        </div>
      )
    }
  }
)

const numberProperties = pickBy(
  properties,
  (property) => property.type === 'number'
)

export const numberInputs = mapValues(numberProperties, (property, name) => {
  return ({ value, onChange }: LengthEditorProps) => {
    return (
      <div>
        <DimensionInput
          value={value as any}
          label={getPropertyLabel(name)}
          onChange={onChange}
          property={name}
          units={['number', 'keyword']}
          {...property}
        />
      </div>
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
