import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { EditorProps } from './editors/types'
import { Label } from './primitives'

export function CheckboxInput({
  label,
  value,
  onChange,
}: EditorProps<boolean> & { label: string }) {
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
