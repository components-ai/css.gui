import { mapValues, pickBy, property } from 'lodash-es'
import { properties, getPropertyLabel } from '../../data/properties'
import { isThemeable } from '../../lib/theme'
import { Length, ResponsiveLength, CSSUnitValue } from '../../types/css'
import { DimensionInput } from '../Dimension'
import { ResponsiveInput } from '../Responsive'
import { EditorProps } from './types'
import { LengthInput } from '../LengthInput'

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
          theme: isThemeable(name),
          keyword: true,
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
        <DimensionInput
          value={value}
          label={getPropertyLabel(name)}
          onChange={onChange}
          property={name}
          units={['%', 'keyword']}
          steps={{ '%': 0.1 }}
          {...property}
        />
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
      <DimensionInput
        value={value}
        label={getPropertyLabel(name)}
        onChange={onChange}
        property={name}
        units={['number', 'keyword']}
        steps={{ number: 1 }}
        {...property}
      />
    )
  }
})
