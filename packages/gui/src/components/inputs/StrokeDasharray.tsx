import { stringifyValues } from '../../lib/stringify'
import { Length } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import FieldArray from '../FieldArray'
import { LengthInput } from './LengthInput'

export function StrokeDasharrayInput({
  label,
  value,
  onChange,
}: EditorPropsWithLabel<Length[]>) {
  return (
    <FieldArray
      label={label}
      value={value}
      onChange={onChange}
      content={LengthInput}
      stringify={stringifyStrokeDasharray}
      newItem={() => ({ value: 0, unit: 'number' })}
    />
  )
}

export function stringifyStrokeDasharray(items: Length[]) {
  return stringifyValues(items)
}
