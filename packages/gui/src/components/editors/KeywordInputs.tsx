import { mapValues, pickBy } from 'lodash-es'
import { properties } from '../../data/properties'
import { EditorProps } from './types'
import { GLOBAL_KEYWORDS } from '../../data/global-keywords'
import { SelectInput } from '../SelectInput'
import { sentenceCase } from '../../lib/util'

const keywordProperties = pickBy(
  properties,
  (property) => property.type === 'keyword'
)

// for simplicity, just use the same default keyword for now.
// If we need to support different defaults, we can add them to the data definition.
const DEFAULT_KEYWORD = 'inherit'
export const keywordInputs = mapValues(keywordProperties, (property, name) => {
  return ({ value, onChange }: EditorProps<string>) => {
    return (
      <SelectInput
        label={sentenceCase(name)}
        value={value || DEFAULT_KEYWORD}
        onChange={onChange}
        options={[...(property.keywords ?? []), ...GLOBAL_KEYWORDS]}
      />
    )
  }
})
