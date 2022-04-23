import { mapValues, pickBy } from 'lodash-es'
import { ChangeEvent, useId } from 'react'
import { properties, getPropertyLabel } from '../../data/properties'
import { Label } from '../primitives'
import { EditorProps } from './types'
import { GLOBAL_KEYWORDS } from '../../data/global-keywords'

const keywordProperties = pickBy(
  properties,
  (property) => property.type === 'keyword'
)

// for simplicity, just use the same default keyword for now.
// If we need to support different defaults, we can add them to the data definition.
const DEFAULT_KEYWORD = 'inherit'
export const keywordInputs = mapValues(keywordProperties, (property, name) => {
  return ({ value, onChange }: EditorProps<string>) => {
    const id = useId()
    const fullId = `${id}-${name}`
    return (
      <>
        <Label htmlFor={fullId}>{getPropertyLabel(name)}</Label>
        <Select
          id={fullId}
          value={value || DEFAULT_KEYWORD}
          onChange={onChange}
          values={[...(property.keywords ?? []), ...GLOBAL_KEYWORDS]}
        />
      </>
    )
  }
})

type SelectProps = {
  id: string
  onChange: (newValue: string) => void
  values: string[]
  value: string
}
export const Select = ({ value, onChange, id, values }: SelectProps): any => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      sx={{ width: '100%', minHeight: '1.6em' }}
    >
      {values.map((v) => {
        return (
          <option key={v} value={v}>
            {v}
          </option>
        )
      })}
    </select>
  )
}
