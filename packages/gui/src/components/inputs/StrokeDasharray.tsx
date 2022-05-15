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
      content={StrokeDasharrayContent}
      stringify={stringifyStrokeDasharray}
      newItem={() => ({ value: 0, unit: 'number' })}
    />
  )
}

function StrokeDasharrayContent({
  label,
  value,
  onChange,
}: EditorPropsWithLabel<Length>) {
  return (
    <LengthInput
      percentage
      number
      label={label}
      value={value}
      onChange={onChange}
    />
  )
}

export function stringifyStrokeDasharray(items: Length[]) {
  return stringifyValues(items)
}
