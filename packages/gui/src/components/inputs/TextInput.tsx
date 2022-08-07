import { EditorPropsWithLabel } from '../../types/editor'
import { InputHeader } from '../ui/InputHeader'

type Props = EditorPropsWithLabel<string>

export function TextInput<T extends string>(props: Props) {
  const { value, onChange } = props
  return (
    <div sx={{ width: '100%' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        sx={{ WebkitAppearance: 'none', appearance: 'none', width: '100%', border: '1px solid', boxSizing: 'border-box', display: 'block', p:2, borderRadius: '6px' }}
      />
    </div>
  )
}
