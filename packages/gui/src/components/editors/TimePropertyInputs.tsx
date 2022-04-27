import { mapValues, pickBy } from 'lodash-es'
import { properties } from '../../data/properties'
import { EditorProps } from './types'
import { DimensionInput } from '../Dimension'
import { TIME_UNITS, CSSUnitValue } from '../../types/css'
import { sentenceCase } from '../../lib/util'

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
        label={sentenceCase(name)}
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
