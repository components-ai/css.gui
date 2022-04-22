import { ChangeEvent, useId } from 'react'
import { getPropertyData } from '../../data/properties'
import { Label } from '../primitives'
import { KeywordEditorProps } from './types'

const DEFAULT_TEXT_ALIGN = 'inherit'
const textAlignKeywords = getPropertyData('textAlign')!
export const TextAlignInput = ({ value, onChange }: KeywordEditorProps) => {
  const id = useId()
  const fullId = `${id}-textAlign`
  return (
    <>
      <Label htmlFor={fullId}>Text align</Label>
      <Select
        id={fullId}
        value={value || DEFAULT_TEXT_ALIGN}
        onChange={onChange}
        values={textAlignKeywords.keywords}
      />
    </>
  )
}

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
