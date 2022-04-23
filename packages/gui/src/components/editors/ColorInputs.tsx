import { Color } from '../../types/css'
import { EditorProps } from './types'
import { getPropertyLabel, properties } from '../../data/properties'
import { mapValues, pickBy } from 'lodash-es'
import { ColorInput } from '../ColorInput'

const colorProperties = pickBy(
  properties,
  (property) => property.type === 'color'
)

export const colorInputs = mapValues(colorProperties, (property, name) => {
  return ({ value, onChange }: EditorProps<Color>) => {
    return (
      <ColorInput
        label={getPropertyLabel(name)}
        value={value}
        onChange={onChange}
        defaultValue={property.defaultValue}
      />
    )
  }
})
