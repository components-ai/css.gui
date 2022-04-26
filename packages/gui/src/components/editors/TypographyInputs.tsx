import { mapValues, pickBy } from "lodash-es";
import { getPropertyLabel, properties } from "../../data/properties";
import { EditorProps } from './types'
import { FontFam } from '../../types/css'
import { FontFamilyInput } from '../../components/FontFamily/FontFamilyInput'

const typographyProperties = pickBy(
  properties,
  (property) => property.type === 'typography'
)

export const typographyInputs = mapValues(typographyProperties, (property, name) => {
  return ({ value, onChange }: EditorProps<FontFam>) => {
    return (
      <FontFamilyInput
        label={getPropertyLabel(name)}
        value={value}
        onChange={onChange}
      />
    )
  }
})