import { mapValues, pickBy } from 'lodash-es'
import { properties, getPropertyLabel } from '../../data/properties'
import { LengthInput } from '../Length'
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
          range: property.range,
        }}
      />
    )
  }
})
