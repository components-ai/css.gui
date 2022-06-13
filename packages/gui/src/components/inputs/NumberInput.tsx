import { Number } from '../primitives'
import { EditorPropsWithLabel } from '../../types/editor'
import { InputHeader } from '../ui/InputHeader'

interface Props extends EditorPropsWithLabel<number> {
  min?: number
  max?: number
  step?: number
}
/** A labelled number field */
export function NumberInput(props: Props) {
  return (
    <InputHeader {...props}>
      <div
        sx={{
          px: 1,
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.25rem',
          width: 'min-content',
        }}
      >
        <Number {...props} />
      </div>
    </InputHeader>
  )
}
