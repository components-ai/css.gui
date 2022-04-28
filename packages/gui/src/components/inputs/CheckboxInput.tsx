import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { EditorProps } from '../../types/editor'
import { Label } from '../primitives'

export function CheckboxInput({
  label,
  value = false,
  onChange,
}: EditorProps<boolean | undefined> & { label: string }) {
  const id = `${useId()}-${kebabCase(label)}`
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="checkbox"
        value={value.toString()}
        onChange={(e) => onChange(e.target.checked)}
      />
    </>
  )
}
