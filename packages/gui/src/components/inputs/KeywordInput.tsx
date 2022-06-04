import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { KeywordSelect } from '../primitives/KeywordSelect'

interface Props<T extends string> extends EditorPropsWithLabel<T> {
  options: T[]
}
export function KeywordInput<T extends string>(props: Props<T>) {
  return (
    <div sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Label>{props.label}</Label>
      <div
        sx={{
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.25rem',
          width: 'max-content',
          px: 1,
        }}
      >
        <KeywordSelect {...props} />
      </div>
    </div>
  )
}
