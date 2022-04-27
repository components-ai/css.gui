import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { Label } from './primitives'
import { EditorProps } from '../types/editor'
import { Number } from './primitives'

interface Props extends EditorProps<number> {
  label: string
  min?: number
  max?: number
  step?: number
}
/** A labelled number field */
export function NumberInput({ label, value, ...props }: Props) {
  const id = `${useId()}-${kebabCase(label)}`
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Number id={id} value={value} {...props} />
    </div>
  )
}
