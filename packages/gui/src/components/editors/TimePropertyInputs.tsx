import { mapValues, pickBy } from 'lodash-es'
import { properties, getPropertyLabel } from '../../data/properties'
import { EditorProps } from './types'
import { DimensionInput } from '../Dimension'
import { TIME_UNITS, CSSUnitValue } from '../../types/css'

const timeProperties = pickBy(
  properties,
  (property) => property.type === 'time'
)

// for simplicity, just use the same default keyword for now.
// If we need to support different defaults, we can add them to the data definition.
export const timeInputs = mapValues(timeProperties, (property, name) => {
  return ({ value, onChange }: EditorProps<CSSUnitValue>) => {
    return (
      <DimensionInput
        value={value}
        label={getPropertyLabel(name)}
        onChange={onChange}
        property={name}
        units={[...TIME_UNITS, 'keyword']}
        steps={timeSteps}
        conversions={timeConversions}
        {...property}
      />
    )
  }
})

const timeConversions = {
  ms: 1000,
  s: 1,
}

const timeSteps = {
  ms: 25,
  s: 0.025,
}
