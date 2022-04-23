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
  ResponsiveLength,
  PercentageLengthUnits,
  ThemeUnits,
  UnitlessUnits,
  CSSUnitValue,
} from '../../types/css'
import { DimensionInput } from '../Dimension'
import { ResponsiveInput } from '../Responsive'
import { EditorProps } from './types'

const lengthProperties = pickBy(
  properties,
  (property) => property.type === 'length'
)

export type LengthEditorProps = EditorProps<Length | ResponsiveLength>

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
    return ({ value, onChange }: EditorProps<CSSUnitValue>) => {
      return (
        <div>
          <DimensionInput
            value={value}
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
  return ({ value, onChange }: EditorProps<CSSUnitValue>) => {
    return (
      <div>
        <DimensionInput
          value={value}
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
  value: providedValue,
  ...props
}: LengthInputProps) {
  const propertyData = getPropertyData(property)
  const units = compact([
    isThemeable(property) && ThemeUnits.Theme,
    propertyData?.number && UnitlessUnits.Number,
    ...UNITS,
    propertyData?.percentage && PercentageLengthUnits.Pct,
  ])
  const value =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
  return <DimensionInput value={value} units={units} {...props} />
}
