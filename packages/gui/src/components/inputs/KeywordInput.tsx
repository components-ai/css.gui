import { EditorPropsWithLabel } from '../../types/editor'
import { KeywordSelect } from '../primitives/KeywordSelect'
import { InputHeader } from '../ui/InputHeader'

interface Props<T extends string> extends EditorPropsWithLabel<T> {
  options: T[]
}
export function KeywordInput<T extends string>(props: Props<T>) {
  return (
    <div
      sx={{
        border: '1px solid',
        borderColor: 'border',
        borderRadius: '0.25rem',
        width: 'max-content',
        px: 2,
        py: 1,
      }}
    >
      <KeywordSelect {...props} value={String(props.value)} />
    </div>
  )
}
