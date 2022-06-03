import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { Number, Label } from '../primitives'
import { EditorProps } from '../../types/editor'

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
    <div sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Label htmlFor={id}>{label}</Label>
      <div
        sx={{
          px: 1,
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.25rem',
          width: 'min-content',
        }}
      >
        <Number id={id} value={value} {...props} />
      </div>
    </div>
  )
}
