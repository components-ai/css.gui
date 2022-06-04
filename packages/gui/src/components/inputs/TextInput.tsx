import { EditorPropsWithLabel } from '../../types/editor'
import { InputHeader } from '../ui/InputHeader'

type Props = EditorPropsWithLabel<string>

export function TextInput<T extends string>({
  value,
  onChange,
  ...props
}: Props) {
  return (
    <InputHeader {...props}>
      <div sx={{ display: 'flex', flexDirection: 'row' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          sx={{ width: '100%', minHeight: '1.6em', mr: 1 }}
        />
      </div>
    </InputHeader>
  )
}
