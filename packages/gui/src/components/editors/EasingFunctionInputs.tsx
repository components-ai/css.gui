import { mapValues, pickBy } from 'lodash-es'
import { ChangeEvent } from 'react'
import { properties } from '../../data/properties'
import { EditorProps } from './types'
import { EasingFunctionEditor } from '../EasingFunction'
import { EasingFunction } from '../EasingFunction/types'

const easingFunctionProperties = pickBy(
  properties,
  (property) => property.type === 'keyword'
)

export const easingFunctionInputs = mapValues(
  easingFunctionProperties,
  (property, name) => {
    return ({ value, onChange }: EditorProps<EasingFunction>) => {
      return <EasingFunctionEditor value={value} onChange={onChange} />
    }
  }
)

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
