import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { Label } from 'theme-ui'
import { EditorProps } from './editors/types'
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
    <>
      <Label htmlFor={id}>{label}</Label>
      <Number id={id} value={value} {...props} />
    </>
  )
}
