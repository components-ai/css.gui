import { Color } from '../../types/css'
import { EditorProps } from './types'
import { properties } from '../../data/properties'
import { mapValues, pickBy } from 'lodash-es'
import { ColorInput } from '../ColorInput'
import { sentenceCase } from '../../lib/util'

const colorProperties = pickBy(
  properties,
  (property) => property.type === 'color'
)

export const colorInputs = mapValues(colorProperties, (property, name) => {
  return ({ value, onChange }: EditorProps<Color>) => {
    return (
      <ColorInput
        label={sentenceCase(name)}
        value={value}
        onChange={onChange}
        defaultValue={property.defaultValue}
      />
    )
  }
})
